/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-useless-escape */
import { toast } from "react-toastify";

//function to get current date
export const getCurrentDate = () => {
  let cDate = new Date();
  let year = cDate.getFullYear();
  let month = String(cDate.getMonth() + 1);
  let day = String(cDate.getDate());

  {
    month.length < 2 && (month = `0${month}`);
  }
  {
    day.length < 2 && (day = `0${day}`);
  }

  let fullDate = `${year}-${month}-${day}`;
  return fullDate;
};

export const getDateBeforeYears = (years) => {
  const currentDate = new Date(); // get current date
  const yearInMilliseconds = years * 365 * 24 * 60 * 60 * 1000; // convert years to milliseconds
  const dateBeforeYears = new Date(currentDate.getTime() - yearInMilliseconds); // subtract milliseconds from current date

  // Extract the year, month and day from the date object
  const year = dateBeforeYears.getFullYear();
  const month = dateBeforeYears.getMonth() + 1; // add 1 to account for zero-indexed months
  const day = dateBeforeYears.getDate();

  // Format the date string as 'YYYY-MM-DD'
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  return formattedDate;
};
//restriction (3-parameter, month<=11, year<=364)
//function to get custom before date from current date
export const getBeforeDate = (beforeYear, beforeMonth, beforeDay) => {
  let cDate = new Date();
  let year = cDate.getFullYear() - beforeYear;
  let month = String(cDate.getMonth() + 1 - beforeMonth);
  let day = String(cDate.getDate() - beforeDay);

  {
    month.length < 2 && (month = `0${month}`);
  }
  {
    day.length < 2 && (day = `0${day}`);
  }

  let fullBeforeDate = `${year}-${month}-${day}`;
  return fullBeforeDate;
};
//glitch if month=12, current=8 then =8-12 wrong
//restriction (3-parameter, month<=11, year<=364)
//function to get custom after date from current date
export const getAfterDate = (afterYear, afterMonth, afterDay) => {
  let cDate = new Date();
  let year = cDate.getFullYear() + afterYear;
  let month = String(cDate.getMonth() + 1 + afterMonth);
  let day = String(cDate.getDate() + afterDay);

  {
    month.length < 2 && (month = `0${month}`);
  }
  {
    day.length < 2 && (day = `0${day}`);
  }

  let fullBeforeDate = `${year}-${month}-${day}`;
  return fullBeforeDate;
};

//have to work on this comman get data format, very usefull
// const getCurrentYMD = () => {
//     let cDate = new Date()
//     let year = cDate.getFullYear()
//     let month = String(cDate.getMonth() + 1)
//     let day = String(cDate.getDate())

//     { month.length < 2 && (month = `0${month}`) }
//     { day.length < 2 && (day = `0${day}`) }

//     let fullFormattedDate = `${year}-${month}-${day}`
//     let allDates = {
//         year,
//         month,
//         day,
//         fullFormattedDate
//     }
//     return allDates
// }

