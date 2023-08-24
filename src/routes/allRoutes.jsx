/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React from 'react';
import RoleBasedGuard from '../guard/Rolebase';
import BookData from '../Pages/BookData.jsx/BookData';
import LibraryCard from '../Pages/LibraryCard/LibraryCard';
import NewReceipt from '../Pages/Fee/FeeCollection/NewReceipt';
import BookCategory from '../Pages/BookCategory/BookCategory';
const Login = React.lazy(() => import('../Pages/Auth/User/LoginAuth'));
const LoginSuperAdmin = React.lazy(() =>
  import('../Pages/Auth/SuperAdmin/LoginSuperAdmin')
);
const LoginAadrika = React.lazy(() =>
  import('../Pages/Auth/Aadrika/LoginUser')
);
const RoleBasedEmployee = React.lazy(() =>
  import('../Pages/RoleBasedEmployee/index')
);
const RoleBasedStudent = React.lazy(() =>
  import('../Pages/RoleBasedStudent/index')
);
const Registration = React.lazy(() => import('../Pages/Auth/registration'));
const Profile = React.lazy(() => import('../Pages/Profile/index'));
const SchoolList = React.lazy(() => import('../Pages/SchoolList/index'));
const PasswordReset = React.lazy(() =>
  import('../Pages/Auth/PasswordReset/index')
);

const CategoryData = React.lazy(() =>
  import('../Pages/CategoryData/CategoryData')
);
const SubCategoryData = React.lazy(() =>
  import('../Pages/SubCategoryData/SubCategoryData')
);
const LatestLangingPage = React.lazy(() =>
  import('../Pages/landingpages/index')
);
const CountryData = React.lazy(() =>
  import('../Pages/CountryData/CountryData')
);
const StateData = React.lazy(() => import('../Pages/StateData/StateData'));
const StateDataForm = React.lazy(() =>
  import('../Pages/StateData/StateDataForm')
);
const DistrictData = React.lazy(() =>
  import('../Pages/DistrictData/DistrictData')
);

// new masters single page
const DiscountGroupDemo = React.lazy(() =>
  import('../Pages/DiscountGroupDemo/DiscountGroupDemo')
);

const DiscountGroupMapDemo = React.lazy(() =>
  import('../Pages/DiscountGroupMapDemo/DiscountGroupMapDemo')
);
const DepartmentDataDemo = React.lazy(() =>
  import('../Pages/DepartmentDataDemo/DepartmentDataDemo')
);
const FeeHeadTypeDemo = React.lazy(() =>
  import('../Pages/FeeHeadTypeDemo/FeeHeadTypeDemo')
);

const FeeHeadDemo = React.lazy(() =>
  import('../Pages/FeeHeadDemo/FeeHeadDemo')
);

const ExtraActivityDemo = React.lazy(() =>
  import('../Pages/ExtraActivitiesDemo/ExtraActivityDemo')
);

const ExamTermDemo = React.lazy(() =>
  import('../Pages/ExamTermDemo/ExamTermDemo')
);

const VehicleTypeDemo = React.lazy(() =>
  import('../Pages/VehicleTypeDemo/VehicleTypeDemo')
);

const VehicleDemo = React.lazy(() =>
  import('../Pages/VehicleDemo/VehicleDemo')
);

const PickupPointDemo = React.lazy(() =>
  import('../Pages/PickupPointDemo/PickupPointDemo')
);

const RouteNameDemo = React.lazy(() =>
  import('../Pages/RouteNameDemo/RouteNameDemo')
);

// const  = React.lazy(()=> import("../Pages/FeeHeadDataDemo/FeeHeadDataDemo"))

const DepartmentData = React.lazy(() =>
  import('../Pages/DepartmentData/DepartmentData')
);

const DepartmentDataForm = React.lazy(() =>
  import('../Pages/DepartmentData/DepartmentDataForm')
);
const TeachingTitleData = React.lazy(() =>
  import('../Pages/TeachingTitleData/TeachingTitleData')
);

const EmployementTypeData = React.lazy(() =>
  import('../Pages/EmploymentTypeData/EmploymentTypeData')
);

const BankData = React.lazy(() => import('../Pages/BankData/BankData'));
const ClassData = React.lazy(() => import('../Pages/ClassData/ClassData'));

