import React from 'react'
import { useEffect, useState } from 'react'
import ImageCard from '../components/ImageCard'
import NoResults from '../components/NoResults'
import ServerError from '../components/ServerError'

const ImagePage = () => {
const[data,setData]= useState('')
const[error,setError]= useState(false)
const[loading,setLoading]=useState(true)

  useEffect(() => {

  const fetchImages = async() => {
    try {
      const res = await fetch("http://localhost:5000/formdata")
      const json = await res.json()
      .then((json)=>{setData(json)})
      .then((json)=>{setLoading(false)})
      // .then((res)=>{console.log("response",(res))})
    } catch (err) {

      setError(true)
      setLoading(false)
      console.warn(err)
    }
  }
    fetchImages()
  }, [])

  return (
    <div className='pt-5 pb-10 pl-10 bg-gradient-to-r from-purple-500 to-pink-500 bg-gradient-to-l hover:bg-gradient-to-r bg-cover bg-center mt-1 xl:grid grid-cols-3'>
    {!loading && (
    <>
      {error? 
      <ServerError/>  : 
      <>
      { data.length ? (
        data.map((item) => (
          <ImageCard title = {item.Title} imgUrl = {item.ImageUrl} vidUrl = {item.VideoUrl} id ={item._id} key ={item._id} />
        ))
        ) : (
          <NoResults />
        )}
      </>}
    </>
    )}
    </div>
  )
}

export default ImagePage

