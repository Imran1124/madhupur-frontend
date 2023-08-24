import isObject from "lodash/isObject";

const useErrorAutoFocusField = () => {
  const getFirstErrorKey = (object, keys = []) => {
    const firstErrorKey = Object.keys(object)[0];
    if (isObject(object[firstErrorKey])) {
      return getFirstErrorKey(object[firstErrorKey], [...keys, firstErrorKey]);
    }
    return [...keys, firstErrorKey].join(".");
  };

  const AutoFocusErrorField = ({
    isValid,
    submitCount,
    isSubmitting,
    errors,
  }) => {
    if (!isValid && submitCount !== 0 && isSubmitting) {
      const firstErrorKey = getFirstErrorKey(errors);
      if (window.document.getElementsByName(firstErrorKey).length) {
        window.document.getElementsByName(firstErrorKey)[0].focus();
      }
    }
  };

  return {
    AutoFocusErrorField,
  };
};

export default useErrorAutoFocusField;
