import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import { feedQuery, searchQuery, typeQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';



const Feed = () => {
    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState(null);
    const { typeName } = useParams();


    const fetchFeedDetails = async () => {
        let query = await feedQuery();
        // console.log('queryData', query)
        if (query) {
            setPins(query.data.data);
            setLoading(false);
        }
    };

    const fetchTypeDetails = async (typeName) => {
        // console.log('typeData', typeName)
        let query = await typeQuery(typeName);
        // console.log('query me', query)
        if (query) {
            setPins(query.data.data);
            setLoading(false);
        }
    };


    useEffect(() => {
        setLoading(true);
        if (typeName) {
            setLoading(true);
            fetchTypeDetails(typeName);
            // const query = searchQuery(typeName);

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
    }, [typeName])

    if (loading) return <Spinner message='We are adding new Pokemon to your feed!' />
    
    if(!pins?.length) return <h2>No pokemon in this type yet</h2>

    return (
        <div>
            {pins && <MasonryLayout pins={ pins }/>}
        </div>
    )
}

export default Feed
