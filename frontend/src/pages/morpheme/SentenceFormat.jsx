import React, { useState } from "react";
import { MorphTags } from "../../Tags";


const HilightText = ({ range, content, color }) => {
	return (
		<div className="">
			<span>{content.substring(0, range[0])}</span>
			<span
				className="bg-slate-300 font-bold border-y-2"
				style={{ color: color, borderColor: color }}
			>
				{content.substring(range[0], range[1])}
				{/* {range[0] === range[1] && range[0] != 0 && <span>&nbsp;&nbsp;</span>} */}
			</span>
			<span>{content.substring(range[1], content.length)}</span>
		</div>
	);
}

const ToggleTable = ({ tableHidden, setTableHidden }) => {
	return (
		<button
			className="btn-primary rounded-lg flex gap-1 p-1 items-center"
			onClick={() => setTableHidden(!tableHidden)}
		>
			<div className={`px-2 rounded-full ${tableHidden ? "bg-slate-300 hover:bg-slate-500 text-slate-800" : ""}`}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
					<path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
				</svg>
			</div>
			<div className={`px-2 rounded-full ${!tableHidden ? "bg-slate-300 hover:bg-slate-500 text-slate-800" : ""}`}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
					<path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
				</svg>
			</div>
		</button>
	);
}

const MorphDesc = ({ idx, kr, tag }) => {
	return (
		<>
			<div className='flex justify-center font-mono text-xs italic border-b-[1px]'>
				{idx}
			</div>
			<div className='flex justify-center'>
				{kr}
			</div>
			<div className='flex flex-col justify-center group-hover:gap-1 text-xs gap-1' style={{ "color": MorphTags.find(t => t.tag === tag)?.color }}>
				<span className='flex justify-center text-sm'>
					{tag}
				</span>
				<span className='flex justify-center'>
					{MorphTags.find(t => t.tag === tag)?.desc}
				</span>
				<span className='flex justify-center'>
					{MorphTags.find(t => t.tag === tag)?.desc_eng}
				</span>
			</div>
		</>
	);
}

