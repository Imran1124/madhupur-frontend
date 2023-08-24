/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getemployeeUser } from "../../store/actions";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { MdEditSquare } from "react-icons/md";
import { TfiViewGrid } from "react-icons/tfi";
import {
  RiDeleteBinFill,
  RiLogoutBoxRFill,
  RiLockPasswordFill,
} from "react-icons/ri";
import { AiTwotoneEye, AiOutlineUnorderedList } from "react-icons/ai";
import { CSVDownload } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import EmployeeModal from "../../Components/Modal/employeeModal";
import { useNavigate } from "react-router";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { SiMicrosoftexcel } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import ApiHeader from "../../Components/ApiList/ApiHeader";
import ApiList from "../../Components/ApiList/ApiList";
import AxiosInterceptors from "../../Components/Common/AxiosInterceptors";
import BarLoader from "../../Components/Common/BarLoader";
import { nullToNA } from "../../Components/Common/PowerupFunctions";
import BottomErrorCard from "../../Components/Common/BottomErrorCard";
import Delete from "../../assets/delete.png";
import Eye from "../../assets/image 40.png";
import Edit from "../../assets/edit.png";
import Line from "../../assets/image 37.png";
import Table from "../../assets/image 43.png";
import Card from "../../assets/image 44.png";
import Pdf from "../../assets/image 45.png";
import Excel from "../../assets/image 46.png";
import Right from "../../assets/right.png";
import Left from "../../assets/left.png";
import Pagination from '../../Components/Common/Pagination';


