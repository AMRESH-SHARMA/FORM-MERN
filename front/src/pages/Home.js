import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function App() {

  const [videoAsset, setVideoAsset] = useState('');
  const [imageAsset, setImageAsset] = useState(undefined);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [savingPost, setSavingPost] = useState(false);
  let navigate = useNavigate();
  const uploadVideo = async (e) => {
    let vid = e.target.files[0];
    if (!vid.name.match(/\.(mpg|avi|mp4)$/)) {
      alert('only mpg avi mp4 supports.');
     return false;
    }
    setVideoAsset(e.target.files[0]);
    console.log(e.target.files[0])
  };

  const uploadImage = async (e) => {
    let img = e.target.files[0];
    if (!img.name.match(/\.(jpg|png)$/)) {
      alert('only JPG & PNG suports.');
      return false;
    }
    setImageAsset(e.target.files[0]);
    console.log(e.target.files[0])
  };

  const handlePost = async (e) => {

  if (videoAsset && imageAsset && title && description) {
      setSavingPost(true);
      let formData = new FormData();
      formData.append("imageAsset", imageAsset);
      formData.append("videoAsset", videoAsset);
      formData.append("title", title);
      formData.append("description", description);
      const res = await fetch("http://localhost:5000/formdata", {
        method: "POST",
        body: formData,
      })
      .catch((err) => {if(err) {setSavingPost(false);alert("server error")}})
      .then((res)=>{if(res.ok){navigate("/page2", { replace: false })}})

  } else{
    alert("Please Fill All Fields")
  }

};

  const handleDiscard = () => {
    setSavingPost(false);
    setVideoAsset(undefined);
    setImageAsset(undefined);
    setTitle('');
    setDescription('');
  };
  
  return (
    <div className='mt-1 flex w-full h-[130vh] absolute left-0 mb-10 pt-10 lg:pt-10 bg-gradient-to-r from-purple-500 to-pink-500 bg-gradient-to-l hover:bg-gradient-to-r bg-cover bg-center justify-center'>
      <div className=' bg-white rounded-lg xl:h-[115vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6'>
{/* VIDEO */}
        <div>
          <div>
            <p className='text-2xl font-bold'>Upload Info</p>
            <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
          </div>
          <div className=' border-dashed rounded-xl border-4 border-gray-300 flex flex-col justify-center items-center  outline-none mt-10 w-[300px] h-[250px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
              <div>
                {!videoAsset ? (
                  <label className='cursor-pointer'>
                    <div className='flex flex-col items-center justify-center h-full'>
                      <div className='flex flex-col justify-center items-center'>
                        <p className='text-xl font-semibold'>
                          Select video to upload
                        </p>
                      </div>

                      <p className='text-gray-400 text-center text-sm leading-10'>
                        MP4 or WebM or ogg <br />
                      </p>
                      <p className='bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                        Select file
                      </p>
                    </div>
                    <input
                      type='file'
                      name='upload-video'
                      onChange={(e) => uploadVideo(e)}
                      className='w-0 h-0'
                    />
                  </label>
                ) : (
                  <div className=' rounded-3xl w-[300px]  p-4 flex flex-col gap-6 justify-center items-center'>
                    <video
                      className='rounded-xl h-full bg-black'
                      controls
                      loop
                      src={URL.createObjectURL(videoAsset)}
                    />
                    <div className=' flex justify-between gap-20'>
                      <button
                        type='button'
                        className=' rounded-full bg-gray-200 text-red-400 p-2 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                        onClick={() => setVideoAsset(undefined)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
          </div>
{/* IMAGE */}
          <div className=' border-dashed rounded-xl border-4 border-gray-300 flex flex-col justify-center items-center  outline-none mt-10 w-[300px] h-[250px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
          {!imageAsset ? (<label>                        
            <p className='text-xl font-semibold'>
            Select Image to upload
            </p>                     
            <p className='bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none'>
            Select Image
            </p>
            <input 
            type='file' 
            name='upload-image' 
            onChange={(e) => uploadImage(e)}
            className='w-0 h-0' />
            </label>) : (
            <><img src={URL.createObjectURL(imageAsset)} alt="nofile" />
            <div className=' flex justify-between gap-20 '>
                <button
                  type='button'
                  className=' rounded-full bg-gray-200 text-red-400 p-2 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                  onClick={() => setImageAsset(undefined)}
                >Delete
                </button>
            </div></>
            )}
            
          </div>
        </div>

{/* TITLE */}
        <div className='flex flex-col gap-3 pb-10'>
          <label className='text-md font-medium '>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='rounded hover:bg-gray-100 lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2'
          />
{/* DESCRIPTION */}
          <label className='text-md font-medium'>Description</label>
          <textarea
            type='textarea'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
            className='rounded hover:bg-gray-100 lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2'
          />
{/* BUTTONS */}
          <div className='flex gap-6 mt-10'>
            <button
              onClick={handleDiscard}
              type='button'
              className='border-gray-300 hover:bg-gray-100 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
            >
              Discard
            </button>
            <button
              onClick={handlePost}
              type='button'
              className='bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
            >
              {savingPost ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};