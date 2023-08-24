/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import {
  AiOutlineOrderedList,
  AiOutlineUserAdd,
  AiOutlineLayout,
  AiOutlineSetting
} from 'react-icons/ai';
import { GiTeacher } from 'react-icons/gi';
import { ImBooks } from 'react-icons/im';
import { CiBank } from 'react-icons/ci';
import { TbRoute } from 'react-icons/tb';
import { SiGoogleclassroom } from 'react-icons/si';
import { GiModernCity } from 'react-icons/gi';
import { HiOutlinePencilAlt, HiOutlineIdentification } from 'react-icons/hi';
import { FaBusAlt } from 'react-icons/fa';
import { AiFillCar } from 'react-icons/ai';
import { TbMan } from 'react-icons/tb';
import { TiNews } from 'react-icons/ti';
import { SlBookOpen } from 'react-icons/sl';
import { GrUserManager } from 'react-icons/gr';
import { BsVectorPen, BsCalendarDate, BsCardImage } from 'react-icons/bs';
// import {MdOutlineAssignmentInd} from "react-icons/im";
import {
  MdOutlineManageAccounts,
  MdOutlinePendingActions,
  MdDateRange,
  MdOutlineHolidayVillage
} from 'react-icons/md';

// import {  FaLocationDot } from "react-icons/Fa";
// import {BiBus } from "react-icons/Bi";
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import {
  MdEmojiTransportation,
  MdLocalActivity,
  MdOutlineAssignmentInd,
  MdDashboardCustomize
} from 'react-icons/md';
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
export const aadharRegExp = /^(\+\d{1,3}[- ]?)?\d{12}$/;
export const pinRegExp = /^(\+\d{1,3}[- ]?)?\d{6}$/;
export const yearExp = /^(\+\d{1,3}[- ]?)?\d{4}$/;
export const CATEGORY_REGEX = /^[A-Za-z ]*$/;
export const ADDRESS_REGEX = /^[A-Za-z0-9 ]*$/;
export const SUBCATEGORY_REGEX = /^[A-Za-z.+-]*$/;
export const NO_SPACE_REGEX = /^\S*$/;
export const disabilities = [
  {
    id: 1,
    value: 'yes'
  },
  {
    id: 2,
    value: 'no'
  }
];
export const months=[
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
]

const role = JSON.parse(sessionStorage.getItem('loginInfo'));

