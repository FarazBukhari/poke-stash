import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';



const Feed = () => {
    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState(null);
    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);
        if (categoryId) {
            setLoading(true);
            const query = searchQuery(categoryId);

            client.fetch(query)
                .then((data) => {
                    setPins(data);
                    setLoading(false);
                });
        } else {
            setLoading(true);

            client.fetch(feedQuery)
                .then((data) => {
                    setPins(data);
                    setLoading(false);
                });
        }
    }, [categoryId])

    if (loading) return <Spinner message='We are adding new Pokemon to your feed!' />
    console.log('feed pins', pins)
    if(!pins?.length) return <h2>No pokemon in this category yet</h2>

    return (
        <div>
            {pins && <MasonryLayout pins={ pins }/>}
        </div>
    )
}

export default Feed
