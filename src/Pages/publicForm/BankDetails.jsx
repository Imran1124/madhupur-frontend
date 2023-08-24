import { useState, useEffect } from 'react';
import { AiTwotoneBank } from 'react-icons/ai';
import { TextField, SelectField, UploadFile } from './forms';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';

export default function BasicDetails({
  formik,
  getPublicMiscellaneous,
  activateBottomErrorCard,
  setisLoading
}) {
  const [banks_name, setBanks_name] = useState([]);

  const { api_public_master_bank } = ApiList();

  useEffect(() => {
    getbankUser();
  }, []);
  const getbankUser = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_public_master_bank, {}, ApiHeader())
      .then(function (response) {
        console.log('Country Data..', response?.data?.data);
        if (response?.data?.status) {
          setBanks_name(response?.data?.data);
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

  return (
    <div>
      <div className="mt-8">
        <h1 className=" flex items-start justify-start pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280]  bg-white w-full ">
          <div className="flex">
            <AiTwotoneBank className="inline-block w-10 h-10 text-blue-400 mr-2" />

            <span className="flex items-center justify-center mt-2 text-[22px]">
              Bank Account Details
            </span>
          </div>
        </h1>
        {/* <hr className="mx-auto" /> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 text-start  border p-2">
        <div>
          <TextField
            type="number"
            label="Account no"
            name="account_no"
            formik={formik}
            onKeyDown={(evt) =>
              ['e', 'E', '+', '-', ' '].includes(evt.key) &&
              evt.preventDefault()
            }
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value, 10))
                .toString()
                .slice(0, 20);
            }}
          />
        </div>
        <div>
          <SelectField
            label="Bank Name"
            name="bank_id"
            selectedText="bank_name"
            formik={formik}
          >
            {banks_name?.map((data) => (
              <option value={data?.id}>{data?.bank_name}</option>
            ))}
          </SelectField>
        </div>
        <div>
          <TextField
            type="text"
            label="IFSC code"
            name="ifsc_code"
            formik={formik}
            placeholder="IFSC code"
            maxLength={10}
            onKeyDown={(evt) => [' '].includes(evt.key) && evt.preventDefault()}
            onInput={(evt) =>
              (evt.target.value = evt.target.value.toUpperCase())
            }
          />
        </div>
        <div>
          <TextField label="Branch name" name="branch_name" formik={formik} />
        </div>
      </div>
    </div>
  );
}
