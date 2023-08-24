import moment from 'moment';
import {
  CATEGORY_REGEX,
  EMAIL_REGEX,
  phoneRegExp,
  aadharRegExp
} from '../../constant';
export const validationFormSchema = (yup) => {
  const validationSchema = yup.object({
    schoolName: yup.string().required('School Name is required'),

    contactPersonName: yup.string().required('Contact Person Name is required'),
    contactPersonMobile: yup
      .string()
      .matches(phoneRegExp, 'Mobile number is not valid')
      .required('Mobile number is required'),
    contactPersonEmail: yup
      .string()
      .matches(EMAIL_REGEX, 'Email is not valid')
      .required('Email is required'),
    schoolAddress: yup.string().required('School Address is required'),
    pinCode: yup.string().required('Pin Code is required'),
    userName: yup.string().required('User Name is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  return validationSchema;
};
