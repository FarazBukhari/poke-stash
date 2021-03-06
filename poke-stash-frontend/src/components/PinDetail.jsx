import React, { useState, useEffect } from 'react'
import { MdDownloadForOffline } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { client, urlFor } from '../client'
import MasonryLayout from './MasonryLayout'
import constants from '../helpers/constants'
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data'
import Spinner from './Spinner'
import axios from 'axios'
import { BsChatLeftTextFill } from 'react-icons/bs'


const PinDetail = ({ user }) => {
    const [pins, setPins] = useState(null);
    const [pinDetail, setPinDetail] = useState(null);
    const [comment, setComment] = useState('');
    const [addingComment, setAddingComment] = useState(false);
    const { pinId } = useParams();

    function arrayUnique(array) {
        let a = array.concat();
        for(let i=0; i<a.length; ++i) {
            for (let j = i + 1; j < a.length; ++j) {
                if (a[i]._id === a[j]._id) {
                    a.splice(j--, 1);
                }
            }
        }
        return a;
    }
    
    const fetchPinDetails = async () => {
        let query = await pinDetailQuery(pinId);

        if (query) {
            setPinDetail(query.data.data)

            if (query.data.data) {
                let hel = query.data.data.types.map(type => type.name)
                let query1 = await pinDetailMorePinQuery(hel[0]);
                if (hel[1]) {
                    let query2 = await pinDetailMorePinQuery(hel[1]);
                    let moreList = arrayUnique(query1.data.data.concat(query2.data.data).sort(function(a, b){ return a._id - b._id}));
                    setPins(moreList)
                } else {
                    setPins(query1.data.data)
                }
            }
        }
    };


    useEffect(() => {
        fetchPinDetails();
    }, [pinId])

    const addComment = () => {
        if (comment) {
            setAddingComment(true);
            client
                .patch(pinId)
                .setIfMissing({ comments: [] })
                .insert('after', 'comments[-1]', [{
                    comment,
                    _key: uuidv4(),
                    postedBy: {
                        _type: 'postedBy',
                        _ref: user._id,
                    },
                }])
                .commit()
                .then(() => {
                    fetchPinDetails();
                    setComment('');
                    setAddingComment(false);
                })
        }
    };

    if (!pinDetail) return <Spinner message="Loading pin..." />

    return (
        <>
            <div className='flex xl:flex-row flex-col m-auto bg-white' style={{maxWidth: '1500px', borderRadius: '32px'}}>
                <div className='flex justify-center items-center md:items-start flex-initial'>
                    <img
                        src={ pinDetail?.image }
                        className='rounded-t-3xl rounded-b-lg'
                        alt='user-post'
                    />
                </div>
                <div className='w-full p-5 flex-1 xl:min-w-620 bg-sky-100 rounded-r-3xl'>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-2 items-center'>
                        <a
                            // href={`${pinDetail?.image?.asset?.url}?dl=`}
                            href = { pinDetail?.image }
                            download
                            onClick={(e) => e.stopPropagation()}
                            className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                        >
                            <MdDownloadForOffline />
                        </a>
                        </div>
                        {/* <a href={pinDetail?.destination} target='_blank' rel='noreferer'>
                            {pinDetail.destination}
                        </a> */}
                    </div>
                    <div>
                        <h1 className='text-4xl font-bold break-words capitalize mt-3'>
                            {pinDetail.name}
                        </h1>
                        {/* {console.log('pinDetail', pinDetail)} */}
                        <p className='mt-3 capitalize'><strong>Type:</strong> {pinDetail.types.map(types => types.name).join(' | ')}</p>
                        <p className='mt-3 capitalize'><strong>Abilities:</strong> {pinDetail.abilities.map(abilities => abilities.name).join(' | ')}</p>
                        <p className='mt-3'><strong>Height:</strong> {pinDetail.height}</p>
                        <p className='mt-3'><strong>Weight:</strong> {pinDetail.weight}</p>
                        <p className='mt-3'><strong>Base Experience:</strong> {pinDetail.base_experience}</p>
                    </div>
                    {/* <Link
                        to={`user-profile/${pinDetail?.postedBy?._id}`}
                        className='flex gap-2 mt-5 items-center bg-white rounded-lg'
                    >
                        <img
                            className='w-8 h-8 rounded-full object-cover'
                            src={pinDetail?.postedBy?.image}
                        />
                        <p className='font-semibold capitalize'>{pinDetail?.postedBy?.userName}</p>
                    </Link> */}

                    <h2 className='mt-5 text-2xl'>Comments</h2>
                    <div className='max-h-370 overflow-y-auto'>
                        {pinDetail?.comments?.map((item, i) => (
                            <div className='flex gap-2 mt-5 items-center bg-white rounded-lg' key={item.comment}>
                                <img
                                    src={item.postedBy.image}
                                    alt='user-profile'
                                    className='w-10 h-10 rounded-full cursor-pointer'
                                />
                                <div className='flex flex-col'>
                                    <p className='font-bold'>
                                        {item.postedBy.userName}
                                    </p>
                                    <p className='flex flex-col text-red'>{item.comment}</p>
                                </div>
                            </div>
                        ))} 
                    </div>
                    <div className='flex flex-wrap mt-6 gap-3'>
                        <Link
                            to={`user-profile/${pinDetail?.postedBy?._id}`}
                        >
                            <img
                                className='w-10 h-10 rounded-full cursor-pointer'
                                src={pinDetail?.postedBy?.image}
                            />
                        </Link>
                        <input
                            className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300'
                            type='text'
                            placeholder='Add a comment'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                            type='button'
                            className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'
                            onClick={addComment}
                        >
                            {addingComment ? 'Commenting...' : 'Comment'}
                        </button>
                    </div>
                </div>
            </div>
            
            {pins?.length > 0 ? (
            <>
                <h2 className='text-center font-bold text-2x mt-8 mb-4'>
                    More like this
                </h2>
                <MasonryLayout pins={ pins } />
            </>
            ) : (
                <Spinner message="Loading more pins...." />
            )}
        </>
    )
}

export default PinDetail;
