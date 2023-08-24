import React,{useState,useEffect} from 'react'
import ApiHeader from '../../Components/ApiList/ApiHeader2';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import { toast } from 'react-toastify';
import { useNavigate,useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import BarLoader from '../../Components/Common/BarLoader';
import BackendUrl from '../../Components/ApiList/BackendUrl';
import FsLightbox from "fslightbox-react";


export default function showImage() {
    const [number, setNumber] = useState(1);
    const [toggler, setToggler] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setisLoading] = useState(false);
  const [postperpage, setPostperpage] = useState(10);
  const [lastPage, setlastPage] = useState();
  const [lastdata, setlastData] = useState();
  const [searchTableData, setSearchTableData] = useState();
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [enable, setenable] = useState(false);
  const {
    api_getById
  } = ApiList();
    const { id } = useParams();
    console.log("hi",id)

  useEffect(()=>{
    fetchMasterList()
      },[])
      const fetchMasterList = () => {
        let url;
        let requestBody;
          requestBody = { categoryName: id };
          url = api_getById;
        
        setisLoading(true);
        AxiosInterceptors.post(url, requestBody, ApiHeader())
          .then(function (response) {
            if (response?.data?.status === true) {
             
                console.log('exam term data', response?.data?.data);
                setreadymadeListData(response?.data?.data?.pics.map(function(o) { return `${BackendUrl}/api/${o.pic_url}` }));
               
             }
             else {
              // activateBottomErrorCard(true, `${response?.data?.message}`);
              toast.error(`${response?.data?.message}`);
            }
            setisLoading(false);
          })
          .catch(function (error) {
            // activateBottomErrorCard(true, "Error occured while fetching data.");
            toast.warning('Error occured while fetching data.');
    
            setisLoading(false);
          });
      };
      const handleClick = (index) => {
        setCurrentIndex(index);
        setToggler(!toggler);
      };
    
    //   var showDatas;
    //   useEffect(()=>{
    //  showDatas=readymadeListData.map((image, index) =>{ 
    //         return `${BackendUrl}/api/${image}`
    //        })
    //   },[readymadeListData])
     
    console.log(readymadeListData)
  return (<>
  {isLoading && <BarLoader />}
{/* {dataViewStatus && 
    <CommonModal>
    {takeImage && readymadeListData.map((data,index)=>{
        return ( 
       <div className='w-full bg-[#ddf8f6] shadow-xl mb-6 relative'> 
       <button onClick={() => setDataViewStatus(false)} type="button" class="absolute top-3 right-10 text-white   rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  " >
        <svg class="w-5 h-5" fill="currentColor" ><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </button>
      {readymadeListData?.find( (item) =>  item?.pic_url == takeImage?.pic_url  )  ? 
                                  <img src={`${BackendUrl}/api/${takeImage?.pic_url}`} alt="img" className='w-[50vh] h-[50vh]' /> : null}</div>) 
    })}    
       
    </CommonModal>
} */}
			
            
            <div className="flex">
            {/* <button onClick={() => setToggler(!toggler)}>
				Open the lightbox.
			</button> */}
      {readymadeListData.map((image, index) =>{ 
       return (<>
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          onClick={() =>handleClick(index)}
          className='w-[10vh] h-[10vh] m-5'
        />
        
        </>
      )})}
    <FsLightbox toggler={toggler} sources={readymadeListData} sourceIndex={currentIndex}
        type="image"/>
     
    </div>
    
</>
  )
}
