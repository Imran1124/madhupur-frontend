import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { BsFiletypePdf, BsFiletypeCsv } from "react-icons/bs";
import { CSVDownload } from "react-csv";

export default function TabulationHeader(props) {
  const {
    generatePdf,
    enable,
    setenable,
    csvdata,
    readymadeListData,
    fetchMasterList,
    setSearchTableData,
    searchTableData,
  } = props;
  return (
    <div className="flex flex-wrap justify-between">
      <div className="ml-9 text-3xl gap-x-3 flex">
        <div className="text-red-700 cursor-pointer">
          <BsFiletypePdf onClick={generatePdf} />
        </div>

        
        <div className="text-[#0F766E] cursor-pointer">
          <BsFiletypeCsv onClick={() => setenable(!enable)} />
        </div>
        {enable && (
          <CSVDownload
            data={csvdata ? csvdata : readymadeListData}
            target="_blank"
          />
        )}
      </div>
      <div className=" mr-9 justify-start  max-[870px]:block max-[870px]:mt-2">
        <div className="main-sub-inner-div"></div>
        <div className="tab-div">


          <div className="global-filter-div">
            
            <TextField
              id="search"
              type="search"
              label="Search"
              size="small"
              fullWidth
              onChange={(e) => {
                if (e.target.value === "") {
                  fetchMasterList();
                } else {
                  setSearchTableData(e.target.value);
                }
              }}
              onKeyDown={(e) =>
                e.key === "Enter" && fetchMasterList(searchTableData)
              }
              sx={{ width: "100%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{
                      marginRight: "-14px",
                    }}
                  >
                    <button
                      onClick={() => {
                        if (searchTableData === "") {
                          fetchMasterList();
                        } else {
                          fetchMasterList(searchTableData);
                        }
                      }}
                      className="bg-[#0F766E] w-14 max-[320px]:w-8 h-10 rounded-r-[5px] flex items-center justify-center text-white"
                      type="submit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="h-5 w-5 "
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </InputAdornment>
                ),
              }}
            />
          </div>




        </div>
      </div>
    </div>
  );
}