export const returnCapitalize = (currentValue) => {
  let capitalizeValue = currentValue.toUpperCase();
  return capitalizeValue;
};
export const allowFloatInput = (currentValue, oldValue, max = null) => {
  if (currentValue.length > max)
    //stop if max value and return oldvalue
    return oldValue;

  const re = /^\d*\.?\d*$/; //number + one dot
  if (currentValue === "" || re.test(currentValue))
    //test for float input only one dot allowed
    return currentValue;
  else return oldValue;
};
export const allowNumberInput = (currentValue, oldValue, max = null) => {
  if (currentValue.length > max)
    //stop if max value and return oldvalue
    return oldValue;

  const re = /^[0-9\b]+$/; //number
  if (currentValue === "" || re.test(currentValue))
    //test
    return currentValue;
  else return oldValue;
};
export const allowNumberCommaInput = (currentValue, oldValue, max = null) => {
  if (currentValue.length > max)
    //stop if max value and return oldvalue
    return oldValue;

  const re = /^[0-9\b,]+$/; //number + comma
  if (currentValue === "" || re.test(currentValue))
    //test
    return currentValue;
  else return oldValue;
};
export const allowCharacterInput = (currentValue, oldValue, max = null) => {
  if (currentValue.length > max)
    //stop if max value and return oldvalue
    return oldValue;

  const re = /^[a-zA-Z\s]*$/; //character + space
  if (currentValue === "" || re.test(currentValue))
    //test
    return currentValue;
  else return oldValue;
};
export const allowCharactertrimspaceInput = (
  currentValue,
  oldValue,
  max = null
) => {
  if (currentValue.length > max)
    //stop if max value and return oldvalue
    return oldValue;

  const re = /^[a-zA-Z]+$/; //character + space
  if (currentValue === "" || re.test(currentValue))
    //test
    return currentValue;
  else return oldValue;
};
export const allowCharacterAddMinusInput = (
  currentValue,
  oldValue,
  max = null
) => {
  if (currentValue.length > max)
    //stop if max value and return oldvalue
    return oldValue;

  const re = /^[A-Za-z.+-]*$/; //character + space
  if (currentValue === "" || re.test(currentValue))
    //test
    return currentValue;
  else return oldValue;
};
export const allowCharacterSpaceCommaInput = (
  currentValue,
  oldValue,
  max = null
) => {
  if (currentValue.length > max)
    //stop if max value and return oldvalue
    return oldValue;

  const re = /^[\a-zA-Z,! ]*$/; //character + space + comma
  if (currentValue === "" || re.test(currentValue))
    //test
    return currentValue;
  else return oldValue;
};
export const allowCharacterNumberInput = (
  currentValue,
  oldValue,
  max = null
) => {
  if (currentValue.length > max)
    //stop if max value and return oldvalue
    return oldValue;

  const re = /^[\a-zA-Z0-9!]*$/; //character + number
  if (currentValue === "" || re.test(currentValue))
    //test
    return currentValue;
  else return oldValue;
};
export const allowMailInput = (currentValue, oldValue, max = null) => {
  if (currentValue.length > max)
    //stop if max value and return oldvalue
    return oldValue;

  const re = /^[\a-zA-Z0-9@.!]*$/; //character + number
  if (currentValue === "" || re.test(currentValue))
    //test
    return currentValue;
  else return oldValue;
};
export const allowonlyPositiveInteger = (
  currentValue,
  oldValue,
  max = null
) => {
  if (currentValue.length > max)
    //stop if max value and return oldvalue
    return oldValue;
  const re = /^[0-9]+$/; //character + number + space
  if (currentValue === "" || re.test(currentValue))
    //test
    return currentValue;
  else return oldValue;
};
export const allowCharacterNumberSpaceInput = (
  currentValue,
  oldValue,
  max = null
) => {
  if (currentValue.length > max)
    //stop if max value and return oldvalue
    return oldValue;

  // const re = /^[\.a-zA-Z0-9,! ]*$/; //character + number + space + dot + comma
  const re = /^[\a-zA-Z0-9! ]*$/; //character + number + space
  if (currentValue === "" || re.test(currentValue))
    //test
    return currentValue;
  else return oldValue;
};
export const allowCharacterCommaInput = (
  currentValue,
  oldValue,
  max = null
) => {
  if (currentValue.length > max)
    //stop if max value and return oldvalue
    return oldValue;

  // const re = /^[\.a-zA-Z0-9,! ]*$/; //character + number + space + dot + comma
  const re = /^[\a-zA-Z0-9! ]*$/; //character + number + space
  if (currentValue === "" || re.test(currentValue))
    //test
    return currentValue;
  else return oldValue;
};
export const allowCharacterSpecialInput = (
  currentValue,
  oldValue,
  max = null
) => {
  if (currentValue.length > max)
    //stop if max value and return oldvalue
    return oldValue;

  // const re = /^[\.a-zA-Z0-9,! ]*$/; //character + number + space + dot + comma
  const re = /^[\a-zA-Z0-9! ]*$/; //character + number + space
  if (currentValue === "" || re.test(currentValue))
    //test
    return currentValue;
  else return oldValue;
};
export const allowNumberCharacterInput = (
  currentValue,
  oldValue,
  max = null
) => {
  if (currentValue.length > max)
    //stop if max value and return oldvalue
    return oldValue;

  // const re = /^[\.a-zA-Z0-9,! ]*$/; //character + number + space + dot + comma
  const re = /^[\a-zA-Z0-9! ]*$/; //character + number + space
  if (currentValue === "" || re.test(currentValue))
    //test
    return currentValue;
  else return oldValue;
};
export const allowCharacterNumberSpaceCommaInput = (
  currentValue,
  oldValue,
  max = null
) => {
  if (currentValue.length > max)
    //stop if max value and return oldvalue
    return oldValue;

  // const re = /^[\.a-zA-Z0-9,! ]*$/; //character + number + space + dot + comma
  const re = /^[\a-zA-Z0-9!, ]*$/; //character + number + space
  if (currentValue === "" || re.test(currentValue))
    //test
    return currentValue;
  else return oldValue;
};