export const routes = [
  {
    id: '1',
    icon: <MdDashboardCustomize size={20} />,
    label: 'Dashboard',
    link: '/'
  },

  // Aadrika login
  ...(role?.roleId == 1
    ? [
        {
          icon: <AiOutlineSetting size={18} />,
          id: '2',
          label: 'masters',
          sub: [
            // {
            //   isCollaspe: true,
            //   id: '1',
            //   icons: <MdOutlineManageAccounts size={20} />,
            //   label: 'Department',
            //   link: '/department'
            // },

            {
              isCollaspe: true,
              id: '4',
              icons: <GiModernCity size={17} />,
              label: 'Country',
              link: '/country'
            },

            {
              isCollaspe: true,
              id: '5',
              icons: <GiModernCity size={17} />,
              label: 'State',
              link: '/state'
            },
            {
              isCollaspe: true,
              id: '6',
              icons: <GiModernCity size={17} />,
              label: 'City',
              link: '/city'
            },
            {
              isCollaspe: true,
              id: '7',
              icons: <CiBank size={18} />,
              label: 'Bank',
              link: '/bank'
            },

            {
              isCollaspe: true,
              id: '17',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Misc. Category',
              link: '/category'
            },
            {
              isCollaspe: true,
              id: '18',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Misc. Sub Category',
              link: '/sub-category'
            },
            {
              isCollaspe: true,
              id: '19',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Menu',
              link: '/menu-master'
            },
            {
              isCollaspe: true,
              id: '20',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Sub Menu',
              link: '/sub-menu-master'
            },

            {
              id: '24',
              icons: <TbMan size={20} />,
              label: 'Role',
              link: '/role',
              isCollaspe: false
            },
            {
              isCollaspe: true,
              id: '21',
              icons: <MdLocalActivity size={17} />,
              label: 'Fee Head Type',
              link: '/fee-head-type-demo'
            }
          ]
        },
        {
          id: '3',
          icon: <MdDashboardCustomize size={20} />,
          label: 'School',
          sub: [
            {
              isCollaspe: true,
              id: '1',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'School List',
              link: '/school-list'
            },
            {
              isCollaspe: true,
              id: '2',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'School Role Map',
              link: '/role-map-list'
            }
          ]
        }
      ]
    : []),

  // school
  ...(role?.roleId == 2
    ? [
        {
          icon: <AiOutlineSetting size={18} />,
          id: '2',
          label: 'masters',
          sub: [
            {
              isCollaspe: true,
              id: '8',
              icons: <SiGoogleclassroom size={17} />,
              label: 'Class',
              link: '/class'
            },
            {
              isCollaspe: true,
              id: '9',
              icons: <MdLocalActivity size={17} />,
              label: 'Class Section Map',
              link: '/demo-section'
            },

            {
              isCollaspe: true,
              id: 'de',
              icons: <MdLocalActivity size={17} />,
              label: 'Subject Mapping',
              link: '/demo-subject'
            },
            // {
            //   isCollaspe: true,
            //   id: '1',
            //   icons: <MdOutlineManageAccounts size={20} />,
            //   label: 'Department',
            //   link: '/department'
            // },
            {
              isCollaspe: true,
              id: '2',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Department',
              link: '/department-demo'
            },
            {
              isCollaspe: true,
              id: '3',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Extra Activities',
              link: '/extra-activity-demo'
            },
            {
              isCollaspe: true,
              id: '4',
              icons: <GiTeacher size={16} />,
              label: 'Teaching Title',
              link: '/teaching-title'
            },
            {
              isCollaspe: true,
              id: '5',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Employment Type',
              link: '/employement-type'
            },
            {
              isCollaspe: true,
              id: '6',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Exam Term',
              link: '/exam-term-demo'
            },
            {
              isCollaspe: true,
              id: '7',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Vehicle Type',
              link: '/vehicle-type-demo'
            },
            {
              isCollaspe: true,
              id: '8',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Vehicle List',
              link: '/vehicle-demo'
            },
            
            
            {
              isCollaspe: true,
              id: '9',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Pickup Point List',
              link: '/pickup-point-demo'
            },
           
           

            
            // {
            //   isCollaspe: true,
            //   id: '13',
            //   icons: <MdLocalActivity size={17} />,
            //   label: 'Demo Subject',
            //   link: '/demo-subject'
            // },

            {
              isCollaspe: true,
              id: '16',
              icons: <MdLocalActivity size={17} />,
              label: 'Route Name List',
              link: '/route-name-demo'
            },

            // {
            //   isCollaspe: true,
            //   id: '19',
            //   icons: <MdOutlineManageAccounts size={20} />,
            //   label: 'Menu',
            //   link: '/menu-master'
            // },
            // {
            //   isCollaspe: true,
            //   id: '20',
            //   icons: <MdOutlineManageAccounts size={20} />,
            //   label: 'Sub Menu',
            //   link: '/sub-menu-master'
            // },

            {
              id: '23',
              icons: <TbMan size={20} />,
              label: 'Driver',
              link: '/driver',
              isCollaspe: false
            },
            // {
            //   id: '24',
            //   icons: <TbMan size={20} />,
            //   label: 'Role',
            //   link: '/role',
            //   isCollaspe: false
            // }
          ]
        },

        {
          icon: <GiTeacher size={18} />,
          id: '4',
          label: 'Employee',
          sub: [
            // {
            //   isCollaspe: true,
            //   id: '1',
            //   icons: <MdOutlineManageAccounts size={20} />,
            //   label: 'Add Employee',
            //   link: '/employee/number'
            // },
            {
              isCollaspe: true,
              id: '2',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Add Employee',
              link: '/employee/number'
            },
            {
              isCollaspe: true,
              id: '1',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Add Bulk Employees',
              link: '/bulk-employees'
            },
            {
              isCollaspe: false,
              id: '3',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'View Employee',
              link: '/employee/view'
            },
            // {
            //   isCollaspe: false,
            //   id: '4',
            //   icons: <MdOutlineManageAccounts size={20} />,
            //   label: 'Add Employee Role',
            //   link: '/role/employee'
            // }
          ]
        },
        {
          icon: <MdOutlineAssignmentInd size={20} />,
          id: '5',
          label: 'Student',
          sub: [
            // {
            //   isCollaspe: true,
            //   id: '1',
            //   icons: <MdOutlineManageAccounts size={20} />,
            //   label: 'Add Student',
            //   link: '/student-number'
            // },
            {
              isCollaspe: true,
              id: '2',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Add Student',
              link: '/student-number'
            },
            {
              isCollaspe: true,
              id: '1',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Add Bulk Students',
              link: '/bulk-students'
            },
            {
              isCollaspe: false,
              id: '3',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'View Student',
              link: '/view-student-list'
            },
            // {
            //   isCollaspe: false,
            //   id: '4',
            //   icons: <MdOutlineManageAccounts size={20} />,
            //   label: 'Add Student Role',
            //   link: '/role/student'
            // }
          ]
        },
        {
          id: '6',
          icon: <FaRegMoneyBillAlt size={16} />,
          label: 'Fee',
          sub: [
            {
              isCollaspe: true,
              id: '16',
              icons: <MdLocalActivity size={17} />,
              label: 'Fee Head',
              link: '/fee-head-demo'
            },

            {
              isCollaspe: true,
              id: '14',
              icons: <MdLocalActivity size={17} />,
              label: 'Discount Group',
              link: '/discount-group-demo'
            },
            {
              isCollaspe: true,
              id: '15',
              icons: <MdLocalActivity size={17} />,
              label: 'Discount Group Map',
              link: '/discount-group-map-demo'
            },
            // {
            //   id: '1',
            //   icons: <BsVectorPen size={20} />,
            //   label: 'Fee Head Type Master',
            //   link: '/feeheadtype-master',
            //   isCollaspe: false
            // },
            // {
            //   id: '2',
            //   icons: <BsVectorPen size={20} />,
            //   label: 'Fee Head Master',
            //   link: '/feehead-master',
            //   isCollaspe: false
            // },
            // {
            //   id: '3',
            //   icons: <BsVectorPen size={20} />,
            //   label: 'Discount Group Master',
            //   link: '/discount-master',
            //   isCollaspe: false
            // },
            // {
            //   id: '4',
            //   icons: <FaRegMoneyBillAlt size={20} />,
            //   label: 'Discount Group Map',
            //   link: '/discount-group-map',
            //   isCollaspe: false
            // },
            {
              id: '5',
              icons: <HiOutlinePencilAlt size={20} />,
              label: 'Class Fee Master',
              link: '/classfee-master',
              isCollaspe: false
            },
            {
              id: '6',
              icons: <SlBookOpen size={18} />,
              label: 'Generate Demand',
              link: '/generate-demand',
              isCollaspe: false
            },
            // {
            //   id: '7',
            //   icons: <SlBookOpen size={18} />,
            //   label: 'Bulk Class Fee Master',
            //   link: '/bulk-classfee-master-form',
            //   isCollaspe: true
            // },
            {
              id: '8',
              icons: <SlBookOpen size={18} />,
              label: 'Fee Collection',
              link: '/fee-collection',
              isCollaspe: true
            }

            // {
            //   id: '8',
            //   label: 'Student Admission',
            //   link: '/student-admission',
            //   isCollaspe: false
            // }

            // {
            //   id: '8',
            //   label: 'Fee Definition Master',
            //   link: '/feedefinition-master',
            //   isCollaspe: false
            // },
          ]
        },
        {
          id: '7',
          icon: <MdEmojiTransportation size={25} />,
          label: 'Transport',
          sub: [
            // {
            //   id: '1',
            //   icons: <TbRoute size={20} />,
            //   label: 'Route Name',
            //   link: '/route',
            //   isCollaspe: true
            // },
            // {
            //   id: '2',
            //   icons: <TbRoute size={20} />,
            //   label: 'Pickup Point',
            //   link: '/pickup-point',
            //   isCollaspe: false
            // },
            // {
            //   isCollaspe: true,
            //   id: '3',
            //   icons: <FaBusAlt size={18} />,
            //   label: 'Vehicle type',
            //   link: '/vehicle-type'
            // },
            // {
            //   isCollaspe: true,
            //   id: '4',
            //   icons: <AiFillCar size={20} />,
            //   label: 'Vehicle',
            //   link: '/vehicle'
            // },

            {
              id: '6',
              icons: <GrUserManager size={20} />,
              label: 'Vehicle Incharge',
              link: '/vehicleincharge',
              isCollaspe: false
            }
            // {
            //   id: '7',
            //   icons: <TbRoute size={20} />,
            //   label: 'Drop Point',
            //   link: '/drop-point-list',
            //   isCollaspe: false
            // },
            // {
            //   id: '8',
            //   icons: <MdOutlinePendingActions size={20} />,
            //   label: 'Bus Fee Fine',
            //   link: '/busfeefine',
            //   isCollaspe: false
            // }
          ]
        },
        // {
        //   id: '8',
        //   icon: <MdDashboardCustomize size={20} />,
        //   label: 'User Roles',
        //   sub: [
        //     {
        //       id: '1',
        //       icons: <TbRoute size={20} />,
        //       label: 'Menu',
        //       link: '/menu',
        //       isCollaspe: true
        //     },
        //     {
        //       id: '2',
        //       icons: <TbRoute size={20} />,
        //       label: 'Sub Menu',
        //       link: '/sub-menu',
        //       isCollaspe: true
        //     }
        //   ]
        // },
        {
          id: '9',
          icon: <HiOutlineIdentification size={20} />,
          label: 'Id-Card',
          link: '/id-card'
        },
        {
          id: 'a',
          icon: <TiNews size={20} />,
          label: 'News/Event',
          link: '/news-event-forms'
        },
        {
          icon: <MdOutlineHolidayVillage size={20} />,
          id: 'b',
          label: 'Holidays',
          sub: [
            {
              isCollaspe: true,
              id: '1',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Add Holiday',
              link: '/holiday'
            }
            // {
            //   isCollaspe: true,
            //   id: '2',
            //   icons: <MdOutlineManageAccounts size={20} />,
            //   label: 'Add Bulk Holiday',
            //   link: '/holiday/bulk'
            // }
          ]
        },
        {
          id: 'c',
          icon: <MdDateRange size={20} />,
          label: 'Time Table',
          isCollaspe: false,
          sub: [
            {
              id: '1',
              icons: <TbRoute size={20} />,
              label: 'Add & Edit Time Table',
              link: '/add-time-table',
              isCollaspe: true
            }
            // {
            //   id: "2",
            //   icons: <TbRoute size={20} />,
            //   label: "View Time Table",
            //   link: "/view-time-table",
            //   isCollaspe: true,
            // },
          ]
        },
        {
          id: 'd',
          icon: <ImBooks size={18} />,
          label: 'Exmanination',
          isCollaspe: false,
          sub: [
            {
              id: '3',
              icons: <TbRoute size={20} />,
              label: 'Marks Entry',
              link: '/marks-entry-demo',
              isCollaspe: true
            },
            {
              id: '4',
              icons: <TbRoute size={20} />,
              label: 'Marks Tabulation',
              link: '/marks-tabulation',
              isCollaspe: true
            },
            // {
            //   id: '5',
            //   icons: <TbRoute size={20} />,
            //   label: 'Marks Tabulation Demo',
            //   link: '/marks-tabulation-demo',
            //   isCollaspe: true
            // }
          ]
        },
        {
          id: 'e',
          icon: <BsCalendarDate size={18} />,
          label: 'Attendance',
          isCollaspe: false,
          sub: [
            {
              id: '1',
              icons: <TbRoute size={20} />,
              label: 'Add Attendance',
              link: '/attendance',
              isCollaspe: true
            }
          ]
        },
        {
          id: 'f',
          icon: <BsCalendarDate size={18} />,
          label: 'Report',
          isCollaspe: false,
          sub: [
            {
              id: '1',
              icons: <TbRoute size={20} />,
              label: 'Payment Status',
              link: 'payment-status',
              isCollaspe: true
            },
            {
              id: '2',
              icons: <TbRoute size={20} />,
              label: 'Attendance Status',
              link: 'attendance-status',
              isCollaspe: true
            },
          ]
        },
        {
          id: 'g',
          icon: <BsCalendarDate size={18} />,
          label: 'Online Exam',
          isCollaspe: false,
          sub: [
            {
              id: '1',
              icons: <TbRoute size={20} />,
              label: 'Online Exam',
              link: 'online-exam',
              isCollaspe: true
            },
            
          ]
        },
        {
          id: 'h',
          icon: <BsCalendarDate size={18} />,
          label: 'E-Book',
          isCollaspe: false,
          sub: [
            {
              id: '1',
              icons: <TbRoute size={20} />,
              label: 'Add E-Book',
              link: '/add-ebook',
              isCollaspe: true
            },
            {
              id: '2',
              icons: <TbRoute size={20} />,
              label: 'View E-Book',
              link: '/view-ebook',
              isCollaspe: true
            }
          ]
        },
        {
          id: 'i',
          icon: <BsCardImage size={18} />,
          label: 'Image Gallery',
          isCollaspe: false,
          sub: [
            {
              id: '1',
              icons: <TbRoute size={20} />,
              label: 'Add Image',
              link: '/image-upload',
              isCollaspe: true
            },
            {
              id: '2',
              icons: <TbRoute size={20} />,
              label: 'View Image',
              link: '/view-image',
              isCollaspe: true
            }
          ]
        },
        // {
        //   id: 'j',
        //   icon: <BsCalendarDate size={18} />,
        //   label: 'Video Gallery',
        //   isCollaspe: false,
        //   sub: [
        //     {
        //       id: '1',
        //       icons: <TbRoute size={20} />,
        //       label: 'Add Video',
        //       link: '/video-upload',
        //       isCollaspe: true
        //     },
        //     {
        //       id: '2',
        //       icons: <TbRoute size={20} />,
        //       label: 'View Video',
        //       link: '/view-video',
        //       isCollaspe: true
        //     }
        //   ]
        // },
        {
          id: 'k',
          icon: <BsCalendarDate size={18} />,
          label: 'Library',
          isCollaspe: false,
          sub: [
            {
              id: '1',
              icons: <TbRoute size={20} />,
              label: 'Book Category',
              link: '/book-category',
              isCollaspe: true
            },
            {
              id: '2',
              icons: <TbRoute size={20} />,
              label: 'Book Details',
              link: '/book-data',
              isCollaspe: true
            },
            {
              id: '3',
              icons: <TbRoute size={20} />,
              label: 'Library Card',
              link: 'library-card',
              isCollaspe: true
            }
          ]
        },

      ]
    : []),

  // student routes
  ...(role?.roleId == 3
    ? [
        {
          id: 'f',
          icon: <BsCalendarDate size={18} />,
          label: 'Online Exam',
          isCollaspe: false,
          sub: [
            {
              id: '1',
              icons: <TbRoute size={20} />,
              label: 'Class Test',
              link: '/online-exam',
              isCollaspe: true
            },
            {
              id: '1',
              icons: <TbRoute size={20} />,
              label: 'Exam link',
              link: '/online-exam',
              isCollaspe: true
            }
          ]
        },

        {
          id: 'g',
          icon: <BsCalendarDate size={18} />,
          label: 'E-Book',
          isCollaspe: false,
          sub: [
            {
              id: '1',
              icons: <TbRoute size={20} />,
              label: 'Add E-Book',
              link: '/add-ebook',
              isCollaspe: true
            },
            {
              id: '2',
              icons: <TbRoute size={20} />,
              label: 'View E-Book',
              link: '/view-ebook',
              isCollaspe: true
            }
          ]
        },
        {
          id: 'h',
          icon: <BsCardImage size={18} />,
          label: 'Image Gallery',
          isCollaspe: false,
          sub: [
            {
              id: '1',
              icons: <TbRoute size={20} />,
              label: 'Add Image',
              link: '/image-upload',
              isCollaspe: true
            },
            {
              id: '2',
              icons: <TbRoute size={20} />,
              label: 'View Image',
              link: '/view-image',
              isCollaspe: true
            }
          ]
        },
        {
          id: 'i',
          icon: <BsCalendarDate size={18} />,
          label: 'Video Gallery',
          isCollaspe: false,
          sub: [
            {
              id: '1',
              icons: <TbRoute size={20} />,
              label: 'Add Video',
              link: '/video-upload',
              isCollaspe: true
            },
            {
              id: '2',
              icons: <TbRoute size={20} />,
              label: 'View Video',
              link: '/view-video',
              isCollaspe: true
            }
          ]
        }
      ]
    : []),

  // employee routes
  ...(role?.roleId != 1 && role?.roleId != 2 && role?.roleId !== 3
    ? [
        //
        {
          icon: <AiOutlineSetting size={18} />,
          id: '2',
          label: 'masters',
          sub: [
            {
              isCollaspe: true,
              id: '8',
              icons: <SiGoogleclassroom size={17} />,
              label: 'Class',
              link: '/class'
            },
            {
              isCollaspe: true,
              id: '9',
              icons: <MdLocalActivity size={17} />,
              label: 'Class Section Map',
              link: '/demo-section'
            },

            {
              isCollaspe: true,
              id: 'de',
              icons: <MdLocalActivity size={17} />,
              label: 'Subject Mapping',
              link: '/demo-subject'
            },
            // {
            //   isCollaspe: true,
            //   id: '1',
            //   icons: <MdOutlineManageAccounts size={20} />,
            //   label: 'Department',
            //   link: '/department'
            // },
            {
              isCollaspe: true,
              id: '2',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Department',
              link: '/department-demo'
            },
            {
              isCollaspe: true,
              id: '3',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Extra Activities ',
              link: '/extra-activity-demo'
            },
            {
              isCollaspe: true,
              id: '3',
              icons: <GiTeacher size={16} />,
              label: 'Teaching Title',
              link: '/teaching-title'
            },
            {
              isCollaspe: true,
              id: '2',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Employment Type',
              link: '/employement-type'
            },
            {
              isCollaspe: true,
              id: '4',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Exam Term',
              link: '/exam-term-demo'
            },
            {
              isCollaspe: true,
              id: '6',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Vehicle List',
              link: '/vehicle-demo'
            },
            {
              isCollaspe: true,
              id: '5',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Vehicle Type',
              link: '/vehicle-type-demo'
            },
            
            {
              isCollaspe: true,
              id: '7',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Pickup Point List',
              link: '/pickup-point-demo'
            },
           
           

            
            // {
            //   isCollaspe: true,
            //   id: '13',
            //   icons: <MdLocalActivity size={17} />,
            //   label: 'Demo Subject',
            //   link: '/demo-subject'
            // },

            {
              isCollaspe: true,
              id: '16',
              icons: <MdLocalActivity size={17} />,
              label: 'Route Name List',
              link: '/route-name-demo'
            },

            // {
            //   isCollaspe: true,
            //   id: '19',
            //   icons: <MdOutlineManageAccounts size={20} />,
            //   label: 'Menu',
            //   link: '/menu-master'
            // },
            // {
            //   isCollaspe: true,
            //   id: '20',
            //   icons: <MdOutlineManageAccounts size={20} />,
            //   label: 'Sub Menu',
            //   link: '/sub-menu-master'
            // },

            {
              id: '23',
              icons: <TbMan size={20} />,
              label: 'Driver',
              link: '/driver',
              isCollaspe: false
            },
            // {
            //   id: '24',
            //   icons: <TbMan size={20} />,
            //   label: 'Role',
            //   link: '/role',
            //   isCollaspe: false
            // }
          ]
        },
        //
        {
          icon: <GiTeacher size={18} />,
          id: '4',
          label: 'Employee',
          sub: [
            // {
            //   isCollaspe: true,
            //   id: '1',
            //   icons: <MdOutlineManageAccounts size={20} />,
            //   label: 'Add Employee',
            //   link: '/employee/number'
            // },
            {
              isCollaspe: true,
              id: '2',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Add Employee',
              link: '/employee/number'
            },
            {
              isCollaspe: true,
              id: '1',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Add Bulk Employees',
              link: '/bulk-employees'
            },
            {
              isCollaspe: false,
              id: '3',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'View Employee',
              link: '/employee/view'
            },
            {
              isCollaspe: false,
              id: '4',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Add Employee Role',
              link: '/role/employee'
            }
          ]
        },
        {
          icon: <MdOutlineAssignmentInd size={20} />,
          id: '5',
          label: 'Student',
          sub: [
            // {
            //   isCollaspe: true,
            //   id: '1',
            //   icons: <MdOutlineManageAccounts size={20} />,
            //   label: 'Add Student',
            //   link: '/student-number'
            // },
            {
              isCollaspe: true,
              id: '2',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Add Student',
              link: '/student-number'
            },
            {
              isCollaspe: true,
              id: '1',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Add Bulk Students',
              link: '/bulk-students'
            },
            {
              isCollaspe: false,
              id: '3',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'View Student',
              link: '/view-student-list'
            },
            {
              isCollaspe: false,
              id: '4',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Add Student Role',
              link: '/role/student'
            }
          ]
        },
        {
          id: '6',
          icon: <FaRegMoneyBillAlt size={16} />,
          label: 'Fee',
          sub: [
            {
              isCollaspe: true,
              id: '16',
              icons: <MdLocalActivity size={17} />,
              label: 'Fee Head',
              link: '/fee-head-demo'
            },
            {
              isCollaspe: true,
              id: '14',
              icons: <MdLocalActivity size={17} />,
              label: 'Discount Group',
              link: '/discount-group-demo'
            },
            {
              isCollaspe: true,
              id: '15',
              icons: <MdLocalActivity size={17} />,
              label: 'Discount Group Map',
              link: '/discount-group-map-demo'
            },

            {
              id: '5',
              icons: <HiOutlinePencilAlt size={20} />,
              label: 'Class Fee Master',
              link: '/classfee-master',
              isCollaspe: false
            },
            {
              id: '6',
              icons: <SlBookOpen size={18} />,
              label: 'Generate Demand',
              link: '/generate-demand',
              isCollaspe: false
            },
            {
              id: '7',
              icons: <SlBookOpen size={18} />,
              label: 'Fee Collection',
              link: '/fee-collection',
              isCollaspe: true
            }

            // {
            //   id: '8',
            //   label: 'Student Admission',
            //   link: '/student-admission',
            //   isCollaspe: false
            // }
          ]
        },
        {
          id: '7',
          icon: <MdEmojiTransportation size={25} />,
          label: 'Transport',
          sub: [
            {
              id: '6',
              icons: <GrUserManager size={20} />,
              label: 'Vehicle Incharge',
              link: '/vehicleincharge',
              isCollaspe: false
            }
          ]
        },

        {
          id: '9',
          icon: <HiOutlineIdentification size={20} />,
          label: 'Id-Card',
          link: '/id-card'
        },
        {
          id: 'a',
          icon: <TiNews size={20} />,
          label: 'News/Event',
          link: '/news-event-forms'
        },
        {
          icon: <MdOutlineHolidayVillage size={20} />,
          id: 'b',
          label: 'Holidays',
          sub: [
            {
              isCollaspe: true,
              id: '1',
              icons: <MdOutlineManageAccounts size={20} />,
              label: 'Add Holiday',
              link: '/holiday'
            }
            // {
            //   isCollaspe: true,
            //   id: '2',
            //   icons: <MdOutlineManageAccounts size={20} />,
            //   label: 'Add Bulk Holiday',
            //   link: '/holiday/bulk'
            // }
          ]
        },
        {
          id: 'c',
          icon: <MdDateRange size={20} />,
          label: 'Time Table',
          isCollaspe: false,
          sub: [
            {
              id: '1',
              icons: <TbRoute size={20} />,
              label: 'Add & Edit Time Table',
              link: '/add-time-table',
              isCollaspe: true
            }
            // {
            //   id: "2",
            //   icons: <TbRoute size={20} />,
            //   label: "View Time Table",
            //   link: "/view-time-table",
            //   isCollaspe: true,
            // },
          ]
        },
        {
          id: 'd',
          icon: <ImBooks size={18} />,
          label: 'Exmanination',
          isCollaspe: false,
          sub: [
            // {
            //   id: '2',
            //   icons: <TbRoute size={20} />,
            //   label: 'Marks Entry',
            //   link: '/marks-entry',
            //   isCollaspe: true
            // },
            {
              id: '3',
              icons: <TbRoute size={20} />,
              label: 'Marks Entry',
              link: '/marks-entry-demo',
              isCollaspe: true
            },

            {
              id: '4',
              icons: <TbRoute size={20} />,
              label: 'Marks Tabulation',
              link: '/marks-tabulation',
              isCollaspe: true
            }
            // {
            //   id: '5',
            //   icons: <TbRoute size={20} />,
            //   label: 'Marks Tabulation Demo',
            //   link: '/marks-tabulation-demo',
            //   isCollaspe: true
            // }
          ]
        },
        {
          id: 'e',
          icon: <BsCalendarDate size={18} />,
          label: 'Attendance',
          isCollaspe: false,
          sub: [
            {
              id: '1',
              icons: <TbRoute size={20} />,
              label: 'Add Attendance',
              link: '/attendance',
              isCollaspe: true
            }
          ]
        }
      ]
    : [])
];
