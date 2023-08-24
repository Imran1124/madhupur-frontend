import React from 'react';
import { getIn } from 'formik';
import propTypes from 'prop-types';

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
    <div className="flex w-full">
      <label className="w-full">
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
        className={`${className} className="w-full border border-gray ml-5 rounded-[10px] h-10" 
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
