import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import { feedQuery, searchQuery, typeQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';



const Feed = () => {
    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState(null);
    const { typeId } = useParams();


    const fetchFeedDetails = async () => {
        let query = await feedQuery();
        // console.log('queryData', query)
        if (query) {
            setPins(query.data.data);
            setLoading(false);
        }
    };

    const fetchTypeDetails = async (typeId) => {
        console.log('typeData', typeId)
        let query = await typeQuery(typeId);
        console.log('query me', query)
        if (query) {
            setPins(query.data.data.pokemon);
            setLoading(false);
        }
    };


    useEffect(() => {
        setLoading(true);
        if (typeId) {
            setLoading(true);
            fetchTypeDetails(typeId);
            // const query = searchQuery(typeId);

            // client.fetch(query)
            //     .then((data) => {
            //         setPins(data);
            //         setLoading(false);
            //     });
        } else {
            setLoading(true);

            fetchFeedDetails();
            // client.fetch(feedQuery)
            //     .then((data) => {
            //         setPins(data);
            //         setLoading(false);
            //     });
        }
    }, [typeId])

    if (loading) return <Spinner message='We are adding new Pokemon to your feed!' />
    
    if(!pins?.length) return <h2>No pokemon in this type yet</h2>

    return (
        <div>
            {pins && <MasonryLayout pins={ pins }/>}
        </div>
    )
}

export default Feed
