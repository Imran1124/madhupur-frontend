import React, { useEffect } from 'react';
import Img11 from '../../assets/image 11.png';
import {
  TextField,
  SelectField,
  UploadFile,
  CustomFileUpload,
  OutLineTextField
} from '../../Components/forms';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';

export default function BasicDetails({
  formik,
  getPublicMiscellaneous,
  setisLoading,
  activateBottomErrorCard,
  isEdit
}) {
  const [getClasses, setClasses] = React.useState([]);
  const [getSections, setSections] = React.useState([]);
  const { api_public_master_class, api_public_master_section } = ApiList();

  const getClassData = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_public_master_class, {}, ApiHeader())
      .then(function (response) {
        console.log('section Data..', response?.data?.data);
        if (response?.data?.status) {
          setClasses(response?.data?.data);
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

  const getSectionData = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_public_master_section, {}, ApiHeader())
      .then(function (response) {
        console.log('section Data..', response?.data?.data);
        if (response?.data?.status) {
          setSections(response?.data?.data);
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

  React.useEffect(() => {
    getClassData();
    getSectionData();
  }, []);

  const handleUpload = (e) => {
    // with preview image
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      formik.setFieldValue('upload_image', reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="mt-8">
        <h1 className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280]  bg-white w-full ">
          <div className="flex">
            <img
              src={Img11}
              alt="Basic"
              className="mr-3 w-10 h-10 opacity-80"
            />{' '}
            <span className="flex items-center justify-center mt-2 text-[22px]">
              Basic Details
            </span>
          </div>
        </h1>
        {/* <hr className="mx-auto" /> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 text-start mt-3 border p-2">
        <div>
          <TextField
            label="First Name"
            name="first_name"
            formik={formik}
            placeholder="First name"
            isRequiredLabel
          />
        </div>
        <div>
          <TextField
            label="Middle Name"
            name="middle_name"
            formik={formik}
            placeholder="Middle name"
          />
        </div>
        <div>
          <TextField
            label="Last Name"
            name="last_name"
            formik={formik}
            placeholder="Last name"
            isRequiredLabel
          />
        </div>

        <div>
          <SelectField
            formik={formik}
            name="class_id"
            selectedText="class_name"
            label="Class"
            isRequiredLabel
          >
            {getClasses?.map((data) => (
              <option
                selected={data?.id == formik?.values.class_id}
                value={data?.id}
              >
                {data?.class_name}
              </option>
            ))}
          </SelectField>
        </div>
        {/* sections */}
        {/* <div>
          <SelectField
            formik={formik}
            name="section_id"
            selectedText="section_name"
            label="Section"
            isRequiredLabel
          >
            {getSections?.map((data) => (
              <option
                selected={data?.id == formik?.values.section_id}
                value={data?.id}
              >
                {data?.section_name}
              </option>
            ))}
          </SelectField>
        </div> */}
        {/* end sections */}
        {/* Date of birth */}
        <div>
          <TextField
            label="Date of birth"
            name="dob"
            formik={formik}
            type="date"
            isRequiredLabel
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
        {/* end Date of birth */}
        {/* Admission date */}
        {/* <div>
          <TextField
            label="Admission date"
            name="admission_date"
            formik={formik}
            type="date"
            isRequiredLabel
            max={new Date().toISOString().split('T')[0]}
          />
        </div> */}
        {/* end Admission */}
        {/* gender start */}
        <div>
          <SelectField
            formik={formik}
            name="gender_id"
            selectedText="gender_name"
            label="Gender"
            isRequiredLabel
          >
            {getPublicMiscellaneous?.gender?.map((data) => (
              <option
                value={data?.id}
                selected={data?.id == formik?.values.gender_id}
              >
                {data?.subCatName}
              </option>
            ))}
          </SelectField>
        </div>
        {/* gender start */}
        {/* category */}
        <div>
          <SelectField
            formik={formik}
            name="category_id"
            selectedText="category_name"
            label="Category"
            isRequiredLabel
          >
            {getPublicMiscellaneous?.category?.map((data) => (
              <option
                value={data?.id}
                selected={data?.id == formik?.values.category_id}
              >
                {data?.subCatName}
              </option>
            ))}
          </SelectField>
        </div>
        {/* category end */}
        {/* roll no */}
        {/* <div>
          <TextField
            type="number"
            label="Roll number"
            name="roll_number"
            formik={formik}
            placeholder="Roll no"
            isRequiredLabel
            maxLength={10}
            onKeyDown={(evt) =>
              ['e', 'E', '+', '-', ' '].includes(evt.key) &&
              evt.preventDefault()
            }
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value, 10))
                .toString()
                .slice(0, 5);
            }}
          />
        </div> */}
        {/* end roll no */}
        {/* disability */}
        <div>
          <SelectField
            formik={formik}
            name="disability_id"
            selectedText="disability_name"
            label="Disability"
            isRequiredLabel
          >
            {getPublicMiscellaneous?.disability?.map((data) => (
              <option
                value={data?.id}
                selected={data?.id == formik?.values.disability_id}
              >
                {data?.subCatName}
              </option>
            ))}
          </SelectField>
        </div>
        {/* disability end */}
        {/* religion start */}
        <div>
          <SelectField
            formik={formik}
            name="religion_id"
            selectedText="religion_name"
            label="Religion"
            isRequiredLabel
          >
            {getPublicMiscellaneous?.religion?.map((data) => (
              <option
                value={data?.id}
                selected={data?.id == formik?.values.religion_id}
              >
                {data?.subCatName}
              </option>
            ))}
          </SelectField>
        </div>
        {/* religion end */}
        {/* caste start */}
        <div>
          <SelectField
            formik={formik}
            name="caste_id"
            selectedText="caste_name"
            label="Caste"
            isRequiredLabel
          >
            {getPublicMiscellaneous?.caste?.map((data) => (
              <option
                value={data?.id}
                selected={data?.id == formik?.values.caste_id}
              >
                {data?.subCatName}
              </option>
            ))}
          </SelectField>
        </div>
        {/* caste end */}
        {/* mobile no */}
        <div>
          <TextField
            type="number"
            label="Mobile"
            name="mobile"
            formik={formik}
            placeholder="Mobile no"
            isRequiredLabel
            maxLength={10}
            onKeyDown={(evt) =>
              ['e', 'E', '+', '-', ' '].includes(evt.key) &&
              evt.preventDefault()
            }
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value, 10))
                .toString()
                .slice(0, 10);
            }}
          />
        </div>
        {/* mobile end */}
        <div>
          <SelectField
            formik={formik}
            name="blood_group_id"
            selectedText="blood_group_name"
            label="Blood group"
            isRequiredLabel
          >
            {getPublicMiscellaneous?.blood_group?.map((data) => (
              <option
                value={data?.id}
                selected={data?.id == formik?.values.blood_group_id}
              >
                {data?.subCatName}
              </option>
            ))}
          </SelectField>
        </div>
        {/* email no */}
        <div>
          <TextField
            type="email"
            label="Email id"
            name="email"
            formik={formik}
            placeholder="Email id"
            // isRequiredLabel
            onKeyDown={(evt) => [' '].includes(evt.key) && evt.preventDefault()}
          />
        </div>
        {/* email end */}
        {/* aadhaar no */}
        <div>
          <TextField
            type="number"
            label="Aadhar number"
            name="aadhar_no"
            formik={formik}
            placeholder="Aadhar no"
            onKeyDown={(evt) =>
              ['e', 'E', '+', '-', ' '].includes(evt.key) &&
              evt.preventDefault()
            }
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value, 10))
                .toString()
                .slice(0, 12);
            }}
          />
        </div>
        {/* aadhar_no end */}
        {/* blood group start */}

        {/* blood group  end */}
        {/* ward house start */}
        <div>
          <SelectField
            formik={formik}
            name="ward_id"
            selectedText="ward_name"
            label="Ward/House"
          >
            {getPublicMiscellaneous?.houseward?.map((data) => (
              <option
                value={data?.id}
                selected={data?.id == formik?.values.ward_id}
              >
                {data?.subCatName}
              </option>
            ))}
          </SelectField>
        </div>
        {/* ward group  end */}
        {/* Concession type  start */}

        {/* ward group  end */}
        {/* Last school name no */}
        {/* <div>
          <TextField
            label="Last school name"
            name="last_school_name"
            formik={formik}
            placeholder="Last school name"
          />
        </div> */}
        {/* Last school name no */}
        {/* Last school name no */}
        {/* <div>
          <TextField
            label="Last school address"
            name="last_school_address"
            formik={formik}
            placeholder="Last school address"
          />
        </div> */}
        {/* Last school name no */}
        <div>
          <SelectField
            formik={formik}
            name="admission_month_id"
            selectedText="admission_month"
            label="Admission month"
          >
            {[
              { id: 1, subCatName: 'January' },
              { id: 2, subCatName: 'February' },
              { id: 3, subCatName: 'March' },
              { id: 4, subCatName: 'April' },
              { id: 5, subCatName: 'May' },
              { id: 6, subCatName: 'June' },
              { id: 7, subCatName: 'July' },
              { id: 8, subCatName: 'August' },
              { id: 9, subCatName: 'September' },
              { id: 10, subCatName: 'October' },
              { id: 11, subCatName: 'November' },
              { id: 12, subCatName: 'December' }
            ].map((data) => (
              <option
                value={data?.id}
                selected={data?.id == formik?.values?.admission_month_id}
              >
                {data?.subCatName}
              </option>
            ))}
          </SelectField>
        </div>
        {/* upload pic */}

        <div>
          <CustomFileUpload
            formik={formik}
            name="upload_image"
            isRequiredLabel
            label="Upload Image"
            objectURLName="getObjectURL"
            accept=".jpg, .jpeg, .png"
          />
          <div
            style={{
              display: 'none'
            }}
          >
            <input type="text" {...formik.getFieldProps('upload_image')} />
          </div>
        </div>

        <div className="mt-5">
          {formik?.values?.upload_image && (
            <img
              src={formik?.values?.getObjectURL}
              alt="image"
              width={70}
              height={70}
            />
          )}
        </div>
        {/* upload pic */}
      </div>
    </div>
  );
}
