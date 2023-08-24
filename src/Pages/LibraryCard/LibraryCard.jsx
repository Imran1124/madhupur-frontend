import React from "react";

const LibraryCard = () => {
  return (
    <>
      <div className=" flex justify-center mt-[2rem] items-center">
        <div className="border border-black  w-full md:w-[80%] lg:w-[40%] h-auto">
          <h1 className="text-center uppercase tracking-wider font-semibold">
            library issue card
          </h1>
          <div className="text-left flex flex-col gap-y-2 px-3">
            <h1 className="">Mr/Miss</h1>
            <div className=" flex gap-x-28">
              <h1>of Class</h1>
              <h1>Section</h1>
              <h1>Roll no</h1>
            </div>
            <h1>
              is allowed to borrow books from the School Library for the year{" "}
            </h1>
            <div className="flex justify-between">
              <h1>Date:</h1>
              <h2>Headmastet/Headmistress</h2>
            </div>
          </div>

          <div className="relative overflow-auto  w-full shadow-md mt-[2vh] px-3">
            <table className="w-full text-sm border-collapse border " id="myTable">
              <thead className=" ">
                <tr className="border">
                  <th scope="col" className=" py-5  text-center ">
                    Sl no.
                  </th>
                  <th scope="col" className=" py-5  text-center ">
                    Name of Books
                  </th>
                  <th scope="col" className=" py-5  text-center ">
                    Date of issue
                  </th>
                  <th scope="col" className=" py-5  text-center ">
                    Date of return
                  </th>
                  <th scope="col" className=" py-5  text-center ">
                    Signature of Librarian
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  <td
                    scope="row"
                    className="font-medium whitespace-nowrap  text-center"
                  >1</td>
                  <td>Invisible Man</td>
                  <td>12/08/2000</td>
                  <td>20/08/2000</td>
                  <td></td>
                </tr>
                <tr>
                  <td
                    scope="row"
                    className="font-medium whitespace-nowrap  text-center"
                  >1</td>
                  <td>Invisible Man</td>
                  <td>12/08/2000</td>
                  <td>20/08/2000</td>
                  <td></td>
                </tr>
                <tr>
                  <td
                    scope="row"
                    className="font-medium whitespace-nowrap  text-center"
                  >1</td>
                  <td>Invisible Man</td>
                  <td>12/08/2000</td>
                  <td>20/08/2000</td>
                  <td></td>
                </tr>
                <tr>
                  <td
                    scope="row"
                    className="font-medium whitespace-nowrap  text-center"
                  >1</td>
                  <td>Invisible Man</td>
                  <td>12/08/2000</td>
                  <td>20/08/2000</td>
                  <td></td>
                </tr>
                <tr>
                  <td
                    scope="row"
                    className="font-medium whitespace-nowrap  text-center"
                  >1</td>
                  <td>Invisible Man</td>
                  <td>12/08/2000</td>
                  <td>20/08/2000</td>
                  <td></td>
                </tr>
                <tr>
                  <td
                    scope="row"
                    className="font-medium whitespace-nowrap  text-center"
                  >1</td>
                  <td>Invisible Man</td>
                  <td>12/08/2000</td>
                  <td>20/08/2000</td>
                  <td></td>
                </tr>
                <tr>
                  <td
                    scope="row"
                    className="font-medium whitespace-nowrap  text-center"
                  >1</td>
                  <td>Invisible Man</td>
                  <td>12/08/2000</td>
                  <td>20/08/2000</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default LibraryCard;
