import React, { useState, useEffect } from 'react';

const List = () => {
	const [
		list,
		setList
	] = useState('');

	useEffect(() => {
		getList();
	}, []);

	const getList = () => {
		fetch('/home').then((res) => res.json()).then((list) => setList(list));
	};

	return (
		<div className="App">
			<h1>List</h1>
			{list.length ? (
				<div>
					{list.map((item) => {
						return <div>{item}</div>;
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
