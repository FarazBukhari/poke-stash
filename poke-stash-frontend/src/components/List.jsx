import React, { useState, useEffect } from 'react';
import axios from 'axios';
import constants from '../helpers/constants';

const List = () => {
	const [
		list,
		setList
	] = useState('');

	useEffect(() => {
		getList();
	}, []);

	const getList = async () => {
		let getTest = await axios.get(constants.api_urls.get_test);
		console.log('getTest', getTest)
		setList(getTest.data.data);
	};

	return (
		<div className="bg-white">
			<h1 className="pt-5 flex justify-center items-center md:items-start">List</h1>
			<hr />
			{list.length ? (
				<div className = 'pt-5 mx-5'>
					{list.map((item) => {
						return (
							<div className = 'flex justify-center items-center capitalize'>
								<ul>
									<li>
										{item.name}
									</li>
								</ul>
							</div>
						);
					})}
				</div>
			) : (
				<div>
					<h2>No List Items Found</h2>
				</div>
			)}
		</div>
	);
};

export default List
