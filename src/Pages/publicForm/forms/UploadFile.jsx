import React from 'react';
import propTypes from 'prop-types';

UploadFile.propTypes = {
  formik: propTypes.object,
  label: propTypes.string,
  name: propTypes.string,
  isRequiredLabel: propTypes.bool
};

function UploadFile({ formik, label, name, isRequiredLabel, ...props }) {
  return (
    <div className="form-group col-span-12 md:col-span-2 mb-6 md:px-4">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        for="file_input"
      >
        {label}
        {isRequiredLabel && (
          <small className="mt-1 text-sm font-semibold text-red-600 inline ">
            *
          </small>
        )}
      </label>
      <input
        onChange={(e) => {
          formik.setFieldValue(name, e.target.files[0]);
        }}
        value={formik?.values?.[name][0]}
        name={name}
        className={`block w-full text-sm p-[5px] text-gray-900 border ${
          formik.touched[name] && formik.errors[name]
            ? 'border-red-500'
            : 'border-gray-300'
        }  rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none  dark:border-gray-600 dark:placeholder-gray-400`}
        aria-describedby="file_input_help"
        id="file_input"
        type="file"
        {...props}
      />
      {/* <p
                    class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="file_input_help"
                  >
                    SVG, PNG, JPG or GIF (MAX. 800x400px).
                  </p> */}
      <span className="text-red-600 text-xs">
        {formik.touched[name] && formik.errors[name]
          ? formik.errors[name]
          : null}
      </span>
    </div>
  );
}

export default UploadFile;
