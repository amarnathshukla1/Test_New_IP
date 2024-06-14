import React, { useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs, LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { GLOBAL_URL } from '../../../API/global';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FormControl } from '@mui/material';


const CbfcCertification = ({ formData, setFormData, errors, setCbfcErrors }) => {

  // const [dateOfCbfcCertificate, setDateOfCbfcCertificate] = useState(null);
  // const [dateOfCompletionProduction, setDateOfCompletionProduction] = useState(null);


  // useEffect(() => {
  //   // Show modal when component mounts
  //   console.log("2st use effect")
  //   setPreDateData();


  // }, []);

  // const setPreDateData = () => {
  //   console.log({date_of_cbfc_certificate:formData.date_of_cbfc_certificate})
  //   if( formData.date_of_cbfc_certificate){
  //     console.log("data fetch")
  //     setDateOfCbfcCertificate(dayjs( formData.date_of_cbfc_certificate ));
  //   };
  //   if( formData.date_of_completion_production){
  //     setDateOfCompletionProduction(dayjs( formData.date_of_completion_production ));
  //   };
  // }

  const [CbfcOrUncensoresd, setCbfcOrUncensoresd] = React.useState(false);


  const handleCbfcOrUncensoresdChange = (e) => {
    const { name, value } = e.target;
    console.log(value);

    if (value == 1) {
      setCbfcOrUncensoresd(1)
    } else {
      console.log(value);
      setCbfcOrUncensoresd(2)
    }
    setFormData({
      ...formData,
      [name]: parseInt(value),
    });
    errors[name] = ""
    setCbfcErrors(errors);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    errors[name] = ""
    setCbfcErrors(errors);
  };

  // const [selectedFile, setSelectedFile] = useState(null);

  // const [country, setCountry] = React.useState('');

  // const [selectedDate, setSelectedDate] = React.useState(null);

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };


  const [selectedCbfcFile, setSelectedCbfcFile] = useState();
  const handleFileCbfcChange = (event) => {
    setSelectedCbfcFile(event.target.files[0]);
    const file = event.target.files[0];

    console.log(file, "file");
    setFormData((prevState) => ({
      ...prevState,
      file_cbfc_certificate: file,
      is_file_cbfc_certificate: 1,
    }));
    // errors[name] = ""
    // setCbfcErrors(errors);
  };



  const [selectedAttachCopyFile, setSelectedAttachCopyFile] = useState(null);

  const handleFileAttachCopyChange = (event) => {
    setSelectedAttachCopyFile(event.target.files[0]);
    const file = event.target.files[0];

    console.log(file, "file attach");
    setFormData((prevState) => ({
      ...prevState,
      uncensored_file: file,
      is_declaration_clause_file: 1,
    }));
  };

  const handleChangeDateOfCompletionProduction = (e) => {
    console.log(e);
    const formattedDate = e.format('YYYY-MM-DD');

    setFormData(prevData => ({
      ...prevData,
      date_of_cbfc_certificate: dayjs(formattedDate),

    }));

    //const [dateOfCbfcCertificate, setSelectedDate] = useState(dayjs(formData.date_of_cbfc_certificate));
  }

  const handleChangeDateOfCbfcCertificate = (e) => {
    console.log(e);
    const formattedDate = e.format('YYYY-MM-DD');
    console.log(formattedDate);
    setFormData(prevData => ({
      ...prevData,
      date_of_completion_production: dayjs(formattedDate)
    }));

  }


  return (
    <>
      <h4 className="text-capitalize">Details of CBFC Certification/ Completion of the Production<span className="text-danger">*</span>:-</h4>
      <form>
        <div className='row'>
          <div className="col-sm-12 col-lg-6 mt-4">
            <h6>Wheather the film is certified by CBFC or uncensored</h6>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="film_is_certified_by_cbfc_or_uncensored"
                id="film_is_certified_by_cbfc_or_uncensored_yes"
                value="1"
                checked={formData.film_is_certified_by_cbfc_or_uncensored == 1}
                onChange={handleCbfcOrUncensoresdChange}
              />
              <label className="form-check-label" htmlFor="film_is_certified_by_cbfc_or_uncensored_yes">
                Certified by CBFC
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="film_is_certified_by_cbfc_or_uncensored"
                id="film_is_certified_by_cbfc_or_uncensored_no"
                value="2"
                checked={formData.film_is_certified_by_cbfc_or_uncensored == 2}
                onChange={handleCbfcOrUncensoresdChange}
              />
              <label className="form-check-label" htmlFor="film_is_certified_by_cbfc_or_uncensored_no">
                Uncensored
              </label>
            </div>
          </div>
          {errors.film_is_certified_by_cbfc_or_uncensored && (
            <p className="text-danger">{errors.film_is_certified_by_cbfc_or_uncensored}</p>
          )}
        </div>

        {
          (formData.film_is_certified_by_cbfc_or_uncensored == 1) ?
            <>
              <div className='row mt-4'>
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <div className="input_field"
                  // style={{
                  //   border: "1px solid #CF528A",
                  //   borderRadius: "5px",
                  //   width:"600px"
                  // }}
                  >
                  </div>
                </div>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Box style={{ width: "100%" }}>
                      <FormControl
                        sx={{
                          width: {
                            xs: '100%',
                            sm: '100%',
                            md: '100%',
                            lg: '100%',
                          }
                        }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                          <DemoContainer components={['DatePicker']}>
                            <DatePicker
                              label="Date of CBFC certificate"
                              placeholder="Date of CBFC certificate"
                              onChange={handleChangeDateOfCompletionProduction}
                              name="date_of_cbfc_certificate"
                              value={formData.date_of_cbfc_certificate}
                              minDate={dayjs('2023-08-01')}
                              maxDate={dayjs('2024-07-31')}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  height: {
                                    xs: '48px',
                                    sm: '52px',
                                    md: '56px',
                                    lg: '62px',
                                  },
                                  width: {
                                    xs: '100%',
                                    sm: '100%',
                                    md: '630px',
                                    lg: '630px',
                                  },
                                  borderRadius: {
                                    xs: '4px',
                                    sm: '5px',
                                    md: '6px',
                                    lg: '7px',
                                  },
                                }
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </FormControl>

                    </Box>
                    {errors.date_of_cbfc_certificate && (
                      <p className="text-danger">{errors.date_of_cbfc_certificate}</p>
                    )}
                  </Grid>
                  <Grid xs={12} sm={12} lg={6} md={6} className='mt-4'>
                    <Box>
                      <TextField
                        fullWidth
                        label='Certification No'
                        // InputProps={{
                        //   style: {
                        //     border: "1px solid #CF528A",
                        //     borderRadius: "5px",
                        //   },
                        // }}

                        className="input_border"
                        name="certificate_no"
                        value={formData.certificate_no}
                        onChange={handleChange}
                      />
                      {errors.certificate_no && (
                        <p className="text-danger">{errors.certificate_no}</p>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Box>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"
                        onChange={handleFileCbfcChange}
                        style={{ display: 'none', width: "100%" }}
                        id="fileInput"
                        name="file_cbfc_certificate"
                      // value={formData.file_cbfc_certificate}
                      />
                      <label htmlFor="fileInput" style={{ width: "100%", height: "100%" }}>
                        <TextField
                          variant="outlined"
                          placeholder="Attach Copy Of CBFC Certificate"
                          value={selectedCbfcFile ? selectedCbfcFile.name : ''}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => document.getElementById('fileInput').click()}
                                  edge="end"
                                >
                                  <AttachFileIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                            style: {
                              // border: "1px solid #CF528A",
                              borderRadius: "5px",
                              height: "108px",
                            },
                          }}
                          fullWidth
                        />
                        {errors.file_cbfc_certificate && (
                          <p className="text-danger">{errors.file_cbfc_certificate}</p>
                        )}
                        {!(formData?.documentData?.[4]) ? <></> : (
                          <div>
                            <span className="Attach_Photo_ID">
                              <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[4].file}`}>{formData?.documentData?.[4].name}</a>
                            </span>
                          </div>
                        )}
                      </label>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </>
            :
            ((formData.film_is_certified_by_cbfc_or_uncensored == 2) ?
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Box style={{ width: "100%" }}>
                      <FormControl
                        sx={{
                          width: {
                            xs: '100%',
                            sm: '100%',
                            md: '100%',
                            lg: '100%',
                          }
                        }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                          <DemoContainer components={['DatePicker']}>
                            <DatePicker
                              label="Date of Completion of Production"
                              placeholder="Date of Completion of Production"
                              name="date_of_completion_production"
                              value={formData.date_of_completion_production}
                              onChange={handleChangeDateOfCbfcCertificate}
                              minDate={dayjs('2023-08-01')}
                              maxDate={dayjs('2024-07-31')}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  height: {
                                    xs: '48px',
                                    sm: '52px',
                                    md: '56px',
                                    lg: '62px',
                                  },
                                  width: {
                                    xs: '100%',
                                    sm: '100%',
                                    md: '630px',
                                    lg: '630px',
                                  },
                                  borderRadius: {
                                    xs: '4px',
                                    sm: '5px',
                                    md: '6px',
                                    lg: '7px',
                                  },
                                }
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </FormControl>
                    </Box>
                    {errors.date_of_completion_production && (
                      <p className="text-danger">{errors.date_of_completion_production}</p>
                    )}


                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6}>
                    <Box>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"
                        onChange={handleFileAttachCopyChange}
                        style={{ display: 'none', width: "100%" }}
                        id="fileInput"
                        name="declaration_clause_file"
                      />
                      <label htmlFor="fileInput" style={{ width: "100%", height: "100%" }}>
                        <TextField
                          variant="outlined"
                          placeholder="Attach Copy Of Declaration As per Clause (7.2(C))"
                          value={selectedAttachCopyFile ? selectedAttachCopyFile.name : ''}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => document.getElementById('fileInput').click()}
                                  edge="end"
                                >
                                  <AttachFileIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                            style: {
                              // border: "1px solid #CF528A",
                              borderRadius: "5px",
                              height: "108px",
                            },
                          }}
                          fullWidth
                        />
                        {errors.declaration_clause_file && (
                          <p className="text-danger">{errors.declaration_clause_file}</p>
                        )}
                      </label>
                      {!(formData?.documentData?.[3]) ? <></> : (
                        <div>
                          <span className="Attach_Photo_ID">
                            <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[3].file}`}>{formData?.documentData?.[3].name}</a>
                          </span>
                        </div>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </>
              : <></>
            )
        }
      </form>
    </>
  )
}

export default CbfcCertification
