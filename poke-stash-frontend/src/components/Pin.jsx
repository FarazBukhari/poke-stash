import React, { useState } from 'react'
import { client, urlFor } from '../client'
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { IoMdDownloadForOffline, MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { fetchUser, typeList } from '../utils/fetchUser';

const Pin = ({ pin: { _id, name, image, types, postedBy, save, destination } }) => {
    const navigate = useNavigate();
    const [postHovered, setPostHovered] = useState(false);
    const [savingPost, setSavingPost] = useState(false);

    const user = fetchUser();

    const alreadySaved = !!(save?.filter((item) => item?.postedBy?._id === user?.googleId))?.length;

    const savePin = (id) => {
        if (!alreadySaved) {
            setSavingPost(true);

            client
                .patch(id)
                .setIfMissing({ save: [] })
                .insert('after', 'save[-1]', [{
                    _key: uuidv4(),
                    userId: user?.googleId,
                    postedBy: {
                        _type: postedBy,
                        _ref: user?.googleId
                    }
                }])
                .commit()
                .then(() => {
                    window.location.reload();
                    setSavingPost(false);
                });
        }
    }

    const deletePin = (id) => {
        client
            .delete(id)
            .then(() => {
                window.location.reload();
            })
    }

    return (
        <div className='m-2 pb-5 transition-all hover:scale-105 duration-500 ease-in-out'>
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${_id}`)}
                className='relative cursor-pointer w-auto hover:shadow-lg bg-white rounded-lg overflow-hidden'
            >
                {postHovered && (
                    <div className='flex flex-col items-center justify-between bg-red-500 opacity-70 font-bold px-5 py-1 text-base text-white hover:shadow-md outline-none p-1 pt-2 pr-2 pb-2'>
                        <p className='flex gap-2'>#{_id}</p>
                    </div>)}
                    <img className='rounded-lg w-full bg-white' alt='user-post' src={image} />
                    
                    <div className='flex justify-center items-center bg-sky-300 opacity-90 h-20 w-full'>
                        <p className='text-white font-bold uppercase text-3xl'>{name}</p>
                    </div>
                {/* {postHovered && (
                    <div
                        className='absolute top-0 w-full h-full flex flex-col justify-between pt-2 z-50'
                        // style = {{height: '100%'}}
                    >
                        <div className='flex items-center justify-between p-1 pr-2 pb-2'>
                            <div className='flex gap-2'>
                                <a
                                    // href={`${image?.asset?.url}?dl=`}
                                    href={`${image}`}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className='bg-gray-100 w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <MdDownloadForOffline />
                                </a>
                            </div>
                            {alreadySaved ? (
                                <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                                    { save?.length } Saved
                                </button>
                            ) : (
                                    <button
                                        type='button'
                                        className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            savePin(_id);
                                        }}
                                    >
                                        { savingPost ? 'Saving...' : 'Save' }
                                </button>
                            )}
                        </div> */}
                        {/* <div className='flex justify-center items-center bg-black opacity-70 h-20 w-full'>
                            <p className='text-white font-bold capitalize'>{ name }</p> */}
                            {/* {destination && (
                                <a
                                    href={destination}
                                    target="_blank"
                                    rel='noreferrer'
                                    className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity:100 hover:shadow-md'
                                >
                                    <BsFillArrowUpRightCircleFill />
                                    {destination.length > 20 ? destination.slice(8, 20) : destination.slice(8)}
                                </a>
                            )} */}

                            {/* {postedBy?._id === user?.googleId && (
                                <button
                                    type='button'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deletePin(_id);
                                    }}
                                    className='bg-white opacity-70 hover:opacity-100 font-bold text-dark p-2 text-base rounded-3xl hover:shadow-md outline-none'
                                >
                                    <AiTwotoneDelete />
                                </button>
                            )} */}
                        {/* </div> */}
                        {/* <div className='flex justify-center items-center bg-sky-300 opacity-90 h-20 w-full'>
                            <p className='text-white font-bold uppercase text-3xl'>{ name }</p>
                        </div> */}
                    {/* </div> */}
                        
                {/* )} */}
            </div>
            <div className='flex justify-center py-5' >
                {types.map((type, index) => (
                    <p
                        className='bg-green-500 opacity-70 capitalize hover:opacity-100 text-white font-bold px-5 mx-2 py-1 text-base rounded-3xl hover:shadow-md outline-none cursor-pointer'
                        onClick={() => navigate(`/type/${type.name}`)}
                        key = {index}
                    >
                        {type.name}
                    </p>
                    ))
                }
            </div>
            {/* <Link
                to={`user-profile/${postedBy?._id}`}
                className='flex gap-2 mt-2 items-center'
            >
                <img
                    className='w-8 h-8 rounded-full object-cover'
                    src={postedBy?.image}
                />
                <p className='font-semibold capitalize'>{postedBy?.userName}</p>
            </Link> */}
        </div>
    )
}

export default Pin
