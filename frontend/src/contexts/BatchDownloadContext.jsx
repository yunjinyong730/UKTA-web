import React, { createContext, useState, useContext } from 'react';
import { LoadingContext } from './LoadingContext';

const BatchDownloadContext = createContext();

export const BatchDownloadProvider = ({ children }) => {
	const [batchDownloadIdx, setBatchDownloadIdx] = useState([]);
	const [batchDownloads, setBatchDownloads] = useState([]);
	const [compare, setCompare] = useState(false);
	const { setIsLoading } = useContext(LoadingContext);
	const clearBatchDownloads = () => {
		setBatchDownloads([]);
	};

	const addBatchDownload = async (file) => {
		if (!batchDownloadIdx.includes(file)) {
			if (batchDownloads.length >= 10) {
				console.warn('Maximum of 10 files can be downloaded at a time.');
				return;
			}
			const data = await fetchData(file);
			setBatchDownloads([...batchDownloads, data]);
			setBatchDownloadIdx([...batchDownloadIdx, file]);
		} else {
			setBatchDownloads(batchDownloads.filter((item) => item._id !== file));
			setBatchDownloadIdx(batchDownloadIdx.filter((item) => item !== file));
		}
	};

	const fetchData = async (resultId) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API_URI}/korcat/cohesion/${resultId}`);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error(error);
		}
	};

	const handleBatchDownload = () => {
		if (batchDownloads.length === 0) {
			alert('No files selected for download.');
			return;
		}
		setIsLoading(true);
		const data = JSON.stringify(batchDownloads);
		const blob = new Blob([data], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'batch_downloads.json';
		link.click();
		link.remove();
		setIsLoading(false);
	}

	const handleBatchDelete = async () => {
		if (batchDownloads.length === 0) {
			alert('No files selected for deletion.');
			return;
		}
		try {
			if (window.confirm('Are you sure you want to delete the selected files?')) {
				setIsLoading(true);
				for (const file of batchDownloadIdx) {
					await fetch(`${process.env.REACT_APP_API_URI}/korcat/cohesion/${file}`, {
						method: 'DELETE',
					});
				}
			}
		} catch (error) {
			console.error(error);
		} finally {
			clearBatchDownloads();
			setIsLoading(false);
		}
	}

	return (
		<BatchDownloadContext.Provider value={{ batchDownloads, addBatchDownload, clearBatchDownloads, handleBatchDownload, handleBatchDelete, compare, setCompare }}>
			{children}
		</BatchDownloadContext.Provider>
	);
};

export const useBatchDownloads = () => {
	return useContext(BatchDownloadContext);
};