const SectionData = React.lazy(() =>
  import('../Pages/SectionData/SectionData')
);
const SectionDataForm = React.lazy(() =>
  import('../Pages/SectionData/SectionDataForm')
);
const PickupPointData = React.lazy(() =>
  import('../Pages/PickupPointData/PickupPointData')
);
const PickupPointDataForm = React.lazy(() =>
  import('../Pages/PickupPointData/PickupPointDataForm')
);
const RouteData = React.lazy(() => import('../Pages/RouteData/RouteData'));
const RouteDataForm = React.lazy(() =>
  import('../Pages/RouteData/RouteDataForm')
);
const VehicleTypeData = React.lazy(() =>
  import('../Pages/VehicleTypeData/VehicleTypeData')
);
const VehicleTypeDataForm = React.lazy(() =>
  import('../Pages/VehicleTypeData/VehicleTypeDataForm')
);
const VehicleData = React.lazy(() =>
  import('../Pages/VehicleData/VehicleData')
);
const VehicleDataForm = React.lazy(() =>
  import('../Pages/VehicleData/VehicleDataForm')
);
const ExtracurricularData = React.lazy(() =>
  import('../Pages/Extracurricular/ExtracurricularData')
);
const ExtracurricularDataForm = React.lazy(() =>
  import('../Pages/Extracurricular/ExtracurricularDataForm')
);
const VehicleInchargeData = React.lazy(() =>
  import('../Pages/VehicleIncharge/VehicleInchargeData')
);
const VehicleInchargeDataForm = React.lazy(() =>
  import('../Pages/VehicleIncharge/VehicleInchargeDataForm')
);
const DriverData = React.lazy(() => import('../Pages/DriverData/DriverData'));
const DriverDataForm = React.lazy(() =>
  import('../Pages/DriverData/DriverDataForm')
);
const Menu = React.lazy(() => import('../Pages/UserRoles/Menu'));
const MenuForm = React.lazy(() => import('../Pages/UserRoles/MenuForm'));
const SubMenu = React.lazy(() => import('../Pages/UserRoles/Submenu'));
const SubMenuForm = React.lazy(() => import('../Pages/UserRoles/subMenuForm'));
const Employeenumber = React.lazy(() =>
  import('../Pages/Employee/employeenumber')
);
const DropPointForm = React.lazy(() =>
  import('../Pages/DropPoint/DropPointForm')
);
const PublicStudentRegistration = React.lazy(() =>
  import('../Pages/publicForm2')
);
const DropPointList = React.lazy(() =>
  import('../Pages/DropPoint/DropPointList')
);
const Employeeview = React.lazy(() => import('../Pages/Employee/view'));
const Employeebulk = React.lazy(() => import('../Pages/bulkEmployees'));
const Studentbulk = React.lazy(() => import('../Pages/bulkStudents'));
const Adder = React.lazy(() => import('../Pages/Employee/Adder'));
const EditAdder = React.lazy(() => import('../Pages/EditEmployee/Adder'));
const ViewAdder = React.lazy(() => import('../Pages/ViewEmployee/Adder'));
const AddNewStudent = React.lazy(() =>
  import('../Pages/Student/AddNewStudent')
);

const StudentNumber = React.lazy(() =>
  import('../Pages/Student/StudentNumber')
);

const RoleData = React.lazy(() => import('../Pages/RoleData/RoleData'));

const EditStudent = React.lazy(() =>
  import('../Pages/EditStudent/EditStudent')
);

const ViewStudentList = React.lazy(() =>
  import('../Pages/Student/ViewStudentList')
);

