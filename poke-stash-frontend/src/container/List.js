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
		// console.log('getAllUsers', getAllUsers);
		setList(getAllUsers.data.data);
	};

	return (
		<div className="App">
			<h1>List</h1>
			{list.length ? (
				<div>
					{list.map((item) => {
						return <div>{item.userName}</div>;
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

export default List;
