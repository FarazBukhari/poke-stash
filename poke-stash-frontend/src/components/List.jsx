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
		let getAllUsers = await axios.get(constants.api_urls.get_all_users);
		setList(getAllUsers.data.data);
	};

	return (
		<div className="mt-10 flex xl:flex-row flex-col m-auto bg-white">
			<h1 className="pt-5 flex justify-center items-center md:items-start flex-initial">List</h1>
			{list.length ? (
				<div className="flex items-center justify-between">
					{list.map((item) => {
						return <div>{item.name}</div>;
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
