import React, { useState, useEffect } from 'react'
import MasonryLayout from './MasonryLayout'
import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import Spinner from './Spinner'

const Search = ({ searchTerm }) => {
    const [pins, setPins] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchFeedDetails = async () => {
        let query = await feedQuery();
        if (query) {
            setPins(query.data.data);
            setLoading(false);
        }
    };

    const fetchSearchDetails = async (searchTerm) => {
        let query = await searchQuery(searchTerm);
        if (query) {
            setPins(query.data.data);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchTerm !== '') {
            setLoading(true);
            fetchSearchDetails(searchTerm.toLowerCase());
        }
        else {
            setLoading(true);
            fetchFeedDetails();
        }
    }, [searchTerm])

    return (
        <div>
            {loading && <Spinner message='Searching for pokemon...' />}
            {pins?.length !== 0 && <MasonryLayout pins={pins} />}
            {pins?.length === 0 && searchTerm !== '' && !loading && (
                <div className='mt-10 text-center text-xl'>
                    No pokemon found
                </div>
            )}
        </div>
    )
}

export default Search
