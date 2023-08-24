import React from 'react';
import { getIn } from 'formik';
import propTypes from 'prop-types';
import { AiFillEye } from 'react-icons/ai';

TextField.propTypes = {
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

export default function TextField({
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
    <div className="form-group col-span-12 md:col-span-2 mb-6 md:px-4">
      <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
        {label}
        {isRequiredLabel && (
          <small className="mt-1 text-sm font-semibold text-red-600 inline ">
            *
          </small>
        )}
      </label>
      <input
        {...formik.getFieldProps(name)}
        type={type}
        {...(onInput && { onInput })}
        placeholder={placeholder}
        disabled={disabled}
        className={`${className} form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white 
          ${
            isDynamic
              ? getIn(formik.touched, name) && getIn(formik.errors, name)
                ? 'border-red-600'
                : 'border-gray-300'
              : formik.touched[name] && formik.errors[name]
              ? 'border-red-600'
              : 'border-gray-300'
          }
         focus:outline-none placeholder-gray-300 shadow-md`}
        {...props}
      />
      <span className="text-red-600  text-xs">
        {isDynamic
          ? getIn(formik.touched, name) && getIn(formik.errors, name)
          : formik.touched[name] && formik.errors[name]}
      </span>
    </div>
  );
}
