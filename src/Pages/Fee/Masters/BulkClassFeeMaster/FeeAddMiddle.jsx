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

export default function FeeAddMiddle(props) {
  const{formik,feeHeadNameList}=props;
  return (
    <div className=' block w-full'>
       
      <div className="px-10 mt-2 grid grid-cols-12   gap-4">
      <div div className="mt-4 col-span-12 lg:col-span-4">
        <FormControl
                      fullWidth
                      error={formik.touched.feeHeadName && Boolean(formik.errors.feeHeadName)}
                    >
                      <InputLabel id="demo-simple-select-label" sx={{ mt: -1 }}>
                        Select Fee Head Name
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Fee Head Name"
                        {...formik.getFieldProps('feeHeadName')}
                        fullWidth
                        size="small"
                      >
                        <MenuItem value="">Select</MenuItem>
                        {feeHeadNameList &&
                                    feeHeadNameList?.map((data) => {
                                      return (
                                        <MenuItem value={data?.id}>
                                          {data?.fee_head_name}
                                        </MenuItem>
                                      );
                                    })}
                      </Select>
                      <FormHelperText>
                        {formik.touched.feeHeadName && formik.errors.feeHeadName}
                      </FormHelperText>
                    </FormControl>
        </div>
      
        <div div className="mt-4 col-span-12 lg:col-span-4">
        <TextField
                      type="text"
                      {...formik.getFieldProps('feeAmount')}
                      label="Fee Amount"
                      fullWidth
                      size="small"
                      error={
                        formik.touched.feeAmount &&
                        Boolean(formik.errors.feeAmount)
                      }
                      helperText={
                        formik.touched.feeAmount && formik.errors.feeAmount
                      }
                    />

</div>
<div div className="mt-4 col-span-12 lg:col-span-4">
        <TextField
                      type="text"
                      {...formik.getFieldProps('description')}
                      label="Description"
                      fullWidth
                      size="small"
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                    />

</div>
      </div>
      
  
    </div>
  )
}