const Sentence = ({ index, sentence }) => {
	const [range, setRange] = useState([0, 0]);
	const [hoverColor, setHoverColor] = useState('');
	const [tableHidden, setTableHidden] = useState(true);
	const handleMouseEnter = (range) => {
		range[0] = range[0] - sentence.text.beginOffset;
		range[1] = range[1] - sentence.text.beginOffset;
		setRange(range);
	}

	return (
		<div className="flex flex-col gap-2 text-sm">
			<div className="flex gap-2">
				<div className="">{index + 1}.</div>
				<HilightText range={range} content={sentence.text.content} color={hoverColor} />
			</div>

			<div className="flex flex-col bg-slate-300 dark:bg-slate-900 rounded-xl overflow-hidden font-semibold">
				<div className="flex gap-2 m-2 mb-0 items-center">
					<ToggleTable tableHidden={tableHidden} setTableHidden={setTableHidden} />
					<hr className="grow" />
				</div>

				<div
					className={`
						flex overflow-x-auto 
						bg-white dark:bg-slate-950 
						divide-x-[1px] divide-slate-300 dark:divide-slate-600 
						${tableHidden ? "h-fit mt-2" : "h-0 pt-0 m-0"}
					`}
				>
					{sentence.tokens.map((token, index) => {
						let sumPrev = sentence.tokens.slice(0, index).reduce((acc, token) => acc + token.morphemes.length, 0);
						return (
							<div key={index} className="flex flex-col">
								<div
									className="
										flex justify-center p-2
										hover:bg-slate-200 dark:hover:bg-slate-700"
									onMouseEnter={() => {
										handleMouseEnter([token.text.beginOffset, token.text.beginOffset + token.text.length]);
										setHoverColor('#3381fd');
									}}
									onMouseLeave={() => {
										setRange([0, 0]);
										setHoverColor('');
									}}
								>
									<span className="w-full text-center border-b-[1px]">{token.text.content}</span>
								</div>
								<div
									className="flex flex-row"
								>
									{token.morphemes.map((morph, index_) => {
										return (
											<div
												key={index_}
												className={`
												flex flex-col gap-1 p-2 text-nowrap *:flex *:justify-center 
												hover:bg-slate-200 dark:hover:bg-slate-700
											`}
												onMouseEnter={() => {
													handleMouseEnter([morph.text.beginOffset, morph.text.beginOffset + morph.text.length]);
													setHoverColor(MorphTags.find(tag => tag.tag === morph.tag)?.color);
												}}
												onMouseLeave={() => {
													setRange([0, 0]);
													setHoverColor('');
												}}
											>
												<div className="flex flex-col gap-2">
													<MorphDesc idx={sumPrev + index_ + 1} kr={morph.text.content} tag={morph.tag} />
												</div>
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>

				<div className={`text-left overflow-hidden transition-all ease-in-out text-sm ${tableHidden ? "h-0 pt-0" : "h-fit pt-1"}`}>
					<div className="table-header w-full py-1 overflow-y-scroll">
						<table className="table-auto w-full">
							<thead className="">
								<tr className="">
									<th className="px-3 text-right w-1/12">n.</th>
									<th className="px-3 w-1/6">Token</th>
									<th className="px-3">Morpheme</th>
									<th className="px-3 w-1/6">Tag</th>
									<th className="px-3 w-1/3">Description</th>
								</tr>
							</thead>
						</table>
					</div>

					<div className="table-contents overflow-x-hidden overflow-y-scroll max-h-96 w-full">
						<table className="table-auto w-full">
							{sentence.tokens.map((token, index) => {
								let sumPrev = sentence.tokens.slice(0, index).reduce((acc, token) => acc + token.morphemes.length, 0);
								return (
									<tbody key={index} className="">
										{token.morphemes.map((morph, index_) => {
											return (
												<tr
													onMouseEnter={() => {
														handleMouseEnter([morph.text.beginOffset, morph.text.beginOffset + morph.text.length]);
														setHoverColor(MorphTags.find(tag => tag.tag === morph.tag)?.color);
													}}
													onMouseLeave={() => {
														setRange([0, 0]);
														setHoverColor('');
													}}
													key={index_} className={`
																hover:bg-slate-300 dark:hover:bg-slate-700
															`}
												>
													{index_ === 0 &&
														<>
															<td rowSpan={token.morphemes.length} className="px-3 py-1 font-mono text-right w-1/12 italic">{index + 1}</td>
															<td rowSpan={token.morphemes.length} className="px-3 py-1 w-1/6">
																{token.text.content}
															</td>
														</>}
													<td className="flex px-3 py-1 gap-2">
														<span className="w-8 font-mono text-right italic">{sumPrev + index_ + 1}</span>
														<span>{morph.text.content}</span>
													</td>
													<td
														className="px-3 py-1 font-mono w-1/6"
														style={{ "color": MorphTags.find(tag => tag.tag === morph.tag)?.color }}
													>
														{morph.tag}
													</td>
													<td
														className="px-3 py-1 w-1/3"
														style={{ "color": MorphTags.find(tag => tag.tag === morph.tag)?.color }}
													>
														{MorphTags.find(tag => tag.tag === morph.tag)?.desc}
														&nbsp;/&nbsp;
														{MorphTags.find(tag => tag.tag === morph.tag)?.desc_eng}
													</td>
												</tr>
											);
										})
										}
									</tbody>
								);
							})}
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

const Sentences = ({ results, grade }) => {
	return (
		<div className='grid grid-cols-1 gap-4'>
			{results.sentences.map((sentence, index) => {
				return (
					<>
						<Sentence key={index} index={index} sentence={sentence} />
					</>
				)
			})}
		</div >
	);
}

const SentencesCorrection = ({ results }) => {
	function revBlocks(results) {
		let revSentences = results.revisedSentences;
		let revisedBlocks = revSentences.reduce((acc, sentence) => {
			if (sentence.revisedBlocks) {
				return acc.concat(sentence.revisedBlocks);
			}
			return acc;
		}, []);
		for (let i = 0; i < revisedBlocks.length; i++) {
			if (revisedBlocks[i].origin.content === revisedBlocks[i].revised) {
				revisedBlocks.splice(i, 1);
				i--; // Adjust index after removal
			}
		}
		return revisedBlocks.sort((a, b) => a.origin.beginOffset - b.origin.beginOffset);
	}
	const [blocks, setBlocks] = useState(revBlocks(results));
	const [revisedBlocks, setRevisedBlocks] = useState([]);
	function correctBlock(index, revised) {
		let newBlocks = [...blocks];
		newBlocks[index].revised = revised;
		setBlocks(newBlocks);
		if (!revisedBlocks.includes(index)) {
			setRevisedBlocks([...revisedBlocks, index]);
		}
		// console.log(revisedBlocks);
	}
	const [hRange, setHRange] = useState([0, 0]);

	return (
		<div
			className={`
				font-normal
				bg-white dark:bg-slate-950 rounded-xl overflow-hidden
				h-fit
			`}
		>
			<div className="bg-slate-300 dark:bg-slate-900 rounded-t-xl overflow-hidden p-2 flex gap-2 items-center">
				<span>
					{blocks.length} Possible Revisions
				</span>
				<hr className="grow" />
			</div>
			<div className="p-4 leading-relaxed">
				{blocks.map((block, index) => {
					// console.log(block);
					let range = [block.origin.beginOffset, block.origin.beginOffset + (block.origin.length || 0)];
					let content = results.origin;
					let prev = index === 0 ? 0 : blocks[index - 1].origin.beginOffset + (blocks[index - 1].origin.length || 0);
					return (
						<>
							<span className="">{content.substring(prev, range[0])}</span>
							<span 
								className={`${range[0] === hRange[0] ? "bg-slate-300" : ""} font-bold border-y-2 px-1`}
								style={{
									color: revisedBlocks.includes(index) ? "green" : "#e23e3f",
									borderColor: revisedBlocks.includes(index) ? "green" : "#e23e3f"
								}}
							>
								{revisedBlocks.includes(index) ?
									range[0] !== range[1] ? block.revised : " " :
									range[0] !== range[1] ? block.origin.content : ""
								}
							</span>
							{index === blocks.length - 1 && <span>{content.substring(range[1], content.length)}</span>}
						</>
					)
				})}
			</div>
			<hr className="border-slate-300 dark:border-slate-700 shadow" />
			<div
				className={`
				flex flex-col gap-2 items-start max-h-64 overflow-y-auto
				bg-white dark:bg-slate-950 font-normal p-2
			`}
			>
				{blocks.map((block, index) => {
					return (
						<div
							key={index}
							className="flex flex-col w-full gap-1 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-lg border-[1px]"
							onMouseEnter={() => setHRange([block.origin.beginOffset, block.origin.beginOffset + (block.origin.length || 0)])}
							onMouseLeave={() => setHRange([0, 0])}
						>
							<div className="font-bold">
								{index + 1}. {block.origin.content}
							</div>
							<div className="flex gap-2">
								{block.revisions.map((rev, index_) => {
									return (
										<div
											key={index_}
											className="hover:bg-slate-300 font-bold border-y-2 px-1 cursor-pointer"
											style={{ color: "#3381fd", borderColor: "#3381fd" }}
											onClick={() => correctBlock(index, rev.revised)}
										>
											{rev.revised}
										</div>
									)
								})}
							</div>
							<div className="flex flex-col">
								<div>
									{block.revisions[0].category}
								</div>
								<div>
									{block.revisions[0].comment}
								</div>
								<div className="text-xs text-slate-500">
									{block.revisions[0].ruleArticle}
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	);
}

export { Sentences, SentencesCorrection };
