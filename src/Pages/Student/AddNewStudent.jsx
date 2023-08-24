/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import StudentBasicDetail from './StudentBasicDetail';
import ParentDetails from './ParentDetails';
import CommunicationAddress from './CommunicationAddress';
import BankDetail from './BankDetail';
import SiblingDetails from './SiblingDetails';
import Transport from './Transport';
import Img14 from '../../assets/image 14.png';
import Img9 from '../../assets/Ellipse 9.png';
import Imgtick from '../../assets/tick.png';

export default function Adder() {
  const [formIndex, setformIndex] = useState(1);
  const [counter, setcounter] = useState(1);
  const [fam_data, setFam_data] = useState();
  const [dropdown, setDropdown] = useState(false);
  const [seconddropdown, setSecondDropdown] = useState(false);
  const [thirddropdown, setThirdDropdown] = useState(false);
  const [forthdropdown, setForthDropdown] = useState(false);
  const [fifthdropdown, setFifthDropdown] = useState(false);
  const [sixthdropdown, setSixthDropdown] = useState(false);

  const [allFormData, setallFormData] = useState([]);

  const setCounterFun = (index) => {
    if (index == 1) {
      setformIndex(1);
    }
    if (index == 2) {
      setformIndex(2);
    }
    if (index == 3) {
      setformIndex(3);
    }
    if (index == 4) {
      setformIndex(4);
    }
    if (index == 5) {
      setformIndex(5);
    }
    if (index == 6) {
      setformIndex(6);
    }
    if (index == 7) {
      setformIndex(7);
    }
    if (index == 8) {
      setformIndex(8);
    }
  };

  const setFormDataFun = (key, formData) => {
    setallFormData({ ...allFormData, [key]: formData });
  };
  console.log('allformdata', allFormData);

  return (
    <>
      <div
        className="w-full bg-white h-[86vh] overflow-auto flex relative max-[1200px]:overflow-hidden"
        // style={{ zIndex: 100 }}
      >
        <div className="bg-[#98D4D2] w-[40%] h-screen  px-[8vh]  block relative max-[1024px]:px-[2vh] max-[600px]:hidden">
          <div className="flex items-center justify-center ]">
            <img
              src={Img14}
              alt="adder"
              className="w-[200px] h-[200px] opacity-90"
            />
          </div>
          <div className="bg-white border border-white rounded-[15px] mt-[-10px]">
            <div className="overflow-auto w-[100%] pb-2 h-[64vh]">
              <div className="mx-1">
                <div className={`flex  p-4`}>
                  <span className="flex items-start justify-start">
                    {' '}
                    {allFormData.basic_detail ? (
                      <img src={Imgtick} alt="right" className="w-10 h-8" />
                    ) : (
                      <img src={Img9} alt="wrong" className="w-10 h-8" />
                    )}
                  </span>{' '}
                  <span
                    onClick={() => setDropdown(!dropdown)}
                    className="text-[18px] font-bold flex  w-full ml-[2vh] mt-[4px] "
                  >
                    <span className="text-gray-500"> Basic Details</span>{' '}
                    {dropdown ? (
                      <AiFillCaretDown
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    ) : (
                      <AiFillCaretUp
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    )}
                  </span>{' '}
                </div>
                {dropdown ? (
                  <>
                    <div className="block  text-left ml-36 pl-10 text-black">
                      <StepsValue
                        labels="First Name:"
                        value={allFormData?.basic_detail?.first_name || ''}
                      />
                      <StepsValue
                        labels="Middle Name:"
                        value={allFormData?.basic_detail?.middle_name || ''}
                      />
                      <StepsValue
                        labels="Last Name:"
                        value={allFormData?.basic_detail?.last_name || ''}
                      />
                      <StepsValue
                        labels="Class:"
                        value={allFormData?.basic_detail?.class_name || ''}
                      />

                      <StepsValue
                        labels="Section:"
                        value={allFormData?.basic_detail?.section_name || ''}
                      />
                      <StepsValue
                        labels="Dob:"
                        value={allFormData?.basic_detail?.dob || ''}
                      />
                      <StepsValue
                        labels="Admission date:"
                        value={allFormData?.basic_detail?.admission_date || ''}
                      />
                      <StepsValue
                        labels="Gender:"
                        value={allFormData?.basic_detail?.gender_name || ''}
                      />
                      <StepsValue
                        labels="Category:"
                        value={allFormData?.basic_detail?.category_name || ''}
                      />
                      <StepsValue
                        labels="Roll no:"
                        value={allFormData?.basic_detail?.roll_number || ''}
                      />

                      <StepsValue
                        labels="Disability:"
                        value={allFormData?.basic_detail?.disability_name || ''}
                      />
                      <StepsValue
                        labels="Religion:"
                        value={allFormData?.basic_detail?.religion_name || ''}
                      />
                      <StepsValue
                        labels="Caste:"
                        value={allFormData?.basic_detail?.caste_name || ''}
                      />
                      <StepsValue
                        labels="Mobile:"
                        value={allFormData?.basic_detail?.mobile || ''}
                      />
                      <StepsValue
                        labels="Aadhar no:"
                        value={allFormData?.basic_detail?.aadhar_no || ''}
                      />
                      <StepsValue
                        labels="Email:"
                        value={allFormData?.basic_detail?.email || ''}
                      />
                      <StepsValue
                        labels="Blood group:"
                        value={
                          allFormData?.basic_detail?.blood_group_name || ''
                        }
                      />

                      <StepsValue
                        labels="House/Ward:"
                        value={allFormData?.basic_detail?.ward_name || ''}
                      />
                      <StepsValue
                        labels="Concession type:"
                        value={
                          allFormData?.basic_detail?.concession_type_name || ''
                        }
                      />
                      <StepsValue
                        labels="Image:"
                        value={
                          allFormData?.basic_detail?.upload_image?.name || ''
                        }
                      />
                    </div>
                  </>
                ) : null}
              </div>
              <div className="m-1">
                <div className={`flex p-4`}>
                  {' '}
                  <span className="flex items-start justify-start">
                    {' '}
                    {allFormData.parent_detail ? (
                      <img src={Imgtick} alt="right" className="w-10 h-8" />
                    ) : (
                      <img src={Img9} alt="wrong" className="w-10 h-8" />
                    )}
                  </span>{' '}
                  <span
                    onClick={() => setSecondDropdown(!seconddropdown)}
                    className="text-[18px] font-bold flex  w-full ml-[2vh] text-gray-500  mt-[4px]"
                  >
                    <span className="text-gray-500">Parent Details</span>{' '}
                    {seconddropdown ? (
                      <AiFillCaretDown
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    ) : (
                      <AiFillCaretUp
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    )}
                  </span>
                </div>
                {seconddropdown ? (
                  <>
                    <div className="block  text-left ml-36 pl-10 text-black">
                      <StepsValue
                        labels="Father's name :"
                        value={allFormData?.parent_detail?.fathers_name || ''}
                      />
                      <StepsValue
                        labels="Father's mobile :"
                        value={allFormData?.parent_detail?.fathers_mobile || ''}
                      />
                      <StepsValue
                        labels="Father's qualification :"
                        value={
                          allFormData?.parent_detail
                            ?.fathers_qualification_name || ''
                        }
                      />
                      <StepsValue
                        labels="Father's occupation :"
                        value={
                          allFormData?.parent_detail?.fathers_occupation_name ||
                          ''
                        }
                      />
                      <StepsValue
                        labels="Father's email :"
                        value={allFormData?.parent_detail?.fathers_email || ''}
                      />
                      <StepsValue
                        labels="Father's annual income :"
                        value={
                          allFormData?.parent_detail?.fathers_annual_income ||
                          ''
                        }
                      />
                      <StepsValue
                        labels="Father's aadhar no :"
                        value={
                          allFormData?.parent_detail?.fathers_aadhar_no || ''
                        }
                      />

                      <StepsValue
                        labels="Father's image :"
                        value={
                          allFormData?.parent_detail?.fathers_image?.name || ''
                        }
                      />
                    </div>
                    <hr className="my-1 mx-8 ml-20" />
                    <div className="block  text-left ml-36 pl-10 text-black">
                      <StepsValue
                        labels="Mother's name :"
                        value={allFormData?.parent_detail?.mothers_name || ''}
                      />
                      <StepsValue
                        labels="Mother's mobile :"
                        value={allFormData?.parent_detail?.mothers_mobile || ''}
                      />
                      <StepsValue
                        labels="Mother's qualification :"
                        value={
                          allFormData?.parent_detail
                            ?.mothers_qualification_name || ''
                        }
                      />
                      <StepsValue
                        labels="Mother's occupation :"
                        value={
                          allFormData?.parent_detail?.mothers_occupation_name ||
                          ''
                        }
                      />
                      <StepsValue
                        labels="Mother's email :"
                        value={allFormData?.parent_detail?.mothers_email || ''}
                      />
                      <StepsValue
                        labels="Mother's annual income :"
                        value={
                          allFormData?.parent_detail?.mothers_annual_income ||
                          ''
                        }
                      />
                      <StepsValue
                        labels="Mother's aadhar no :"
                        value={
                          allFormData?.parent_detail?.mothers_aadhar_no || ''
                        }
                      />
                      <StepsValue
                        labels="Mother's image :"
                        value={
                          allFormData?.parent_detail?.mothers_image?.name || ''
                        }
                      />
                    </div>
                    <hr className="my-1 mx-8 ml-20" />
                    <div className="block  text-left ml-36 pl-10 text-black">
                      <StepsValue
                        labels="Guardian's name :"
                        value={allFormData?.parent_detail?.guardian_name || ''}
                      />
                      <StepsValue
                        labels="Guardian's mobile :"
                        value={
                          allFormData?.parent_detail?.guardian_mobile || ''
                        }
                      />
                      <StepsValue
                        labels="Guardian's qualification :"
                        value={
                          allFormData?.parent_detail
                            ?.guardian_qualification_name || ''
                        }
                      />
                      <StepsValue
                        labels="Guardian's occupation :"
                        value={
                          allFormData?.parent_detail
                            ?.guardian_occupation_name || ''
                        }
                      />
                      <StepsValue
                        labels="Guardian's email :"
                        value={allFormData?.parent_detail?.guardian_email || ''}
                      />
                      <StepsValue
                        labels="Guardian's annual income :"
                        value={
                          allFormData?.parent_detail?.guardian_annual_income ||
                          ''
                        }
                      />
                      <StepsValue
                        labels="Guardian's aadhar no :"
                        value={
                          allFormData?.parent_detail?.guardian_aadhar_no || ''
                        }
                      />
                      <StepsValue
                        labels="Relation :"
                        value={allFormData?.parent_detail?.relation || ''}
                      />
                    </div>
                  </>
                ) : null}
              </div>
              <div className="m-1">
                <div className={`flex  p-4`}>
                  {' '}
                  <span className="flex items-start justify-start">
                    {' '}
                    {allFormData.address ? (
                      <img src={Imgtick} alt="right" className="w-10 h-8" />
                    ) : (
                      <img src={Img9} alt="wrong" className="w-10 h-8" />
                    )}
                  </span>
                  <span
                    onClick={() => setThirdDropdown(!thirddropdown)}
                    className="text-[18px] font-bold flex  w-full ml-[2vh] text-gray-500  mt-[4px]"
                  >
                    <span className="text-gray-500">Address details</span>{' '}
                    {thirddropdown ? (
                      <AiFillCaretDown
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    ) : (
                      <AiFillCaretUp
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    )}
                  </span>{' '}
                </div>
                {thirddropdown ? (
                  <>
                    <div className="block  text-left ml-8 pl-10 text-black">
                      <h1 className="text-black font-bold text-[12px]">
                        Permanent address{' '}
                      </h1>
                    </div>
                    <hr className="my-1 mx-10 ml-16" />
                    <div className="block  text-left ml-36 pl-10 text-black">
                      <StepsValue
                        labels="Address 1 :"
                        value={allFormData?.address?.p_address1 || ''}
                      />
                      <StepsValue
                        labels="Address 2 :"
                        value={allFormData?.address?.p_address2 || ''}
                      />
                      <StepsValue
                        labels="Locality :"
                        value={allFormData?.address?.p_locality || ''}
                      />
                      <StepsValue
                        labels="Landmark :"
                        value={allFormData?.address?.p_landmark || ''}
                      />
                      <StepsValue
                        labels="District :"
                        value={allFormData?.address?.p_district_name || ''}
                      />
                      <StepsValue
                        labels="State :"
                        value={allFormData?.address?.p_state_name || ''}
                      />
                      <StepsValue
                        labels="Country :"
                        value={allFormData?.address?.p_country_name || ''}
                      />
                      <StepsValue
                        labels="Pincode :"
                        value={allFormData?.address?.p_pincode || ''}
                      />
                    </div>
                    <div className="block  text-left ml-8 pl-10 mt-4 text-black">
                      <h1 className="text-black font-bold text-[12px]">
                        Communication address{' '}
                      </h1>
                    </div>
                    <hr className="my-1 mx-10 ml-16" />
                    <div className="block  text-left ml-36 pl-10 text-black">
                      <StepsValue
                        labels="Address 1 :"
                        value={allFormData?.address?.c_address1 || ''}
                      />
                      <StepsValue
                        labels="Address 2 :"
                        value={allFormData?.address?.c_address2 || ''}
                      />
                      <StepsValue
                        labels="Locality :"
                        value={allFormData?.address?.c_locality || ''}
                      />
                      <StepsValue
                        labels="Landmark :"
                        value={allFormData?.address?.c_landmark || ''}
                      />
                      <StepsValue
                        labels="District :"
                        value={allFormData?.address?.c_district_name || ''}
                      />
                      <StepsValue
                        labels="State :"
                        value={allFormData?.address?.c_state_name || ''}
                      />
                      <StepsValue
                        labels="Country :"
                        value={allFormData?.address?.c_country_name || ''}
                      />
                      <StepsValue
                        labels="Pincode :"
                        value={allFormData?.address?.c_pincode || ''}
                      />
                    </div>
                  </>
                ) : null}
              </div>
              <div className="m-1">
                <div className={`flex  p-4`}>
                  {' '}
                  <span className="flex items-start justify-start">
                    {' '}
                    {allFormData?.bank_details ? (
                      <img src={Imgtick} alt="right" className="w-10 h-8" />
                    ) : (
                      <img src={Img9} alt="wrong" className="w-10 h-8" />
                    )}
                  </span>
                  <span
                    onClick={() => setForthDropdown(!forthdropdown)}
                    className="text-[18px] font-bold flex  w-full ml-[2vh] text-gray-500  mt-[4px]"
                  >
                    <span className="text-gray-500"> Bank Details</span>{' '}
                    {forthdropdown ? (
                      <AiFillCaretDown
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    ) : (
                      <AiFillCaretUp
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    )}
                  </span>{' '}
                </div>
                {forthdropdown ? (
                  <>
                    <div className="block  text-left ml-36 pl-10 text-black">
                      <StepsValue
                        labels="Account no :"
                        value={allFormData?.bank_details?.account_no || ''}
                      />
                      <StepsValue
                        labels="Bank name :"
                        value={allFormData?.bank_details?.bank_name || ''}
                      />
                      <StepsValue
                        labels="Ifsc code :"
                        value={allFormData?.bank_details?.ifsc_code || ''}
                      />
                      <StepsValue
                        labels="Branch name :"
                        value={allFormData?.bank_details?.branch_name || ''}
                      />
                    </div>
                  </>
                ) : null}
              </div>
              <div className="m-1">
                <div className={`flex  p-4`}>
                  {' '}
                  <span className="flex items-start justify-start">
                    {' '}
                    {allFormData.sibling_details ? (
                      <img src={Imgtick} alt="right" className="w-10 h-8" />
                    ) : (
                      <img src={Img9} alt="wrong" className="w-10 h-8" />
                    )}
                  </span>
                  <span
                    onClick={() => setFifthDropdown(!fifthdropdown)}
                    className="text-[18px] font-bold flex  w-full ml-[2vh] text-gray-500  mt-[4px]"
                  >
                    <span className="text-gray-500"> Sibling Details</span>{' '}
                    {fifthdropdown ? (
                      <AiFillCaretDown
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    ) : (
                      <AiFillCaretUp
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    )}
                  </span>{' '}
                </div>
                {fifthdropdown ? (
                  <>
                    {/* {JSON.stringify(allFormData.sibling_details)} */}
                    <div className="block  text-left ml-36 pl-10 text-black">
                      {allFormData.sibling_details?.map((item, index) => (
                        <div key={index}>
                          <StepsValue
                            labels="Sibling name :"
                            value={item.sibling_name || ''}
                          />
                          <StepsValue
                            labels="Sibling class :"
                            value={item.sibling_class || ''}
                          />
                          <StepsValue
                            labels="Sibling section :"
                            value={item.sibling_section || ''}
                          />
                          <StepsValue
                            labels="Admission no:"
                            value={item.sibling_admission_no || ''}
                          />
                          <StepsValue
                            labels="Roll no:"
                            value={item.roll_no || ''}
                          />

                          <hr className="ml-[-110px] text-[#4b5563] text-[1.8vh] w-full py-1" />
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
              <div className="m-1">
                <div className={`flex  p-4`}>
                  {' '}
                  <span className="flex items-start justify-start">
                    {' '}
                    {fam_data ? (
                      <img src={Imgtick} alt="right" className="w-10 h-8" />
                    ) : (
                      <img src={Img9} alt="wrong" className="w-10 h-8" />
                    )}
                  </span>
                  <span
                    onClick={() => setSixthDropdown(!sixthdropdown)}
                    className="text-[18px] font-bold flex  w-full ml-[2vh] text-gray-500  mt-[4px]"
                  >
                    <span className="text-gray-500"> Transport Details</span>{' '}
                    {sixthdropdown ? (
                      <AiFillCaretDown
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    ) : (
                      <AiFillCaretUp
                        size={18}
                        className="mt-1 ml-1 text-gray-500 "
                      />
                    )}
                  </span>{' '}
                </div>

                {sixthdropdown ? (
                  <>
                    <div className="block  text-left ml-36 pl-10 text-black">
                      <StepsValue
                        labels="Route :"
                        value={allFormData?.transport?.route_name || ''}
                      />
                      <StepsValue
                        labels="Pick poin :"
                        value={allFormData?.transport?.pick_point_name || ''}
                      />
                      {/* <StepsValue
                        labels="Bus no :"
                        value={allFormData?.transport?.bus_no || ""}
                      />
                      <StepsValue
                        labels="Application form :"
                        value={allFormData?.transport?.applicable_form || ""}
                      /> */}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h1 className="flex justify-center text-[3.2vh] text-gray-700 font-bold">
            Student Registration
          </h1>
          <h2 className="flex justify-center text-[2vh] text-gray-500 font-bold">
            Registration Form: Please provide the following information
          </h2>
        </div>
        <div className="w-full mt-[8vh] ml-[28%] absolute  max-[425px]:mt-[30%] max-[600px]:mx-[2%] max-[320px]:mt-[50%]">
          <div
            className={` absolute ${
              formIndex == 1 ? 'block' : 'hidden'
            } w-full pb-10`}
          >
            <StudentBasicDetail
              setFormDataFun={setFormDataFun}
              setCounterFun={setCounterFun}
            />
          </div>
          <div
            className={` absolute ${
              formIndex == 2 ? 'block' : 'hidden'
            } w-full pb-10`}
          >
            <ParentDetails
              setFormDataFun={setFormDataFun}
              setCounterFun={setCounterFun}
            />
          </div>
          <div
            className={` absolute ${
              formIndex == 3 ? 'block' : 'hidden'
            } w-full`}
          >
            <CommunicationAddress
              setFormDataFun={setFormDataFun}
              setCounterFun={setCounterFun}
            />
          </div>
          <div
            className={` absolute ${
              formIndex == 4 ? 'block' : 'hidden'
            } w-full`}
          >
            <BankDetail
              setFormDataFun={setFormDataFun}
              setCounterFun={setCounterFun}
            />
          </div>
          <div
            className={` absolute ${
              formIndex == 5 ? 'block' : 'hidden'
            } w-full`}
          >
            <SiblingDetails
              setFormDataFun={setFormDataFun}
              setCounterFun={setCounterFun}
            />
          </div>
          <div
            className={` absolute ${
              formIndex == 6 ? 'block' : 'hidden'
            } w-full`}
          >
            <Transport
              setFormDataFun={setFormDataFun}
              setCounterFun={setCounterFun}
              allFormData={allFormData}
              setFam_data={setFam_data}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const StepsValue = ({ labels, value }) => {
  return (
    <div>
      <label className=" ml-[-110px] text-[#4b5563] text-[1.8vh] ">
        {labels}{' '}
      </label>
      <label className="font-bold text-[1.8vh] text-[#6b7280]">{value}</label>
    </div>
  );
};
