/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import CountUp from 'react-countup';
import Chart from 'react-apexcharts';
import { GiTeacher } from 'react-icons/gi';
import { FaUserGraduate, FaBus, FaBook } from 'react-icons/fa';
import { SiGoogleclassroom } from 'react-icons/si';
import { IoMdBusiness } from 'react-icons/io';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import activateBottomErrorCard from '../../Components/Common/BottomErrorCard';
import BarLoader from '../../Components/Common/BarLoader';
import { MotionContainer, varFade, varFlip } from '../../Components/animate';

function Demo() {
  const [isLoading, setisLoading] = React.useState(false);
  const {
    api_addEmployeeData,
    api_getdepartmentData,
    api_getClassData,
    api_getEmployeeData,
    api_retrieve_all_student,
    api_getvehicleData
  } = ApiList();

  const [totalEmployee, setTotalEmployee] = React.useState(0);
  const [totalStudent, setTotalStudent] = React.useState(0);
  const [totalClass, setTotalClass] = React.useState(0);
  const [totalDepartment, setDepartment] = React.useState(0);
  const [totalVehicle, setVehicle] = React.useState(0);
  const options = {
    title: {
      text: 'School Management System',
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        fontFamily: undefined,
        color: '#263238'
      }
    },
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: [2020, 2021, 2022, 2023]
    }
  };
  const series = [
    {
      name: 'student',
      data: [30, 40, 45, 50]
    }
  ];

  const getemployeeUser = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getEmployeeData, {}, ApiHeader())
      .then(function (response) {
        console.log('view Employee Data..', response?.data?.data);
        if (response?.data?.status === true) {
          setTotalEmployee(response?.data?.data?.length);
        } else {
          activateBottomErrorCard(true, 'Error occured while fetching data.');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.');

        setisLoading(false);
      });
  };

  // student
  const getStudent = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_retrieve_all_student, {}, ApiHeader())
      .then(function (response) {
        console.log('view Employee Data..', response?.data?.data);
        if (response?.data?.status === true) {
          setTotalStudent(response?.data?.data?.length);
        } else {
          activateBottomErrorCard(true, 'Error occured while fetching data.');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.');

        setisLoading(false);
      });
  };

  // class data
  const fetchClassMaster = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getClassData, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setTotalClass(response?.data?.data?.length);
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        activateBottomErrorCard(true, 'Error occured while fetching data.');

        setisLoading(false);
      });
  };

  // department
  const fetchDepartmentList = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getdepartmentData, {}, ApiHeader())
      .then(function (response) {
        console.log('view department master..', response?.data?.data);
        if (response?.data?.status) {
          setDepartment(response?.data?.data?.length);
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.');

        setisLoading(false);
      });
  };

  // no of vehicle
  const fetchVehicleMaster = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getvehicleData, {}, ApiHeader())
      .then(function (response) {
        console.log('view vehicle master..', response?.data?.data);
        if (response?.data?.status) {
          setVehicle(response?.data?.data?.length);
        } else {
          activateBottomErrorCard(true, `${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);
        activateBottomErrorCard(true, 'Error occured while fetching data.');

        setisLoading(false);
      });
  };

  useEffect(() => {
    getemployeeUser();
    getStudent();
    fetchClassMaster();
    fetchDepartmentList();
    fetchVehicleMaster();
  }, []);

  return (
    <>
      {isLoading && <BarLoader />}
      {/*create dashboard card  */}
      <div className={`w-full col-span-10 2xl:py-3 2xl:px-4 px-4 py-2`}>
        <div className="border-[2px] border-gray-200 rounded-md h-[80vh] 2xl:p-6 p-4 overflow-y-auto">
          <div className="flex w-full justify-between items-center max-[870px]:block">
            <div className="flex flex-col">
              <span className="text-3xl font-semibold text-gray-600 flex flex-start">
                Dashboard
              </span>
              <span className="text-sm font-medium text-gray-400">
                Unlock Your Potential. Join Our Journey Of Education And
                Excellence
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            <div>
              <MotionContainer variants={varFade().inLeft}>
                <div
                  className={`bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-600 rounded-lg shadow-xl p-12`}
                >
                  <div className="flex flex-row items-center">
                    <div className="flex-shrink ">
                      <div className={`rounded-full p-5 bg-blue-300`}>
                        {/*  */}

                        <FaUserGraduate
                          className={`items-center w-8 h-8 m-auto text-blue-500 hover:text-blue-600`}
                        />
                      </div>
                    </div>
                    <div className="flex-1 text-end">
                      <h2 className="font-bold  text-blue-600">
                        Total Students
                      </h2>
                      <p className="font-bold text-3xl text-blue-600">
                        <CountUp
                          start={0}
                          end={totalStudent !== 0 ? totalStudent : 0}
                        />
                        <span className={`text-blue-500`}>
                          <i className="fas fa-caret-up" />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </MotionContainer>
            </div>

            {/* student */}
            <div>
              <MotionContainer variants={varFade().inLeft}>
                <div
                  className={`bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-red-600 rounded-lg shadow-xl p-12`}
                >
                  <div className="flex flex-row items-center">
                    <div className="flex-shrink pr-4">
                      <div className={`rounded-full p-5 bg-red-300`}>
                        <GiTeacher className={`w-8 h-8 m-auto text-red-500`} />
                      </div>
                    </div>
                    <div className="flex-1 text-end">
                      <h2 className="font-bold  text-red-600">
                        Total Teachers
                      </h2>
                      <p className="font-bold text-3xl text-red-600">
                        <CountUp
                          start={0}
                          end={totalEmployee !== 0 ? totalEmployee : 0}
                        />
                        <span className={`text-red-500`}>
                          <i className="fas fa-caret-up" />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </MotionContainer>
            </div>
            <div>
              <MotionContainer variants={varFade().inRight}>
                <div
                  className={`bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-12`}
                >
                  <div className="flex flex-row items-center">
                    <div className="flex-shrink pr-4">
                      <div className={`rounded-full p-5 bg-green-300`}>
                        <SiGoogleclassroom
                          className={`w-8 h-8 m-auto text-green-500`}
                        />
                      </div>
                    </div>
                    <div className="flex-1 text-end">
                      <h2 className="font-bold  text-green-600">
                        Total Classes
                      </h2>
                      <p className="font-bold text-3xl text-green-600">
                        <CountUp
                          start={0}
                          end={totalClass !== 0 ? totalClass : 0}
                        />
                        <span className={`text-green-500`}>
                          <i className="fas fa-caret-up" />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </MotionContainer>
            </div>
            {/* total teachers */}
            <div>
              <MotionContainer variants={varFade().inRight}>
                <div
                  className={`bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-600 rounded-lg shadow-xl p-12`}
                >
                  <div className="flex flex-row items-center">
                    <div className="flex-shrink pr-4">
                      <div className={`rounded-full p-5 bg-blue-300`}>
                        <IoMdBusiness
                          className={`items-center w-8 h-8 m-auto text-blue-500 hover:text-blue-600`}
                        />
                      </div>
                    </div>
                    <div className="flex-1 text-end">
                      <h2 className="font-semibold  text-blue-600">
                        Total Department
                      </h2>
                      <p className="font-bold text-3xl text-blue-600">
                        <CountUp
                          start={0}
                          end={totalDepartment !== 0 ? totalDepartment : 0}
                        />
                        <span className={`text-blue-500`}>
                          <i className="fas fa-caret-up" />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </MotionContainer>
            </div>
            <div>
              <MotionContainer variants={varFade().inUp}>
                <div
                  className={`bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-red-600 rounded-lg shadow-xl p-12`}
                >
                  <div className="flex flex-row items-center">
                    <div className="flex-shrink pr-4">
                      <div className={`rounded-full p-5 bg-red-300`}>
                        <FaBus
                          className={`items-center w-8 h-8 m-auto text-red-500 hover:text-red-600`}
                        />
                      </div>
                    </div>
                    <div className="flex-1 text-end">
                      <h2 className="font-bold text-red-600">Total Vehicle</h2>
                      <p className="font-bold text-3xl text-red-600">
                        <CountUp
                          start={0}
                          end={totalVehicle !== 0 ? totalVehicle : 0}
                          duration={1}
                        />
                        <span className={`text-red-500`}>
                          <i className="fas fa-caret-up" />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </MotionContainer>
            </div>
            <div>
              <MotionContainer variants={varFade().inLeft}>
                <div
                  className={`bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-12`}
                >
                  <div className="flex flex-row items-center">
                    <div className="flex-shrink pr-4">
                      <div className={`rounded-full p-5 bg-green-300`}>
                        <FaBook
                          className={`items-center w-8 h-8 m-auto text-green-500 hover:text-green-600`}
                        />
                      </div>
                    </div>
                    <div className="flex-1 text-end">
                      <h2 className="font-bold  text-green-600">
                        Total Subjects
                      </h2>
                      <p className="font-bold text-3xl text-green-600">
                        <CountUp start={0} end={12} />
                        <span className={`text-green-500`}>
                          <i className="fas fa-caret-up" />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </MotionContainer>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
            <div className="shadow-lg p-8 rounded-lg">
              <MotionContainer variants={varFade().inLeft}>
                <Chart
                  options={options}
                  series={series}
                  type="line"
                  width="100%"
                  height="300x"
                />
              </MotionContainer>
            </div>
            <div className="shadow-lg p-8 rounded-lg">
              <MotionContainer variants={varFade().inRight}>
                <Chart
                  options={{
                    title: {
                      text: 'School Statistics',
                      align: 'left',
                      margin: 10,
                      offsetX: 0,
                      offsetY: 0,
                      floating: false,
                      style: {
                        fontSize: '14px',
                        fontWeight: 'bold',
                        fontFamily: undefined,
                        color: '#263238'
                      }
                    },
                    labels: [
                      'Teachers',
                      'Student',
                      'Classes',
                      'Department',
                      'Vehicle'
                    ],

                    responsive: [
                      {
                        breakpoint: 480,
                        options: {
                          chart: {
                            width: 280
                          },
                          legend: {
                            position: 'bottom'
                          }
                        }
                      }
                    ],

                    // title: {
                    //   text: 'Total Students',
                    //   align: 'left',
                    //   margin: 10,
                    //   offsetX: 0,
                    //   offsetY: 0,
                    //   floating: false,
                    //   style: {
                    //     fontSize: '14px',
                    //     fontWeight: 'bold',
                    //     fontFamily: undefined,
                    //     color: '#263238'
                    //   }
                    // },
                    // colors: [
                    //   '#FF1654',
                    //   '#247BA0',
                    //   '#FF9F1C',
                    //   '#40BFC1',
                    //   '#00C7B7'
                    // ],
                    legend: {
                      position: 'bottom',
                      horizontalAlign: 'center',
                      floating: false,
                      fontSize: '14px'
                    }
                  }}
                  series={[
                    totalEmployee,
                    totalStudent,
                    totalClass,
                    totalDepartment,
                    totalVehicle
                  ]}
                  type="donut"
                  width="100%"
                  height="380px"
                />
              </MotionContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Demo;

// const DashBoardCard = ({ title, value, icon, color }) => {
//   return (
//     <div
//       className={`bg-gradient-to-b from${color}200 to${color}100 border-b-4 border${color}600 rounded-lg shadow-xl p-12`}
//     >
//       <div className="flex flex-row items-center">
//         <div className="flex-shrink pr-4">
//           <div className={`rounded-full p-5 bg${color}300`}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className={`items-center w-8 h-8 m-auto text${color}500 hover:text${color}600`}
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               {icon}
//             </svg>
//           </div>
//         </div>
//         <div className="flex-1 text-end">
//           <h2 className="font-bold uppercase text-gray-600">{title}</h2>
//           <p className="font-bold text-3xl">
//             <CountUp start={0} end={value} />
//             <span className={`text${color}500`}>
//               <i className="fas fa-caret-up" />
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };