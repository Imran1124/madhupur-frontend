// import React from 'react';
// import { Scheduler } from '@aldabil/react-scheduler';
// import moment from 'moment';

// export default function SchedulerComponent({ getSchedule }) {
//   console.log('log event', getSchedule);

//   return (
//     <Scheduler
//       events={getSchedule}
//       // week={{
//       //   // monday to saturday
//       //   // weekDays: [2, 3, 4, 5, 6, 7],
//       //   startHour: 9,
//       //   endHour: 20,
//       //   weekStartOn: 0,
//       //   weekDays: [1, 2, 3, 4, 5, 6]
//       // }}
//       viewerExtraComponent={(fields, event) => {
//         return (
//           <div>
//             <div className="text-sm text-gray-500">{event.employee}</div>
//             <div className="text-sm text-gray-500">{event.title}</div>
//           </div>
//         );
//       }}
//     />
//   );
// }

//
import { useState, useEffect, useReducer } from 'react';
import {
  TextField,
  Button,
  DialogActions,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  NativeSelect,
  OutlinedInput,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Scheduler } from '@aldabil/react-scheduler';
import moment from 'moment';
import ApiHeader from '../../Components/ApiList/ApiHeader';
import ApiList from '../../Components/ApiList/ApiList';
import AxiosInterceptors from '../../Components/Common/AxiosInterceptors';
import activateBottomErrorCard from '../../Components/Common/BottomErrorCard';

