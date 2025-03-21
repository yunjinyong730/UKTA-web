import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import './App.css';

import Foot from './components/Foot';
import Loading from './components/Loading';
import Nav from './components/Nav';
import TextInput from './components/TextInput';
import { useLoadingContext } from './contexts/LoadingContext';
import ResultsCoh from './pages/cohesion/ResultsCohesion';
import Dummy from './pages/Dummy';
import TagInfo from './pages/TagInfo';

function App() {
	const currentPage = useLocation();
	const { isLoading, setIsLoading } = useLoadingContext();
	const [darkMode, setDarkMode] = useState(() => {
		const preferredColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
		return preferredColorScheme ? false : false;
	});

	useEffect(() => {
		// Scroll to top on page change
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [currentPage]);

	return (
		<div className={`App ${darkMode ? 'dark' : ''}`}>
			{/* Background overlay */}
			<div className='fixed top-0 h-full w-full z-0 bg-white dark:bg-slate-950'></div>
			<div className="relative text-slate-900 dark:text-slate-50 transition-all ease-in-out min-w-[320px]">
				{/* Navigation bar */}
				<Nav currentPage={currentPage.pathname} />

				<div className="items-start pt-32 grid grid-cols-1 gap-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className='fixed top-0'></div>
					{/* Text input component */}
					<TextInput uploadInProgress={isLoading} setUploadInProgress={setIsLoading} />

					<hr id="content_area_start" />

					<div className='min-h-80'>
						<AnimatePresence mode='wait'>
							<Routes location={currentPage} key={currentPage.pathname}>
								<Route path='/' element={<Dummy />} />
								<Route path='/analysis' element={isLoading ? <Loading /> : <ResultsCoh darkMode={darkMode} />} />
								<Route path='/tagging' element={<TagInfo />} />
								<Route path='*' element={<Navigate to="/" />} />
							</Routes>
						</AnimatePresence>
					</div>

					<div className='fixed bottom-0'></div>
				</div>

				{/* Footer component */}
				<Foot darkMode={darkMode} setDarkMode={setDarkMode} />
			</div>
		</div>
	);
}

export default App;
