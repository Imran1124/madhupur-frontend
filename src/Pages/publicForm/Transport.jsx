import { useState, useEffect } from 'react';
import { IoMdBus } from 'react-icons/io';
import { TextField, SelectField, UploadFile } from './forms';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';

export default function BasicDetails({
  formik,
  activateBottomErrorCard,
  setisLoading
}) {
  const [getRoute, setRoute] = useState([]);
  const [getPickupPoint, setPickupPoint] = useState([]);
  const { api_public_master_pickup_point, api_public_master_route } = ApiList();

  const getRouteData = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_public_master_route, {}, ApiHeader())
      .then(function (response) {
        console.log('Country Data..', response?.data?.data);
        if (response?.data?.status) {
          setRoute(response?.data?.data);
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

  const getPickupPointData = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_public_master_pickup_point, {}, ApiHeader())
      .then(function (response) {
        console.log('Country Data..', response?.data?.data);
        if (response?.data?.status) {
          setPickupPoint(response?.data?.data);
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
    getRouteData();
    getPickupPointData();
  }, []);

  return (
    <div>
      <div className="mt-8">
        <h1 className="pt-2 my-1 font-bold text-[2.5vh]  text-[#6b7280]  bg-white w-full ">
          <div className="lg:flex lg:justify-between">
            {'  '}
            <span className="flex items-center mt-2 text-[22px]">
              <IoMdBus className="inline-block w-10 h-10 text-blue-400 mr-2" />
              Transport
            </span>
            <div className="gap-1 flex items-center justify-center mt-3 text-[22px]">
              <input
                id="check"
                name="check"
                type="checkbox"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                {...formik.getFieldProps('is_transport')}
              />
              <span className="font-bold text-gray-600 text-[16px] w-full">
                Note:If you want to use transport facility (Please Tick)
              </span>
            </div>
          </div>
        </h1>
        <hr className="mx-auto" />
      </div>
      {formik.values.is_transport && (
        <div className="grid grid-cols-1 lg:grid-cols-2 text-start  border p-2">
          <div>
            <SelectField
              label="Route"
              name="route_id"
              selectedText="route_name"
              formik={formik}
            >
              {getRoute?.map((data) => (
                <option value={data?.id}>{data?.route_name}</option>
              ))}
            </SelectField>
          </div>
          <div>
            <SelectField
              label="Pickup point"
              name="pickup_point_id"
              selectedText="pickup_point_name"
              formik={formik}
            >
              {getPickupPoint?.map((data) => (
                <option value={data?.id}>{data?.pickup_point_name}</option>
              ))}
            </SelectField>
          </div>
        </div>
      )}
    </div>
  );
}
