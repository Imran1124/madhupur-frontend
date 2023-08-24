
import { useState, useEffect } from "react";
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
import noDataImage from "../../assets/nodata.png"
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

const PaymentStatus = () => {
  const paymentStatusDetails = [
    { value: 1, label: "Paid" },
    { value: 0, label: "Not Paid" },
  ];
  const [financeYearList, setfinanceYearList] = useState([]);
  const [classList, setclassList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { api_finance_year, api_getactiveClassData,api_payment_report } = ApiList();
  const [hide,sethide] = useState(false);
  const[nodata,setNodata]=useState(false)
  const [number, setNumber] = useState(1);
  const [postperpage, setPostperpage] = useState(10);
  const [lastPage, setlastPage] = useState();
  const [lastdata, setlastData] = useState();
  const [data, setData] = useState([]);

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
  useEffect(() => {
    fetchFinanceList();
    fetchClassList();
  }, []);
  const validationSchema = yup.object({
    fy: yup.string().required("Required"),
    classId: yup.string().required("Required"),
    isPaid: yup.string().required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      fy: "",
      classId: "",
      isPaid: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      console.log("at submit ", values);
      fetchMasterList(values);
      formik.resetForm()
    },
  });
  const fetchMasterList = (values) => {
    setisLoading(true)
    AxiosInterceptors.post(
      api_payment_report,
      {
        fy: values.fy,
        classId: values.classId,
        isPaid:values.isPaid,
      },
      ApiHeader()
    )
      .then(function (response) {
        console.log(response)
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
  console.log(data)
  return (
    <>
    <div 
    className="h-[77vh] lg:h-auto overflow-y-auto"
    >
      <div className="flex items-start justify-start flex-col mt-5 ml-5 ">
        <h1 className="text-4xl font-semibold text-gray-700">Payment Status</h1>
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
          <div className="grid grid-cols-12 gap-5 ml-[4vh] mt-[2vh]">
            <div className="col-span-12 lg:col-span-3">
              <FormControl
                fullWidth
                error={formik.touched.fy && Boolean(formik.errors.fy)}
              >
                <InputLabel id="demo-simple-select-label" sx={{ padding: 0 }}>
                  Select Financial year
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
                    financeYearList?.map((data) => {
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
                error={formik.touched.classId && Boolean(formik.errors.classId)}
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
                        <MenuItem value={data?.id}>{data?.class_name}</MenuItem>
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
                  formik.touched.isPaid &&
                  Boolean(formik.errors.isPaid)
                }
              >
                <InputLabel id="demo-simple-select-label" sx={{ padding: 0 }}>
                  Select Payment Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Menu"
                  {...formik.getFieldProps("isPaid")}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="">Select</MenuItem>
                  {paymentStatusDetails &&
                    paymentStatusDetails?.map((data) => {
                      return (
                        <MenuItem value={data?.value}>{data?.label}</MenuItem>
                      );
                    })}
                </Select>
                <FormHelperText>
                  {formik.touched.isPaid && formik.errors.isPaid}
                </FormHelperText>
              </FormControl>
            </div>
            <div className="col-span-12 lg:col-span-3">
            <button onClick={()=>(sethide(!hide))}  className="save-button">
              Search
            </button>
            </div>
          </div>
        </Form>
      </FormikProvider>
      {
        hide ?  (
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
                Class
              </th>
              <th scope="col" className=" py-5  text-center">
                Registration Date
              </th>
              <th scope="col" className=" py-5  text-center">
                Category
              </th>
              <th scope="col" className=" py-5  text-center">
                Payment Status
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
                            {eachData?.full_name}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {eachData?.class_name}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {eachData?.registration_date}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {eachData?.category_name}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {eachData?.is_paid}
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
        ):nodata ?  (
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

export default PaymentStatus;

