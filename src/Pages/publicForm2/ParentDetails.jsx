import React, { useEffect } from 'react';
import Img12 from '../../assets/image 24.png';
import { TextField, SelectField, UploadFile } from '../../Components/forms';

export default function ParentDetails({ formik, getPublicMiscellaneous }) {
  const [parentDetail, setParentDetail] = React.useState('');

  useEffect(() => {
    if (formik?.values?.isParentOrGuardian == 'guardian') {
      formik?.setFieldValue('fathers_name', '');
      formik?.setFieldValue('mothers_name', '');
      formik?.setFieldValue('fathers_mobile', '');
      formik?.setFieldValue('mothers_mobile', '');
      formik?.setFieldValue('fathers_email', '');
      formik?.setFieldValue('mothers_email', '');
      formik?.setFieldValue('fathers_qualification_id', '');
      formik?.setFieldValue('fathers_qualification_name', '');
      formik?.setFieldValue('mothers_qualification_id', '');
      formik?.setFieldValue('mothers_qualification_name', '');
      formik?.setFieldValue('fathers_occupation_id', '');
      formik?.setFieldValue('fathers_occupation_name', '');
      formik?.setFieldValue('mothers_occupation_id', '');
      formik?.setFieldValue('mothers_occupation_name', '');
      formik?.setFieldValue('fathers_annual_income', '');
      formik?.setFieldValue('mothers_annual_income', '');
      formik?.setFieldValue('fathers_aadhar_no', '');
      formik?.setFieldValue('mothers_aadhar_no', '');
      formik?.setFieldValue('fathers_image', '');
      formik?.setFieldValue('mothers_image', '');
    } else if (formik?.values?.isParentOrGuardian == 'parent') {
      formik?.setFieldValue('guardians_name', '');
      formik?.setFieldValue('guardians_mobile', '');
      formik?.setFieldValue('guardians_email', '');
      formik?.setFieldValue('guardians_qualification_id', '');
      formik?.setFieldValue('guardians_qualification_name', '');
      formik?.setFieldValue('guardians_occupation_id', '');
      formik?.setFieldValue('guardians_occupation_name', '');
      formik?.setFieldValue('guardians_annual_income', '');
      formik?.setFieldValue('guardians_aadhar_no', '');
      formik?.setFieldValue('guardians_image', '');
    } else {
      console.log('else');
    }
  }, [formik?.values?.isParentOrGuardian]);
  return (
    <div>
      <div className="mt-8">
        <h1 className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280]  bg-white w-full ">
          <div className="flex justify-between items-center w-full ">
            <div className="flex">
              <img
                src={Img12}
                alt="Basic"
                className="mr-3 w-10 h-10 opacity-80"
              />{' '}
              <span className="flex items-center justify-center mt-2 text-[22px]">
                Parent Details
              </span>
            </div>
            <div className="flex mr-2">
              <div className="flex items-center justify-center mt-2 text-[22px]">
                <input
                  type="radio"
                  name="isParentOrGuardian"
                  value="parent"
                  onChange={(e) =>
                    formik?.setFieldValue('isParentOrGuardian', e.target.value)
                  }
                  checked={formik?.values?.isParentOrGuardian === 'parent'}
                />
                <span className="ml-1 text-sm">Parent</span>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div className="flex items-center justify-center mt-2 text-[22px]">
                <input
                  type="radio"
                  name="isParentOrGuardian"
                  value="guardian"
                  onChange={(e) =>
                    formik?.setFieldValue('isParentOrGuardian', e.target.value)
                  }
                  checked={formik?.values?.isParentOrGuardian === 'guardian'}
                />
                <span className="ml-1 text-sm">Guardian</span>
              </div>
            </div>
          </div>
        </h1>
        {/* <hr className="mx-auto" /> */}
      </div>
      <div className="border p-2">
        {formik?.values?.isParentOrGuardian === 'parent' && (
          <>
            <div className=" mt-6 sm:mx-0 lg:mx-4">
              <h1 className="font-semibold text-gray-600 text-start">
                Father's Details: (1)
              </h1>
              <hr />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 text-start mt-3">
              <div>
                <TextField
                  label="Name"
                  name="fathers_name"
                  formik={formik}
                  placeholder="Father's name"
                />
              </div>
              <div>
                <TextField
                  type="number"
                  label="Mobile number"
                  name="fathers_mobile"
                  formik={formik}
                  placeholder="Father's mobile no"
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
              <div>
                <SelectField
                  formik={formik}
                  name="fathers_qualification_id"
                  selectedText="fathers_qualification_name"
                  label="Qualification"
                >
                  {getPublicMiscellaneous?.fathers_qualification?.map(
                    (data) => (
                      <option
                        value={data?.id}
                        selected={
                          data?.id == formik?.values.fathers_qualification_id
                        }
                      >
                        {data?.subCatName}
                      </option>
                    )
                  )}
                </SelectField>
              </div>
              <div>
                <SelectField
                  formik={formik}
                  name="fathers_occupation_id"
                  selectedText="fathers_occupation_name"
                  label="Occupation"
                >
                  {getPublicMiscellaneous?.fathers_occupation?.map((data) => (
                    <option
                      value={data?.id}
                      selected={
                        data?.id == formik?.values.fathers_occupation_id
                      }
                    >
                      {data?.subCatName}
                    </option>
                  ))}
                </SelectField>
              </div>
              <div>
                <TextField
                  type="email"
                  label="Email id"
                  name="fathers_email"
                  formik={formik}
                  placeholder="Father's email id"
                  onKeyDown={(evt) =>
                    [' '].includes(evt.key) && evt.preventDefault()
                  }
                />
              </div>
              <div>
                <TextField
                  type="number"
                  label="Annual income"
                  name="fathers_annual_income"
                  formik={formik}
                  placeholder="Father's annual income"
                  onKeyDown={(evt) =>
                    ['e', 'E', '+', '-', ' '].includes(evt.key) &&
                    evt.preventDefault()
                  }
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value, 10))
                      .toString()
                      .slice(0, 7);
                  }}
                />
              </div>
              <div>
                <TextField
                  type="number"
                  label="Aadhar number"
                  name="fathers_aadhar_no"
                  formik={formik}
                  placeholder="Father's Aadhar number"
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
              {/* <div>
            <UploadFile
              formik={formik}
              name="fathers_image"
              label="Upload photo"
            />
          </div> */}
            </div>
            {/* mothers details */}
            <div className=" mt-6 sm:mx-0 lg:mx-4">
              <h1 className="font-semibold text-gray-600 text-start">
                Mother's Details: (2)
              </h1>
              <hr />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 text-start mt-3">
              <div>
                <TextField
                  label="Name"
                  name="mothers_name"
                  formik={formik}
                  placeholder="Mother's name"
                />
              </div>
              <div>
                <TextField
                  type="number"
                  label="Mobile number"
                  name="mothers_mobile"
                  formik={formik}
                  placeholder="Mother's mobile no"
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
              <div>
                <SelectField
                  formik={formik}
                  name="mothers_qualification_id"
                  selectedText="mothers_qualification_name"
                  label="Qualification"
                >
                  {getPublicMiscellaneous?.mothers_qualification?.map(
                    (data) => (
                      <option
                        value={data?.id}
                        selected={
                          data?.id == formik?.values.mothers_qualification_id
                        }
                      >
                        {data?.subCatName}
                      </option>
                    )
                  )}
                </SelectField>
              </div>
              <div>
                <SelectField
                  formik={formik}
                  name="mothers_occupation_id"
                  selectedText="mothers_occupation_name"
                  label="Occupation"
                >
                  {getPublicMiscellaneous?.mothers_occupation?.map((data) => (
                    <option
                      value={data?.id}
                      selected={
                        data?.id == formik?.values.mothers_occupation_id
                      }
                    >
                      {data?.subCatName}
                    </option>
                  ))}
                </SelectField>
              </div>
              <div>
                <TextField
                  type="email"
                  label="Email id"
                  name="mothers_email"
                  formik={formik}
                  placeholder="Mother's email id"
                  onKeyDown={(evt) =>
                    [' '].includes(evt.key) && evt.preventDefault()
                  }
                />
              </div>
              <div>
                <TextField
                  type="number"
                  label="Annual income"
                  name="mothers_annual_income"
                  formik={formik}
                  placeholder="Mother's annual income"
                  onKeyDown={(evt) =>
                    ['e', 'E', '+', '-', ' '].includes(evt.key) &&
                    evt.preventDefault()
                  }
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value, 10))
                      .toString()
                      .slice(0, 7);
                  }}
                />
              </div>
              <div>
                <TextField
                  type="number"
                  label="Aadhar number"
                  name="mothers_aadhar_no"
                  formik={formik}
                  placeholder="Mother's Aadhar number"
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
              {/* <div>
            <UploadFile
              formik={formik}
              name="mothers_image"
              label="Upload photo"
            />
          </div> */}
            </div>
          </>
        )}
        {/* guardian details */}

        {formik?.values?.isParentOrGuardian == 'guardian' && (
          <>
            <div className=" mt-6 sm:mx-0 lg:mx-4">
              <h1 className="font-semibold text-gray-600 text-start">
                Guardian's Details: ({' '}
                <span className="text-xs font-bold">
                  If parents are not alive or not in contact with the student or
                  not in a position to take care of the student or if the
                  student is staying with his/her guardian or if the student is
                  an orphan.
                </span>{' '}
                )
              </h1>
              <hr />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 text-start mt-3">
              <div>
                <TextField
                  label="Name"
                  name="guardian_name"
                  formik={formik}
                  placeholder="Guardian name"
                />
              </div>
              <div>
                <TextField
                  type="number"
                  label="Mobile number"
                  name="guardian_mobile"
                  formik={formik}
                  placeholder="Guardian mobile no"
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
              <div>
                <SelectField
                  formik={formik}
                  name="guardian_qualification_id"
                  selectedText="guardian_qualification_name"
                  label="Qualification"
                >
                  {getPublicMiscellaneous?.fathers_qualification?.map(
                    (data) => (
                      <option
                        value={data?.id}
                        selected={
                          data?.id == formik?.values.guardian_qualification_id
                        }
                      >
                        {data?.subCatName}
                      </option>
                    )
                  )}
                </SelectField>
              </div>
              <div>
                <SelectField
                  formik={formik}
                  name="guardian_occupation_id"
                  selectedText="guardian_occupation_name"
                  label="Occupation"
                >
                  {getPublicMiscellaneous?.fathers_occupation?.map((data) => (
                    <option
                      value={data?.id}
                      selected={
                        data?.id == formik?.values.guardian_occupation_id
                      }
                    >
                      {data?.subCatName}
                    </option>
                  ))}
                </SelectField>
              </div>
              <div>
                <TextField
                  type="email"
                  label="Email id"
                  name="guardian_email"
                  formik={formik}
                  placeholder="Guardian email id"
                  onKeyDown={(evt) =>
                    [' '].includes(evt.key) && evt.preventDefault()
                  }
                />
              </div>
              <div>
                <TextField
                  type="number"
                  label="Annual income"
                  name="guardian_annual_income"
                  formik={formik}
                  placeholder="Guardian annual income"
                  onKeyDown={(evt) =>
                    ['e', 'E', '+', '-', ' '].includes(evt.key) &&
                    evt.preventDefault()
                  }
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value, 10))
                      .toString()
                      .slice(0, 7);
                  }}
                />
              </div>
              <div>
                <TextField
                  type="number"
                  label="Aadhar number"
                  name="guardian_aadhar_no"
                  formik={formik}
                  placeholder="Guardian Aadhar number"
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
              <div>
                <SelectField
                  formik={formik}
                  name="relation_id"
                  selectedText="relation_name"
                  label="Relation"
                >
                  {getPublicMiscellaneous?.nominee_relation?.map((data) => (
                    <option
                      value={data?.id}
                      selected={data?.id == formik?.values.relation_id}
                    >
                      {data?.subCatName}
                    </option>
                  ))}
                </SelectField>
              </div>
              {/* <div>
            <UploadFile
              formik={formik}
              name="guardian_image"
              label="Upload photo"
            />
          </div> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
