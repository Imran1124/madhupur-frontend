import BackendUrl from './BackendUrl';

export default function ApiList() {
  let baseUrl = BackendUrl;
  let apiList = {
    //Login Group
    api_loginData: `${baseUrl}/api/users/login`,
    api_loginUserData: `${baseUrl}/api/school-masters/login`,
    api_passwordChangeUserData: `${baseUrl}/api/school-masters/change-password`,
    api_logoutSuperAdmin: `${baseUrl}/api/school-masters/logout`,
    api_aadrikaUserData: `${baseUrl}/api/users/authentication`,
    api_aadrikaUserDataLogout: `${baseUrl}/api/users/logout`,
    api_aadrikaChangePassword: `${baseUrl}/api/users/change-password`,
    api_registrationData: `${baseUrl}/api/school-masters/registration`,
    api_schoolistData: `${baseUrl}/api/school-masters/retrieve-all`,
    api_schoollistdeleteData: `${baseUrl}/api/school-masters/delete`,

    //Category Group
    api_fetchCategoryList: `${baseUrl}/api/masters/miscellaneous-category/crud/retrieve-all`,
    api_postCategory: `${baseUrl}/api/masters/miscellaneous-category/crud/store`,
    api_editCategory: `${baseUrl}/api/masters/miscellaneous-category/crud/edit`,
    api_getCategoryById: `${baseUrl}/api/masters/miscellaneous-category/crud/show`,
    api_deleteCategoryById: `${baseUrl}/api/masters/miscellaneous-category/crud/delete`,

    //sub category Group
    api_fetchSubCategoryList: `${baseUrl}/api/masters/miscellaneous-sub-category/crud/retrieve-all`,
    api_postSubCategory: `${baseUrl}/api/masters/miscellaneous-sub-category/crud/store`,
    api_editSubCategory: `${baseUrl}/api/masters/miscellaneous-sub-category/crud/edit`,
    api_getSubCategoryById: `${baseUrl}/api/masters/miscellaneous-sub-category/crud/show`,
    api_deleteSubCategoryById: `${baseUrl}/api/masters/miscellaneous-sub-category/crud/delete`,
    api_activesubcategory: `${baseUrl}/api/masters/miscellaneous-category/crud/active-all`,

    //search employee by id group

    api_searchEmployeeByIdList: `${baseUrl}/api/employee/crud/search`,
    api_searchStudentByIdList: `${baseUrl}/api/student/search`,

    //Get Category By Name Data
    api_getcategorybynameData: `${baseUrl}/api/masters/miscellaneous/retrieve-all`,
    api_getcategorybynameDataActiveAll: `${baseUrl}/api/masters/miscellaneous/active-all`,
    api_schoollistactiveall: `${baseUrl}/api/school-masters/active-all`,
    api_schoollistedit: `${baseUrl}/api/school-masters/update-profile`,
    api_roleUpdateApi: `${baseUrl}/api/school-masters/update-role`,
    //Get Department
    api_getdepartmentDataById: `${baseUrl}/api/masters/department/crud/show`,
    api_getdepartmentData: `${baseUrl}/api/masters/department/crud/retrieve-all`,
    api_getActivedepartmentData: `${baseUrl}/api/masters/department/crud/active-all`,
    api_searchdepartmentData: `${baseUrl}/api/masters/department/crud/search`,
    api_postdepartmentData: `${baseUrl}/api/masters/department/crud/store`,
    api_editdepartmentData: `${baseUrl}/api/masters/department/crud/edit`,
    api_deletedepartmentData: `${baseUrl}/api/masters/department/crud/delete`,

    //Get Employment Type Data
    api_getemploymenttypeDataById: `${baseUrl}/api/masters/employment-type/crud/show`,
    api_getemploymenttypeData: `${baseUrl}/api/masters/employment-type/crud/retrieve-all`,
    api_get_active_employmenttypeData: `${baseUrl}/api/masters/employment-type/crud/active-all`,
    api_searchemploymenttypeData: `${baseUrl}/api/masters/employment-type/crud/search`,
    api_postemploymenttypeData: `${baseUrl}/api/masters/employment-type/crud/store`,
    api_editemploymenttypeData: `${baseUrl}/api/masters/employment-type/crud/edit`,
    api_deleteemploymenttypeData: `${baseUrl}/api/masters/employment-type/crud/delete`,

    //Get Teaching Title Data
    api_getteachingtitleDataById: `${baseUrl}/api/masters/teaching-title/crud/show`,
    api_getteachingtitleData: `${baseUrl}/api/masters/teaching-title/crud/retrieve-all`,
    api_get_active_teachingtitleData: `${baseUrl}/api/masters/teaching-title/crud/active-all`,
    api_searchteachingtitleData: `${baseUrl}/api/masters/teaching-title/crud/search`,
    api_postteachingtitleData: `${baseUrl}/api/masters/teaching-title/crud/store`,
    api_editteachingtitleData: `${baseUrl}/api/masters/teaching-title/crud/edit`,
    api_deleteteachingtitleData: `${baseUrl}/api/masters/teaching-title/crud/delete`,

    //Get Country Data
    api_getCountryDataById: `${baseUrl}/api/masters/country/crud/show`,
    api_getCountryData: `${baseUrl}/api/masters/country/crud/retrieve-all`,
    api_getactiveCountryData: `${baseUrl}/api/masters/country/crud/active-all`,
    api_searchCountryData: `${baseUrl}/api/masters/country/crud/search`,
    api_postCountryData: `${baseUrl}/api/masters/country/crud/store`,
    api_editCountryData: `${baseUrl}/api/masters/country/crud/edit`,
    api_deleteCountryData: `${baseUrl}/api/masters/country/crud/delete`,

    //Get State Data
    api_getStateDataById: `${baseUrl}/api/masters/state/crud/show`,
    api_getStateData: `${baseUrl}/api/masters/state/crud/retrieve-all`,
    api_getStateDataActiveall: `${baseUrl}/api/masters/state/crud/active-all`,
    api_searchStateData: `${baseUrl}/api/masters/state/crud/search`,
    api_postStateData: `${baseUrl}/api/masters/state/crud/store`,
    api_editStateData: `${baseUrl}/api/masters/state/crud/edit`,
    api_deleteStateData: `${baseUrl}/api/masters/state/crud/delete`,

    api_getactiveStateData: `${baseUrl}/api/masters/state/crud/active-all`,

    //Get City Data
    api_getDistrictDataByID: `${baseUrl}/api/masters/city/crud/show`,
    api_getDistrictData: `${baseUrl}/api/masters/city/crud/retrieve-all`,
    api_getDistrictDataActiveAll: `${baseUrl}/api/masters/city/crud/active-all`,
    api_searchDistrictData: `${baseUrl}/api/masters/city/crud/search`,
    api_postDistrictData: `${baseUrl}/api/masters/city/crud/store`,
    api_editDistrictData: `${baseUrl}/api/masters/city/crud/edit`,
    api_deleteDistrictData: `${baseUrl}/api/masters/city/crud/delete`,

    //Get Class Data
    api_getClassDataByID: `${baseUrl}/api/masters/class/crud/show`,
    api_getClassData: `${baseUrl}/api/masters/class/crud/retrieve-all`,
    api_searchClassData: `${baseUrl}/api/masters/class/crud/search`,
    api_postClassData: `${baseUrl}/api/masters/class/crud/store`,
    api_editClassData: `${baseUrl}/api/masters/class/crud/edit`,
    api_deleteClassData: `${baseUrl}/api/masters/class/crud/delete`,
    api_getactiveClassData: `${baseUrl}/api/masters/class/crud/active-all`,

    //Get Section Data
    api_getSectionDataByID: `${baseUrl}/api/masters/section/crud/show`,
    api_getSectionData: `${baseUrl}/api/masters/section/crud/retrieve-all`,
    api_searchSectionData: `${baseUrl}/api/masters/section/crud/search`,
    api_postSectionData: `${baseUrl}/api/masters/section/crud/store`,
    api_editSectionData: `${baseUrl}/api/masters/section/crud/edit`,
    api_deleteSectionData: `${baseUrl}/api/masters/section/crud/delete`,
    api_getactiveSectionData: `${baseUrl}/api/masters/section/crud/active-all`,

    api_mapsectionData: `${baseUrl}/api/masters/subject-group-map/subject`,

    //Get Bank Data
    api_getBankDataById: `${baseUrl}/api/masters/bank/crud/show`,
    api_getBankData: `${baseUrl}/api/masters/bank/crud/retrieve-all`,
    api_getActiveBankData: `${baseUrl}/api/masters/bank/crud/active-all`,
    api_searchBankData: `${baseUrl}/api/masters/bank/crud/search`,
    api_postBankData: `${baseUrl}/api/masters/bank/crud/store`,
    api_editBankData: `${baseUrl}/api/masters/bank/crud/edit`,
    api_deleteBankData: `${baseUrl}/api/masters/bank/crud/delete`,

    //Get Route Data
    api_getRouteDataById: `${baseUrl}/api/masters/route/crud/show`,
    api_getRouteData: `${baseUrl}/api/masters/route/crud/retrieve-all`,
    api_getRouteDataActiveAll: `${baseUrl}/api/masters/route/crud/active-all`,
    api_searchRouteData: `${baseUrl}/api/masters/route/crud/search`,
    api_postRouteData: `${baseUrl}/api/masters/route/crud/store`,
    api_editRouteData: `${baseUrl}/api/masters/route/crud/edit`,
    api_deleteRouteData: `${baseUrl}/api/masters/route/crud/delete`,

    //Get Pickup point Data
    api_getPickupPointDataById: `${baseUrl}/api/masters/pickup-point/crud/show`,
    api_getPickupPointData: `${baseUrl}/api/masters/pickup-point/crud/retrieve-all`,
    api_getPickupPointDataActive: `${baseUrl}/api/masters/pickup-point/crud/active-all`,
    api_searchPickupPointData: `${baseUrl}/api/masters/pickup-point/crud/search`,
    api_postPickupPointData: `${baseUrl}/api/masters/pickup-point/crud/store`,
    api_editPickupPointData: `${baseUrl}/api/masters/pickup-point/crud/edit`,
    api_deletePickupPointData: `${baseUrl}/api/masters/pickup-point/crud/delete`,

    //GET VEHICLE TYPE
    api_getvehicleTypeDataById: `${baseUrl}/api/masters/vehicle-type-name/crud/show`,
    api_getvehicleTypeData: `${baseUrl}/api/masters/vehicle-type-name/crud/retrieve-all`,
    api_searchvehicleTypeData: `${baseUrl}/api/masters/vehicle-type-name/crud/search`,
    api_postvehicleTypeData: `${baseUrl}/api/masters/vehicle-type-name/crud/store`,
    api_editvehicleTypeData: `${baseUrl}/api/masters/vehicle-type-name/crud/edit`,
    api_deletevehicleTypeData: `${baseUrl}/api/masters/vehicle-type-name/crud/delete`,
    api_getActivevehicleTypeData: `${baseUrl}/api/masters/vehicle-type-name/crud/active-all`,

    //GET VEHICLE
    api_getvehicleDataById: `${baseUrl}/api/masters/vehicle/crud/show`,
    api_getvehicleData: `${baseUrl}/api/masters/vehicle/crud/retrieve-all`,
    api_getvehicleData_active: `${baseUrl}/api/masters/vehicle/crud/active-all`,
    api_searchvehicleData: `${baseUrl}/api/masters/vehicle/crud/search`,
    api_postvehicleData: `${baseUrl}/api/masters/vehicle/crud/store`,
    api_editvehicleData: `${baseUrl}/api/masters/vehicle/crud/edit`,
    api_deletevehicleData: `${baseUrl}/api/masters/vehicle/crud/delete`,

    // GET Extracurricular
    api_getextracurricularById: `${baseUrl}/api/masters/extra-curricular/crud/show`,
    api_getextracurricular: `${baseUrl}/api/masters/extra-curricular/crud/retrieve-all`,
    api_searchextracurricular: `${baseUrl}/api/masters/extra-curricular/crud/search`,
    api_postextracurricular: `${baseUrl}/api/masters/extra-curricular/crud/store`,
    api_editextracurricular: `${baseUrl}/api/masters/extra-curricular/crud/edit`,
    api_deleteextracurricular: `${baseUrl}/api/masters/extra-curricular/crud/delete`,

    //Add Employee Data
    api_bulkdataaddemployee: `${baseUrl}/api/employee/storeCSV`,
    api_addEmployeeData: `${baseUrl}/api/employee/crud/store`,
    api_editEmployeeData: `${baseUrl}/api/employee/crud/edit`,
    api_editEmployeeAddressData: `${baseUrl}/api/employee/crud/edit-address`,
    api_editEmployeeBankData: `${baseUrl}/api/employee/crud/edit-bank`,
    api_retrieveEducationData: `${baseUrl}/api/emp-education/crud/retrieve-all`,
    api_showByEducationId: `${baseUrl}/api/emp-education/crud/show`,
    api_delteByEducationId: `${baseUrl}/api/emp-education/crud/delete`,
    api_postByEducationId: `${baseUrl}/api/emp-education/crud/store`,
    api_editByEducationId: `${baseUrl}/api/emp-education/crud/edit`,

    api_retrieveExperienceData: `${baseUrl}/api/emp-experience/crud/retrieve-all`,
    api_showByExperienceId: `${baseUrl}/api/emp-experience/crud/show`,
    api_delteByExperienceId: `${baseUrl}/api/emp-experience/crud/delete`,
    api_postByExperienceId: `${baseUrl}/api/emp-experience/crud/store`,
    api_editByExperienceId: `${baseUrl}/api/emp-experience/crud/edit`,

    api_retrieveFamilyData: `${baseUrl}/api/emp-family/crud/retrieve-all`,
    api_showByFamilyId: `${baseUrl}/api/emp-family/crud/show`,
    api_delteByFamilyId: `${baseUrl}/api/emp-family/crud/delete`,
    api_postByFamilyId: `${baseUrl}/api/emp-family/crud/store`,
    api_editByFamilyId: `${baseUrl}/api/emp-family/crud/edit`,

    api_deleteEmployeeData: `${baseUrl}/api/employee/crud/delete`,
    api_getEmployeeData: `${baseUrl}/api/employee/crud/retrieve-all`,
    api_searchEmployeeData: `${baseUrl}/api/employee/crud/search`,
    api_getEmployeeDataById: `${baseUrl}/api/employee/crud/show`,
    api_getRoleEmployeeById: `${baseUrl}/api/employee/role`,
    api_getRoleStudentById: `${baseUrl}/api/student/role`,
    api_getEmployeeDataActive: `${baseUrl}/api/employee/count-active`,

    // DISCOUNT GROUP
    api_fetchDiscoutGroupList: `${baseUrl}/api/masters/discount-group/crud/retrieve-all`,
    api_fetchDiscoutGroupActiveList: `${baseUrl}/api/masters/discount-group/crud/active-all`,
    api_searchDiscoutGroupList: `${baseUrl}/api/masters/discount-group/crud/search`,
    api_postDiscount: `${baseUrl}/api/masters/discount-group/crud/store`,
    api_editDiscount: `${baseUrl}/api/masters/discount-group/crud/edit`,
    api_getDiscountById: `${baseUrl}/api/masters/discount-group/crud/show`,
    api_deleteDiscountById: `${baseUrl}/api/masters/discount-group/crud/delete`,

    // FEE HEAD TYPE GROUP
    api_fetcHeadTypeList: `${baseUrl}/api/masters/feehead-type/crud/retrieve-all`,
    api_fetcHeadTypeActiveList: `${baseUrl}/api/masters/feehead-type/crud/active-all`,
    api_searchHeadTypeList: `${baseUrl}/api/masters/feehead-type/crud/search`,
    api_postHeadType: `${baseUrl}/api/masters/feehead-type/crud/store`,
    api_editHeadType: `${baseUrl}/api/masters/feehead-type/crud/edit`,
    api_getHeadTypeById: `${baseUrl}/api/masters/feehead-type/crud/show`,
    api_deleteHeadTypeById: `${baseUrl}/api/masters/feehead-type/crud/delete`,

    // FEE HEAD GROUP
    api_fetcHeadList: `${baseUrl}/api/masters/fee-head/crud/retrieve-all`,
    api_searchHeadList: `${baseUrl}/api/masters/fee-head/crud/search`,
    api_fetcActiveHeadList: `${baseUrl}/api/masters/fee-head/crud/active-all`,
    api_postHead: `${baseUrl}/api/masters/fee-head/crud/store`,
    api_editHead: `${baseUrl}/api/masters/fee-head/crud/edit`,
    api_getHeadById: `${baseUrl}/api/masters/fee-head/crud/show`,
    api_deleteHeadById: `${baseUrl}/api/masters/fee-head/crud/delete`,

    // CLASS FEE GROUP
    api_fetchClassFeeList: `${baseUrl}/api/masters/classfee-master/crud/retrieve-all`,
    api_searchClassFeeList: `${baseUrl}/api/masters/classfee-master/crud/search`,
    api_postClassFee: `${baseUrl}/api/masters/classfee-master/crud/store`,
    api_editClassFee: `${baseUrl}/api/masters/classfee-master/crud/edit`,
    api_getClassFeeById: `${baseUrl}/api/masters/classfee-master/crud/show`,
    api_deleteClassFeeById: `${baseUrl}/api/masters/classfee-master/crud/delete`,

    // CLASS FEE DEFINITION GROUP
    api_fetcClassFeeDefList: `${baseUrl}/api/masters/fee-definition/crud/retrieve-all`,
    api_searchClassFeeDefList: `${baseUrl}/api/masters/fee-definition/crud/search`,
    api_postClassFeeDef: `${baseUrl}/api/masters/fee-definition/crud/store`,
    api_editClassFeeDef: `${baseUrl}/api/masters/fee-definition/crud/edit`,
    api_getClassFeeDefById: `${baseUrl}/api/masters/fee-definition/crud/show`,
    api_deleteClassFeeDefById: `${baseUrl}/`,
    api_fetch_fee_collection: `${baseUrl}/api/fee-collection/fees`,

    // OTHER
    api_fetchClassList: `${baseUrl}/api/view_class`,

    // Get Driver Data
    api_getDriverDataById: `${baseUrl}/api/masters/driver/crud/show`,
    api_getDriverData: `${baseUrl}/api/masters/driver/crud/retrieve-all`,
    api_searchDriverData: `${baseUrl}/api/masters/driver/crud/search`,
    api_postDriverData: `${baseUrl}/api/masters/driver/crud/store`,
    api_editDriverData: `${baseUrl}/api/masters/driver/crud/edit`,
    api_deleteDriverData: `${baseUrl}/api/masters/driver/crud/delete`,

    //Get Vehile Incharge Data
    api_getVehicle_inchargeDataById: `${baseUrl}/api/masters/vehicle-incharge/crud/show`,
    api_getVehicle_inchargeData: `${baseUrl}/api/masters/vehicle-incharge/crud/retrieve-all`,
    api_searchVehicle_inchargeData: `${baseUrl}/api/masters/vehicle-incharge/crud/search`,
    api_postVehicle_inchargeData: `${baseUrl}/api/masters/vehicle-incharge/crud/store`,
    api_editVehicle_inchargeData: `${baseUrl}/api/masters/vehicle-incharge/crud/edit`,
    api_deleteVehicle_inchargeData: `${baseUrl}/api/masters/vehicle-incharge/crud/delete`,

    // create api for student csv registration
    api_bulkdataaddstudent: `${baseUrl}/api/student/storeCSV`,

    //Student api
    api_store_student: `${baseUrl}/api/student/crud/store`,
    api_retrieve_all_student: `${baseUrl}/api/student/crud/retrieve-all`,
    api_active_all_student: `${baseUrl}/api/student/count-active`,
    api_search_all_student: `${baseUrl}/api/student/crud/search`,
    api_masters_student_crud_show: `${baseUrl}/api/student/crud/show`,
    api_masters_student_crud_delete: `${baseUrl}/api/student/crud/delete`,
    api_masters_student_crud_edit: `${baseUrl}/api/student/crud/edit`,

    // drop point api
    api_drop_point_show: `${baseUrl}/api/masters/drop-point/crud/show`,
    api_drop_point_retrieve_all: `${baseUrl}/api/masters/drop-point/crud/retrieve-all`,
    api_drop_point_search_all: `${baseUrl}/api/masters/drop-point/crud/search`,
    api_drop_point_store: `${baseUrl}/api/masters/drop-point/crud/store`,
    api_drop_point_edit: `${baseUrl}/api/masters/drop-point/crud/edit`,
    api_drop_point_delete: `${baseUrl}/api/masters/drop-point/crud/delete`,

    // DISCOUNT GROUP MAP
    api_fetchDiscoutGroupListMap: `${baseUrl}/api/masters/discount-group-map/crud/retrieve-all`,
    api_searchDiscoutGroupListMap: `${baseUrl}/api/masters/discount-group-map/crud/search`,
    api_postDiscountMap: `${baseUrl}/api/masters/discount-group-map/crud/store`,
    api_editDiscountMap: `${baseUrl}/api/masters/discount-group-map/crud/edit`,
    api_getDiscountByIdMap: `${baseUrl}/api/masters/discount-group-map/crud/show`,
    api_deleteDiscountByIdMap: `${baseUrl}/api/masters/discount-group-map/crud/delete`,

    //get Bus fee fine Master data
    api_getadmissionMonthtypeData: `${baseUrl}/api/masters/month/retrieve-all`,

    api_getBusFeeFineDataById: `${baseUrl}/api/masters/busfee-fine/crud/show`,
    api_getBusFeeFineData: `${baseUrl}/api/masters/busfee-fine/crud/retrieve-all`,
    api_searchBusFeeFineData: `${baseUrl}/api/masters/busfee-fine/crud/search`,
    api_postBusFeeFineData: `${baseUrl}/api/masters/busfee-fine/crud/store`,
    api_editBusFeeFineData: `${baseUrl}/api/masters/busfee-fine/crud/edit`,
    api_deleteBusFeeFineData: `${baseUrl}/api/masters/busfee-fine/crud/delete`,

    //financial year
    api_finance_year: `${baseUrl}/api/masters/financial-year/retrieve-all`,

    //generate Demand

    //generate Demand
    api_getDemandGenerate: `${baseUrl}/api/masters/fee-demand/retrieve-all`,
    api_searchDemandGenerate: `${baseUrl}/api/masters/fee-demand/search`,
    api_postDemandGenerate: `${baseUrl}/api/masters/fee-demand/generate`,
    api_editDemandGenerate: `${baseUrl}/api/masters/fee-demand/generate/edit`,

    //user type data
    api_getusertypeData: `${baseUrl}/api/masters/user-type/retrieve-all`,
    api_getusertypeactiveData: `${baseUrl}/api/masters/user-type/active-all`,

    //icon
    api_geticonData: `${baseUrl}/api/masters/icon/retrieve-all`,

    //Menu
    //Get Menu Data
    api_getMenuDataById: `${baseUrl}/api/masters/menu/crud/show`,
    api_searchMenuDataById: `${baseUrl}/api/masters/menu/crud/search`,
    api_getMenuData: `${baseUrl}/api/masters/menu/crud/retrieve-all`,
    api_postMenuData: `${baseUrl}/api/masters/menu/crud/store`,
    api_editMenuData: `${baseUrl}/api/masters/menu/crud/edit`,
    api_deleteMenuData: `${baseUrl}/api/masters/menu/crud/delete`,

    api_getMenuActiveData: `${baseUrl}/api/masters/menu/crud/active-all`,

    //Sub-Menu
    api_getSubmenuDataById: `${baseUrl}/api/masters/sub-menu/crud/show`,
    api_searchSubmenuData: `${baseUrl}/api/masters/sub-menu/crud/search`,
    api_getSubmenuData: `${baseUrl}/api/masters/sub-menu/crud/retrieve-all`,
    api_postSubmenuData: `${baseUrl}/api/masters/sub-menu/crud/store`,
    api_editSubmenuData: `${baseUrl}/api/masters/sub-menu/crud/edit`,
    api_deleteSubmenuData: `${baseUrl}/api/masters/sub-menu/crud/delete`,

    //Get Subject Data
    api_getSubjectDataByID: `${baseUrl}/api/masters/subject/crud/show`,
    api_getSubjectData: `${baseUrl}/api/masters/subject/crud/retrieve-all`,
    api_postSubjectData: `${baseUrl}/api/masters/subject/crud/store`,
    api_editSubjectData: `${baseUrl}/api/masters/subject/crud/edit`,
    api_deleteSubjectData: `${baseUrl}/api/masters/subject/crud/delete`,
    api_searchSubjectData: `${baseUrl}/api/masters/subject/crud/search`,
    api_getactiveSubjectData: `${baseUrl}/api/masters/subject/crud/active-all`,

    api_marksEntrySection: `${baseUrl}/api/marks-entry/section`,
    api_markstabulationCrudStore: `${baseUrl}/api/marks-tabulation/crud/store`,

    //E-Book
    api_getebookById: `${baseUrl}/api/ebook/crud/show`,
    api_getebookData: `${baseUrl}/api/ebook/crud/retrieve-all`,
    api_searchebookData: `${baseUrl}/api/ebook/crud/search`,
    api_postebookData: `${baseUrl}/api/ebook/crud/store`,
    api_editebookData: `${baseUrl}/api/ebook/crud/edit`,
    api_deleteebookData: `${baseUrl}/api/ebook/crud/delete`,
    //Get News/Event Data
    api_getEventDataByID: `${baseUrl}/api/event/crud/show`,
    api_getEventData: `${baseUrl}/api/event/crud/retrieve-all`,
    api_postEventData: `${baseUrl}/api/event/crud/store`,
    api_editEventData: `${baseUrl}/api/event/crud/edit`,
    api_deleteEventData: `${baseUrl}/api/event/crud/delete`,
    api_searchEventData: `${baseUrl}/api/event/crud/search`,
    api_getActiveEventData: `${baseUrl}/api/event/crud/active-all`,

    // Get Holiday
    api_getHolidayByID: `${baseUrl}/api/holiday/crud/show`,
    api_getHolidayData: `${baseUrl}/api/holiday/crud/retrieve-all`,
    api_postHolidayData: `${baseUrl}/api/holiday/crud/store`,
    api_editHolidayData: `${baseUrl}/api/holiday/crud/edit`,
    api_deleteHolidayData: `${baseUrl}/api/holiday/crud/delete`,
    api_searchHolidayData: `${baseUrl}/api/holiday/crud/search`,
    api_getActiveHolidayData: `${baseUrl}/api/holiday/crud/active-all`,
    api_postCSVfile: `${baseUrl}/api/holiday/storeCSV`,

    //schedular
    api_time_table_store: `${baseUrl}/api/time-table/crud/store`,
    api_time_table_retrieve_all: `${baseUrl}/api/time-table/crud/retrieve-all`,
    api_time_table_active_all: `${baseUrl}/api/time-table/crud/active-all`,
    api_time_table_edit: `${baseUrl}/api/time-table/crud/edit`,
    api_time_table_show: `${baseUrl}/api/time-table/crud/show`,
    api_time_table_delete: `${baseUrl}/api/time-table/crud/delete`,
    api_getSubjectData: `${baseUrl}/api/masters/subject/crud/retrieve-all`,
    //Get Exam Term Data
    api_getExamTermDataByID: `${baseUrl}/api/exam-term/crud/show`,
    api_getExamTermData: `${baseUrl}/api/exam-term/crud/retrieve-all`,
    api_searchExamTermData: `${baseUrl}/api/exam-term/crud/search`,
    api_postExamTermData: `${baseUrl}/api/exam-term/crud/store`,
    api_editExamTermData: `${baseUrl}/api/exam-term/crud/edit`,
    api_deleteExamTermData: `${baseUrl}/api/exam-term/crud/delete`,
    api_getActiveExamTermData: `${baseUrl}/api/exam-term/crud/active-all`,

    // Get Marks Entry
    api_getMarksEntryByID: `${baseUrl}/api/marks-entry/crud/show`,
    api_getMarksEntryData: `${baseUrl}/api/marks-entry/crud/retrieve-all`,
    api_searchMarksEntryData: `${baseUrl}/api/marks-entry/crud/search`,
    api_postMarksEntryData: `${baseUrl}/api/marks-entry/crud/store`,
    api_editMarksEntryData: `${baseUrl}/api/marks-entry/crud/edit`,
    api_deleteMarksEntryData: `${baseUrl}/api/marks-entry/crud/delete`,
    api_searchMarksEntryData: `${baseUrl}/api/marks-entry/crud/search`,
    api_getActiveMarksEntryData: `${baseUrl}/api/marks-entry/crud/active-all`,

    // attendance api
    api_student_attendance: `${baseUrl}/api/student-attendance/crud/store`,
    // Get Marks Tabulation
    api_getMarksTabulationData: `${baseUrl}/api/marks-tabulation/crud/retrieve-all`,
    api_postMarksTabulationData: `${baseUrl}/api/marks-tabulation/crud/store`,

    //Get Class-Section Group Data
    api_getSectionGroupDataByID: `${baseUrl}/api/masters/section-group-map/crud/show`,
    api_getSectionGroupData: `${baseUrl}/api/masters/section-group-map/crud/retrieve-all`,
    api_getSectionGroupDataActiveAll: `${baseUrl}/api/masters/section-group-map/crud/active-all`,
    api_searchSectionGroupData: `${baseUrl}/api/masters/section-group-map/crud/search`,
    api_postSectionGroupData: `${baseUrl}/api/masters/section-group-map/crud/store`,
    api_editSectionGroupData: `${baseUrl}/api/masters/section-group-map/crud/edit`,
    api_deleteSectionGroupData: `${baseUrl}/api/masters/section-group-map/crud/delete`,
    api_getactiveSectionGroupData: `${baseUrl}/api/masters/section-group-map/crud/active-all`,

    // Get Class-Section-Subject map Data

    api_getSubjectGroupDataByID: `${baseUrl}/api/masters/subject-group-map/crud/show`,
    api_getSubjectGroupData: `${baseUrl}/api/masters/subject-group-map/crud/retrieve-all`,
    api_searchSubjectGroupData: `${baseUrl}/api/masters/subject-group-map/crud/search`,
    api_postSubjectGroupData: `${baseUrl}/api/masters/subject-group-map/crud/store`,
    api_editSubjectGroupData: `${baseUrl}/api/masters/subject-group-map/crud/edit`,
    api_deleteSubjectGroupData: `${baseUrl}/api/masters/subject-group-map/crud/delete`,
    api_getactiveSubjectGroupData: `${baseUrl}/api/masters/subject-group-map/crud/active-all`,

    api_fetch_student_attendance: `${baseUrl}/api/student/section`,
    api_student_attendance: `${baseUrl}/api/student-attendance/crud/store`,
    api_section_group_map: `${baseUrl}/api/masters/section-group-map/section`,

    api_public_registration: `${baseUrl}/api/student/online-registration/store`,
    api_miscellaneous_online_student_registration: `${baseUrl}/api/masters/miscellaneous/online-registration/retrieve-all`,
    api_public_master_class: `${baseUrl}/api/masters/class`,
    api_public_master_section: `${baseUrl}/api/masters/section`,
    api_public_master_country: `${baseUrl}/api/masters/country`,
    api_public_master_state: `${baseUrl}/api/masters/state`,
    api_public_master_city: `${baseUrl}/api/masters/city`,
    api_public_master_bank: `${baseUrl}/api/masters/bank`,
    api_public_master_pickup_point: `${baseUrl}/api/masters/pickup-point`,
    api_public_master_route: `${baseUrl}/api/masters/route`,

    // GET FEE COLLECTION API
    api_master_fee_collection_search: `${baseUrl}/api/masters/fee-collection/show`,
    //api
    api_marksEntrySection: `${baseUrl}/api/marks-entry/section`,
    api_markstabulationCrudStore: `${baseUrl}/api/marks-tabulation/crud/store`,
    // GET ID CARD SEARCH API
    api_idCardSearch: `${baseUrl}/api/student/id-card`,

    //
    api_aadharcheck: `${baseUrl}/api/employee/check-aadhar`,
    api_school_master_search_username: `${baseUrl}/api/school-masters/search-username`,
    api_school_master_registration: `${baseUrl}/api/school-masters/registration`,

    // GET MENU
    menu_crud_store: `${baseUrl}/api/masters/menu/crud/store`,
    menu_crud_active_all: `${baseUrl}/api/masters/menu/crud/active-all`,

    menu_crud_get_by_id: `${baseUrl}/api/masters/menu/crud/show`,
    menu_crud_get: `${baseUrl}/api/masters/menu/crud/retrieve-all`,
    menu_crud_search: `${baseUrl}/api/masters/menu/crud/search`,
    menu_crud_delete: `${baseUrl}/api/masters/menu/crud/delete`,
    menu_crud_edit: `${baseUrl}/api/masters/menu/crud/edit`,

    // GET SUB MENU
    sub_menu_crud_store: `${baseUrl}/api/masters/sub-menu/crud/store`,
    sub_menu_crud_edit: `${baseUrl}/api/masters/sub-menu/crud/edit`,
    sub_menu_crud_get_by_id: `${baseUrl}/api/masters/sub-menu/crud/show`,
    sub_menu_crud_get: `${baseUrl}/api/masters/sub-menu/crud/retrieve-all`,
    sub_menu_crud_search: `${baseUrl}/api/masters/sub-menu/crud/search`,
    sub_menu_crud_delete: `${baseUrl}/api/masters/sub-menu/crud/delete`,

    // menu mapping api
    menu_mapping_retrieve_all_store: `${baseUrl}/api/masters/sub-menu/show`,
    menu_mapping_store: `${baseUrl}/api/masters/menu-group-map/crud/store`,

    // Role api

    get_active_role: `${baseUrl}/api/masters/role/crud/active-all`,
    api_getRoleByID: `${baseUrl}/api/masters/role/crud/show`,
    api_getRole: `${baseUrl}/api/masters/role/crud/retrieve-all`,
    api_searchRole: `${baseUrl}/api/masters/role/crud/search`,
    api_postRole: `${baseUrl}/api/masters/role/crud/store`,
    api_editRole: `${baseUrl}/api/masters/role/crud/edit`,
    api_deleteRole: `${baseUrl}/api/masters/role/crud/delete`,

    // student login api
    api_student_login: `${baseUrl}/api/student/login`,

    // payment mode api
    api_payment_mode_active_all: `${baseUrl}/api/payment-mode/crud/active-all`,

    // fee collection api
    api_fee_collection_store: `${baseUrl}/api/fee-collection/crud/store`,

    // public mescellaneous api
    api_miscellaneous_online: `${baseUrl}/miscellaneous/online-registration/retrieve-all`,

    //attendance report
    api_attendance_report: `${baseUrl}/api/attendance-report/retrieve-all`,

    //payment Report
    api_payment_report: `${baseUrl}/api/payment-report/retrieve-all`,
    //Gallery
    api_gallerypost: `${baseUrl}/api/gallery/crud/store`,
    api_retrieve_gallery: `${baseUrl}/api/gallery/crud/retrieve-all`,
    api_search_gallery: `${baseUrl}/api/gallery/crud/search`,
    api_getById: `${baseUrl}/api/gallery/crud/show-by-name`,
    //Video
    api_videopost: `${baseUrl}/api/video/crud/store`,
    api_retrieve_video: `${baseUrl}/api/video/crud/retrieve-all`,
    api_search_video: `${baseUrl}/api/video/crud/search`,
    api_getvideoById: `${baseUrl}/api/video/crud/show-by-name`,

    api_feecollection_view_receipt: `${baseUrl}/api/fee-collection/view-receipt`,

    api_subject_map: `${baseUrl}/api/masters/subject-group-map/subject`,

    api_book_category_store: `${baseUrl}/api/book-category/crud/store`,

    api_book_category_retrieve_all: `${baseUrl}/api/book-category/crud/retrieve-all`
  };

  return apiList;
}