// const Login = React.lazy(()=>import( '../Pages/Auth/LoginAuth'));
const FeeDefinition = React.lazy(() =>
  import('../Pages/Fee/FeeDefinition/FeeDefinition')
);
const StudentAdmissionIndex = React.lazy(() =>
  import('../Pages/Fee/StudentAdmission/StudentAdmissionIndex')
);
const FeeHeaderTypeMaster = React.lazy(() =>
  import('../Pages/Fee/Masters/FeeHeaderTypeMaster/FeeHeaderTypeMaster')
);
const FeeHeaderTypeMasterForm = React.lazy(() =>
  import('../Pages/Fee/Masters/FeeHeaderTypeMaster/FeeHeaderTypeMasterForm')
);
const FeeDefinitionMaster = React.lazy(() =>
  import('../Pages/Fee/Masters/FeeDefinitionMaster/FeeDefinitionMaster')
);
const FeeDefinitionMasterForm = React.lazy(() =>
  import('../Pages/Fee/Masters/FeeDefinitionMaster/FeeDefinitionMasterForm')
);
const FeeHeadMaster = React.lazy(() =>
  import('../Pages/Fee/Masters/FeeHeadMaster/FeeHeadMaster')
);
const FeeHeadMasterForm = React.lazy(() =>
  import('../Pages/Fee/Masters/FeeHeadMaster/FeeHeadMasterForm')
);
const ClassFeeMasterForm = React.lazy(() =>
  import('../Pages/Fee/Masters/ClassFeeMaster/ClassFeeMasterForm')
);
const ClassFeeMaster = React.lazy(() =>
  import('../Pages/Fee/Masters/ClassFeeMaster/ClassFeeMaster')
);
const DiscountGroupMasterForm = React.lazy(() =>
  import('../Pages/Fee/Masters/DiscountGroupMaster/DiscountGroupMasterForm')
);
const DiscountGroupMaster = React.lazy(() =>
  import('../Pages/Fee/Masters/DiscountGroupMaster/DiscountGroupMaster')
);
const GenerateDemandIndex = React.lazy(() =>
  import('../Pages/Fee/GenerateDemand/GenerateDemandIndex')
);
const FeeCollectionIndex = React.lazy(() =>
  import('../Pages/Fee/FeeCollection/FeeCollectionIndex')
);
const SuccessFeeCollection = React.lazy(() =>
  import('../Pages/Fee/FeeCollection/SuccessFeeCollection')
);

const Receipt = React.lazy(() => import('../Pages/Fee/FeeCollection/Receipt'));
const Demo = React.lazy(() => import('../Pages/Dashboard'));
// const Demo = React.lazy(() => import('../Pages/Dashboard/index'));
const DiscountGroupMapForm = React.lazy(() =>
  import('../Pages/Fee/Masters/DiscountGroupMap/DiscountGroupMasterMapForm')
);
const DiscountGroupMap = React.lazy(() =>
  import('../Pages/Fee/Masters/DiscountGroupMap/DiscountGroupMasterMap')
);
const BusFeeFineData = React.lazy(() =>
  import('../Pages/BusFeeFineData/BusFeeFineData')
);
const BusFeeFineDataForm = React.lazy(() =>
  import('../Pages/BusFeeFineData/BusFeeFineDataForm')
);
const SubjectData = React.lazy(() => import('../Pages/Subject/SubjectData'));
const SubjectDataForm = React.lazy(() =>
  import('../Pages/Subject/SubjectDataForm')
);
const IdCard = React.lazy(() => import('../Pages/Id-Card/IdCard'));

const NewsEventDataFormDemo = React.lazy(() =>
  import('../Pages/NewsEvent/NewsEventDemo')
);
const HolidayData = React.lazy(() => import('../Pages/Holiday/HolidayData'));

const ExamTermData = React.lazy(() => import('../Pages/ExamTerm/ExamTermData'));
const ExamTermDataForm = React.lazy(() =>
  import('../Pages/ExamTerm/ExamTermDataForm')
);

const MarksEntryDataDemo = React.lazy(() =>
  import('../Pages/MarksEntryDemo/MarksEntryDataDemo')
);
const MarksEntryDataDemoForm = React.lazy(() =>
  import('../Pages/MarksEntryDemo/MarksEntryDataDemoForm')
);
const ViewTimeTable = React.lazy(() =>
  import('../Pages/Scheduler/ViewTimeTable')
);
const ViewStudentDetails = React.lazy(() =>
  import('../Pages/ViewStudent/ViewStudentDetails')
);
const AddAttendance = React.lazy(() =>
  import('../Pages/attendance/AddAttendance')
);
const DemoSectionData = React.lazy(() =>
  import('../Pages/DemoSection/DemoSectionData')
);
const MarksTabulationData = React.lazy(() =>
  import('../Pages/MarksTabulation/MarksTabulationData')
);
const MarksTabulationDataForm = React.lazy(() =>
  import('../Pages/MarksTabulation/MarksTabulationDataForm')
);
const PublicSuccessSubmitted = React.lazy(() =>
  import('../Pages/publicForm2/SuccessSubmit')
);

