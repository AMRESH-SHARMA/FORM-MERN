import React from 'react'
import { useEffect, useState } from 'react'
import ImageCard from '../components/ImageCard'
import NoResults from '../components/NoResults'

const ImagePage = () => {
const[data,setData]= useState(null)
const[error,setError]= useState(0)

  useEffect(() => {
  const fetchImages = async() => {
    const res = await fetch(`http://localhost:8080/`).catch((err)=>console.log(err))
    const json = await res.json().then((json)=>{setData(json)})
  }
    fetchImages()
  }, [])
  
  return (
    <div className='pt-5 pl-10 bg-[#e4e4e7] xl:grid grid-cols-3'>
      { data ? (
        data.map((item) => (
          <ImageCard title = {item.Title} imgUrl = {item.ImageUrl} key ={item._id} />
        ))
      ) : (
        <NoResults />
      )}
    </div>

    
  )
}

export default ImagePage

