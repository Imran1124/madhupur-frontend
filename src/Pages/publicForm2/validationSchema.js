import moment from 'moment';
import {
  CATEGORY_REGEX,
  EMAIL_REGEX,
  phoneRegExp,
  aadharRegExp
} from '../../constant';
export const validationFormSchema = (yup) => {
  const validationSchema = yup.object({
    first_name: yup
      .string()
      .required()
      .matches(CATEGORY_REGEX, 'Last name must match the following (A-Z / a-z)')
      .min(3)
      .max(50)
      .label('First name'),
    middle_name: yup
      .string()
      .matches(CATEGORY_REGEX, 'Last name must match the following (A-Z / a-z)')
      .min(3)
      .max(50)
      .label('Middle name'),
    last_name: yup
      .string()
      .required()
      .matches(CATEGORY_REGEX, 'Last name must match the following (A-Z / a-z)')
      .min(3)
      .max(50)
      .label('Last name'),
    class_id: yup.string().required('Select class'),
    // section_id: yup.string().required('Select section'),

    dob: yup
      .date()
      .required('Date of birth is required')
      .max(moment().subtract(2, 'years'), 'Age should be greater than 3 years')
      .label('Date of birth'),
    // admission date should be greater than 2 years from dob
    // admission_date: yup
    //   .date()
    //   .required('Admission date is required')
    //   .min(yup.ref('dob'), 'Admission date should be greater than DOB'),

    //
    gender_id: yup.string().required('Select gender'),
    category_id: yup.string().required('Select category'),
    // roll_number: yup.string().required('Enter roll number').min(1).max(8),
    disability_id: yup.string().required('Select disability'),
    caste_id: yup.string().required('Select caste'),
    mobile: yup
      .string()
      .required()
      .matches(phoneRegExp, 'Enter valid mobile no.')
      .label('Mobile no'),
    aadhar_no: yup.string().matches(aadharRegExp, 'Enter valid Aadhar no.'),
    email: yup.string().matches(EMAIL_REGEX, 'Email is inValid'),

    blood_group_id: yup.string().required('Select blood group'),
    religion_id: yup.string().required('Select religion'),
    // ward_id: yup.string().required('Select ward'),
    // last_school_name: yup.string().min(3).max(50).label('Last school name'),
    // last_school_address: yup
    //   .string()
    //   .min(3)
    //   .max(50)
    //   .label('Last school address'),
    // upload_image: yup
    //   .mixed()
    //   .required('Please upload image')
    //   .label('Upload image'),

    // parent details validation start
    isParentOrGuardian: yup.string().required('Select Parent or Guardian'),

    // condition wise validation isParentOrGuardian is parent?

    fathers_name: yup
      .string()

      .matches(CATEGORY_REGEX, 'Please Enter value between A-Z to a-z'),
    mothers_name: yup
      .string()

      .matches(CATEGORY_REGEX, 'Please Enter value between A-Z to a-z'),
    fathers_mobile: yup
      .number()

      .min(1000000000, 'Please Enter 10 digit Mobile Number'),
    fathers_email: yup.string().email('Invalid Email'),
    // fathers_occupation_id: yup
    //   .string()
    //   .required('Please Select Fathers Occupation'),
    fathers_annual_income: yup
      .number()
      .min(5000, 'Please Enter Valid Income')
      .max(20000000, 'Please Enter Valid Income'),
    mothers_mobile: yup
      .number()
      .min(1000000000, 'Please Enter 10 digit Mobile Number'),
    mothers_email: yup.string().email('Invalid Email'),
    // mothers_occupation_id: yup
    //   .string()
    //   .required('Please Select Mothers Occupation'),
    mothers_annual_income: yup
      .number()
      .min(5000, 'Please Enter Valid Income')
      .max(20000000, 'Please Enter Valid Income'),
    fathers_aadhar_no: yup
      .number()
      .min(100000000000, 'Please Enter 12 digit Aadhar Number'),

    mothers_aadhar_no: yup
      .number()
      .min(100000000000, 'Please Enter 12 digit Aadhar Number'),
    guardian_name: yup
      .string()
      .matches(CATEGORY_REGEX, 'Please Enter value between A-Z to a-z'),
    guardian_mobile: yup
      .number()
      .min(1000000000, 'Please Enter 10 digit Mobile Number')
      .max(1000000000, 'Please Enter 10 digit Mobile Number'),
    guardian_email: yup.string().email('Invalid Email'),

    guardian_annual_income: yup
      .number()
      .min(5000, 'Please Enter Valid Income')
      .max(20000000, 'Please Enter Valid Income'),
    guardian_aadhar_no: yup
      .number()
      .min(100000000000, 'Please Enter 12 digit Aadhar Number'),
    guardian_mobile: yup
      .number()
      .min(1000000000, 'Please Enter 10 digit Mobile Number'),
    // parent details validation end
    // siblingDetails: yup.array().of(
    //   yup.object().shape({
    //     siblingName: yup.string().min(3).max(50).label('Sibling name'),
    //     siblingClassId: yup.string().required('Select class'),
    //     siblingSectionId: yup.string().required('Select section'),
    //     siblingAdmissionNo: yup
    //       .string()
    //       .required('Enter admission number')
    //       .min(1)
    //       .max(8),
    //     siblingRollNo: yup.string().required('Enter roll number').min(1).max(8)
    //   })
    // ),
    // address details validation start

    p_address1: yup.string().required('Enter address line 1'),
    p_address2: yup.string().required('Enter address line 2'),
    p_country_id: yup.string().required('Select country'),
    p_state_id: yup.string().required('Select state'),
    p_district_id: yup.string().required('Select district'),

    c_address1: yup.string().required('Enter address line 1'),
    c_address2: yup.string().required('Enter address line 2'),
    c_country_id: yup.string().required('Select country'),
    c_state_id: yup.string().required('Select state'),
    c_district_id: yup.string().required('Select district'),

    c_pincode: yup
      .number()
      .min(100000, 'Please Enter 6 digit Pincode')
      .required('Enter Pincode')
      .max(999999, 'Please Enter 6 digit Pincode'),
    p_pincode: yup
      .number()
      .min(100000, 'Please Enter 6 digit Pincode')
      .required('Enter Pincode')
      .max(999999, 'Please Enter 6 digit Pincode')

    // bank details validation start
    // account_no: yup
    //   .number()
    //   .min(10000000, 'Please Enter 8 digit Account Number'),
    // // if account no then bank_id is required
    // bank_id: yup.string().when('account_no', {
    //   is: (val) => val && val.length > 0,
    //   then: yup.string().required('Select bank')
    // })
  });

  return validationSchema;
};
