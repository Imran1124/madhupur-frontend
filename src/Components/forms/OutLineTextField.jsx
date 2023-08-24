import React from 'react';
import { getIn } from 'formik';
import propTypes from 'prop-types';

OutLineTextField.propTypes = {
  formik: propTypes.object,
  label: propTypes.string,
  name: propTypes.string,
  type: propTypes.string,
  placeholder: propTypes.string,
  className: propTypes.string,
  disabled: propTypes.bool,
  isRequiredLabel: propTypes.bool,
  onInput: propTypes.func,
  isDynamic: propTypes.bool
};

export default function OutLineTextField({
  formik,
  label,
  name,
  type = 'text',
  placeholder,
  className = '',
  disabled = false,
  isRequiredLabel,
  onInput,
  isDynamic = false,
  ...props
}) {
  return (
    <div>
      <div className="relative">
        <input
          {...(formik && formik.getFieldProps(name))}
          type={type}
          {...(onInput && { onInput })}
          id="outlined"
          disabled={disabled}
          aria-describedby="outlined_help"
          className={`block px-2.5 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded border 

          ${
            isDynamic
              ? getIn(formik?.touched, name) && getIn(formik?.errors, name)
                ? 'border-red-600 appearance-none dark:text-white dark:border-red-500 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer'
                : 'border-gray-600 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer'
              : formik?.touched[name] && formik?.errors[name]
              ? 'border-red-600 appearance-none dark:text-white dark:border-red-500 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer'
              : 'border-gray-600 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer'
          }

           `}
          placeholder=" "
          {...props}
        />
        <label
          htmlFor="outlined"
          className={`absolute text-sm ${
            isDynamic
              ? getIn(formik?.touched, name) && getIn(formik?.errors, name)
                ? 'text-red-600 dark:text-red-500'
                : 'text-gray-600 dark:text-gray-500'
              : formik?.touched[name] && formik?.errors[name]
              ? 'text-red-600 dark:text-red-500'
              : 'text-gray-600 dark:text-gray-500'
          }  duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
        >
          {label}
          {isRequiredLabel && (
            <small className="mt-1 text-sm font-semibold text-red-600 inline ">
              *
            </small>
          )}
        </label>
      </div>
      <p
        id="outlined_help"
        className={`mt-2 text-xs ${
          isDynamic
            ? getIn(formik?.touched, name) && getIn(formik?.errors, name)
              ? 'text-red-600 dark:text-red-400'
              : 'text-gray-600 dark:text-gray-400'
            : formik?.touched[name] && formik?.errors[name]
            ? 'text-red-600 dark:text-red-400'
            : 'text-gray-600 dark:text-gray-400'
        } `}
      >
        {isDynamic
          ? getIn(formik?.touched, name) && getIn(formik?.errors, name)
          : formik?.touched[name] && formik?.errors[name]}
        {/* <span className="font-medium">Well done!</span> Some success message. */}
      </p>
    </div>
  );
}
