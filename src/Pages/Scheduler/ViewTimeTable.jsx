import React, { useEffect, useState, useReducer } from 'react';
import { TextField, MenuItem } from '@mui/material';
import SchedulerComponent from './Scheduler';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import moment from 'moment';
import BarLoader from '../../Components/Common/BarLoader';
import activateBottomErrorCard from '../../Components/Common/BottomErrorCard';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';

export default function ViewScheduler() {
  const {
    api_getactiveClassData,
    api_getSectionData,
    api_time_table_active_all,

    api_getactiveSectionGroupData
  } = ApiList();
  const [isLoad, setisLoading] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [getClass, setClass] = useState([]);
  const [getSection, setSection] = useState([]);
  const [schedularUpdate, setSchedularUpdate] = useState(false);
  const [getState, setState] = useState({
    class_id: 1,
    section_id: 1
  });
  const [getSchedule, setSchedule] = useState([]);
  const [erroState, seterroState] = useState(false);
  const getSectionData = () => {
    setisLoading(true);
    AxiosInterceptors.post(
      api_getactiveSectionGroupData,
      {
        classId: getState?.class_id
      },
      ApiHeader()
    )
      .then(function (response) {
        // console.log(response?.data?.data);
        if (response?.data?.status == true) {
          setSection(response?.data?.data);
        } else {
          activateBottomErrorCard(true, 'Error occured while fetching data.');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        activateBottomErrorCard(true, 'Error occured while fetching data.');

        setisLoading(false);
      });
  };

  const getClassData = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getactiveClassData, {}, ApiHeader())
      .then(function (response) {
        // console.log(response?.data?.data);
        if (response?.data?.status == true) {
          setClass(response?.data?.data);
        } else {
          activateBottomErrorCard(true, 'Error occured while fetching data.');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        activateBottomErrorCard(true, 'Error occured while fetching data.');

        setisLoading(false);
      });
  };

  const getdepartmentUser = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_time_table_active_all, {}, ApiHeader())
      .then(function (response) {
        console.log('fetch active all', response?.data?.data);
        if (response?.data?.status == true) {
          setSchedule(
            response?.data?.data.map((item) => {
              console.log('date', parseInt(item?.tt_date.split('-')[2]));
              return {
                event_id: item?.id,
                title: item?.full_name + ' - ' + item?.subject_name,
                employee: item?.emp_id,
                description: item?.description,
                subjectId: item?.subject_name,
                start: moment()
                  .set({
                    // SPLIT TIME
                    date: parseInt(parseInt(item?.tt_date.split('-')[0])),
                    hour: parseInt(item?.start_time.split(':')[0]),
                    minute: parseInt(item?.start_time.split(':')[1])
                  })
                  .toDate(),
                end: moment()
                  .set({
                    // SPLIT TIME
                    date: parseInt(parseInt(item?.tt_date.split('-')[0])),
                    hour: parseInt(item?.end_time.split(':')[0]),
                    minute: parseInt(item?.end_time.split(':')[1])
                  })
                  .toDate(),
                disabled: item?.disabled,
                color: 'blue'
              };
            })
          );
        } else {
          activateBottomErrorCard(true, 'Error occured while fetching data.');
        }
        setisLoading(false);
      })
      .catch(function (error) {
        activateBottomErrorCard(true, 'Error occured while fetching data.');

        setisLoading(false);
      });
  };
  useEffect(() => {
    getdepartmentUser();
    setSchedularUpdate(false);
  }, [schedularUpdate]);

  console.log(schedularUpdate);
  useEffect(() => {
    getdepartmentUser();
    getClassData();
  }, []);

  useEffect(() => {
    if (getState?.class_id != '') {
      getSectionData();
    }
  }, [getState?.class_id]);

  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg);
    seterroState(state);
  };

  return (
    <>
      {isLoad ? (
        <BarLoader />
      ) : erroState ? (
        <BottomErrorCard
          activateBottomErrorCard={activateBottomErrorCard}
          errorTitle={erroMessage}
        />
      ) : (
        <div className={`w-full col-span-10 2xl:py-3 2xl:px-6 px-6 py-2`}>
          <div className="border-[2px] border-gray-200 rounded-md h-[80vh] overflow-auto 2xl:p-6 p-4 ">
            <div className="">
              {/* {JSON.stringify(getState?.class_id)}
              {JSON.stringify(getState?.section_id)} */}
              <div className="flex w-full justify-between items-center max-[870px]:block">
                <div className="flex flex-col">
                  <span className="text-3xl text-center font-semibold text-gray-600 flex flex-start">
                    View time table
                  </span>
                  <span className="text-sm text-center font-medium text-teal-600">
                    Unlock Your Potential. Join Our Journey Of Education And
                    Excellence
                  </span>
                </div>
                <div className="flex gap-6 mt-4 md:mt-0 flex-col lg:flex-row">
                  <div>
                    <TextField
                      select
                      id="outlined-basic"
                      label="Class"
                      variant="outlined"
                      size="small"
                      onChange={(e) =>
                        setState({
                          ...getState,
                          class_id: e.target.value
                        })
                      }
                      value={getState.class_id}
                      fullWidth
                      sx={{
                        mb: 2,
                        width: '200px'
                      }}
                    >
                      {getClass.map((item) => {
                        return (
                          <MenuItem value={item?.id}>
                            {item?.class_name}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </div>
                  {/* <div>
                    <TextField
                      select
                      id="outlined-basic"
                      label="Section"
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={(e) =>
                        setState({
                          ...getState,
                          section_id: e.target.value
                        })
                      }
                      value={getState.section_id}
                      sx={{
                        mb: 2,
                        width: '200px'
                      }}
                    >
                      {getSection.map((item) => {
                        return (
                          <MenuItem value={item?.id}>
                            {item?.section_name}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </div> */}
                </div>
              </div>
            </div>
            <hr className="mx-auto mt-1" />
            {getSchedule.length >= 0 && (
              <SchedulerComponent
                getSchedule={getSchedule}
                isLoading={isLoad}
                setisLoading={setisLoading}
                classId={getState.class_id}
                sectionId={getState.section_id}
                getdepartmentUser={getdepartmentUser}
                setState={setState}
                getState={getState}
                schedularUpdate={schedularUpdate}
                setSchedularUpdate={setSchedularUpdate}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
