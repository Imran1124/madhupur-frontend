import React from 'react';
import Img11 from '../../assets/image 11.png';
import {
  TextField,
  CheckUserTextBox,
  CustomFileUpload,
  PasswordField
} from '../../Components/forms';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import { FaSchool } from 'react-icons/fa';

export default function BasicDetails({
  formik,
  getPublicMiscellaneous,
  setisLoading,
  activateBottomErrorCard
}) {
  const [checkUser, setCheckUser] = React.useState('');
  const [userLoading, setUserLoading] = React.useState(false);
  const { api_school_master_search_username } = ApiList();

  //
  const checkUsername = (nextValue) => {
    console.log('checkUsername', nextValue);
    setUserLoading(true);
    AxiosInterceptors.post(
      api_school_master_search_username,
      {
        userName: nextValue
      },
      ApiHeader()
    )
      .then(function (response) {
        console.log('section Data..', response?.data?.data);
        if (response?.data?.status) {
          setCheckUser(response?.data?.data);
        } else {
          setCheckUser('');
        }
        setUserLoading(false);
      })
      .catch(function (error) {
        console.log('==2 error list...', error);

        setUserLoading(false);
      });
  };

  //  debounce function
  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  //  searching function with debounce
  const debounceSearch = React.useCallback(
    debounce((nextValue) => checkUsername(nextValue), 1000),
    []
  );

  //  calling debounce function
  const handleSearch = (e) => {
    setCheckUser(e.target.value);
    debounceSearch(e.target.value);
  };

  return (
    <div>
      <div className="mt-8">
        <h1 className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280]  bg-white w-full ">
          <div className="flex">
            <FaSchool className="mr-3 w-10 h-10 opacity-80 text-blue-500" />
            <span className="flex items-center justify-center mt-2 text-[22px]">
              School Details
            </span>
          </div>
        </h1>
        {/* <hr className="mx-auto" /> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 text-start mt-3 border p-2">
        <div>
          <CheckUserTextBox
            label="User Name"
            name="userName"
            formik={formik}
            placeholder="User Name"
            isRequiredLabel
            isUserExits={checkUser}
            onInput={handleSearch}
            isLoading={userLoading}
            // onKeyDown={(evt) =>
            //   ['e', 'E', '+', '-', ' '].includes(evt.key) &&
            //   evt.preventDefault()
            // }
          />
        </div>
        <div>
          <TextField
            label="School Name"
            name="schoolName"
            formik={formik}
            placeholder="School Name"
            isRequiredLabel
          />
        </div>
        <div>
          <TextField
            label="Contact Person Name"
            name="contactPersonName"
            formik={formik}
            placeholder="Contact Person Name"
            isRequiredLabel
          />
        </div>
        <div>
          <TextField
            type="number"
            label="Contact Person Mobile"
            name="contactPersonMobile"
            formik={formik}
            placeholder="Contact Person Mobile"
            isRequiredLabel
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
          <TextField
            label="Contact Person Email"
            name="contactPersonEmail"
            formik={formik}
            placeholder="Contact Person Email"
            isRequiredLabel
            type="email"
          />
        </div>
        <div>
          <TextField
            label="Address"
            name="schoolAddress"
            formik={formik}
            placeholder="Address"
            isRequiredLabel
          />
        </div>
        <div>
          <TextField
            type="number"
            label="Pincode"
            name="pinCode"
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

        <div>
          <TextField
            label="School Code"
            name="schoolCode"
            formik={formik}
            placeholder="School Code"
          />
        </div>
        <div>
          <TextField label="Fax" name="fax" formik={formik} placeholder="Fax" />
        </div>

        {/* upload pic */}
        <div>
          <CustomFileUpload
            formik={formik}
            name="schoolLogo"
            label="Upload photo"
            accept=".jpg,.jpeg,.png"
          />
        </div>
        {/* upload pic */}
        <div>
          <PasswordField
            formik={formik}
            name="password"
            label="Password"
            placeholder="Password"
            isRequiredLabel
          />
        </div>
        <div>
          <PasswordField
            formik={formik}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
            isRequiredLabel
          />
        </div>
      </div>
    </div>
  );
}
