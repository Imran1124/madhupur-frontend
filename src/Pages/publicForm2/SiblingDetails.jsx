import React, { useState, useEffect } from 'react';
import { FieldArray, getIn } from 'formik';
import { HiUserGroup } from 'react-icons/hi';
import Img12 from '../../assets/image 23.png';
import { TextField, SelectField, UploadFile } from '../../Components/forms';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import { CiSquareRemove, CiSquarePlus } from 'react-icons/ci';

export default function SiblingDetails({
  formik,
  getPublicMiscellaneous,
  setisLoading,
  activateBottomErrorCard
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

  return (
    <div>
      <div className="mt-8">
        <h1 className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280]  bg-white w-full ">
          <div className="flex">
            <HiUserGroup className="inline-block w-10 h-10 text-blue-400 mr-2" />
            <span className="flex items-center justify-center mt-2 text-[22px]">
              Sibling Details
            </span>
          </div>
        </h1>
        <hr className="mx-auto" />
      </div>

      <FieldArray name="siblingDetails">
        {(arrayHelpers) => (
          <>
            {formik?.values.siblingDetails.length > 0 &&
              formik?.values.siblingDetails.map((items, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="grid grid-cols-2 gap-2 lg:grid-cols-6 text-start mt-3 border p-2">
                      <div>
                        <TextField
                          formik={formik}
                          label={`Sibling name`}
                          name={`siblingDetails.${index}.siblingName`}
                          isDynamic
                          placeholder="Enter sibling name"
                        />
                      </div>
                      <div>
                        <SelectField
                          formik={formik}
                          name={`siblingDetails.${index}.siblingClassId`}
                          selectedText={`siblingDetails.${index}.siblingClass`}
                          label={`Class`}
                          isDynamic
                        >
                          {getClasses?.map((data) => (
                            <option
                              selected={data?.id == items?.siblingClassId}
                              value={data?.id}
                            >
                              {data?.class_name}
                            </option>
                          ))}
                        </SelectField>
                      </div>
                      <div>
                        <SelectField
                          formik={formik}
                          name={`siblingDetails.${index}.siblingSectionId`}
                          selectedText={`siblingDetails.${index}.siblingSection`}
                          label={`Section`}
                          isDynamic
                        >
                          {getSections?.map((data) => (
                            <option
                              selected={data?.id == items?.siblingSectionId}
                              value={data?.id}
                            >
                              {data?.section_name}
                            </option>
                          ))}
                        </SelectField>
                      </div>
                      <div>
                        <TextField
                          formik={formik}
                          maxLength={20}
                          label="Admission no"
                          name={`siblingDetails.${index}.siblingAdmissionNo`}
                          isDynamic
                          placeholder="Enter admission no"
                        />
                      </div>
                      <div>
                        <TextField
                          type="number"
                          formik={formik}
                          label="Roll no"
                          name={`siblingDetails.${index}.siblingRollNo`}
                          isDynamic
                          onKeyDown={(evt) =>
                            ['e', 'E', '+', ' '].includes(evt.key) &&
                            evt.preventDefault()
                          }
                          onInput={(e) => {
                            e.target.value = Math.max(
                              0,
                              parseInt(e.target.value, 10)
                            )
                              .toString()
                              .slice(0, 5);
                          }}
                          placeholder="Enter roll no"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Add & Remove Sibling
                        </label>
                        {index > 0 && (
                          <button
                            className="mt-1"
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <CiSquareRemove className="inline-block w-9 h-9 text-red-600" />
                          </button>
                        )}
                        |
                        <button
                          type="button"
                          className="mt-1"
                          onClick={() =>
                            arrayHelpers.push({
                              siblingName: '',
                              siblingClassId: '',
                              siblingClass: '',
                              siblingSectionId: '',
                              siblingSection: '',
                              siblingAdmissionNo: '',
                              siblingRollNo: ''
                            })
                          }
                        >
                          <CiSquarePlus className="inline-block w-9 h-9 text-blue-600" />
                        </button>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            {/* button */}
          </>
        )}
      </FieldArray>
    </div>
  );
}
