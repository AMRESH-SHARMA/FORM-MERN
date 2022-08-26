import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom'
import {Card,CardHeader} from "@material-tailwind/react";
import ServerError from '../components/ServerError';
  

const VideoPage = () => {

  const[data,setData]= useState('')
  const[error,setError]= useState(false)
  const[loading,setLoading]=useState(true)

//AUTO PLAY VIDEO ON INTIAL LOAD
  const videoRef = useRef(null);
    useEffect(() => {
      if(!loading){
        videoRef.current.play();
      }
    }, [loading]);

  const {slug}=useParams();
  // console.log("id",slug)

  useEffect(() => {
  const fetchVideo = async() => {
    try {
      const res = await fetch(`http://localhost:5000/getvideo/${slug}`)
      const json = await res.json()
      .then((json)=>{setData(json)})
      .then((json)=>{setLoading(false)})

    } catch (err) {
      setError(true)
      setLoading(false)
      console.warn(err)
    }
  }
  fetchVideo()
  }, [slug])

  return (
    <>
    {!error?<>
      {!loading && (
      <div className='bg-gradient-to-r from-purple-500 to-pink-500 bg-gradient-to-l hover:bg-gradient-to-r bg-cover bg-center'>
        <div className='relative'>
          <div className='pt-5 h-[88vh] mt-1 pl-20'>
          <Card className="w-96 py-5 mt-10 ml-20 hover:bg-[#9ca3af]">
            <CardHeader floated={false} className="h-80">
            <video
            ref={videoRef}
            loop
            src={data.VideoUrl}
            muted="muted"
            className=' h-full cursor-pointer'
          ></video>
            </CardHeader>
          </Card>
          </div>
        </div>
      </div>
     ) 
    }</> : <ServerError/>}

  </>
  )
}

export default VideoPage