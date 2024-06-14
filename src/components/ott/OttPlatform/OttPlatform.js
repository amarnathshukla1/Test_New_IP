import React, { useState } from 'react'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box';
import { FormControl, TextField } from '@mui/material';
import RemoveIcon from "../../../images/remove.png"
import PlusIcon from "../../../images/plus_icon.png"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import StreamedCountry from './StreamedCountry';
import ThreatricalScreening from './ThreatricalScreening';
import Broadcasted from './Broadcasted';
import InternationalCompetitions from './InternationalCompetitions';


const OttPlatform = ({ formData, setFormData, errors, setOttPlatformErrors }) => {
    const [showCastAndCrewRemoveButton, setShowCastAndCrewRemoveButton] = useState(false)
    const [selectedDetailsCastCrewFile, setSelectedDetailsCastCrewFile] = useState(null);


    const [country, setCountry] = React.useState('');

    const handleselectedDetailsCastCrewFile = (event) => {
        setSelectedDetailsCastCrewFile(event.target.files[0]);
        setShowCastAndCrewRemoveButton(true)
        const DetailsCastCrewfile = event.target.files[0];
        // Do something with the uploaded file
        console.log(DetailsCastCrewfile);
        setFormData((prevState) => ({
            ...prevState,
            details_of_cast_crew: DetailsCastCrewfile,
            is_details_of_cast_crew: 1,
        }));
    };
    const handleCastAndCrewAttachClick = () => {
        setShowCastAndCrewRemoveButton(true)
    }

    const handleCastAndCrewRemoveClick = () => {
        setShowCastAndCrewRemoveButton(false)
        setSelectedDetailsCastCrewFile(null)

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        errors[name] = ""
        setOttPlatformErrors(errors);

    };
    return (
        <>
            <h5 className="text-capitalize">
                Details Of Streaming OTT Patform<span className="text-danger">*</span>
            </h5>

            <form>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={12} md={12} lg={12}>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <TextField
                                        label="Name of the OTT Platform where the web series was originally released"
                                        type="text"
                                        fullWidth
                                        name="ott_released_platform"
                                        value={formData.ott_released_platform}
                                        onChange={handleChange}
                                    />
                                </Box>
                                {errors.ott_released_platform && (
                                    <p className="text-danger">{errors.ott_released_platform}</p>
                                )}
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <div>
                                        <h6>Other OTT platform(s) on which the Web Series is currently available, if any</h6>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="is_other_released_platform_available"
                                                id="is_other_released_platform_available_yes"
                                                value="1"
                                                checked={formData.is_other_released_platform_available == 1}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="is_other_released_platform_available_yes">
                                                Yes
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="is_other_released_platform_available"
                                                id="is_other_released_platform_available_no"
                                                value="0"
                                                checked={formData.is_other_released_platform_available === 0 || formData.is_other_released_platform_available === "0"}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="is_other_released_platform_available_no">
                                                No
                                            </label>
                                        </div>
                                        {errors.is_other_released_platform_available && (
                                            <p className="text-danger">{errors.is_other_released_platform_available}</p>
                                        )}
                                    </div>
                                </Box>
                            </Grid>
                        </Grid>



                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <h5 className="text-capitalize">
                                    Other Information
                                </h5>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Box>
                                    <div>
                                        <h6>(A) Whether web series has been streamed outside India</h6>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="is_released_other_country"
                                                id="is_released_other_country_yes"
                                                value="1"
                                                checked={formData.is_released_other_country == 1}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="is_released_other_country_yes">
                                                Yes
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="is_released_other_country"
                                                id="is_released_other_country_no"
                                                value="0"
                                                checked={formData.is_released_other_country === 0 || formData.is_released_other_country === "0"}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="is_released_other_country_no">
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </Box>
                                {errors.is_released_other_country && (
                                    <p className="text-danger">{errors.is_released_other_country}</p>
                                )}
                            </Grid>

                            {(formData.is_released_other_country == 1) ? <><StreamedCountry /></> : <></>}

                        </Grid>

                        <Grid container spacing={2} className='mt-4'>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Box>
                                    <div>
                                        <h6>(B) Whether web series has been presented for festival/theatrical screening</h6>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="is_thretrical_screening"
                                                id="is_thretrical_screening_yes"
                                                value="1"
                                                checked={formData.is_thretrical_screening == 1}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="is_thretrical_screening_yes">
                                                Yes
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="is_thretrical_screening"
                                                id="is_thretrical_screening_no"
                                                value="0"
                                                checked={formData.is_thretrical_screening === 0 || formData.is_thretrical_screening === "0"}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="is_thretrical_screening_no">
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </Box>
                                {errors.is_thretrical_screening && (
                                    <p className="text-danger">{errors.is_thretrical_screening}</p>
                                )}

                            </Grid>

                            {(formData.is_thretrical_screening == 1) ? <> <ThreatricalScreening /></> : <></>}

                        </Grid>

                        <Grid container spacing={2} className='mt-4'>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Box>
                                    <div>
                                        <h6>(C) Whether web series has been streamed/broadcasted on the Internet/TV or other media</h6>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="is_streamed_other_media"
                                                id="is_streamed_other_media_yes"
                                                value="1"
                                                checked={formData.is_streamed_other_media == 1}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="is_streamed_other_media_yes">
                                                Yes
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="is_streamed_other_media"
                                                id="is_streamed_other_media_no"
                                                value="0"
                                                checked={formData.is_streamed_other_media === 0 || formData.is_streamed_other_media === "0"}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="is_streamed_other_media_no">
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </Box>
                                {errors.is_streamed_other_media && (
                                    <p className="text-danger">{errors.is_streamed_other_media}</p>
                                )}
                            </Grid>
                            {(formData.is_streamed_other_media == 1) ? <> <Broadcasted /></> : <></>}
                        </Grid>

                        <Grid container spacing={2} className='mt-4'>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Box>
                                    <div>
                                        <h6>(D) Wheather web series has been participated in any International Competition</h6>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="is_international_competition"
                                                id="is_international_competition_yes"
                                                value="1"
                                                checked={formData.is_international_competition == 1}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="is_international_competition_yes">
                                                Yes
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="is_international_competition"
                                                id="is_international_competition_no"
                                                value="0"
                                                checked={formData.is_international_competition == 0}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="is_international_competition_no">
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </Box>
                                {errors.is_international_competition && (
                                    <p className="text-danger">{errors.is_international_competition}</p>
                                )}
                            </Grid>

                            {(formData.is_international_competition == 1) ? <><InternationalCompetitions /></> : <></>}

                            {/* <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Box className='d-flex align-items-center justify-content-end'>
                                    <Box>
                                        {showCastAndCrewRemoveButton ? (
                                            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: '#FF0000', width: '100%' }} onClick={handleCastAndCrewRemoveClick}>
                                                <img src={RemoveIcon} alt='remove icon' style={{ marginRight: '5px' }} /><p style={{ margin: 0 }}>Remove</p>
                                            </button>
                                        ) : (
                                            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'black', width: '100%' }} onClick={handleCastAndCrewAttachClick}>
                                                <img src={PlusIcon} alt='plus icon' style={{ marginRight: '5px' }} /><p style={{ margin: 0 }}>Add More</p>
                                            </button>
                                        )}
                                    </Box>
                                </Box>
                            </Grid> */}
                            {/* 
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <TextField
                                        label="Name of the Competition"
                                        type="text"
                                        fullWidth
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>


                                <Box
                                    sx={{
                                        width: '100%',
                                    }}
                                >
                                    <FormControl
                                        sx={{
                                            width: {
                                                xs: '100%', // 100% width on extra-small screens
                                                sm: '100%', // 100% width on small screens
                                                md: '100%', // 100% width on medium screens
                                                lg: '100%', // 100% width on large screens
                                            }
                                        }}
                                    >
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Date of the Competition"
                                                name="Date of Streaming"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        height: {
                                                            xs: '48px', // height for extra-small screens
                                                            sm: '52px', // height for small screens
                                                            md: '56px', // height for medium screens
                                                            lg: '62px', // height for large screens
                                                        },
                                                        borderRadius: {
                                                            xs: '4px', // border-radius for extra-small screens
                                                            sm: '5px', // border-radius for small screens
                                                            md: '6px', // border-radius for medium screens
                                                            lg: '7px', // border-radius for large screens
                                                        },
                                                    }
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <TextField
                                        label="Details of the Awards won (if any)"
                                        type="text"
                                        fullWidth
                                    />
                                </Box>
                            </Grid> */}
                        </Grid>


                    </Grid>





                </Grid>
            </form>
        </>
    )
}

export default OttPlatform