export const handleNullWithEmpty = (value) => {
  // null
  // undefined
  // not defined

  if (
    value === undefined ||
    value === null ||
    typeof value === "undefined" ||
    value === ""
  ) {
    return "";
  } else {
    return value;
  }
};
export const nullToNA = (value) => {
  // null
  // undefined
  // not defined

  if (
    value === undefined ||
    value === null ||
    typeof value === "undefined" ||
    value === ""
  ) {
    return "NA";
  } else if (value === true) {
    return "Yes";
  } else if (value === false) {
    return "No";
  } else {
    return value;
  }
};

// To change 454632 => 4,54,632 with null safety which return 0
export const nullToZero = (value) => {
  if (
    value === undefined ||
    value === null ||
    typeof value === "undefined" ||
    value === ""
  ) {
    return "0";
  } else {
    return parseFloat(value).toLocaleString("en-IN");
  }
};

// To change 780679 => ₹7,80,679.00 with null safety which return ₹0.00
export const indianAmount = (value) => {
  if (
    value === undefined ||
    value === null ||
    typeof value === "undefined" ||
    value === ""
  ) {
    return parseFloat(0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  } else {
    return parseFloat(value).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  }
};

// TO SCROLL TOP
export const scrollingTop = (elem) => {
  const elmnt = elem;
  elmnt.current.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "start",
  });
};

// TO LOGOUT WHEN UNAUTHENTICATED
export const checkAuthentication = (token) => {
  console.log("token", token);
  if (token.response.data.error == "Unauthenticated.") {
    console.log("Token has expired.. Need to call logout 3");
  }
};

// Example : CV/20010300000016 => CV%1020010300000016
export const encodeTranNo = (value) => {
  const encodedNo = value.replace(/\//g, "&");
  return encodedNo;
};

// Example : CV%1020010300000016 => CV/20010300000016
export const decodeTranNo = (value) => {
  const decodedNo = value.toString().replace("&", "/");
  return decodedNo;
};

//  here file is getting from handleChange of doucment i.e. e.target.files[0]
export const checkSizeValidation = (file) => {
  const fileType = (file?.name).split(".")[(file?.name).split(".").length - 1];
  const fileSize = file?.size / (1024 * 1024);

  switch (fileType) {
    case "jpeg": {
      if (fileSize <= 1) {
        return true;
      } else {
        toast.info("Image must be less than 1Mb");
        return false;
      }
    }
    case "jpg": {
      if (fileSize <= 1) {
        return true;
      } else {
        toast.info("Image must be less than 1Mb");
        return false;
      }
    }
    case "png": {
      if (fileSize <= 1) {
        return true;
      } else {
        toast.info("Image must be less than 1Mb");
        return false;
      }
    }
    case "pdf": {
      if (fileSize <= 10) {
        return true;
      } else {
        toast.info("PDF must be less than 10Mb");
        return false;
      }
    }
    default: {
      toast.info('File type must be "jpg", "jpeg", "png" or "pdf"');
      return false;
    }
  }
};
