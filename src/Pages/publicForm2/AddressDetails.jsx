import { useState, useEffect } from 'react';
import Img11 from '../../assets/image 20.png';
import { TextField, SelectField, UploadFile } from '../../Components/forms';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import BarLoader from '../../Components/Common/BarLoader';

export default function BasicDetails({
  formik,
  getPublicMiscellaneous,
  activateBottomErrorCard,
  setisLoading
}) {
  const [country_data, setCountry_data] = useState([]);
  const [state_data, setState_data] = useState([]);
  const [district_data, setDistrict_data] = useState([]);
  const [c_country_data, setC_contry_data] = useState([]);
  const [c_state_data, setC_state_data] = useState([]);
  const [c_district_data, setC_district_data] = useState([]);

  const {
    api_public_master_country,
    api_public_master_state,
    api_public_master_city
  } = ApiList();
  // api call
  const getCountryData = (setState) => {
    setisLoading(true);
    AxiosInterceptors.post(api_public_master_country, {}, ApiHeader())
      .then(function (response) {
        console.log('Country Data..', response?.data?.data);
        if (response?.data?.status) {
          // setCountry_data(response?.data?.data);
          setState(response?.data?.data);
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
  const getStateData = (setState, getByCId) => {
    setisLoading(true);
    AxiosInterceptors.post(api_public_master_state, {}, ApiHeader())
      .then(function (response) {
        console.log('State Data..', response?.data?.data);
        if (response?.data?.status) {
          // setState_data(
          //   response?.data?.data.filter((item) => item.country_id == getByCId)
          // );
          setState(
            response?.data?.data.filter((item) => item.country_id == getByCId)
          );
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
  const getDistrictData = (setState, getStateId) => {
    setisLoading(true);
    AxiosInterceptors.post(api_public_master_city, {}, ApiHeader())
      .then(function (response) {
        console.log('District Data..', response?.data?.data);
        if (response?.data?.status) {
          // setDistrict_data(
          //   response?.data?.data.filter((item) => item.state_id == getStateId)
          // );
          setState(
            response?.data?.data.filter((item) => item.state_id == getStateId)
          );
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

  useEffect(() => {
    getCountryData(setCountry_data);
    getCountryData(setC_contry_data);
  }, []);
  // api call end
  // address
  useEffect(() => {
    if (formik.values.p_country_id) {
      getStateData(setState_data, formik.values.p_country_id);
    }
    if (formik.values.c_country_id) {
      getStateData(setC_state_data, formik.values.c_country_id);
    }
    if (formik.values.p_state_id) {
      getDistrictData(setDistrict_data, formik.values.p_state_id);
    }
    if (formik.values.c_state_id) {
      getDistrictData(setC_district_data, formik.values.c_state_id);
    }
  }, [
    formik.values.p_country_id,
    formik.values.c_country_id,
    formik.values.p_state_id,
    formik.values.c_state_id
  ]);

  // communication address same as permanent address functionality start here //
  const mapFormikInitialValue = Object.keys(formik?.values)
    .map((item) => {
      return item.split('p_').slice(1).join('');
    })
    .filter((ele) => ele != '');

  const sameAsPermanentAddress = () => {
    switch (formik.values.check) {
      case true:
        mapFormikInitialValue.map((item) => {
          formik.setFieldValue(`c_${item}`, formik.values[`p_${item}`]);
          formik.setFieldTouched(`c_${item}`, false);
        });
        break;
      case false:
        mapFormikInitialValue.map((item) => {
          formik.setFieldValue(`c_${item}`, '');
          formik.setFieldTouched(`c_${item}`, false);
        });
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    sameAsPermanentAddress();
  }, [formik?.values?.check]);

  useEffect(() => {
    if (formik.values.check) {
      sameAsPermanentAddress();
    }
  }, [
    formik?.values?.p_address1,
    formik?.values?.p_address2,
    formik?.values?.p_locality,
    formik?.values?.p_landmark,
    formik?.values?.p_pincode,
    formik?.values?.p_state_id,
    formik?.values?.p_district_id,
    formik?.values?.p_country_id,
    formik?.values?.p_state_name,
    formik?.values?.p_district_name,
    formik?.values?.p_country_name
  ]);
  // communication address same as permanent address functionality end here //
  return (
    <div>
      <div className="mt-8 ">
        <h1 className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280]  bg-white w-full ">
          <div className="flex">
            <img
              src={Img11}
              alt="Basic"
              className="mr-3 w-10 h-10 opacity-80"
            />{' '}
            <span className="flex items-center justify-center mt-2 text-[22px]">
              Address Details
            </span>
          </div>
        </h1>
        {/* <hr className="mx-auto" /> */}
      </div>
      <div className="border p-2">
        <div className=" mt-6 sm:mx-0 lg:mx-4">
          <h1 className="font-semibold text-gray-600 text-start">
            Permanent Address: (1)
          </h1>
          <hr />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 text-start mt-3 ">
          <div>
            <TextField
              label="Address 1"
              name="p_address1"
              formik={formik}
              placeholder="Address 1"
            />
          </div>
          <div>
            <TextField
              label="Address 2"
              name="p_address2"
              formik={formik}
              placeholder="Address 2"
            />
          </div>
          <div>
            <TextField
              label="Locality"
              name="p_locality"
              formik={formik}
              placeholder="Locality"
            />
          </div>

          <div>
            <TextField
              label="Landmark"
              name="p_landmark"
              formik={formik}
              placeholder="Landmark"
            />
          </div>
          {/* sections */}
          <div>
            <SelectField
              formik={formik}
              name="p_country_id"
              label="Country"
              selectedText="p_country_name"
            >
              {country_data?.map((data) => (
                <option
                  selected={data?.id == formik.values.p_country_id}
                  value={data?.id}
                >
                  {data?.country_name}
                </option>
              ))}
            </SelectField>
          </div>
          {/* end sections */}
          {/* Date of birth */}
          <div>
            <SelectField
              formik={formik}
              name="p_state_id"
              label="State"
              selectedText="p_state_name"
            >
              {state_data.map((item) => (
                <option
                  selected={item?.id == formik.values.p_state_id}
                  value={item?.id}
                >
                  {item?.state_name}
                </option>
              ))}
            </SelectField>
          </div>
          {/* end Date of birth */}
          {/* Admission date */}
          <div>
            <SelectField
              formik={formik}
              name="p_district_id"
              label="City"
              selectedText="p_district_name"
            >
              {district_data?.map((data) => (
                <option
                  value={data?.id}
                  selected={data?.id == formik.values.p_district_id}
                >
                  {data?.city_name}
                </option>
              ))}
            </SelectField>
          </div>
          {/* end Admission */}
          {/* gender start */}
          <div>
            <TextField
              type="number"
              label="Pincode"
              name="p_pincode"
              formik={formik}
              placeholder="Pincode"
              onKeyDown={(evt) =>
                ['e', 'E', '+', '-', ' '].includes(evt.key) &&
                evt.preventDefault()
              }
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value, 10))
                  .toString()
                  .slice(0, 6);
              }}
            />
          </div>
        </div>
        {/* correspondence address */}
        <div className=" mt-6 sm:mx-0 lg:mx-4 lg:flex lg:justify-between">
          <h1 className="font-semibold text-gray-600 text-start">
            Correspondence Address: (2)
          </h1>
          <div className="gap-2 flex items-center justify-start font-semibold text-gray-600">
            <input
              id="check"
              name="check"
              type="checkbox"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              {...formik.getFieldProps('check')}
              checked={formik.values.check}
            />
            <span className="font-bold text-gray-600 w-full">
              Note:if communication address is same as permanent address(Please
              Tick)
            </span>
          </div>
        </div>
        <div className="sm:mx-0 lg:mx-4 ">
          <hr />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 text-start mt-3">
          <div>
            <TextField
              label="Address 1"
              name="c_address1"
              formik={formik}
              placeholder="Address 1"
              readOnly={formik.values.check}
            />
          </div>
          <div>
            <TextField
              label="Address 2"
              name="c_address2"
              formik={formik}
              placeholder="Address 2"
              readOnly={formik.values.check}
            />
          </div>
          <div>
            <TextField
              label="Locality"
              name="c_locality"
              formik={formik}
              placeholder="Locality"
              readOnly={formik.values.check}
            />
          </div>

          <div>
            <TextField
              label="Landmark"
              name="c_landmark"
              formik={formik}
              placeholder="Landmark"
              readOnly={formik.values.check}
            />
          </div>
          {/* sections */}
          <div>
            <SelectField
              formik={formik}
              name="c_country_id"
              label="Country"
              selectedText="c_country_name"
              disabled={formik.values.check}
            >
              {c_country_data?.map((data) => (
                <option
                  selected={data?.id == formik.values.c_country_id}
                  value={data?.id}
                >
                  {data?.country_name}
                </option>
              ))}
            </SelectField>
          </div>
          {/* end sections */}
          {/* Date of birth */}
          <div>
            <SelectField
              formik={formik}
              name="c_state_id"
              label="State"
              selectedText="c_state_name"
              disabled={formik.values.check}
            >
              {c_state_data.map((item) => (
                <option
                  selected={item?.id == formik.values.c_state_id}
                  value={item?.id}
                >
                  {item?.state_name}
                </option>
              ))}
            </SelectField>
          </div>
          {/* end Date of birth */}
          {/* Admission date */}
          <div>
            <SelectField
              formik={formik}
              name="c_district_id"
              label="City"
              selectedText="c_district_name"
              disabled={formik.values.check}
            >
              {c_district_data?.map((data) => (
                <option
                  value={data?.id}
                  selected={data?.id == formik.values.c_district_id}
                >
                  {data?.city_name}
                </option>
              ))}
            </SelectField>
          </div>
          {/* end Admission */}
          {/* gender start */}
          <div>
            <TextField
              type="number"
              label="Pincode"
              readOnly={formik.values.check}
              name="c_pincode"
              formik={formik}
              placeholder="Pincode"
              onKeyDown={(evt) =>
                ['e', 'E', '+', '-', ' '].includes(evt.key) &&
                evt.preventDefault()
              }
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value, 10))
                  .toString()
                  .slice(0, 6);
              }}
            />
          </div>
          {/* correspondence address */}
        </div>
      </div>
    </div>
  );
}
