import React from "react";
import logo from "../FeeCollection/sr-school-logo-removebg-preview.png";

const NewReceipt = () => {
  return (
    <>
      <div className=" flex justify-center mt-[2rem] items-center h-[70vh] md:h-auto overflow-auto">
        <div className="border-2 border-black  w-full md:w-[80%] lg:w-[35%]  h-auto">
          <div className="flex w-full">
            <div className="w-[30%]">
              <img className="w-[60%]" src={logo} alt="" />
            </div>
            <div className="-ml-5">
              <h1 className="uppercase py-2 text-center text-[2.5vh] font-bold mr-[0.6vh] tracking-wider italic">
                s.r. international school
              </h1>
              <h1 className="px-2 py-1 border border-b-4 text-[1.8vh] w-full border-black rounded-lg">
                Play Group I U.K.G to VIII (C.B.S.E Cirriculum)
              </h1>
            </div>
          </div>
          <div>
            <h1 className="text-center font-semibold text-[2vh]">
              Campus: Pipra, Madhupur, Deogarh, Jharkhand-81553
            </h1>
            <h1 className="text-center font-semibold text-[2vh]">
              Tel: +91 6207244672, +8271771202
            </h1>
            <div className="flex justify-center items-center py-2">
              <h1 className=" bg-black w-[23%] py-1 px-1  text-white uppercase">
                fee receipt
              </h1>
            </div>

            <div className="flex justify-between mx-2">
              <h1>Sl. No.</h1>
              <h1>Date........................</h1>
            </div>
            <div className="text-left mx-2">
              <h1>
                Name:
                ................................................................................
              </h1>
              <h1>
                Admission No:
                .........................................................................
              </h1>
              <h1>
                Fee Receipt for the month of:
                .......................................................
              </h1>
            </div>

            <div className="relative overflow-auto  w-full shadow-md ">
              <table
                className="w-full text-sm border-collapse border border-black "
                id="myTable"
              >
                <thead className="border border-black">
                  <tr>
                    <th
                      scope="col"
                      className=" py-2 border border-black text-center "
                    >
                      Sl. No.
                    </th>
                    <th className="uppercase py-2 border border-black text-center ">
                      Particulars
                    </th>
                    <th
                      colSpan={2}
                      className="uppercase py-2 border border-black text-center "
                    >
                      <h1>Amount</h1>
                      <div className="flex justify-around">
                        <h1>Rs.</h1>
                        <h1>p.</h1>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
         
                  <tr>
                    <td
                      scope="row"
                      className="font-medium whitespace-nowrap border border-black text-center"
                    >
                      djfhjdh
                    </td>
                    <td
                      scope="row"
                      className="font-medium whitespace-nowrap border border-black text-center"
                    >
                      djfhjdh
                    </td>
                    <td
                      scope="row"
                      className="font-medium whitespace-nowrap border border-black text-center"
                    >
                      djfhjdh
                    </td>
                    <td
                      scope="row"
                      className="font-medium whitespace-nowrap border border-black text-center"
                    >
                      djfhjdh
                    </td>
                  </tr>
                  <tr>
                    <td
                      scope="row"
                      className="font-medium whitespace-nowrap border border-black text-center"
                    >
                      djfhjdh
                    </td>
                    <td
                      scope="row"
                      className="font-medium whitespace-nowrap border border-black text-center"
                    >
                      djfhjdh
                    </td>
                    <td
                      scope="row"
                      className="font-medium whitespace-nowrap border border-black text-center"
                    >
                      djfhjdh
                    </td>
                    <td
                      scope="row"
                      className="font-medium whitespace-nowrap border border-black text-center"
                    >
                      djfhjdh
                    </td>
                  </tr>
                  <tr>
                    <td
                      scope="row"
                      className="font-medium whitespace-nowrap border border-black text-center"
                    >
                      djfhjdh
                    </td>
                    <td
                      scope="row"
                      className="font-medium whitespace-nowrap border border-black text-center"
                    >
                      djfhjdh
                    </td>
                    <td
                      scope="row"
                      className="font-medium whitespace-nowrap border border-black text-center"
                    >
                      djfhjdh
                    </td>
                    <td
                      scope="row"
                      className="font-medium whitespace-nowrap border border-black text-center"
                    >
                      djfhjdh
                    </td>
                  </tr>
                  <tr>
                    <td
                      scope="row"
                      className="font-medium whitespace-nowrap border border-black text-center"
                    >
                      djfhjdh
                    </td>
                    <td
                      scope="row"
                      className="font-medium whitespace-nowrap border border-black text-center"
                    >
                      djfhjdh
                    </td>
                    <td
                      scope="row"
                      className="font-medium whitespace-nowrap border border-black text-center"
                    >
                      djfhjdh
                    </td>
                    <td
                      scope="row"
                      className="font-medium whitespace-nowrap border border-black text-center"
                    >
                      djfhjdh
                    </td>
                  </tr>

                  <tr>
                    <td  className="text-left border border-black py-2 px-2" colSpan={5}>
                        <div className="flex">
                            <div>
                                <h1>Note: Pay fee before 10th day of month </h1>
                                <h1 className="ml-3">Late fee of Rs. 10 per day of month 15th</h1>
                            </div>
                            <div className="flex justify-center items-center">
                                <h1 className="bg-black ml-[2vh] px-2 py-1  text-white uppercase">TOTAL</h1>
                            </div>
                        </div>
                    </td>
                  </tr>
                  <tr>
                    <td  className="text-left" colSpan={5}>
                       <div className="m-3">
                                Rupees in Words.....................................
                       </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>


          </div>
        </div>
      </div>
    </>
  );
};

export default NewReceipt;
