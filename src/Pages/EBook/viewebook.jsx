import React, { useEffect, useState } from "react";
import ApiHeader from "../../Components/ApiList/ApiHeader";
import ApiList from "../../Components/ApiList/ApiList";
import AxiosInterceptors from "../../Components/Common/AxiosInterceptors";
import BarLoader from "../../Components/Common/BarLoader";
import { nullToNA } from "../../Components/Common/PowerupFunctions";
import Book from "../../assets/book.webp";
import SecondBook from "../../assets/book2.jpg";
import Book3 from "../../assets/book3.webp";
import SecondBook4 from "../../assets/book4.jpg";
import { TextField, InputAdornment } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackendUrl from "../../Components/ApiList/BackendUrl";

export default function viewebook() {
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [blockToast, setBlockToast] = useState(false);
  // const [deactivateid, setdeactivateid] = useState(null);
  // const [readymadeListStatus, setreadymadeListStatus] = useState(true);
  // const [csvdata, setCsvdata] = useState([]);
  // const [enable, setenable] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  // const [erroState, seterroState] = useState(false);
  // const [erroMessage, seterroMessage] = useState(null);
  // const [currentId, setcurrentId] = useState(null);
  // const [deleteStatus, setdeleteStatus] = useState(false);
  // const [deletestatus, setDeleteStatus] = useState();
  const [number, setNumber] = useState(1);
  const [postperpage, setPostperpage] = useState(10);
  const [lastPage, setlastPage] = useState();
  const [lastdata, setlastData] = useState();
  const [searchTableData, setSearchTableData] = useState();
  const {
    api_getebookData,
    api_searchebookData,

    // api_getActivevehicleTypeData
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
    setPostperpage(parseInt(pageNumber));
  };
  const prevPage = (number) => {
    setNumber(number - 1);
  };
  const nextPage = (number) => {
    setNumber(number + 1);
  };
  useEffect(() => {
    fetchMasterList();
  }, []);

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

  const fetchMasterList = (values) => {
    console.log(values);
    let url;
    let requestBody;

    if (values === undefined) {
      requestBody = { perPage: postperpage, page: number };
      url = api_getebookData;
    } else {
      requestBody = {
        search: values,
        perPage: postperpage,
        page: number,
      };
      url = api_searchebookData;
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
            console.log("Class data", response?.data?.data?.data);
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
        toast.warning("Error occured while fetching data.");

        setisLoading(false);
      });
  };
  return (
    <div>
      <div classNameName="p-6 h-[76vh] ">
        <h1 className=" text-[4vh] text-[#4338ca] font-bold ">
          View Book Gallery
        </h1>
        <div className=" w-full px-[40%] flex items-center justify-end mt-2">
          <TextField
            id="search"
            type="search"
            label="Search"
            size="small"
            fullWidth
            onChange={(e) => {
              if (e.target.value === "") {
                fetchMasterList();
              } else {
                setSearchTableData(e.target.value);
              }
            }}
            onKeyDown={(e) =>
              e.key === "Enter" && fetchMasterList(searchTableData)
            }
            sx={{ width: "100%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    marginRight: "-14px",
                  }}
                >
                  <button
                    onClick={() => {
                      if (searchTableData === "") {
                        fetchMasterList();
                      } else {
                        fetchMasterList(searchTableData);
                      }
                    }}
                    className="bg-[#3b82f6] w-14 max-[320px]:w-8 h-10 rounded-r-[5px] flex items-center justify-center text-white"
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
              ),
            }}
          />
        </div>
        <div className="flex flex-wrap items-center justify-center mt-[1vh] h-[72vh] overflow-auto">
          {readymadeListData.map((data, index) => {
            return (
              <>
                <div className="block w-[40vh] h-[50vh] m-[10px] rounded-[10px] shadow-lg">
                  <div className="w-[40vh] h-[25vh] rounded-t-[10px]">
                    <img
                      src={`${BackendUrl}/api/${data?.cover_pic_docs}`}
                      alt="pic1"
                      className="h-[100%] w-[100%] rounded-t-[10px]"
                    />
                  </div>
                  <div classNameName="w-full flex items-center justify-between px-5 ">
                    <div className="flex mt-3">
                      {" "}
                      <div className="w-full text-left ml-[5vh]">
                        <h1 className="text-[3vh] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 ">
                          {data?.book_name}
                        </h1>
                      </div>
                    </div>
                    <div className="flex ">
                      {" "}
                      <div className="w-full text-left ml-[5vh]">
                        <h1 className="text-[2vh] text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-black ">
                          {data?.author_name}
                        </h1>
                      </div>
                    </div>
                    <div className="flex ">
                      {" "}
                      <div className="w-full text-left ml-[5vh]">
                        <h1 className="text-[2vh] text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-black ">
                          {data?.publish_by}
                        </h1>
                      </div>
                    </div>
                    <div className="flex ">
                      {" "}
                      <div className="w-full text-left ml-[5vh]">
                        <h1 className="text-[2vh] text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-black ">
                          $ {data?.price}
                        </h1>
                      </div>
                    </div>
                    {/* <p className="cardparagraph">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              suscipit aspernatur fuga enim esse, itaque, iusto in dolor eius
              dignissimos excepturi necessitatibus debitis soluta ratione hic,
              inventore harum vel voluptas!
            </p> */}
                    <button className="text-white bg-gradient-to-r from-[yellow] to-[#0c0a09] font-bold px-12 py-2 rounded-[10px]">
                      <a
                        href={`${BackendUrl}/api/${data?.ebook_docs}`}
                        target="_blank"
                      >
                        View
                      </a>
                    </button>
                  </div>
                </div>
              </>
            );
          })}
          <div className="mt-3 w-full flex items-center justify-between px-10 my-2">
            <button
              type="submit"
              className={
                (number === 1 ? "opacity-50" : "opacity-100") +
                "bg-white text-red-600 border-red-600 border px-8 py-2 rounded-lg hover:text-white text-[2vh] hover:bg-red-600"
              }
              onClick={() => prevPage(number)}
              disabled={number === 1}
            >
              Previous
            </button>
            <button
              className={
                (number === lastPage ? "opacity-50" : "opacity-100") +
                "bg-white text-indigo-600 border-indigo-600 border px-8 py-2 rounded-lg hover:text-white text-[2vh] hover:bg-indigo-600"
              }
              onClick={() => nextPage(number)}
              disabled={number === lastPage}
            >
              {" "}
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
