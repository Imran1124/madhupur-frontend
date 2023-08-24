import React, { useState, useEffect, useRef } from "react";
import ApiHeader from '../../Components/ApiList/ApiHeader2';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import { TextField, InputAdornment } from '@mui/material';
import BarLoader from '../../Components/Common/BarLoader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadVideo = () => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const[category,setCategory]=useState("")
  const[coverPic,setCoverPic]=useState("")
  const [secondselectedFiles, setsecondSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const [message, setMessage] = useState([]);
  const [imageInfos, setImageInfos] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const progressInfosRef = useRef(null);
  const {
    api_videopost,
  } = ApiList();

  const selectFiles = (event) => {
    let images = [];

    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]));
    }

    setSelectedFiles(event.target.files);
    setImagePreviews([...imagePreviews,...images]);
    setProgressInfos({ val: [] });
    setMessage([]);
    setsecondSelectedFiles([...secondselectedFiles,...event.target.files])
  };

  console.log(selectedFiles)
  console.log(secondselectedFiles)

  const uploadImages = () => {
    const formdata=new FormData();
    formdata.append("category",category)
    formdata.append("coverpic",coverPic)
    secondselectedFiles.forEach((obj,index)=>{
formdata.append(`videoUpload[${index}]`,obj)
    })
    for (var pair of formdata.entries()) {
        console.log(pair[0]+ ' - ' + pair[1]); 
    }
    AxiosInterceptors.post(api_videopost, formdata, ApiHeader())
      .then(function (response) {
        console.log('bank master..', response?.data?.data);
        if (response?.data?.status === true) {
          // Swal.fire({
          //   icon: "success",
          //   title: `Section`,
          //   text: currentId!==null ? "Data Updated Successfully!" : "Data Added Successfully",
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
          toast.success( 'Data Added Successfully'
          );
          setImagePreviews([])
       
        } else {
          // activateBottomErrorCard(true, `${response?.data?.message}`);
          toast.error(`${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        // activateBottomErrorCard(true, "Error occured in submitting form.");
        toast.warning('Error occured in submitting form.');
        setisLoading(false);
      });
  };
  const removesrow = (index) => {
    setsecondSelectedFiles((current) =>
      current.filter((record) => {
        if (current.indexOf(record) == index) {
        } else {
          return record;
        }
      })
    );
    setImagePreviews((current) =>
    current.filter((record) => {
      if (current.indexOf(record) == index) {
      } else {
        return record;
      }
    })
  );
  };
  console.log(imagePreviews ,category)
  return (
    <div className="w-full h-[76vh] lg:h-auto overflow-auto ">
        <div className="flex items-start justify-start flex-col mt-5 ml-5 ">
          <h1 className="text-4xl font-semibold text-gray-700">Video Gallery Master</h1>
          <h1 className="text-gray-600 text-sm">
            Unlock Your Potential. Join Our Journey Of Education And Excellence
          </h1>
        </div>
        <div className=" mt-1 ml-3 mr-3 ">
          <div className="flex h-auto  items-start justify-start w-full">
            <div className="grid grid-cols-12 w-full  ml-3 mr-3 ">
              <div className="col-span-12  lg:col-span-4 w-full flex justify-center">
              <div className="mt-8 border w-full  rounded-md relative">
                  <div className="bg-white px-3 ">
                    {' '}
                    <h1 className=" absolute text-2xl bg-white flex font-semibold  -mt-4 text-gray-500 ml-9">
                      Add
                    </h1>
                  </div>
        <div className="col-8 mt-[10vh] px-[20%]">
            <div className="my-3 flex w-full">
            <TextField
            id="category"
            name="category"
            label="category"
            fullWidth
            size="small"
              type="text"
              onChange={(e)=>setCategory(e.target.value)}
              className="form-control h-10 block w-full border border-gray-200 px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
            />
            </div >
            <div className="my-3 block w-full">
          <label
                        htmlFor="coverpicUpload"
                        className="form-control h-10 block w-full border border-gray-200 px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                      >
                        Choose Cover Pic
                      </label>
                      {coverPic ? coverPic.name : "No file Selected"}
            <input
            id="coverpicUpload"
              type="file"
              accept="image/*"
              onChange={(e)=>setCoverPic(e.target.files[0])}
              className="sr-only"
            />
          
          </div>
            <div className="my-3 flex w-full">
          <label
                        htmlFor="videoUpload"
                        className="form-control h-10 block w-full border border-gray-200 px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                      >
                        Choose Video
                      </label>
            <input
            id="videoUpload"
              type="file"
              multiple
              accept=".mp4"
              onChange={selectFiles}
              className="sr-only"
            />
          
          </div>
        </div>
        <div className="col-4 mt-7">
          <button
            className="px-9 py-2.5 bg-[#6AB783] text-white font-medium text-sm leading-tight  rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
            disabled={!selectedFiles}
            onClick={uploadImages}
          >
            Save
          </button>
        </div>
</div>
        
      </div>
      <div className="col-span-12 md:col-span-12 lg:col-span-8 w-full lg:ml-2 ">

      <div className="mt-8 border   rounded-md relative">
                  <div className="bg-white px-3 ">
                    {' '}
                    <h1 className=" absolute text-2xl bg-white flex font-semibold  -mt-4 text-gray-500 ml-9">
                      Preview
                    </h1>
                  </div>
                  <div className="mt-5  ">
                    <div className="flex flex-wrap justify-between">
      {progressInfos &&
        progressInfos.val.length > 0 &&
        progressInfos.val.map((progressInfo, index) => (
          <div className="mb-2 " key={index}>
            <span>{progressInfo.fileName}</span>
            <div className="progress">
              <div
                className="progress-bar progress-bar-info"
                role="progressbar"
                aria-valuenow={progressInfo.percentage}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: progressInfo.percentage + "%" }}
              >
                {progressInfo.percentage}%
              </div>
            </div>
          </div>
        ))}

      {imagePreviews && (
        <div className=" h-[70vh] overflow-auto flex flex-wrap items-center justify-center">
          {imagePreviews.map((img, i) => {
            return (<div className="block">
              {/* <img className="w-[20vh] h-[20vh] mx-4" src={img} alt={"image-" + i} key={i} /><br/> */}
              <video controls className="w-[40vh] h-[40vh] mx-4 my-3">
  <source src={img} type="video/mp4"/>
  Your browser does not support the video tag.
</video>
              <button className="text-white bg-gradient-to-r from-[yellow] to-[#0c0a09] font-bold px-12 py-2 rounded-[10px]" onClick={() => removesrow(i)}>Remove</button>
              </div>
            );
          })}
        </div>
      )}

      {message.length > 0 && (
        <div className="alert alert-secondary mt-2" role="alert">
          <ul>
            {message.map((item, i) => {
              return <li key={i}>{item}</li>;
            })}
          </ul>
        </div>
      )}
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>

      {/* {imageInfos.length > 0 && (
        <div className="card mt-3">
          <div className="card-header">List of Images</div>
          <ul className="list-group list-group-flush">
            {imageInfos &&
              imageInfos.map((img, index) => (
                <li className="list-group-item" key={index}>
                  <p>
                    <a href={img.url}>{img.name}</a>
                  </p>
                  <img src={img.url} alt={img.name} height="80px" />
                </li>
              ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default UploadVideo;