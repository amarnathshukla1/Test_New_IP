import React, { useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FormControl } from '@mui/material';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const OtherDetails = ({ formData, setFormData, errors, setOtherErrors }) => {

  const [open, setOpen] = React.useState(false);
  const [openOtherDetails, setOpenOtherDetailsOpen] = React.useState(false);

  const [filmScreen, setfilmScreen] = React.useState(false);
  const [screenInside, setScreenInside] = React.useState(false);
  const [screenOutsideIndia, setScreenOutsideIndia] = React.useState(false);
  const [internationalCompetition, setInternationalCompetition] = React.useState(false);


  const handleChangeDateOfFestival = (e) => {
    if (e) {
      const formattedDate = e.format('YYYY-MM-DD');
      setFormData(prevData => ({
        ...prevData,
        date_of_festival: dayjs(formattedDate)
      }));
    }
  }

  const handleChangeDateOfRelease = (e) => {
    if (e) {

      const formattedDate = e.format('YYYY-MM-DD');
      setFormData(prevData => ({
        ...prevData,
        date_of_release: dayjs(formattedDate)
      }));
    }
  }
  const handleChangeDateOfReleaseDate = (e) => {
    if (e) {
      const formattedDate = e.format('YYYY-MM-DD');
      setFormData(prevData => ({
        ...prevData,
        date_of_release_date: dayjs(formattedDate)
      }));
    }
  }


 const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "film_comletion_during_12month" && (value === 0 || value === "0")) {
      setOpenOtherDetailsOpen(true);
      setFormData(prevData => ({
        ...prevData,
        [name]: null
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    errors[name] = ""
    setOtherErrors(errors);
    }
  };
  const handleFilmScreenChange = (e) => {
    const { name, value } = e.target;

    if (value == 1) {
      setfilmScreen(1)
    } else {
      setfilmScreen(2)
    }

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    errors[name] = ""
    setOtherErrors(errors);


    if (name === "film_comletion_during_12month" && value == "0") {
      setOpen(true);
    }

  };

  const handleScreenInsideChange = (e) => {
    const { name, value } = e.target;

    if (value == 1) {
      setScreenInside(1)
    } else {
      console.log(value);
      setScreenInside(2)
    }

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    errors[name] = ""
    setOtherErrors(errors);

  }

  const handleScreenOutsideIndiaChange = (e) => {
    const { name, value } = e.target;

    if (value == 1) {
      setScreenOutsideIndia(1)
    } else {
      console.log(value);
      setScreenOutsideIndia(2)
    }

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    errors[name] = ""
    setOtherErrors(errors);
  }

  const handleInternationalChange = (e) => {
    const { name, value } = e.target;

    if (value == 1) {
      setInternationalCompetition(1)
    } else {
      console.log(value);
      setInternationalCompetition(2)
    }

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    errors[name] = ""
    setOtherErrors(errors);
  }


  const handleCompletionClose = () => {
    setOpenOtherDetailsOpen(false)
  }

  const handleOtherDetailsClickOpen = () => {
    setOpenOtherDetailsOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const backendData = {
          details_of_awards_won_if_any: "null" // Example data from backend
        };

        console.log('Raw backend data:', backendData); // Log raw data
         // Helper function to replace null or "null" with an empty string
         const replaceNull = (value) => (value === null || value === "null" ? '' : value);

        const processedData = {
          details_of_awards_won_if_any: replaceNull(backendData.details_of_awards_won_if_any)
        };

        console.log('Processed data:', processedData); // Log processed data

        setFormData(prevData => ({
          ...prevData,
          ...processedData,
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
}, [setFormData]);


  return (
    <>
      <h5 className="text-capitalize">
        Other Details<span className='text-danger'>*</span>
      </h5>
      <form>
        <div className='row'>
          <div className="col-sm-12 col-lg-12 mt-4">
            <React.Fragment>
              <div>
                <h6>Wheather the Film has been completed during the last 12 months preceding the festival i.e 1st August, 2023 to 31st July, 2024</h6>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="film_comletion_during_12month"
                    id="film_comletion_during_12month_yes"
                    value="1"
                    checked={formData.film_comletion_during_12month == 1}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="film_comletion_during_12month_yes">
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="film_comletion_during_12month"
                    id="film_comletion_during_12month_no"
                    value="0"
                    // checked={formData.film_comletion_during_12month == 0}
                    checked={formData.film_comletion_during_12month === 0 || formData.film_comletion_during_12month === '0'}
                    onChange={handleChange}
                  // onClick={handleOtherDetailsClickOpen}
                  />
                  <label className="form-check-label" htmlFor="film_comletion_during_12month_no">
                    No
                  </label>
                </div>
                {errors.film_comletion_during_12month && (
                  <p className="text-danger">{errors.film_comletion_during_12month}</p>
                )}
              </div>
              <BootstrapDialog
                onClose={handleCompletionClose}
                aria-labelledby="customized-dialog-title"
                open={openOtherDetails}
              >
                <DialogContent dividers>
                  <Typography gutterBottom>
                    The completion year of production of the films should be during the last 12 months preceding the festival i.e 1st August 2023 to 31st July 2024
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleCompletionClose}>
                    Ok
                  </Button>
                </DialogActions>
              </BootstrapDialog>
            </React.Fragment>
          </div>
        </div>

        <div className='row'>
          <div className="col-sm-12 col-lg-6 mt-4">
            <h6>Wheather the Film has been screened in any Indian or International Film Festival</h6>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="film_screened"
                id="film_screened_any_indian_international_festival_yes"
                value="1"
                checked={formData.film_screened == 1}
                onChange={handleFilmScreenChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="film_screened"
                id="film_screened_any_indian_international_festival_no"
                value="0"
                checked={formData.film_screened === 0 || formData.film_screened === '0'}
                onChange={handleFilmScreenChange}
              />
              <label className="form-check-label" htmlFor="film_screened_any_indian_international_festival_no">
                No
              </label>
            </div>
            {errors.film_screened && (
              <p className="text-danger">{errors.film_screened}</p>
            )}
          </div>
        </div>

        {(formData.film_screened == 1) ?
          <>
            <Grid container spacing={2} className='mt-3'>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    fullWidth
                    label='Name of the festival'
                    // InputProps={{
                    //   style: {
                    //     border: "1px solid #CF528A",
                    //     borderRadius: "5px",
                    //   },
                    // }}
                    className="input_border"
                    name="name_of_festival"
                    value={formData.name_of_festival}
                    onChange={handleChange}
                  />
                  {errors.name_of_festival && (
                    <p className="text-danger">{errors.name_of_festival}</p>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    fullWidth
                    label='Address of the Festival'
                    // InputProps={{
                    //   style: {
                    //     border: "1px solid #CF528A",
                    //     borderRadius: "5px",
                    //   },
                    // }}
                    className="input_border"
                    name="address_of_festival"
                    value={formData.address_of_festival}
                    onChange={handleChange}
                  />
                  {errors.address_of_festival && (
                    <p className="text-danger">{errors.address_of_festival}</p>
                  )}
                </Box>
              </Grid>
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
                          label="Date of Festival"
                          placeholder="Date of festival"
                          name="date_of_festival"
                          value={formData.date_of_festival}
                          onChange={handleChangeDateOfFestival}
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
                                md: '100%',
                                lg: '100%',
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
                {errors.date_of_festival && (
                  <p className="text-danger">{errors.date_of_festival}</p>
                )}
              </Grid>
            </Grid>
          </>
          :
          <>

          </>
          }
          
        <div className='row'>
          <div className="col-sm-12 col-lg-6 mt-4">
            <h6>Wheather Film has been shown/broadcasted on the Internet/TV or other media</h6>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="film_broadcast_tv"
                id="film_shown_broadcast_on_internate_tv_yes"
                value="1"
                checked={formData.film_broadcast_tv == 1}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="film_shown_broadcast_on_internate_tv_yes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="film_broadcast_tv"
                id="film_shown_broadcast_on_internate_tv_no"
                value="0"
                // checked={formData.film_broadcast_tv == 0}
                checked={formData.film_broadcast_tv === 0 || formData.film_broadcast_tv === '0'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="film_shown_broadcast_on_internate_tv_no">
                No
              </label>
            </div>
            {errors.film_broadcast_tv && (
              <p className="text-danger">{errors.film_broadcast_tv}</p>
            )}
          </div>
        </div>

        <div className='row'>
          <div className="col-sm-12 col-lg-6 mt-4">
            <h6>Wheather Film has been screened commercially inside India</h6>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="film_screened_inside_india"
                id="film_screened_commercially_inside_india_yes"
                value="1"
                checked={formData.film_screened_inside_india == 1}
                onChange={handleScreenInsideChange}
              />
              <label className="form-check-label" htmlFor="film_screened_commercially_inside_india_yes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="film_screened_inside_india"
                id="film_screened_commercially_inside_india_no"
                value="0"
                // checked={formData.film_screened_inside_india == 0}
                checked={formData.film_screened_inside_india === 0 || formData.film_screened_inside_india === '0'}
                onChange={handleScreenInsideChange}
              />
              <label className="form-check-label" htmlFor="film_screened_commercially_inside_india_no">
                No
              </label>
            </div>
            {errors.film_screened_inside_india && (
              <p className="text-danger">{errors.film_screened_inside_india}</p>
            )}
          </div>
        </div>

        {(formData.film_screened_inside_india == 1) ?
          <>
            <div className='row'>
              <div className="col-sm-12 col-lg-6 mt-4">
                <div className="input_field"
                // style={{
                //   border: "1px solid #CF528A",
                //   borderRadius: "5px",
                // }}
                >
                </div>

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
                            label="Date of Release"
                            placeholder="Date of Release"
                            name="date_of_release"
                            value={formData.date_of_release}
                            onChange={handleChangeDateOfRelease}
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
                                  md: '100%',
                                  lg: '100%',
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
                  {errors.date_of_release && (

                    <p className="text-danger">{errors.date_of_release}</p>
                  )}
                </Grid>
              </div>
            </div>
          </>
          :
          <>
          </>
        }

        <div className='row'>
          <div className="col-sm-12 col-lg-6 mt-4">
            <h6>Wheather Film has been screened commercially outside India</h6>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="film_screened_outside_india"
                id="film_screened_commercially_outside_india_yes"
                value="1"
                checked={formData.film_screened_outside_india == 1}
                onChange={handleScreenOutsideIndiaChange}
              />
              <label className="form-check-label" htmlFor="film_screened_commercially_outside_india_yes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="film_screened_outside_india"
                id="film_screened_commercially_outside_india_no"
                value="0"
                // checked={formData.film_screened_outside_india == 0}
                checked={formData.film_screened_outside_india === 0 || formData.film_screened_outside_india === '0'}
                onChange={handleScreenOutsideIndiaChange}
              />
              <label className="form-check-label" htmlFor="film_screened_commercially_outside_india_no">
                No
              </label>
            </div>
            {errors.film_screened_outside_india && (
              <p className="text-danger">{errors.film_screened_outside_india}</p>
            )}
          </div>
        </div>

        {(formData.film_screened_outside_india == 1) ?

          <>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label='Name of the Country'
                  // InputProps={{
                  //   style: {
                  //     border: "1px solid #CF528A",
                  //     borderRadius: "5px",
                  //   },
                  // }}

                  className="input_border"
                  name="name_of_country"
                  value={formData.name_of_country}
                  onChange={handleChange}
                />
                {errors.name_of_country && (
                  <p className="text-danger">{errors.name_of_country}</p>
                )}
              </Grid>
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
                          label="Date of Release date"
                          placeholder="Date of Release date"
                          name="date_of_release_date"
                          value={formData.date_of_release_date}
                          onChange={handleChangeDateOfReleaseDate}
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
                                md: '100%',
                                lg: '100%',
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
                {errors.date_of_release_date && (
                  <p className="text-danger">{errors.date_of_release_date}</p>
                )}
              </Grid>
            </Grid>
          </>
          :
          <>
          </>
        }


        <div className='row'>
          <div className="col-sm-12 col-lg-6 mt-4">
            <h6>Wheather Film has participated in any International Competition</h6>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="film_participated_compentitaion"
                id="film_participated_in_any_compentitaion_yes"
                value="1"
                checked={formData.film_participated_compentitaion == 1}
                onChange={handleInternationalChange}
              />
              <label className="form-check-label" htmlFor="film_participated_in_any_compentitaion_yes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="film_participated_compentitaion"
                id="film_participated_in_any_compentitaion_no"
                value="0"
                // checked={formData.film_participated_compentitaion == 0}
                checked={formData.film_participated_compentitaion === 0 || formData.film_participated_compentitaion === '0'}
                onChange={handleInternationalChange}
              />
              <label className="form-check-label" htmlFor="film_participated_in_any_compentitaion_no">
                No
              </label>
            </div>
            {errors.film_participated_compentitaion && (
              <p className="text-danger">{errors.film_participated_compentitaion}</p>
            )}
          </div>
        </div>



        {(formData.film_participated_compentitaion == 1) ?

          <>
            <Grid container spacing={2} >
              <Grid item xs={12} sm={12} md={5} lg={6}>
                <Box>
                  <TextField
                    fullWidth
                    label='Name of the festival'
                    // InputProps={{
                    //   style: {
                    //     border: "1px solid #CF528A",
                    //     borderRadius: "5px",
                    //   },
                    // }}
                    className="input_border"
                    name="name_of_compentitaion_festival"
                    value={formData.name_of_compentitaion_festival}
                    onChange={handleChange}
                  />
                  {errors.name_of_compentitaion_festival && (
                    <p className="text-danger">{errors.name_of_compentitaion_festival}</p>
                  )}
                </Box>
              </Grid>
            </Grid>
          </>
          :
          <>
          </>
        }


        <div className='row'>
          <div className="col-sm-12 col-lg-6 mt-4">
            <h6>Wheather, it is Director's Debut Film</h6>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="is_directore_debute_film"
                id="is_directore_debute_film_yes"
                value="1"
                checked={formData.is_directore_debute_film == 1}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="is_directore_debute_film_yes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="is_directore_debute_film"
                id="is_directore_debute_film_no"
                value="0"
                // checked={formData.is_directore_debute_film == 0}
                checked={formData.is_directore_debute_film === 0 || formData.is_directore_debute_film === '0'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="is_directore_debute_film_no">
                No
              </label>
            </div>
            {errors.is_directore_debute_film && (
              <p className="text-danger">{errors.is_directore_debute_film}</p>
            )}
          </div>
          <div className="col-sm-12 col-lg-6 mt-4">
            <h6>Wheather Film's distribution is limited to india only</h6>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="film_distribution_limited_to_india_only"
                id="film_distribution_limited_to_india_only_yes"
                value="1"
                checked={formData.film_distribution_limited_to_india_only == 1}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="film_distribution_limited_to_india_only_yes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="film_distribution_limited_to_india_only"
                id="film_distribution_limited_to_india_only_no"
                value="0"
                // checked={formData.film_distribution_limited_to_india_only == 0}
                checked={formData.film_distribution_limited_to_india_only === 0 || formData.film_distribution_limited_to_india_only === '0'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="film_distribution_limited_to_india_only_no">
                No
              </label>
            </div>
            {errors.film_distribution_limited_to_india_only && (
              <p className="text-danger">{errors.film_distribution_limited_to_india_only}</p>
            )}
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-12 col-lg-6 mt-4'>
            <div class="form-floating">
              <textarea class="form-control" placeholder="Details of the Awards won(if any)" id="awards" style={{ height: "100px", borderRadius: "5px" }}
 name="details_of_awards_won_if_any"
 value={formData.details_of_awards_won_if_any}
 onChange={handleChange}
              ></textarea>
              <label for="awards" style={{ fontWeight: "normal" }}>Details of the Awards won(if any)</label>
            </div>
            {/* {errors.details_of_awards_won_if_any && (
              <p className="text-danger">{errors.details_of_awards_won_if_any}</p>
            )} */}
          </div>
        </div>
      </form>
    </>
  )
}

export default OtherDetails