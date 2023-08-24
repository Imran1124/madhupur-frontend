import React, { useEffect } from "react";

export default function FeeAddLast(props) {
  const { formik, months } = props;

  useEffect(() => {
    formik.setFieldValue(
      "datas",
      months.map((data) => {
        console.log(data)
        return { ...data, inputValue: 0 };
      })
    );
  }, [months]);
  console.log(formik.values.datas);
  const CheckAll = () => {
    const temp = formik?.values?.datas?.map((item) => {
      return {
        ...item,
        inputValue: 1,
      };
    });
    formik.setFieldValue("datas", temp);
  };

  const ClearAll = () => {
    const temp = formik?.values?.datas?.map((item) => {
      return {
        ...item,
        inputValue: 0,
      };
    });
    formik.setFieldValue("datas", temp);
  };

  return (
    <>
     {months.length>0 ? (<>
      <div className="border border-gray-300 mx-3 py-5 my-10 flex items-center justify-center flex-wrap">
        {formik.values.datas.map((eachValue, index) => (
          <>
            <div className="flex w-[40vh] my-4">
              <h1 className="text-[1.8vh] mx-4 px-4  bg-gradient-to-r from-[#ccfbf1] w-[15vh]">
                {eachValue?.month_name}
              </h1>
              <h1>
                <input
                  {...formik.getFieldProps(`datas.${index}.inputValue`)}
                  value={eachValue?.datas}
                  checked={formik.values.datas[index].inputValue === 1}
                  onChange={() =>
                    formik.setFieldValue(
                      `datas.${index}.inputValue`,
                      eachValue?.inputValue ? 0 : 1
                    )
                  }
                  type="checkbox"
                  className="h-6 w-6 m-1  bg-gradient-to-r from-indigo-300"
                />{" "}
              </h1>
            </div>
          </>
        ))}
        <div className="flex items-center justify-center mt-6 w-full">
          <button
            onClick={CheckAll}
            className="px-5 py-2 border border-[#059669] text-white rounded-[10px] bg-[#059669] mx-4"
          >
            Check All
          </button>
          <button
            onClick={ClearAll}
            className="px-5 py-2 border border-gray-400 text-[#059669] rounded-[10px] bg-white mx-4"
          >
            Clear All
          </button>
        </div>
      </div>
      </>) : null}
    </>
  );
}
