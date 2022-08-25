import React from 'react'

const ServerError = () => {
  return (
    <div className='flex w-full h-[80vh] absolute left-0 mb-10 pt-10 lg:pt-10 bg-[#F8F8F8] justify-center'>
    <div className=' bg-white rounded-lg xl:h-[70vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6'>
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <p className='text-4xl'>
      { 'servererror🥲'}
      </p>
    </div>
    </div>
    </div>
  );
}

export default ServerError