const LandingPage = React.lazy(() => import('../Pages/landingpage'));
const LandingPageNew = React.lazy(() =>
  import('../Pages/LandingPageNew/LandingPage/landing')
);
const DemoSubjectData = React.lazy(() =>
  import('../Pages/DemoSubject/DemoSubjectData')
);

const SchoolReg = React.lazy(() =>
  import('../Pages/SchoolRegistration/SchoolRegistration')
);

const SchoolSuccessSubmit = React.lazy(() =>
  import('../Pages/SchoolRegistration/SchoolSuccessSubmit')
);

const RoleMapList = React.lazy(() =>
  import('../Pages/SchoolList/SchholMapRole/index')
);

const MenuMaster = React.lazy(() => import('../Pages/menuMaster/MenuMaster'));
const SubmenuMaster = React.lazy(() =>
  import('../Pages/subMenuMaster/SubmenuMaster')
);

const MenuMapping = React.lazy(() =>
  import('../Pages/menuMapping/MenuMapping')
);

const EmpAdminAuth = React.lazy(() => import('../Pages/Auth/empAdminAuth'));

const OnlineExam = React.lazy(() => import('../Pages/OnlineExam/OnlineExam'));

const OnlineTest = React.lazy(() => import('../Pages/Onlinetest/index'));
// const OnlineExam = React.lazy(()=> import('../Pages/OnlineExam/OnlineExam'))
const AddEBook = React.lazy(() => import('../Pages/EBook/ebook'));
const ViewEBook = React.lazy(() => import('../Pages/EBook/viewebook'));
const ImageUpload = React.lazy(() =>
  import('../Pages/ImageGallery/imageUpload')
);
const ViewImage = React.lazy(() => import('../Pages/ImageGallery/viewImage'));
const VideoUpload = React.lazy(() => import('../Pages/Video/addvideo'));
const ViewVideo = React.lazy(() => import('../Pages/Video/viewvideo'));
const ClassFeeMasterNew = React.lazy(() =>
  import('../Pages/Fee/Masters/ClassFeeMasterNew/ClassFeeMasterNew')
);
const ClassFeeMasterNewForm = React.lazy(() =>
  import('../Pages/Fee/Masters/ClassFeeMasterNew/ClassFeeMasterNewForm')
);
const PaymentStatus = React.lazy(() => import('../Pages/Report/PaymentStatus'));
const AttendanceStatus = React.lazy(() =>
  import('../Pages/Report/AttendanceStatus')
);
const BulkClassFeeMaster = React.lazy(() =>
  import('../Pages/Fee/Masters/BulkClassFeeMaster')
);
const FaceDetection = React.lazy(() => import('../Pages/FaceDetection'));
const MadhapurLandingPage = React.lazy(() =>
  import('../Pages/madhupurLandingPage')
);
const ShowImagegallery = React.lazy(() =>
  import('../Pages/ImageGallery/showImage')
);
const SecondEditEmployee = React.lazy(() =>
  import('../Pages/SecondEditEmployee/Adder')
);

