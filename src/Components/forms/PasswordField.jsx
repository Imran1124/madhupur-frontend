import React from 'react';
import { getIn } from 'formik';
import propTypes from 'prop-types';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

PasswordField.propTypes = {
  formik: propTypes.object,
  label: propTypes.string,
  name: propTypes.string,

  placeholder: propTypes.string,
  className: propTypes.string,
  disabled: propTypes.bool,
  isRequiredLabel: propTypes.bool,
  onInput: propTypes.func,
  isDynamic: propTypes.bool
};

export default function PasswordField({
  formik,
  label,
  name,

  placeholder,
  className = '',
  disabled = false,
  isRequiredLabel,
  onInput,
  isDynamic = false,
  ...props
}) {
  const [showPassword, setShowPassword] = React.useState(false);
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
      <div class="relative">
        <input
          // {...formik?.getFieldProps(name)}
          {...(formik && formik.getFieldProps(name))}
          type={showPassword ? 'text' : 'password'}
          {...(onInput && { onInput })}
          placeholder={placeholder}
          disabled={disabled}
          className={`${className} form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white 
          ${
            isDynamic
              ? getIn(formik?.touched, name) && getIn(formik?.errors, name)
                ? 'border-red-600'
                : 'border-gray-300'
              : formik?.touched[name] && formik?.errors[name]
              ? 'border-red-600'
              : 'border-gray-300'
          }
         focus:outline-none placeholder-gray-300 shadow-md`}
          {...props}
        />

        <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
          {showPassword ? (
            <AiFillEye
              className="cursor-pointer text-gray-500 hover:text-gray-700 w-5 h-5"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <AiFillEyeInvisible
              className="cursor-pointer text-gray-500 hover:text-gray-700 w-5 h-5"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
      </div>
      <span className="text-red-600  text-xs">
        {isDynamic
          ? getIn(formik?.touched, name) && getIn(formik?.errors, name)
          : formik?.touched[name] && formik?.errors[name]}
      </span>
    </div>
  );
}
