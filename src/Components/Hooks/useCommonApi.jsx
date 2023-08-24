import React, { useEffect } from 'react';
import ApiHeader from '../ApiList/ApiHeader';
import ApiList from '../ApiList/ApiList';
import AxiosInterceptors from '../Common/AxiosInterceptors';
import activateBottomErrorCard from '../Common/BottomErrorCard';

export default function useCommonApi() {
  const [isLoading, setisLoading] = React.useState(false);
  const [categoryByNameData, setCategoryByNameData] = React.useState({});
  const [getPublicMiscellaneous, setPublicMiscellaneous] = React.useState({});
  const {
    api_getcategorybynameData,
    api_miscellaneous_online_student_registration
  } = ApiList();

  const getcategorybynameUser = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getcategorybynameData, {}, ApiHeader())
      .then(function (response) {
        console.log('Category By Name..', response?.data);
        if (response?.data) {
          setCategoryByNameData(response?.data);
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

  const PublicMiscellaneousData = () => {
    setisLoading(true);
    AxiosInterceptors.post(
      api_miscellaneous_online_student_registration,
      {},
      ApiHeader()
    )
      .then(function (response) {
        console.log('Category By Name..', response?.data);
        if (response?.data) {
          setPublicMiscellaneous(response?.data);
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
    getcategorybynameUser();
    PublicMiscellaneousData();
  }, []);

  return { isLoading, categoryByNameData, getPublicMiscellaneous };
}