export default function view() {
  const navigate = useNavigate();
  const [apidata, setApidata] = useState();
  const [table, setTable] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [enable, setenable] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [currentId, setcurrentId] = useState(null);
  const [deleteStatus, setdeleteStatus] = useState(false);
  const [confirmationDropdownopen, setConfirmationDropdownopen] =
  useState(true);
  const confirmationtoogle = () =>
  setConfirmationDropdownopen(!confirmationDropdownopen);
  const {
    api_addEmployeeData,
    api_editEmployeeData,
    api_deleteEmployeeData,
    api_getEmployeeData,
    api_getEmployeeDataById,
    api_searchEmployeeByIdList
  } = ApiList();
  const componentPdf = useRef();
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [lastPage, setlastPage] = useState();
  const [lastdata, setlastData] = useState();
  const[search,setsearch]=useState();
  const [post, setPost] = useState([]);
  const [number, setNumber] = useState(1);
  const [postperpage, setPostperpage] = useState(10);
  const getemployeeUser = (values = null) => {
    setisLoading(true);
    let url;
    let requestBody;

    if (values === null) {
      requestBody = {perPage: postperpage, page: number};
      url = api_getEmployeeData;
    } else {
      requestBody = {
        search: search,
        // perPage: postperpage, page: number,
      };
      url = api_searchEmployeeByIdList;
    }
    AxiosInterceptors.post(url, requestBody, ApiHeader())
    .then(function (response) {
      if (response?.data?.status === true) {
        if (response?.data?.data?.total === 0) {
          toast.error(`Data not Found`);
          setreadymadeListData(response?.data?.data?.data);
          setlastPage(response?.data?.data?.last_page);
          setlastData(response?.data?.data?.total);
        } else {
          console.log('exam term data', response?.data?.data?.data);
          setreadymadeListData(response?.data?.data?.data);
          setlastPage(response?.data?.data?.last_page);
          setlastData(response?.data?.data?.total);
        }
      } else {
        // activateBottomErrorCard(true, `${response?.data?.message}`);
        toast.error(`${response?.data?.message}`);
      }
      setisLoading(false);
    })
    .catch(function (error) {
      console.log("==2 error list...", error);
      activateBottomErrorCard(true, "Error occured while fetching data.");

      
    });
  };

  useEffect(() => {
    getemployeeUser();
  }, []);
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
    getemployeeUser();
  }, [number]);
  useEffect(() => {
    getemployeeUser();
  }, [postperpage]);
  const column = [
    { title: "Emp No", feild: "empNo" },
    { title: "Name", feild: "full_name" },
    { title: "Gender", feild: "gender_name" },
    { title: "Category", feild: "category_name" },
    { title: "DOB", feild: "dob" },
    { title: "DOJ", feild: "doj" },
    { title: "Mobile", feild: "mobile" },
    { title: "Email", feild: "email" },
    { title: "Blood Group", feild: "blood_group_name" },
    { title: "Department", feild: "department_name" },
  ];
  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text("Employee Details", 10, 10);
    doc.autoTable({
      theme: "grid",
      columns: column.map((col) => ({ ...col, dataKey: col.feild })),
      body: apidata,
    }),
      doc.save("employee.pdf");
  };
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = apidata.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(apidata);
    }
  };
  const handleView = (values) => {
    localStorage.setItem("empNo", values);
    navigate("/viewstep-form");
  };
  const handleDelete = (id,statues) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure to delete?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        deleteItem(id,statues);
      }
    });
    const deleteItem = (id,statues) => {
      setisLoading(true);
      setdeleteStatus(false);

      let requestBody = {
        id: id,
        status: statues==="Active" ? "deactive" : "active",
      };

      AxiosInterceptors.post(api_deleteEmployeeData, requestBody, ApiHeader())
        .then(function (response) {
          console.log("delete response..", response?.data?.data);
          if (response?.data?.status === true) {
            getemployeeUser();
          } else {
            activateBottomErrorCard(true, "Error occured in deletion.");
          }
          setisLoading(false);
        })
        .catch(function (error) {
          console.log("==delete error...", error);
          activateBottomErrorCard(true, "Error occured in deletion.");
          setisLoading(false);
        });
    };
  };
  // const setData = (values) => {
  //   localStorage.setItem("EMP_NO", values);
  // };
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };

  return (
    <>
      {isLoading && <BarLoader />}
      {erroState && (
        <BottomErrorCard
          activateBottomErrorCard={activateBottomErrorCard}
          errorTitle={erroMessage}
        />
      )}
      <div className="bg-white h-[80vh] overflow-auto  flex  justify-center">
        <div className="block w-full mx-[10px]">
          <div className="flex  max-[694px]:block">
            <div className="flex w-full items-start justify-start ml-5 mt-5">
              <div className="block w-full">
                <h1 className="text-4xl font-semibold text-gray-700 flex justify-start w-full ">
                  Employee List
                </h1>
                <h1 className="text-teal-600 flex justify-start text-sm w-full">
                  Unlock Your Potential. Join Our Journey Of Education And
                  Excellence
                </h1>
              </div>
            </div>
            <div className="flex items-end justify-end w-full">
              <a title="Add Employees">
                {" "}
                <button
                  type="submit"
                  className="text-white text-[2.2vh] bg-[#0F766E] font-bold py-[5px] px-[10px] rounded-[5px] h-[40px] w-[100px] flex items-center mr-2 justify-center "
                  onClick={() => {
                    confirmationtoogle();
                  }}
                >
                  + ADD
                </button>
                {confirmationDropdownopen && (
            <EmployeeModal
              isOpen={confirmationDropdownopen}
              toggle={confirmationtoogle}
              Link={"/employee/view"}
            />
          )}
              </a>
            </div>
          </div>
          <div className="flex float-right mt-2">
            <a title="Download CSV">
              <img
                src={Excel}
                onClick={() => setenable(!enable)}
                className="  font-bold  mr-4 w-17 h-17 "
              />
            </a>

            {enable && <CSVDownload data={apidata} target="_blank" />}
            <a title="Download PDF">
              <img
                src={Pdf}
                className="  font-bold  w-17 h-17"
                onClick={generatePdf}
              />
            </a>
          </div>
          <div className="block  py-2">
            <div className="w-auto mt-[10vh] h-[70vh] overflow-y-auto overflow-x-hidden flex pt-[3vh]  pr-[3vh] bg-white max-[1024px]:overflow-auto  max-[768px]:w-[95%] max-[425px]:overflow-auto mr-2">
              <div className="block w-full mt-[-20px]">
                <div className="flex items-center text-[2.4vh] justify-end mr-4 mb-[10px] max-[918px]:block">
                  <div className="float-left w-full flex ml-4 max-[918px]:ml-0">
                    <div className="ml-5">
                      {" "}
                      <h1 className="font-bold text-[#0F766E]">
                        List Of Employee
                      </h1>
                    </div>
                  </div>
                  <div className="items-center float-left  flex mr-4 max-[618px]:ml-4">
                    <div className="flex w-full mr-4">
                      <div className={`${table ? " text-[#0F766E]" : ""}`}>
                        <h1 onClick={() => setTable(true)}>
                          <a title="List View">
                            <img src={Table} alt="table" className="w-8 h-8" />
                          </a>
                        </h1>
                      </div>
                    </div>
                    <div className="flex w-full">
                      <div className={`${!table ? " text-[#0F766E]" : ""}`}>
                        {" "}
                        <h2 onClick={() => setTable(false)}>
                          <a title="Card View">
                            <img src={Card} alt="card" className="w-14 h-10" />
                          </a>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <input
                      type="search"
                      placeholder="Search..."
                      name="search"
                      onKeyUp={(e)=>setsearch(e.target.value)}
                      className="bg-[#F2F4F4] h-10 pl-4 "
                    />
                    <button
                      className="bg-[#0F766E] w-14 max-[320px]:w-8 h-10 rounded-r-[5px] flex items-center justify-center text-white"
                      type="search" onClick={()=>getemployeeUser(search)}
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
                </div>
                <div className="ml-4 mb-4">
                  <hr className=" border-b-2" />
                </div>
                {table ? (
                  <>
                    <div className="w-full h-[60vh] block   ">
                    <table className="w-full mx-4 my-1   border-b border-b-gray overflow-auto max-[1000px]:w-[100vh] max-[1000px]:relative max-[1000px]:overflow-auto">
                        <thead className=" text-white bg-[#0F766E] text-[1.7vh] p-12 w-full border-b border-b-gray h-[6vh] ">
                          <tr className="py-2 pl-4 w-full flex items-start justify-start text-left">
                            
                            <th className="w-[50vh]">Sl No.</th>
                            <th className="w-[100%] flex items-start justify-start">
                              Emp ID
                            </th>
                            <th className="w-[100%] flex items-start justify-start">
                              Full Name
                            </th>
                            <th className="w-[100%] flex items-start justify-start">
                              Gender
                            </th>
                            {/* <th className="w-[100%] flex items-start justify-start">
                              Category
                            </th> */}
                            <th className="w-[100%] flex items-start justify-start ">
                              Department
                            </th>
                            <th className="w-[100%] flex items-start justify-start ">
                              Blood Group
                            </th>
                            {/* <th className="w-[100%] flex items-start justify-start">
                              DOB
                            </th>
                            <th className="w-[100%] flex items-start justify-start">
                              DOJ
                            </th> */}
                            <th className="w-[100%] flex items-start justify-start">
                              Mobile
                            </th>
                            <th className="w-[100%] flex items-start justify-start">
                              Email
                            </th>
                            <th  className="w-[100%] flex items-start justify-start">Status</th>
                            <th className="w-[100%] flex items-center justify-center pr-1 mr-[2vh]">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          { currentpost &&
                              currentpost.map((item, index) => {
                                return (
                                  <>
                                    <tr className="py-2 pl-4 w-full text-[1.6vh] flex items-center justify-center text-[#696969] text-left verdana even:bg-gray-100 border-b border-gray-b">
                                     
                                      <td className="w-[50vh] flex items-start justify-start text-[2.2vh]  px-1">
                                        {nullToNA(
                                          (number - 1) * postperpage + index + 1
                                        )}
                                      </td>
                                      <td className="w-[100%] flex items-start justify-start  px-1">
                                        {nullToNA(item.emp_no)}
                                      </td>
                                      <td className="w-[100%] flex items-start justify-start  px-1">
                                        {nullToNA(item.full_name)}
                                      </td>
                                      <td className="w-[100%] flex items-start justify-start  px-1">
                                        {nullToNA(item.gender_name)}
                                      </td>
                                      {/* <td className="w-[100%] flex items-start justify-start  px-1">
                                        {nullToNA(item.category_name)}
                                      </td> */}
                                      <td className="w-[100%] flex items-start justify-start  px-1">
                                        {nullToNA(item.department_name)}
                                      </td>
                                      <td className="w-[100%] flex items-start justify-start  px-1">
                                        {nullToNA(item.blood_group_name)}
                                      </td>
                                      {/* <td className="w-[100%] flex items-start justify-start  px-1">
                                        {nullToNA(item.dob)}
                                      </td>
                                      <td className="w-[100%] flex items-start justify-start  px-1">
                                        {nullToNA(item.doj)}
                                      </td> */}
                                      <td className="w-[100%] flex items-start justify-start  px-1">
                                        {nullToNA(item.mobile)}
                                      </td>
                                      <td className="w-[100%] flex items-start justify-start  px-1">
                                        {nullToNA(item.email)}
                                      </td>
                                      <td className= "w-[100%] flex items-start justify-start px-1">
                                     <span
                                          className={`text-xs font-semibold inline-block py-1 px-2 rounded ${
                                            item.status == 'Active'
                                              ? 'text-green-600 bg-green-200'
                                              : 'text-red-600 bg-red-200'
                                          }  last:mr-0 `}
                                        > {nullToNA(item?.status)}</span>
                                     </td>
                                      <td className=" w-[100%] flex items-end justify-end pr-1 mr-[2vh] ">
                                        <a title="Edit">
                                          <img
                                            src={Edit}
                                            className="mr-2 text-indigo-600  hover:text-gray-500 w-6 h-6"
                                            onClick={() => {
                                              // setData(item.id);
                                              Swal.fire({
                                                icon: "warning",
                                                title: "Are you sure?",
                                                text: "You want to update it!",
                                                showCancelButton: true,
                                                confirmButtonText:
                                                  "Yes, update it!",
                                                cancelButtonText: "No, cancel!",
                                              }).then((result) => {
                                                if (result.value) {
                                                  navigate(
                                                    `/second-editemployee/${item.id}`
                                                  );
                                                }
                                              });
                                            }}
                                          />
                                        </a>
                                        <a title="Delete">
                                          <img
                                            src={Delete}
                                            className=" text-red-600 hover:text-gray-500 mr-2 w-6 h-6"
                                            onClick={() =>
                                              handleDelete(item.id,item.status)
                                            }
                                          />
                                        </a>
                                        <a title="View">
                                          <img
                                            src={Eye}
                                            className="text-[#06b6d4] hover:text-gray-500 w-6 h-6"
                                            onClick={() =>
                                              // handleView(item.id)
                                              navigate(
                                                `/viewstep-form/${item.id}`
                                              )
                                            }
                                          />
                                        </a>
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
                        </tbody>
                      </table>
                      <Pagination ChangePage={ChangePage} number={number} lastPage={lastPage} nextPage={nextPage} prevPage={prevPage} postperpage={postperpage}/>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="block">
                      <div className="w-full h-auto mx-4 inline-grid grid-cols-5 gap-1 ">
                        { currentpost &&
                            currentpost.map((item, index) => {
                              return (
                                <>
                                  <div className=" w-full my-2  border  h-auto block border-gray-100 shadow-md  rounded-[5px] bg-white">
                                    <div className="my-2 h-[15vh] flex items-center justify-center w-full">
                                      <img
                                        src={item.upload_images}
                                        alt="Generic placeholder image"
                                        className="w-[150px] height-[150px] rounded-full "
                                      />
                                    </div>
                                    <div className="block items-center justify-center w-full">
                                      <h1 className="font-bold">
                                        {nullToNA(item.full_name)}
                                      </h1>
                                      <h1>{nullToNA(item.email)}</h1>
                                      <h1>{nullToNA(item.dob)}</h1>
                                    </div>
                                    <div className="flex w-full ">
                                      <button
                                        className="text-[2vh] max-[1260px]:px-1 max-[840px]:mx-1 w-full py-[5px] px-[25px]  border  mx-[8px] mt-[20px] mb-[10px] text-indigo-600 border-indigo-600 bg-white hover:border-[gainsboro] hover:text-gray-500"
                                        onClick={() => {
                                          // setData(item.id);
                                          Swal.fire({
                                            icon: "warning",
                                            title: "Are you sure?",
                                            text: "You want to update it!",
                                            showCancelButton: true,
                                            confirmButtonText:
                                              "Yes, update it!",
                                            cancelButtonText: "No, cancel!",
                                          }).then((result) => {
                                            if (result.value) {
                                              navigate(
                                                `/second-editemployee/${item.id}`
                                              );
                                            }
                                          });
                                        }}
                                      >
                                        EDIT
                                      </button>
                                      <button
                                        className="text-[2vh] max-[1260px]:px-1 max-[840px]:mx-1 w-full  border py-[5px] px-[25px]  mx-[8px] mt-[20px] mb-[10px] text-[#22d3ee] border-[#22d3ee] bg-white hover:border-[gainsboro] hover:text-gray-500"
                                        onClick={() =>
                                          // handleView(item.id)
                                          navigate(`/viewstep-form/${item.id}`)
                                        }
                                      >
                                        VIEW
                                      </button>{" "}
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                      </div>
                      <Pagination ChangePage={ChangePage} number={number} lastPage={lastPage} nextPage={nextPage} prevPage={prevPage} postperpage={postperpage}/>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
