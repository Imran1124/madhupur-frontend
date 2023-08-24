import React,{useState,useEffect} from 'react'
import Book from "../../assets/book.webp"
import ApiHeader from '../../Components/ApiList/ApiHeader2';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { TextField, InputAdornment } from '@mui/material';
import BackendUrl from '../../Components/ApiList/BackendUrl';
import BarLoader from '../../Components/Common/BarLoader';

export default function vieweImage() {
  const navigate=useNavigate()
  const [isLoading, setisLoading] = useState(false);
  const [blockToast, setBlockToast] = useState(false);
  const [number, setNumber] = useState(1);
  const [postperpage, setPostperpage] = useState(10);
  const [lastPage, setlastPage] = useState();
  const [lastdata, setlastData] = useState();
  const [searchTableData, setSearchTableData] = useState();
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [enable, setenable] = useState(false);
  const {
    api_retrieve_gallery,
    api_search_gallery
  } = ApiList();
  console.log(lastdata);
  const lastpost = number * postperpage;
  const currentpost = readymadeListData;
  console.log(readymadeListData);
  // const npages = Math.ceil(readymadeListData?.length );
  const pageNumber = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= lastdata; i++) {
    pageNumber.push(i);
  }
  const ChangePage = (pageNumber) => {
    setBlockToast(true);
    setPostperpage(parseInt(pageNumber));
  };
  const prevPage = (number) => {
    setNumber(number - 1);
  };
  const nextPage = (number) => {
    setNumber(number + 1);
  };
  useEffect(() => {
    if (number && blockToast) {
      fetchMasterList();
    }
  }, [number, blockToast]);

  useEffect(() => {
    if (postperpage && blockToast) {
      fetchMasterList();
    }
  }, [postperpage, blockToast]);


  useEffect(()=>{
fetchMasterList()
  },[])
  const fetchMasterList = (values) => {
    console.log("initialvalue",values,postperpage,number);
    let url;
    let requestBody;

    if (values === undefined) {
      requestBody = { perPage: postperpage, page: number };
      url = api_retrieve_gallery;
    } else {
      requestBody = {
        search: values
      };
      url = api_search_gallery;
    }
    setisLoading(true);
    AxiosInterceptors.post(url, requestBody, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          if (response?.data?.data?.total === 0) {
            toast.error(`Data not Found`);
            setreadymadeListData(response?.data?.data?.data);
            setlastPage(response?.data?.data?.last_page);
            setlastData(response?.data?.data?.total);
            setBlockToast(false);
          } else {
            console.log('exam term data', response?.data?.data?.data);
            setreadymadeListData(response?.data?.data?.data);
            setlastPage(response?.data?.data?.last_page);
            setlastData(response?.data?.data?.total);
            setBlockToast(false);
          }
        } else {
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
console.log("hello",readymadeListData)
  return (
    <div>
       {isLoading && <BarLoader />}
        <div classNameName='p-6 h-[76vh] '>
            <h1 className=' text-[4vh] text-[#4338ca] font-bold '>View Image Gallery</h1>
            <div className=" w-full px-[40%] flex items-center justify-end mt-2">
                            <TextField
                              id="search"
                              type="search"
                              label="Search"
                              size="small"
                              fullWidth
                              onChange={(e) => {
                                if (e.target.value === '') {
                                  fetchMasterList();
                                } else {
                                  setSearchTableData(e.target.value);
                                }
                              }}
                              onKeyDown={(e) =>
                                e.key === 'Enter' &&
                                fetchMasterList(searchTableData)
                              }
                              sx={{ width: '100%' }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment
                                    position="end"
                                    sx={{
                                      marginRight: '-14px'
                                    }}
                                  >
                                    <button
                                      onClick={() => {
                                        if (searchTableData === '') {
                                          fetchMasterList();
                                        } else {
                                          fetchMasterList(searchTableData);
                                        }
                                      }}
                                      className="bg-[#0F766E] w-14 max-[320px]:w-8 h-10 rounded-r-[5px] flex items-center justify-center text-white"
                                      type="submit"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        class="h-5 w-5 "
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                          clip-rule="evenodd"
                                        />
                                      </svg>
                                    </button>
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
            <div className="flex flex-wrap items-center justify-center mt-[1vh] h-[72vh] overflow-auto">
        {currentpost.map((data,index)=>(
        <div className="block w-[40vh] h-[40vh] m-[10px] rounded-[10px] shadow-lg">
          <div className="w-[40vh] h-[25vh] rounded-t-[10px]">
            <img src={`${BackendUrl}/api/${data?.cover_pic_docs}`} alt="pic1" className="h-[100%] w-[100%] rounded-t-[10px]" />
          </div>
          <div classNameName='w-full flex items-center justify-center px-5 '>
            <div className='flex mt-3 '> <div className='w-full ml-[5vh]'><h1 className="text-[3vh] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-black ">{data?.category}</h1></div></div>
            {/* <p className="cardparagraph">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              suscipit aspernatur fuga enim esse, itaque, iusto in dolor eius
              dignissimos excepturi necessitatibus debitis soluta ratione hic,
              inventore harum vel voluptas!
            </p> */}
            <button className='mt-2 text-white bg-gradient-to-r from-[yellow] to-[#0c0a09] font-bold px-12 py-2 rounded-[10px]' onClick={()=>navigate(`/show-galleryimage/${data.category}`)}>View Pic Collection</button>
          </div>
        </div>))}
        <div className="mt-3 w-full flex items-center justify-between px-10 my-2">
        <button type="submit" className="bg-white text-red-600 border-red-600 border px-8 py-2 rounded-lg hover:text-white text-[2vh] hover:bg-red-600" disabled={number===1} onClick={()=>prevPage(number)}>Previous</button>
                <button className="bg-white text-[#0F766E] border-[#0F766E] border px-8 py-2 rounded-lg hover:text-white text-[2vh] hover:bg-[#0F766E]" disabled={number===lastPage} onClick={()=>nextPage(number)} > Next</button>
                        </div>
      </div>
     
            </div>
    </div>
  )
}
