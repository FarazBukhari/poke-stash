import React from 'react'
import Loader from 'react-loader-spinner'


const Spinner = ({ message }) => {
    return (
        <div className='lex flex-col justify-center items-center- w-full h-full'>
            <Loader
                type="Oval"
                color="#00BFFF"
                height={50}
                width={200}
                className="m-5"
            />
            <p className='text-lg tex-center px-2'>{ message }</p>
        </div>
    )
}

export default Spinner