export const userRoutes = [
  {
    path: '/book-category',
    component: <BookCategory />
  },

  {
    path: 'new-receipt',
    component: <NewReceipt />
  },
  {
    path: '/second-editemployee/:id',
    component: <SecondEditEmployee />
  },
  {
    path: 'library-card',
    component: <LibraryCard />
  },
  {
    path: '/book-data',
    component: <BookData />
  },
  {
    path: '/show-galleryimage',
    component: <ShowImagegallery />
  },
  {
    path: '/show-galleryimage/:id',
    component: <ShowImagegallery />
  },
  {
    path: '/face-detection',
    component: <FaceDetection />
  },
  {
    path: 'payment-status',
    component: <PaymentStatus />
  },
  {
    path: 'attendance-status',
    component: <AttendanceStatus />
  },
  {
    path: '/classfee-master-new',
    component: <ClassFeeMasterNew />
  },
  {
    path: '/classfee-master-new-form',
    component: <ClassFeeMasterNewForm />
  },
  {
    path: '/bulk-classfee-master-form',
    component: <BulkClassFeeMaster />
  },
  {
    path: '/view-video',
    component: <ViewVideo />
  },
  {
    path: '/video-upload',
    component: <VideoUpload />
  },
  {
    path: '/view-image',
    component: <ViewImage />
  },
  {
    path: '/image-upload',
    component: <ImageUpload />
  },
  {
    path: '/add-ebook',
    component: <AddEBook />
  },
  {
    path: '/view-ebook',
    component: <ViewEBook />
  },
  {
    path: '/online-exam',
    component: <OnlineExam />
  },
  {
    path: '/role/employee',
    component: <RoleBasedEmployee />
  },
  {
    path: '/role/student',
    component: <RoleBasedStudent />
  },
  {
    path: '/fee-head-type-demo',
    component: <FeeHeadTypeDemo />
  },
  {
    path: '/role',
    component: <RoleData />
  },
  {
    path: '/fee-head-demo',
    component: <FeeHeadDemo />
  },
  {
    path: '/discount-group-demo',
    component: <DiscountGroupDemo />
  },
  {
    path: '/discount-group-map-demo',
    component: <DiscountGroupMapDemo />
  },
  {
    path: '/menu-master',
    component: <MenuMaster />
  },
  {
    path: '/sub-menu-master',
    component: <SubmenuMaster />
  },
  {
    path: '/menu-mapping',
    component: <MenuMapping />
  },
  {
    path: '/marks-entry-demo',
    component: <MarksEntryDataDemo />
  },
  {
    path: '/vehicle-type-demo',
    component: <VehicleTypeDemo />
  },
  {
    path: '/route-name-demo',
    component: <RouteNameDemo />
  },
  {
    path: '/pickup-point-demo',
    component: <PickupPointDemo />
  },
  {
    path: '/vehicle-demo',
    component: <VehicleDemo />
  },
  {
    path: '/department-demo',
    component: <DepartmentDataDemo />
  },
  {
    path: '/extra-activity-demo',
    component: <ExtraActivityDemo />
  },
  {
    path: '/exam-term-demo',
    component: <ExamTermDemo />
  },
  {
    path: '/password-reset',
    component: <PasswordReset />
  },
  {
    path: '/role-map-list',
    component: <RoleMapList />
  },
  {
    path: '/school-list',
    component: <SchoolList />
  },
  {
    path: '/profile',
    component: <Profile />
  },
  {
    path: '/marks-entry-demo',
    component: <MarksEntryDataDemo />
  },
  {
    path: '/marks-entry-demo-form',
    component: <MarksEntryDataDemoForm />
  },
  {
    path: '/marks-entry-demo-form/:id',
    component: <MarksEntryDataDemoForm />
  },
  {
    path: '/demo-subject',
    component: <DemoSubjectData />
  },
  {
    path: '/marks-entry-demo-form',
    component: <MarksEntryDataDemoForm />
  },
  // {
  //   path: '/demo-subject',
  //   component: <DemoSubjectData />
  // },
  {
    path: '/demo-section',
    component: <DemoSectionData />
  },
  {
    path: '/marks-tabulation',
    component: <MarksTabulationData />
  },
  {
    path: '/marks-tabulation-form',
    component: <MarksTabulationDataForm />
  },
  {
    path: '/marks-tabulation/:id',
    component: <MarksTabulationDataForm />
  },

  {
    path: '/attendance',
    component: <AddAttendance />
  },
  {
    path: '/exam-term',
    component: <ExamTermData />
  },
  {
    path: '/exam-term-form',
    component: <ExamTermDataForm />
  },
  {
    path: '/exam-term-form/:id',
    component: <ExamTermDataForm />
  },

  {
    path: '/marks-entry-demo',
    component: <MarksEntryDataDemo />
  },
  {
    path: '/marks-entry-demo-form',
    component: <MarksEntryDataDemoForm />
  },

  {
    path: '/add-time-table',
    component: <ViewTimeTable />
  },
  {
    path: '/view-time-table',
    component: <ViewTimeTable />
  },
  {
    path: '/holiday',
    component: <HolidayData />
  },

  {
    path: '/news-event-forms',
    component: <NewsEventDataFormDemo />
  },

  {
    path: '/id-card',
    component: <IdCard />
  },
  {
    path: '/subject',
    component: <SubjectData />
  },
  {
    path: '/subject-form',
    component: <SubjectDataForm />
  },
  {
    path: '/subject-form/:id',
    component: <SubjectDataForm />
  },
  {
    path: '/discount-group-map',
    component: <DiscountGroupMap />
  },
  {
    path: '/discount-group-map-form',
    component: <DiscountGroupMapForm />
  },
  {
    path: '/discount-group-map-form/:id',
    component: <DiscountGroupMapForm />
  },
  {
    path: '/category',
    component: <CategoryData />
  },
  {
    path: '/sub-category',
    component: <SubCategoryData />
  },
  {
    path: '/country',
    component: <CountryData />
  },

  {
    path: '/bank',
    component: <BankData />
  },
  // {
  //   path: '/bank-form',
  //   component: <BankDataForm />
  // },
  // {
  //   path: '/bank-form/:id',
  //   component: <BankDataForm />
  // },
  {
    path: '/class',
    component: <ClassData />
  },

  {
    path: '/section',
    component: <SectionData />
  },
  {
    path: '/section-form',
    component: <SectionDataForm />
  },
  {
    path: '/section-form/:id',
    component: <SectionDataForm />
  },
  {
    path: '/route',
    component: <RouteData />
  },
  {
    path: '/route-form',
    component: <RouteDataForm />
  },
  {
    path: '/route-form/:id',
    component: <RouteDataForm />
  },
  {
    path: '/pickup-point',
    component: <PickupPointData />
  },
  {
    path: '/pickup-point-form',
    component: <PickupPointDataForm />
  },
  {
    path: '/pickup-point-form/:id',
    component: <PickupPointDataForm />
  },

  {
    path: '/vehicle-type',
    component: <VehicleTypeData />
  },
  {
    path: '/vehicle-type-form',
    component: <VehicleTypeDataForm />
  },
  {
    path: '/vehicle-type-form/:id',
    component: <VehicleTypeDataForm />
  },
  {
    path: '/vehicle',
    component: <VehicleData />
  },
  {
    path: '/vehicle-form',
    component: <VehicleDataForm />
  },
  {
    path: '/vehicle-form/:id',
    component: <VehicleDataForm />
  },
  {
    path: '/extra-curricular',
    component: <ExtracurricularData />
  },
  {
    path: '/extra-curricular-form',
    component: <ExtracurricularDataForm />
  },
  {
    path: '/extra-curricular-form/:id',
    component: <ExtracurricularDataForm />
  },
  {
    path: '/state',
    component: <StateData />
  },
  {
    path: '/state-form',
    component: <StateDataForm />
  },
  {
    path: '/state-form/:id',
    component: <StateDataForm />
  },
  {
    path: '/city',
    component: <DistrictData />
  },
  {
    path: '/department',
    component: <DepartmentData />
  },
  {
    path: '/department-form',
    component: <DepartmentDataForm />
  },
  {
    path: '/department-form/:id',
    component: <DepartmentDataForm />
  },
  {
    path: '/teaching-title',
    component: <TeachingTitleData />
  },
  {
    path: '/employement-type',
    component: <EmployementTypeData />
  },

  {
    path: '/employee/number',
    component: <Employeenumber />
  },
  {
    path: '/bulk-employees',
    component: <Employeebulk />
  },
  {
    path: '/bulk-students',
    component: <Studentbulk />
  },
  {
    path: '/employee/view',
    component: <Employeeview />
  },
  {
    path: '/step-form',
    component: <Adder />
  },
  {
    path: '/editstep-form/:id',
    component: <EditAdder />
  },
  {
    path: '/viewstep-form/:id',
    component: <ViewAdder />
  },
  {
    path: '/',
    component: (
      <RoleBasedGuard
      // hasContent roles={["Super Admin", "Admin", "User"]}
      >
        <Demo />
      </RoleBasedGuard>
    )
  },
  {
    path: 'fee-definition',
    component: <FeeDefinition />
  },
  {
    path: '/student-admission',
    component: <StudentAdmissionIndex />
  },
  {
    path: '/feeheadtype-master',
    component: <FeeHeaderTypeMaster />
  },
  {
    path: '/feeheadtype-master-form',
    component: <FeeHeaderTypeMasterForm />
  },
  {
    path: '/feeheadtype-master-form/:id',
    component: <FeeHeaderTypeMasterForm />
  },
  {
    path: '/feehead-master',
    component: <FeeHeadMaster />
  },
  {
    path: '/feehead-master-form',
    component: <FeeHeadMasterForm />
  },
  {
    path: '/feehead-master-form/:id',
    component: <FeeHeadMasterForm />
  },
  {
    path: '/discount-master',
    component: <DiscountGroupMaster />
  },
  {
    path: '/discount-master-form',
    component: <DiscountGroupMasterForm />
  },
  {
    path: '/discount-group-map',
    component: <DiscountGroupMap />
  },
  {
    path: '/discount-group-map-form',
    component: <DiscountGroupMapForm />
  },
  {
    path: '/discount-group-map-form/:id',
    component: <DiscountGroupMapForm />
  },
  {
    path: '/discount-master-form/:id',
    component: <DiscountGroupMasterForm />
  },
  {
    path: '/classfee-master',
    component: <ClassFeeMaster />
  },
  {
    path: '/classfee-master-form',
    component: <ClassFeeMasterForm />
  },
  {
    path: '/classfee-master-form/:id',
    component: <ClassFeeMasterForm />
  },
  {
    path: '/feedefinition-master',
    component: <FeeDefinitionMaster />
  },
  {
    path: '/feedefinition-master-form',
    component: <FeeDefinitionMasterForm />
  },
  {
    path: '/feedefinition-master-form/:id',
    component: <FeeDefinitionMasterForm />
  },
  {
    path: '/fee-collection',
    component: <FeeCollectionIndex />
  },
  {
    path: '/success-fee-collection',
    component: <SuccessFeeCollection />
  },
  {
    path: '/receipt',
    component: <Receipt />
  },
  {
    path: '/generate-demand',
    component: <GenerateDemandIndex />
  },
  {
    path: '/driver',
    component: <DriverData />
  },
  {
    path: '/driver-form',
    component: <DriverDataForm />
  },
  {
    path: '/driver-form/:id',
    component: <DriverDataForm />
  },
  {
    path: '/vehicleincharge',
    component: <VehicleInchargeData />
  },
  {
    path: '/vehicleincharge-form',
    component: <VehicleInchargeDataForm />
  },
  {
    path: '/vehicleincharge-form/:id',
    component: <VehicleInchargeDataForm />
  },
  {
    path: '/view-student-list',
    component: <ViewStudentList />
  },
  {
    path: '/add-new-student',
    component: <AddNewStudent />
  },
  {
    path: '/view-student-details/:id',
    component: <ViewStudentDetails />
  },
  {
    path: '/student-number',
    component: <StudentNumber />
  },
  {
    path: '/edit-student/:id',
    component: <EditStudent />
  },
  {
    path: '/drop-point-list',
    component: <DropPointList />
  },
  {
    path: '/drop-point-form',
    component: <DropPointForm />
  },
  {
    path: '/drop-point-form/:id',
    component: <DropPointForm />
  },
  {
    path: '/busfeefine',
    component: <BusFeeFineData />
  },
  {
    path: '/busfeefine-form',
    component: <BusFeeFineDataForm />
  },
  {
    path: '/busfeefine-form/:id',
    component: <BusFeeFineDataForm />
  },
  {
    path: '/menu',
    component: <Menu />
  },
  {
    path: '/menu-form',
    component: <MenuForm />
  },
  {
    path: '/menu-form/:id',
    component: <MenuForm />
  },
  {
    path: '/sub-menu',
    component: <SubMenu />
  },
  {
    path: '/sub-menu-form',
    component: <SubMenuForm />
  },
  {
    path: '/sub-menu-form/:id',
    component: <SubMenuForm />
  }
];

export const authRoutes = [
  {
    path: '/home',
    component: <LandingPage />
  },
  {
    path: '/school-registration',
    component: <SchoolReg />
  },
  {
    path: '/login-school',
    component: <LoginSuperAdmin />
  },
  {
    path: '/login-aadrika',
    component: <LoginAadrika />
  },
  {
    path: '/school-registration-success',
    component: <SchoolSuccessSubmit />
  },
  {
    path: '/landing-page',
    component: <LandingPageNew />
  },
  {
    path: '/login',
    component: <Login />
  },
  {
    path: '/landing-csms',
    component: <LatestLangingPage />
  },

  {
    path: '/registration',
    component: <Registration />
  },
  {
    path: '/public-student-registration',
    component: <PublicStudentRegistration />
  },
  {
    path: '/public-student-registration-submitted',
    component: <PublicSuccessSubmitted />
  },
  {
    path: '/landing-page',
    component: <LandingPage />
  },
  {
    path: '/emp-admin-auth',
    component: <EmpAdminAuth />
  },
  {
    path: '/online-test',
    component: <OnlineTest />
  },
  {
    path: '/madhapur-landingpage',
    component: <MadhapurLandingPage />
  }
];
