import { useState, useEffect } from "react";
import noDataImage from "../../assets/nodata.png"
import ApiHeader from "../../Components/ApiList/ApiHeader";
import ApiList from "../../Components/ApiList/ApiList";
import AxiosInterceptors from "../../Components/Common/AxiosInterceptors";
import {
  TextField,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import BarLoader from "../../Components/Common/BarLoader";
import { nullToNA } from "../../Components/Common/PowerupFunctions";
import useSetTitle from "../../Components/Hooks/useSetTitle";
import ListTable from "../../Components/ListTable/ListTable";
import DeleteView from "../../Components/Common/DeleteView";
import BottomErrorCard from "../../Components/Common/BottomErrorCard";
import { allowCharacterInput } from "../../Components/Common/PowerupFunctions";
import { useFormik, FormikProvider, Form } from "formik";
import { CSVDownload } from "react-csv";
import { BiEditAlt } from "react-icons/bi";
import { BsFiletypePdf, BsFiletypeCsv } from "react-icons/bs";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Icon } from "@iconify/react";
import { values } from "lodash";
import Pagination from '../../Components/Common/Pagination';

const AttendanceStatus = () => {
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(1);
  const [postperpage, setPostperpage] = useState(10);
  const [lastPage, setlastPage] = useState();
  const [lastdata, setlastData] = useState();
  const [hide, sethide] = useState(false);
  const[nodata,setNodata]=useState(false)

  const validationSchema = yup.object({
    fy: yup.string().required("Required"),
    classId: yup.string().required("Required"),
    sectionId: yup.string().required("Required"),
    date: yup.string().required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      fy: "",
      classId: "",
      sectionId: "",
      date: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      console.log("at submit ", values);
      fetchMasterList(values);
      formik.resetForm()
      sethide(false)
     
    },
  });

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

  const [financeYearList, setfinanceYearList] = useState([]);
  const [classList, setclassList] = useState([]);
  const [sectionList, setsectionList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const {
    api_finance_year,
    api_getactiveClassData,
    api_section_group_map,
    api_attendance_report,
  } = ApiList();

  const fetchClassList = () => {
    AxiosInterceptors.post(api_getactiveClassData, {}, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          console.log(response?.data?.data);
          setclassList(response?.data?.data);
        } else {
          activateBottomErrorCard(true, "Error occured while fetching data.");
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("==2 error list...", error);
        activateBottomErrorCard(true, "Error occured while fetching data.");
      });
  };
  const fetchSectionList = (values) => {
    setisLoading(true);
    AxiosInterceptors.post(
      api_section_group_map,
      { classId: values },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data) {
          console.log(response?.data);
          setsectionList(response?.data.data);
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
  const fetchFinanceList = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_finance_year, {}, ApiHeader())
      .then(function (response) {
        if (response?.data) {
          console.log(response?.data);
          setfinanceYearList(response?.data);
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

  const fetchMasterList = (values) => {
    setisLoading(true)
    AxiosInterceptors.post(
      api_attendance_report,
      {
        fy: values.fy,
        classId: values.classId,
        sectionId: values.sectionId,
        date: values.date,
      },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status === true) {
          if (
            response?.data?.data?.total === 0 ||
            response?.data?.data?.data.length === 0
          ) {
            toast.error(`Data not Found`);
            setData(response?.data?.data?.data);
            setlastPage(response?.data?.data?.last_page);
            setlastData(response?.data?.data?.total);
            sethide(false)
            setNodata(true)
          } else {
            console.log("class section map data", response?.data?.data?.data);
            setData(response?.data?.data?.data);
            setlastPage(response?.data?.data?.last_page);
            setlastData(response?.data?.data?.total);
            sethide(true);
          }
        } else {
          // activateBottomErrorCard(true, `${response?.data?.message}`);
          toast.error(`${response?.data?.message}`);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("==2 error list...", error);
        // activateBottomErrorCard(true, "Error occured in submitting form.");
        toast.warning("Error occured in submitting form.");

        setisLoading(false);
      });
  };

  useEffect(() => {
    fetchFinanceList();
    fetchClassList();
  }, []);

 

  useEffect(() => {
    if (formik.values.classId) {
      fetchSectionList(formik.values.classId);
    }
  }, [formik.values.classId]);

  return (
    <>
      <div className="h-[77vh] lg:h-auto overflow-y-auto">
        <div className="flex items-start justify-start flex-col mt-5 ml-5 ">
          <h1 className="text-4xl font-semibold text-gray-700">
            Attendance Status
          </h1>
          <h1 className="common-header-smalltext">
            Unlock Your Potential. Join Our Journey Of Education And Excellence
          </h1>
        </div>

        <FormikProvider value={formik}>
          <Form
            autoComplete="off"
            // onChange={handleChange}
            // onSubmit={formik.handleSubmit}
          >
            <div className="grid grid-cols-12 gap-5 ml-[4vh] mr-[4vh] mt-[2vh]">
              <div className="col-span-12 lg:col-span-3">
                <FormControl
                  fullWidth
                  error={formik.touched.fy && Boolean(formik.errors.fy)}
                >
                  <InputLabel id="demo-simple-select-label" sx={{ padding: 0 }}>
                    Financial year
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select Menu"
                    {...formik.getFieldProps("fy")}
                    fullWidth
                    size="small"
                  >
                    <MenuItem value="">Select</MenuItem>
                    {financeYearList &&
                      financeYearList.map((data, index) => {
                        return <MenuItem value={data?.fy}>{data?.fy}</MenuItem>;
                      })}
                  </Select>
                  <FormHelperText>
                    {formik.touched.fy && formik.errors.fy}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className="col-span-12 lg:col-span-3">
                <FormControl
                  fullWidth
                  error={
                    formik.touched.classId && Boolean(formik.errors.classId)
                  }
                >
                  <InputLabel id="demo-simple-select-label" sx={{ padding: 0 }}>
                    Select Class
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select Menu"
                    {...formik.getFieldProps("classId")}
                    fullWidth
                    size="small"
                  >
                    <MenuItem value="">Select</MenuItem>
                    {classList &&
                      classList?.map((data) => {
                        return (
                          <MenuItem value={data?.id}>
                            {data?.class_name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <FormHelperText>
                    {formik.touched.classId && formik.errors.classId}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className="col-span-12 lg:col-span-3">
                <FormControl
                  fullWidth
                  error={
                    formik.touched.sectionId && Boolean(formik.errors.sectionId)
                  }
                >
                  <InputLabel id="demo-simple-select-label" sx={{ padding: 0 }}>
                    Select Section
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select Menu"
                    {...formik.getFieldProps("sectionId")}
                    fullWidth
                    size="small"
                  >
                    <MenuItem value="">Select</MenuItem>
                    {sectionList &&
                      sectionList?.map((data) => {
                        return (
                          <MenuItem value={data?.id}>
                            {data?.section_name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <FormHelperText>
                    {formik.touched.sectionId && formik.errors.sectionId}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className="col-span-12 lg:col-span-2">
                <FormControl
                  fullWidth
                  // error={
                  //   formik.touched.paymentStatus &&
                  //   Boolean(formik.errors.paymentStatus)
                  // }
                >
                  <TextField
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...formik.getFieldProps("date")}
                    fullWidth
                    size="small"
                    type="date"
                  ></TextField>
                  <FormHelperText>
                    {formik.touched.date && formik.errors.date}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className="col-span-12 lg:col-span-1">
              <button
                // onClick={()=>(sethide(!hide))}
                type="submit"
                className="  save-button"
              >
                Search
              </button>
              </div>
            </div>
           
          </Form>
        </FormikProvider>

       

        {hide ? (
          <>
            <div className="relative overflow-auto  w-[150vw] lg:w-[95%] ml-[2vw] shadow-md mt-[2vh]   sm:rounded-lg">
              <table className="w-full text-sm text-left " id="myTable">
                <thead className="text-md ">
                  <tr className="text-white bg-[#3f7772]">
                    <th scope="col" className=" py-5  text-center ">
                      Sl No.
                    </th>
                    <th scope="col" className=" py-5  text-center ">
                      Admission No
                    </th>
                    <th scope="col" className=" py-5  text-center">
                      Full Name
                    </th>
                    <th scope="col" className=" py-5  text-center">
                      Financial Year
                    </th>
                    <th scope="col" className=" py-5  text-center">
                      Class
                    </th>
                    <th scope="col" className=" py-5  text-center">
                      Section
                    </th>

                    <th scope="col" className=" py-5  text-center">
                      Attendance Status
                    </th>

                    <th scope="col" className=" py-5  text-center">
                      Description
                    </th>
                  </tr>
                </thead>
                {currentpost.map((eachData, index) => {
                  return (
                    <>
                      <tbody>
                        <tr className="bg-white border-b  hover:bg-slate-100 ">
                          <td
                            scope="row"
                            className="px-6 py-4 font-medium whitespace-nowrap  text-center"
                          >
                            {(number - 1) * postperpage + index + 1}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {eachData?.admission_no}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {eachData?.first_name}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {eachData?.academic_year}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {eachData?.class_name}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {eachData?.section_name}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {eachData?.attendance_status}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {eachData?.description}
                          </td>
                        </tr>
                      </tbody>
                    </>
                  );
                })}
              </table>
              <Pagination ChangePage={ChangePage} number={number} lastPage={lastPage} nextPage={nextPage} prevPage={prevPage} postperpage={postperpage}/>
            </div>
          </>
        ) : nodata ?  (
          <>
          <div className="flex justify-center items-center">
            <img  src={noDataImage} alt="" />
          </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default AttendanceStatus;