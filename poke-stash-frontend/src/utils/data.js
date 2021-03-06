import axios from 'axios';
import constants from '../helpers/constants';
export const typeList = [
	{
		id: 1,
		name: 'normal',
		image: 'https://i.pinimg.com/750x/eb/47/44/eb4744eaa3b3ccd89749fa3470e2b0de.jpg'
	},
	{
		id: 2,
		name: 'fighting',
		image: 'https://i.pinimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg'
	},
	{
		id: 3,
		name: 'flying',
		image: 'https://i.pinimg.com/236x/46/7c/17/467c17277badb00b638f8ec4da89a358.jpg'
	},
	{
		id: 4,
		name: 'poison',
		image: 'https://i.pinimg.com/736x/f4/e5/ba/f4e5ba22311039662dd253be33bf5f0e.jpg'
	},
	{
		id: 5,
		name: 'ground',
		image: 'https://i.pinimg.com/236x/fa/95/98/fa95986f2c408098531ca7cc78aee3a4.jpg'
	},
	{
		id: 6,
		name: 'rock',
		image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg'
	},
	{
		id: 7,
		name: 'bug',
		image: 'https://i.pinimg.com/236x/1b/c8/30/1bc83077e363db1a394bf6a64b071e9f.jpg'
	},
	{
		id: 8,
		name: 'ghost',
		image: 'https://i.pinimg.com/236x/fa/95/98/fa95986f2c408098531ca7cc78aee3a4.jpg'
	},
	{
		id: 9,
		name: 'steel',
		image: 'https://i.pinimg.com/750x/eb/47/44/eb4744eaa3b3ccd89749fa3470e2b0de.jpg'
	},
	{
		id: 10,
		name: 'fire',
		image: 'https://i.pinimg.com/236x/25/14/29/251429345940a47490cc3d47dfe0a8eb.jpg'
	},
	{
		id: 11,
		name: 'water',
		image: 'https://i.pinimg.com/236x/03/48/b6/0348b65919fcbe1e4f559dc4feb0ee13.jpg'
	},
	{
		id: 12,
		name: 'grass',
		image: 'https://i.pinimg.com/750x/66/b1/29/66b1296d36598122e6a4c5452b5a7149.jpg'
	},
	{
		id: 13,
		name: 'electric',
		image: 'https://i.pinimg.com/236x/72/8c/b4/728cb43f48ca762a75da645c121e5c57.jpg'
	},
	{
		id: 14,
		name: 'psychic',
		image: 'https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg'
	},
	{
		id: 15,
		name: 'ice',
		image: 'https://i.pinimg.com/236x/7d/ef/15/7def15ac734837346dac01fad598fc87.jpg'
	},
	{
		id: 16,
		name: 'dragon',
		image: 'https://i.pinimg.com/236x/03/48/b6/0348b65919fcbe1e4f559dc4feb0ee13.jpg'
	},
	{
		id: 17,
		name: 'dark',
		image: 'https://i.pinimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg'
	},
	{
		id: 18,
		name: 'fairy',
		image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg'
	}
];

export const userQuery = (userId) => {
	const query = `*[_type == "user" && _id == '${userId}']`;

	return query;
};

export const searchQuery = async (searchTerm) => {
	let searchData = await axios.get(constants.api_urls.get_search + searchTerm);
	return searchData;
};

export const typeQuery = async (typeName) => {
	let pokeList = await axios.get(constants.api_urls.get_pokemon_by_type + typeName);
	return pokeList;
};

export const getTypesQuery = async (typeId) => {
	let typeList = await axios.get(constants.api_urls.get_type_by_id + typeId);
	return typeList;
};

export const feedQuery = async () => {
	let pokeList = await axios.get(constants.api_urls.get_all_pokemon);
	return pokeList;
};

export const pinDetailQuery = async (pinId) => {
	let pokePin = await axios.get(constants.api_urls.get_pokemon_by_id + pinId);
	return pokePin;
};

export const pinDetailMorePinQuery = async (pin) => {
	const query = await axios.get(constants.api_urls.get_pokemon_by_type + pin);
	return query;
};

export const userCreatedPinsQuery = (userId) => {
	const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
	  image{
		asset->{
		  url
		}
	  },
	  _id,
	  destination,
	  postedBy->{
		_id,
		userName,
		image
	  },
	  save[]{
		postedBy->{
		  _id,
		  userName,
		  image
		},
	  },
	}`;
	return query;
};

export const userSavedPinsQuery = (userId) => {
	const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
	  image{
		asset->{
		  url
		}
	  },
	  _id,
	  destination,
	  postedBy->{
		_id,
		userName,
		image
	  },
	  save[]{
		postedBy->{
		  _id,
		  userName,
		  image
		},
	  },
	}`;
	return query;
};
