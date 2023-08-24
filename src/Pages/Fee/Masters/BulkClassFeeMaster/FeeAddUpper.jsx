import React from 'react';
import {
  TextField,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';


export default function FeeAddUpper(props) {
   const{formik,feeHeadTypeList,financialList,classList}=props;
    
  return (
    <>
        
                <div className="px-10 mt-2 grid grid-cols-12 gap-4">
        <div className="mt-4  col-span-8 lg:col-span-4">
                    <FormControl
                      fullWidth
                      error={formik.touched.fyId && Boolean(formik.errors.fyId)}
                    >
                      <InputLabel id="demo-simple-select-label" sx={{ mt: -1 }}>
                        Select Financial Year
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Financial Year"
                        {...formik.getFieldProps('fyId')}
                        fullWidth
                        size="small"
                      >
                        <MenuItem value="">Select</MenuItem>
                        {financialList &&
                                    financialList?.map((data) => {
                                      return (
                                        <MenuItem value={data?.fy}>
                                          {data?.fy}
                                        </MenuItem>
                                      );
                                    })}
                      </Select>
                      <FormHelperText>
                        {formik.touched.fyId && formik.errors.fyId}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div className="mt-4 col-span-8 lg:col-span-4">
                    <FormControl
                      fullWidth
                      error={formik.touched.classId && Boolean(formik.errors.classId)}
                    >
                      <InputLabel id="demo-simple-select-label" sx={{ m: -1 }}>
                        Select Class
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Class"
                        {...formik.getFieldProps('classId')}
                        fullWidth
                        size="small"
                      >
                        <MenuItem value="">Select</MenuItem>
                        {classList &&
                                    classList?.map((data) => {
                                      return (
                                        <MenuItem value={data?.id}>
                                          {data?.class_name}
                                        </MenuItem>
                                      );
                                    })}
                      </Select>
                      <FormHelperText>
                        {formik.touched.classId && formik.errors.classId}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div div className="mt-4 col-span-4 lg:col-span-4">
        <FormControl
                      fullWidth
                      error={formik.touched.feeHeadType && Boolean(formik.errors.feeHeadType)}
                    >
                      <InputLabel id="demo-simple-select-label" sx={{ m: -1 }}>
                        Select Fee Head Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Fee Head Type"
                        {...formik.getFieldProps('feeHeadType')}
                        fullWidth
                        size="small"
                      >
                        <MenuItem value="">Select</MenuItem>
                        {feeHeadTypeList &&
                                    feeHeadTypeList?.map((data) => {
                                      return (
                                        <MenuItem value={data?.id}>
                                          {data?.fee_head_type}
                                        </MenuItem>
                                      );
                                    })}
                      </Select>
                      <FormHelperText>
                        {formik.touched.feeHeadType && formik.errors.feeHeadType}
                      </FormHelperText>
                    </FormControl>
        </div>
                  </div>
    </>
  )
}
