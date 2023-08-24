/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getemployeeUser } from "../../store/actions";
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
import EmployeeRoleModal from "../../Components/Modal/employeeroleModal";
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

export default function index() {
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
  useState(false);
  const confirmationtoogle = () =>
  setConfirmationDropdownopen(!confirmationDropdownopen);
  const [secondconfirmationDropdownopen, setsecondConfirmationDropdownopen] =
  useState(false);
  const secondconfirmationtoogle = () =>
  setsecondConfirmationDropdownopen(!secondconfirmationDropdownopen);
  console.log(currentId)
  const {
    api_addEmployeeData,
    api_editEmployeeData,
    api_deleteEmployeeData,
    api_getEmployeeData,
    api_getEmployeeDataById,
  } = ApiList();
  const componentPdf = useRef();
  const [post, setPost] = useState([]);
  const[roledata,setroleData]=useState([])
  const [number, setNumber] = useState(1);
  const [postperpage, setPostperpage] = useState(10);
  const getemployeeUser = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getEmployeeData, {}, ApiHeader())
      .then(function (response) {
        console.log("view Employee Data..", response?.data?.data);
        if (response?.data?.status === true) {
          setApidata(
            response?.data?.data
          );
          setPost(response?.data?.data);
        } else {
          activateBottomErrorCard(true, "Error occured while fetching data.");
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("==2 error list...", error);
        activateBottomErrorCard(true, "Error occured while fetching data.");

        setisLoading(false);
      });
  };