const CustomEditor = ({
  scheduler,
  mapEvent,
  setSchedularUpdate,
  setMapEvent,
  getState,
  getdepartmentUser,
  reducerValue,
  forceUpdate
}) => {
  const event = scheduler.edited;
  const {
    api_getEmployeeData,
    api_getactiveSubjectData,
    api_time_table_store,
    api_time_table_edit,
    api_getSectionGroupDataActiveAll
  } = ApiList();

  // Make your own form/state

  const [state, setState] = useState({
    title: event?.employee || '',
    employee: event?.employee || '',
    subjectId: event?.subjectId || '',
    subjectName: event?.subjectId || '',
    description: event?.description || '',
    start: event?.start || '',
    end: event?.end || ''
  });
  const [error, setError] = useState('');
  const [employeeList, setEmployeeList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [getBreak, setBreak] = useState('');

  const handleCheck = (e) => {
    setBreak(e.target.value);
  };

  const handleChange = (value, name) => {
    setState((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  // useEffect(()=>{
  //   getdepartmentUser()
  //   setSchedularUpdate(false);
  // },[schedularUpdate])
  console.log('log event', state.title);
  const handleSubmit = async () => {
    try {
      setisLoading(true);
      // scheduler.loading(true);
      const added_updated_event = await new Promise((res) => {
        /**
         * Make sure the event have 4 mandatory fields
         * event_id: string|number
         * title: string
         * start: Date|string
         * end: Date|string
         */
        setTimeout(() => {
          res({
            event_id: event?.event_id,
            title: state.title,
            start: scheduler.state.start.value,
            end: scheduler.state.end.value,
            // convert shecduler state to Date object
            // start: new Date(
            //   new Date(
            //     new Date().setHours(parseInt(state.start.split(':')[0]))
            //   ).setMinutes(parseInt(state.start.split(':')[1]))
            // ),
            // end: new Date(
            //   new Date(
            //     new Date().setHours(parseInt(state.end.split(':')[0]))
            //   ).setMinutes(parseInt(state.end.split(':')[1]))
            // ),
            description: state.description,
            employee: state.employee,
            subjectId: state.subjectId,
            subjectName: state.subjectName
          });
        }, 2000);
      });

      // console.log('apicall', {
      //   empId: parseInt(added_updated_event?.title),
      //   subjectId: parseInt(added_updated_event?.subjectId),
      //   day: moment(added_updated_event?.start).format('dddd'),
      //   date: moment(added_updated_event?.start).format('DD-MM-YYYY'),
      //   startTime: moment(added_updated_event?.start).format('hh:mm A'),
      //   endTime: moment(added_updated_event?.end).format('hh:mm A'),
      //   description: added_updated_event?.description,
      //   classId: getState?.class_id,
      //   sectionId: getState?.section_id
      // });
      scheduler.onConfirm(
        added_updated_event,
        event
          ? AxiosInterceptors.post(
              api_time_table_edit,
              {
                id: parseInt(added_updated_event?.event_id),
                empId: parseInt(added_updated_event?.title),
                subjectId: added_updated_event?.subjectId,
                day: moment(added_updated_event?.start).format('dddd'),
                ttDate: moment(added_updated_event?.start).format('DD-MM-YYYY'),
                startTime: moment(added_updated_event?.start).format('hh:mm A'),
                endTime: moment(added_updated_event?.end).format('hh:mm A'),
                description: added_updated_event?.description,
                classId: getState?.class_id,
                sectionId: getState?.section_id
              },
              ApiHeader()
            )
              .then(function (response) {
                // console.log(response?.data?.data);
                // window.location.reload();
                setSchedularUpdate(true);
                if (response?.data?.status == true) {
                  setSection(response?.data?.data);
                  getdepartmentUser();
                  setSchedularUpdate(true);
                  forceUpdate();
                } else {
                  activateBottomErrorCard(
                    true,
                    'Error occured while fetching data.'
                  );
                }
                setisLoading(false);
              })
              .catch(function (error) {
                activateBottomErrorCard(
                  true,
                  'Error occured while fetching data.'
                );

                setisLoading(false);
              })
          : AxiosInterceptors.post(
              api_time_table_store,
              {
                empId: parseInt(added_updated_event?.title),
                subjectId: added_updated_event?.subjectId,
                day: moment(added_updated_event?.start).format('dddd'),
                ttDate: moment(added_updated_event?.start).format('DD-MM-YYYY'),
                startTime: moment(added_updated_event?.start).format('hh:mm A'),
                endTime: moment(added_updated_event?.end).format('hh:mm A'),
                description: added_updated_event?.description,
                classId: getState?.class_id,
                sectionId: getState?.section_id
              },
              ApiHeader()
            )
              .then(function (response) {
                // window.location.reload();
                // console.log(response?.data?.data);
                setSchedularUpdate(true);
                if (response?.data?.status == true) {
                  // getdepartmentUser();
                  setSection(response?.data?.data);
                  getdepartmentUser();
                  setSchedularUpdate(true);
                  forceUpdate();
                } else {
                  activateBottomErrorCard(
                    true,
                    'Error occured while fetching data.'
                  );
                }
                setisLoading(false);
              })
              .catch(function (error) {
                activateBottomErrorCard(
                  true,
                  'Error occured while fetching data.'
                );

                setisLoading(false);
              })
      );
      console.log('Saving...', added_updated_event);
      // callback(added_updated_event);
      // setisLoading(true);
      getdepartmentUser();
      scheduler.close();
    } finally {
      scheduler.loading(false);
      setisLoading(false);
    }
  };

  // const handleSet = (data) => {
  //   setMapEvent((prev) => [
  //     ...prev,
  //     {
  //       title: data.title,
  //       start: data.start,
  //       end: data.end,
  //       description: data.description,
  //       employee: data.employee,
  //       subjectId: data.subjectId,
  //       subjectName: data.subjectName
  //     }
  //   ]);
  // };

  // useEffect(() => {
  //   // You can use this to map your event to the form
  //   setMapEvent((prev) => [
  //     ...prev,
  //     {
  //       title: state.title,
  //       start: scheduler.state.start.value,
  //       end: scheduler.state.end.value,
  //       description: state.description,
  //       employee: state.employee
  //     }
  //   ]);
  // }, [event]);

  useEffect(() => {
    // You can use this to map your event to the form
    console.log('mapEvent', mapEvent);
  }, [mapEvent]);

  //
  const getEmployeeList = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getEmployeeData, {}, ApiHeader())
      .then(function (response) {
        console.log('emp', response);
        if (response?.data?.status == true) {
          setEmployeeList(response?.data?.data);
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
  console.log("emp2",employeeList)
  //
  const getSubjectList = () => {
    setisLoading(true);
    AxiosInterceptors.post(api_getactiveSubjectData, {}, ApiHeader())
      .then(function (response) {
        console.log('subject', response?.data?.data);
        if (response?.data?.status == true) {
          setSubjectList(response?.data?.data);
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
    getEmployeeList();
    getSubjectList();
  }, []);

  const handleChangeEmployee = (e) => {
    let selectName = e.target.selectedOptions[0].text;
    let selectedValue = e.target.selectedOptions[0].value;
    console.log(selectName, selectedValue);
    setState((prev) => {
      return {
        ...prev,
        title: selectedValue,
        employee: selectName
      };
    });
  };

  const handleSubjectChange = (e) => {
    let selectName = e.target.selectedOptions[0].text;
    let selectedValue = e.target.selectedOptions[0].value;
    console.log(selectName, selectedValue);
    setState((prev) => {
      return {
        ...prev,
        subjectId: selectedValue,
        subjectName: selectName
      };
    });
  };

  return (
    <div>
      {isLoading && (
        <span
          className="
        flex justify-center items-center h-[30vh] overflow-auto w-full bg-white z-50 absolute opacity-70 
      "
        >
          Loading...
        </span>
      )}
      <div style={{ padding: '1rem' }}>
        <p className="py-1">Add & Edit Time Table</p>

        {/* <FormControlLabel
          control={
            <Checkbox
              value="Lunch"
              checked={getBreak == 'Lunch' ? true : false}
              onChange={handleCheck}
              name="checkedB"
              color="primary"
            />
          }
          label="Break"
        />
        <FormControlLabel
          control={
            <Checkbox
              value="Holiday"
              checked={getBreak == 'Holiday' ? true : false}
              onChange={handleCheck}
              name="checkedB"
              color="primary"
            />
          }
          label="Holiday"
        />
        {getBreak == '' ? (
          <>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Employee
              </InputLabel>
              <NativeSelect
                value={state.title}
                onChange={handleChangeEmployee}
                error={!!error}
                helperText={error}
                fullWidth
                input={<OutlinedInput label="Select Employee" />}
                sx={{
                  mb: 2
                }}
              >
                <option value="">Select Employee</option>
                {employeeList?.map((item, index) => {
                  return (
                    <option key={index} value={item?.id}>
                      {item?.first_name}
                    </option>
                  );
                })}
              </NativeSelect>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Subject
              </InputLabel>
              <NativeSelect
                value={state.subjectId}
                onChange={handleSubjectChange}
                error={!!error}
                helperText={error}
                fullWidth
                input={<OutlinedInput label="Select Subject" />}
                sx={{
                  mb: 2
                }}
              >
                <option value="" disabled>
                  Select Subject
                </option>
                {subjectList?.map((item, index) => {
                  return (
                    <option key={index} value={item?.id}>
                      {item?.subject_name}
                    </option>
                  );
                })}
              </NativeSelect>
            </FormControl>
          </>
        ) : null} */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Teacher</InputLabel>
          <NativeSelect
            value={state.title}
            onChange={handleChangeEmployee}
            error={!!error}
            // helperText={error}
            fullWidth
            input={<OutlinedInput label="Select Teacher" />}
            sx={{
              mb: 2
            }}
          >
            <option value="">Select Teacher</option>
            {employeeList && employeeList?.data?.map((item, index) => {
              return (
                <option key={index} value={item?.id}>
                  {item?.first_name}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Subject</InputLabel>
          <NativeSelect
            value={state.subjectId}
            onChange={handleSubjectChange}
            error={!!error}
            // helperText={error}
            fullWidth
            input={<OutlinedInput label="Select Subject" />}
            sx={{
              mb: 2
            }}
          >
            <option value="" disabled>
              Select Subject
            </option>
            {subjectList?.map((item, index) => {
              return (
                <option key={index} value={item?.subject_name}>
                  {item?.subject_name}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
        {/* <TextField
          label="Subject"
          value={state.subjectId}
          onChange={(e) => handleChange(e.target.value, 'subjectId')}
          error={!!error}
          helperText={error}
          fullWidth
          sx={{
            mb: 2
          }}
          select
        >
          <MenuItem value="">Select</MenuItem>
          {subjectList?.map((item, index) => {
            return (
              <MenuItem key={index} value={item?.id}>
                {item?.subject_name}
              </MenuItem>
            );
          })}
        </TextField> */}

        <TextField
          label="Description"
          value={state.description}
          onChange={(e) => handleChange(e.target.value, 'description')}
          fullWidth
          sx={{
            mb: 2
          }}
        />
        {/* <TextField
          type="time"
          value={state.start}
          onChange={(e) => handleChange(e.target.value, 'start')}
          fullWidth
          sx={{
            mb: 2
          }}
        /> */}
        {/* <TextField
          type="time"
          value={state.end}
          onChange={(e) => handleChange(e.target.value, 'end')}
          fullWidth
          sx={{
            mb: 2
          }}
        /> */}
      </div>
      <DialogActions>
        <Button onClick={scheduler.close}>Cancel</Button>
        <Button onClick={handleSubmit}>Confirm</Button>
      </DialogActions>
    </div>
  );
};

function SchedulerCalender({
  getSchedule,
  isLoading,
  setisLoading,
  classId,
  sectionId,
  getdepartmentUser,
  getState,
  setState,
  setSchedularUpdate
}) {
  const [refetchValue, forceUpdate] = useReducer(false);
  const { api_time_table_edit, api_time_table_delete } = ApiList();

  const handleDrop = (event, i, o) => {
    // console.log('event', event);
    // console.log('I', i);
    // console.log('O', o);
    const { event_id, start, end } = event;
    console.log('event', i);
    // const newEvents = getSchedule.map((item) => {
    //   if (item.event_id == event_id) {
    //     return {
    //       ...item,
    //       start,
    //       end
    //     };
    //   }
    //   return item;
    // });
    // console.log('newEvents', i);

    const reqBody = {
      id: i.event_id,
      empId: i.employee,
      classId: parseInt(classId),
      sectionId: parseInt(sectionId),
      subjectId: i.subjectId,
      day: moment(i.start).format('dddd'),
      description: i.description,
      startTime: moment(i.start).format('hh:mm A'),
      endTime: moment(i.end).format('hh:mm A'),
      ttDate: moment(i.start).format('DD-MM-YYYY')
      // newEvents[0].start
    };

    console.log('reqBody', reqBody);

    setisLoading(true);
    AxiosInterceptors.post(api_time_table_edit, reqBody, ApiHeader())
      .then(function (response) {
        // window.location.reload();
        // console.log(response?.data?.data);
        setSchedularUpdate(true);
        if (response?.data?.status == true) {
          setSection(response?.data?.data);

          // getdepartmentUser();
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

  const handleDelete = async (event, i) => {
    // api_time_table_delete
    AxiosInterceptors.post(
      api_time_table_delete,
      {
        id: parseInt(event),
        status: 'deactive'
      },
      ApiHeader()
    )
      .then(function (response) {
        setSchedularUpdate(true);
        // window.location.reload();
        // console.log(response?.data?.data);
        if (response?.data?.status == true) {
          setSection(response?.data?.data);

          // getdepartmentUser();
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

  console.log('getSchedule', getSchedule);
  return (
    <>
      <Scheduler
        // onEventClick={(e, i) => console.log('e', e, 'i', i)}
        // onDelete={(e, i) => console.log('e', e, 'i', i)}
        // sunday disabled
        // hide dates
        onDelete={(e, i) => handleDelete(e, i)}
        hourFormat="12"
        onEventDrop={(e, i, o) => handleDrop(e, i, o)}
        events={getSchedule || []}
        week={{
          // monday to saturday
          // weekDays: [2, 3, 4, 5, 6, 7],
          startHour: 8,
          endHour: 18,
          weekStartOn: 0,
          weekDays: [1, 2, 3, 4, 5, 6]
        }}
        // viewerTitleComponent={(props) => {
        //   return (
        //     <div>
        //       <h3>EventData</h3>
        //       <p>Demo</p>
        //     </div>
        //   );
        // }}

        recourseHeaderComponent={(props) => {
          return (
            <div>
              <h3 className="text-gray-900">EventData</h3>
              <p>Demo</p>
            </div>
          );
        }}
        // disableViewNavigator

        customEditor={(scheduler) => (
          <CustomEditor
            scheduler={scheduler}
            getState={getState}
            setState={setState}
            getdepartmentUser={getdepartmentUser}
            setisLoading={setisLoading}
            forceReducer={forceUpdate}
            reducerValue={refetchValue}
            setSchedularUpdate={setSchedularUpdate}
          />
        )}
        draggable={true}
        viewerExtraComponent={(fields, event) => {
          return (
            <div>
              <p>Teachers</p>
              <p>Employee: {event?.title || 'Nothing...'}</p>

              <p>Description: {event.description || 'Nothing...'}</p>
            </div>
          );
        }}
      />
    </>
  );
}

export default SchedulerCalender;
