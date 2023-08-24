/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from 'react';
import Page from '../../../components/Page';
import BreadCrumbsMain from '../../../components/Breadcrumb';
import { ApiList,axiosInstance } from '../../../utils';
import { BsFiletypePdf } from 'react-icons/bs';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

const View = () => {
 const {api_retrievestudent} = ApiList
  const[data,setData]=useState([])
  const [number, setNumber] = useState(1);
  const [postperpage, setPostperpage] = useState(10);
  const [lastPage, setlastPage] = useState();
  const [lastdata, setlastData] = useState();
  


  //pagination
  const lastpost = number * postperpage;
  const currentpost = data;
  // const npages = Math.ceil(data?.length / postperpage);
  const pageNumber = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= lastdata; i++) {
    pageNumber?.push(i);
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
  }, [number]);
  useEffect(() => {
    fetchMasterList();
  }, [postperpage]);

  const fetchMasterList=async()=>{
    try {
      const response = await axiosInstance.post(`${api_retrievestudent}`, { "perPage": postperpage, "page": number });
      console.log(response.data);
      if (response.status == 200) {
        if (response?.data?.data?.total === 0) {
          toast.error(`Data not Found`);
          setData(response?.data?.data?.data);
          setlastPage(response?.data?.data?.last_page);
          setlastData(response?.data?.data?.total);
        } else {
          console.log('exam term data', response?.data?.data?.data);
          setData(response?.data?.data?.data);
          setlastPage(response?.data?.data?.last_page);
          setlastData(response?.data?.data?.total);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
    //fetch Data
    useEffect(() => {
      fetchMasterList();
    }, []);
  //pdf download
  // const column = [
  //   { title: ' Full Name', feild: 'full_name' },
  //   { title: 'Admission No  ', feild: 'admission_no' },
  //   { title: 'Financial Year', feild: 'financial_year' },
  //   { title: 'Admission Date', feild: 'admission_date' },
  //   { title: ' Class', feild: 'class_name' },
  //   { title: 'Section  ', feild: 'section_name' },
  //   { title: 'Status', feild: 'status' },
  //   { title: 'Gender', feild: 'gender_name' },
  //   { title: ' Category', feild: 'category_name' },
  //   { title: 'Special Ability', feild: 'disability' },
  //   { title: 'Parent/Staff Quota', feild: 'is_parent_staff' }
  // ];
  // const generatePdf = () => {
  //   const doc = new jsPDF();
  //   doc.text('Student Details', 10, 10);
  //   doc.autoTable({
  //     theme: 'grid',
  //     columns: column.map((col) => ({ ...col, dataKey: col.feild })),
  //     body: readymadeListData
  //   }),
  //     doc.save('Student.pdf');
  // };
  return (
    <div className='bg-white'>
      <Page title="Student" pageName="Student">
        <BreadCrumbsMain
          list={[
            { title: 'Home', path: '/csms/home' },
            { title: 'Student', path: '/csms/student' },
            {
              title: 'Student View',
              path: '/csms/student/view'
            }
          ]}
        />
        {/* <h1 className="uppercase tracking-widest font-bold text-2xl mt-7 ml-6 text-center">
        view student list
      </h1> */}
     {/* <div className="text-red-700 cursor-pointer flex items-center justify-end px-5 w-full">
                          <BsFiletypePdf onClick={generatePdf} />
                        </div> */}
        <div className="relative overflow-x-auto w-[95%] shadow-md mt-[2vh] ml-[2vw] sm:rounded-lg">
          <table className="w-full text-sm text-left " id="myTable">
            <thead className="text-md ">
              <tr className="text-white bg-[#0F766E]">
                <th scope="col" className=" py-5  text-center ">
                  Sl No.
                </th>
                <th scope="col" className=" py-5  text-center ">
                  Full Name
                </th>
                <th scope="col" className=" py-5  text-center">
                  Admission No
                </th>
                <th scope="col" className=" py-5  text-center">
                  Financial Year
                </th>
                <th scope="col" className=" py-5  text-center">
                  Admission Date
                </th>
                <th scope="col" className=" py-5  text-center">
                  Class
                </th>
                <th scope="col" className=" py-5  text-center">
                  Section
                </th>
                <th scope="col" className=" py-5  text-center">
                  Status
                </th>
                <th scope="col" className=" py-5  text-center">
                  Gender
                </th>
                <th scope="col" className=" py-5  text-center">
                  Category
                </th>
                <th scope="col" className=" py-5  text-center">
                  Special Ability
                </th>
                <th scope="col" className=" py-5  text-center">
                  Parent/Staff Quota
                </th>
              </tr>
            </thead>
            {currentpost.map((eachData,index) => {
                      return (
                        <> 
            <tbody>
              <tr className="bg-white border-b  hover:bg-slate-100 ">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap  text-center"
                >
                { (number - 1) * postperpage + index + 1}
                </td>
                <td className="px-6 py-4 text-center">{eachData?.full_name}</td>
                <td className="px-6 py-4 text-center">{eachData?.admission_no}</td>
                <td className="px-6 py-4 text-center">{eachData?.financial_year}</td>
                <td className="px-6 py-4 text-center">{eachData?.admission_date}</td>
                <td className="px-6 py-4 text-center">{eachData?.class_name}</td>
                <td className="px-6 py-4 text-center">{eachData?.section}</td>
                <td className="px-6 py-4 text-center">{eachData?.status}</td>
                <td className="px-6 py-4 text-center">{eachData?.gender_name}</td>
                <td className="px-6 py-4 text-center">{eachData?.category_name}</td>
                <td className="px-6 py-4 text-center">{eachData?.disability}</td>
                <td className="px-6 py-4 text-center">{eachData?.is_parent_staff}</td>
              </tr>
              
            </tbody>
             </>
                      );
                    })} 
                    
          </table>
          <div className="flex p-4  w-full">
                          <div className="flex items-start justify-start w-full ">
                            {' '}
                            <select
                              className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[calc(1/2)] p-2.5 "
                              value={postperpage}
                              onChange={(e) => ChangePage(e.target.value)}
                            >
                              {[5, 10, 25, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                  show {pageSize}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex items-center justify-center w-full">
                            {' '}
                            <span>
                              Page {''}
                              <strong>
                                {number} of {lastPage}
                              </strong>
                              {''}
                            </span>
                          </div>

                          <div className="flex items-center justify-end w-full">
                            {/* <button
                className="cursor-pointer hover:bg-sky-300 p-2 hover:text-white"
                onClick={() => gotoPage(0)}
                // disabled={!canPreviousPage}
              >
                <AiOutlineDoubleLeft />{" "}
              </button> */}
                            <button
                              className={
                                (number === 1 ? 'opacity-50' : 'opacity-100') +
                                ' text-xl hover:bg-sky-300 hover:text-white'
                              }
                              onClick={() => prevPage(number)}
                              disabled={number === 1}
                            >
                              ⬅️
                            </button>
                            <button
                              className={
                                (number === lastPage
                                  ? 'opacity-50'
                                  : 'opacity-100') +
                                ' text-xl hover:bg-sky-300 hover:text-white'
                              }
                              onClick={() => nextPage(number)}
                              disabled={number === lastPage}
                            >
                              ➡️
                            </button>
                            {/* <button
                className="cursor-pointer hover:bg-sky-300 p-2 hover:text-white"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {" "}
                <AiOutlineDoubleRight />
              </button> */}
                          </div>
                        </div>
        </div>
      </Page>
    </div>
  );
};

export default View;