console.log(roledata)
  useEffect(() => {
    getemployeeUser();
  }, []);
  const lastpost = number * postperpage;
  const firstpost = lastpost - postperpage;
  const currentpost = post.slice(firstpost, lastpost);
  const npages = Math.ceil(post?.length / postperpage);
  const pageNumber = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= Math.ceil(post.length / postperpage); i++) {
    pageNumber.push(i);
  }
  // eslint-disable-next-line no-shadow
  const ChangePage = (pageNumber) => {
    setNumber(pageNumber);
  };
  const prevPage = () => {
    if (number !== 1) {
      setNumber(number - 1);
    }
  };
  const nextPage = () => {
    if (number !== npages) {
      setNumber(number + 1);
    }
  };
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
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };
console.log(apidata,post)
  return (
    <>
    
      {isLoading && <BarLoader />}
      {erroState && (
        <BottomErrorCard
          activateBottomErrorCard={activateBottomErrorCard}
          errorTitle={erroMessage}
        />
      )}
      {confirmationDropdownopen && (
            <EmployeeRoleModal
              isOpen={confirmationDropdownopen}
              toggle={confirmationtoogle}
              currentId={currentId}
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
                <h1 className="text-gray-600 flex justify-start text-sm w-full">
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
                  className="text-black text-[2.2vh] bg-[#fde047] font-bold py-[5px] px-[10px] rounded-[5px] h-[40px] w-[100px] flex items-center mr-2 justify-center "
                  onClick={() => {
                    secondconfirmationtoogle();
                  }}
                >
                  + ADD
                </button>
                {secondconfirmationDropdownopen && (
            <EmployeeModal
              isOpen={secondconfirmationDropdownopen}
              toggle={secondconfirmationtoogle}
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
                      <h1 className="font-bold text-gray-500">
                        List Of Employee
                      </h1>
                    </div>
                  </div>
                  <div className="items-center float-left  flex mr-4 max-[618px]:ml-4">
                    <div className="flex w-full mr-4">
                      <div className={`${table ? " text-[#4ade80]" : ""}`}>
                        <h1 onClick={() => setTable(true)}>
                          <a title="List View">
                            <img src={Table} alt="table" className="w-8 h-8" />
                          </a>
                        </h1>
                      </div>
                    </div>
                  
                  </div>
                  <input
                    placeholder="search..."
                    onChange={(e) => searchItems(e.target.value)}
                    className="ml-2 bg-white border border-[gainsboro] pl-[10px] rounded-[5px] h-10 max-[618px]:w-full"
                  />
                </div>
                <div className="ml-4 mb-4">
                  <hr className=" border-b-2" />
                </div>
                {table ? (
                  <>
                    <div className="w-full h-[60vh] block   ">
                      <table className="w-full mx-4 my-1   border-b border-b-gray overflow-auto max-[1000px]:w-[100vh] max-[1000px]:relative max-[1000px]:overflow-auto">
                        <thead className=" text-gray-600 bg-[#E7EFFC] text-[1.7vh] p-12 w-full border-b border-b-gray h-[6vh] ">
                          <tr className="py-2 pl-4 w-full flex items-start justify-start text-left">
                            <th className="w-[100%]"></th>
                            <th className="w-[100%]">Sl no.</th>
                            <th className="w-[100%] flex items-start justify-start">
                              Emp ID
                            </th>
                            <th className="w-[100%] flex items-start justify-start">
                              Full Name
                            </th>
                            <th className="w-[100%] flex items-start justify-start ">
                              Aadhar
                            </th>

                            <th className="w-[100%] flex items-start justify-start">
                              Mobile
                            </th>
                            <th className="w-[100%] flex items-start justify-start">
                              Email
                            </th>
                            <th className="w-[100%] flex items-center justify-center">Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchInput.length > 1
                            ? filteredResults &&
                              filteredResults.map((eachValue, index) => {
                                return (
                                  <>
                                    <tr className="py-2 pl-4 w-full text-[2vh] flex items-center justify-center text-[#696969] text-left verdana even:bg-gray-100">
                                      <td className="w-[100%] flex items-start justify-start text-[1.5vh]">
                                        {/* {nullToNA(index + 1)} */}
                                        <img src={Line} className="w-6 h-6" />
                                      </td>
                                      <td className="w-[100%] flex items-start justify-start  px-1">
                                      {nullToNA(
                                          (number - 1) * postperpage + index + 1
                                        )}
                                      </td>
                                      <td className="w-[100%] flex items-start justify-start  px-1">
                                        {nullToNA(eachValue.emp_no)}
                                      </td>
                                      <td className="w-[100%] flex items-start justify-start  px-1">
                                        {nullToNA(eachValue.full_name)}
                                      </td>
                                      <td className="w-[100%] flex items-start justify-start  px-1">
                                        {nullToNA(eachValue.aadhar_no)}
                                      </td>
                                      <td className="w-[100%] flex items-start justify-start  px-1">
                                        {nullToNA(eachValue.mobile)}
                                      </td>
                                      <td className="w-[100%] flex items-start justify-start  px-1">
                                        {eachValue.email}
                                      </td>

                                      <td className=" w-[100%] flex items-center center">
                                      <a title="Role">
                                          <img
                                            src={Edit}
                                            className="mr-2 text-indigo-600  hover:text-gray-500 w-6 h-6"
                                            onClick={() => {
                                              // setData(item.id);
                                              setcurrentId(eachValue.id)
                                              confirmationtoogle()
                                            }}
                                          />
                                        </a>
                                        
                                      </td>
                                    </tr>
                                  </>
                                );
                              })
                            : currentpost &&
                              currentpost.map((item, index) => {
                                return (
                                  <>
                                    <tr className="py-2 pl-4 w-full text-[2vh] flex items-center justify-center text-[#696969] text-left verdana even:bg-gray-100 border-b border-gray-b">
                                      <td className="w-[100%] flex items-start justify-start text-[2.2vh]">
                                        {/* {nullToNA(index + 1)} */}
                                        <img
                                          src={Line}
                                          className="w-6 h-6 hover:border-2 hover:border-[#4338ca]"
                                        />
                                      </td>
                                      <td className="w-[100%] flex items-start justify-start text-[2.2vh]  px-1">
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
                                        {nullToNA(item.aadhar_no)}
                                      </td>
                                      <td className="w-[100%] flex items-start justify-start  px-1">
                                        {nullToNA(item.mobile)}
                                      </td>
                                      <td className="w-[100%] flex items-start justify-start  px-1">
                                        {nullToNA(item.email)}
                                      </td>

                                      <td className=" w-[100%] flex items-center justify-center  ">
                                        <a title="Role">
                                          <img
                                            src={Edit}
                                            className="mr-2 text-indigo-600  hover:text-gray-500 w-6 h-6"
                                            onClick={() => {
                                              // setData(item.id);
                                              setcurrentId(item.id)
                                              confirmationtoogle()
                                            }}
                                          />
                                        </a>
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
                        </tbody>
                      </table>
                      <div className="flex justify-between mt-10 ">
                        <div className="ml-10">
                          {" "}
                          Page {number} to {npages}{" "}
                        </div>
                        <div className="flex float-right">
                          <img
                            src={Left}
                            className={
                              number === 1
                                ? "opacity-50 mr-2"
                                : "opacity-100 mr-2"
                            }
                            onClick={prevPage}
                          />
                          <img
                            src={Right}
                            onClick={nextPage}
                            className={
                              number === npages ? "opacity-50" : "opacity-100"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
