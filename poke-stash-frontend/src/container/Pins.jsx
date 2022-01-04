import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar, Feed, PinDetail, CreatePin, Search, List } from '../components'

const Pins = ({ user } ) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className='px-2 md:px-5'>
            <div className='bg-gray-50'>
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />
            </div>
            <div className='h-full'>
                <Routes>
                    <Route path='/' element={<Feed />}/>
                    <Route path='/type/:typeName' element={<Feed />}/>
                    <Route path='/pin-detail/:pinId' element={<PinDetail user={user} />}/>
                    <Route path='/create-pin' element={<CreatePin user={user} />}/>
                    <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={searchTerm} />}/>
			        <Route path="/users" element={<List />} />
                </Routes>
            </div>
        </div>
    )
}

export default Pins
