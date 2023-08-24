import React from 'react';
import propTypes from 'prop-types';

CustomFileUpload.propTypes = {
  formik: propTypes.object,
  label: propTypes.string,
  name: propTypes.string,
  isRequiredLabel: propTypes.bool,
  objectURLName: propTypes.any
};

function CustomFileUpload({
  formik,
  label,
  name,
  isRequiredLabel,
  objectURLName,
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
      <div className="flex items-center justify-start border rounded h-8 w-full  shadow-md">
        <label
          htmlFor="uploadImg"
          className="px-4 py-1.5 bg-indigo-500 text-white rounded text-sm cursor-pointer h-8 hover:bg-indigo-600"
        >
          Select a file
        </label>
        <span className="ml-5 text-sm">
          {formik?.values[name]
            ? formik?.values[name].name.length > 15
              ? formik?.values[name].name.substring(0, 15) + '...'
              : formik?.values[name].name
            : 'No file selected'}
        </span>
        <input
          onChange={(e) => {
            formik?.setFieldValue(name, e.target.files[0]);
            formik?.setFieldValue(
              objectURLName,
              URL.createObjectURL(e.target.files[0])
            );
          }}
          name="uploadImg"
          id="uploadImg"
          type="file"
          className="sr-only"
          {...props}
        />
      </div>
      <span className="text-red-600 text-xs">
        {formik?.touched[name] && formik?.errors[name]
          ? formik?.errors[name]
          : null}
      </span>
    </div>
  );
}

export default CustomFileUpload;
