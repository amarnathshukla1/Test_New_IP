import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FormControl, TextField } from '@mui/material';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';


import dayjs from 'dayjs';
import ApiClient from '../../common/ApiClient';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Season = ({ formData, setFormData, errors, setSeasonEpisodeErrors }) => {
    const { putRequest, getRequest, deleteRequest } = ApiClient();
    const [errorsEpisodeForm, setErrorsEpisodeForm] = useState({});
    const [preEpisodeData, setPreEpisodeData] = useState([]);
    const [episodeFormData, setEpisodeFormData] = React.useState({
        episode_number: '',
        release_date: null,
        ott_form_id: '1',
    });
    const loadEpisodeData = async () => {
        const preData = await getRequest(`ott/1/episode`);
        const data = preData.data;

        //  if (data && data.length < 5) setShowAddNewEntry(true)
        setPreEpisodeData(data);
    }
    useEffect(() => {
        loadEpisodeData();

    }, []);

    const validateEpisodeForm = () => {
        const newErrors = {};
        if (!episodeFormData.episode_number) newErrors.episode_number = 'Episode Number is required';
        if (!episodeFormData.release_date) newErrors.release_date = 'Release Date is required';
        setErrorsEpisodeForm(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleAddEpisode = (e) => {
        const { name, value } = e.target;
        setEpisodeFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        errorsEpisodeForm[name] = ""
        setErrorsEpisodeForm(errorsEpisodeForm);

    };
    const handleEpisodeReleaseDate = (e) => {

        if (e) {
            const formattedDate = e.format('YYYY-MM-DD');
            setEpisodeFormData(prevData => ({
                ...prevData,
                release_date: dayjs(formattedDate)
            }));
        }

    };
    const handleSeasonReleaseDate = (e) => {

        if (e) {
            const formattedDate = e.format('YYYY-MM-DD');
            setFormData(prevData => ({
                ...prevData,
                release_date: dayjs(formattedDate)
            }));
        }

    };

    const submitAddEpisode = async (e) => {
        e.preventDefault();

        if (!validateEpisodeForm()) return;
        const id = 1;
        try {

            const response = await putRequest(`ott/${id}/episode`, episodeFormData)

            if (!response.status) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            console.log("Response producer:", response);

            // Reset form after co-Producer submission
            setEpisodeFormData({
                episode_number: '',
                release_date: null,
                ott_form_id: 1,
            });
            loadEpisodeData();
            alert('Form has submitted successfully!');
            //  await loadpreData();
        } catch (error) {
            console.error("Error: ", error);
            alert('Error submitting form. Please try again later.');
        }
    };
    const submitDeleteEpisode = async (index, e) => {
        e.preventDefault();


        const id = 1;
        try {

            const response = await deleteRequest(`ott/${id}/episode/${index}`, episodeFormData)

            if (!response.status) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            console.log("Response producer:", response);

            // Reset form after co-Producer submission

            loadEpisodeData();
            alert('Episode deleted successfully!');
            //  await loadpreData();
        } catch (error) {
            console.error("Error: ", error);
            alert('Error submitting form. Please try again later.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        errors[name] = ""
        setSeasonEpisodeErrors(errors);

    };
    return (
        <>

            <h5 className="text-capitalize">
                Details Of Season & Episodes<span className="text-danger">*</span>
            </h5>

            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6} sx={{
                        // border:"1px solid green",
                        borderRadius: "15px",
                    }} >
                        <Box
                        >
                            <TextField
                                label="Season"
                                type="text"
                                fullWidth
                                name="season"
                                value={formData.season}
                                onChange={handleChange}
                            />
                        </Box>
                        {errors.season && (
                            <p className="text-danger">{errors.season}</p>
                        )}

                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Box>
                            <TextField
                                label="Total Runtime (in minutes)"
                                type="text"
                                fullWidth
                                name="runtime"
                                value={formData.runtime}
                                onChange={handleChange}
                            />
                        </Box>
                        {errors.runtime && (
                            <p className="text-danger">{errors.runtime}</p>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Box>
                            <TextField
                                label="Number of episodes"
                                type="text"
                                fullWidth
                                name="number_of_episode"
                                value={formData.number_of_episode}
                                onChange={handleChange}
                            />
                        </Box>
                        {errors.number_of_episode && (
                            <p className="text-danger">{errors.number_of_episode}</p>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div>
                            <h6>Wheather the duration of each episodes of the season is 25 min or more</h6>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="is_long_duration_timing"
                                    id="is_long_duration_timing_yes"
                                    value="1"
                                    checked={formData.is_long_duration_timing == 1}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="is_long_duration_timing_yes">
                                    Yes
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="is_long_duration_timing"
                                    id="is_long_duration_timing_no"
                                    value="0"
                                    checked={formData.is_long_duration_timing === 0 || formData.is_long_duration_timing === "0" }
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="is_long_duration_timing_no">
                                    No
                                </label>
                            </div>
                            {errors.is_long_duration_timing && (
                                <p className="text-danger">{errors.is_long_duration_timing}</p>
                            )}
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Box style={{ width: "100%" }}>
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
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            label="Release date of the season"
                                            name="release_date"
                                            value={formData.release_date}
                                            onChange={handleSeasonReleaseDate}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    height: {
                                                        xs: '48px', // height for extra-small screens
                                                        sm: '52px', // height for small screens
                                                        md: '56px', // height for medium screens
                                                        lg: '62px', // height for large screens
                                                    },
                                                    width: {
                                                        xs: '100%', // 100% width on extra-small screens
                                                        sm: '100%', // 100% width on small screens
                                                        md: '640px', // 100% width on medium screens
                                                        lg: '640px', // 100% width on large screens
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
                                    </DemoContainer>
                                </LocalizationProvider>
                            </FormControl>
                        </Box>
                        {errors.release_date && (
                            <p className="text-danger">{errors.release_date}</p>
                        )}
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>

                    {
                        preEpisodeData.map((item, index) => (

                            <>
                                <Grid item xs={3} sm={3} md={3} lg={3} className='mt-2'>
                                    Episode NUmber:
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                                    {item.episode_number}
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3} className='mt-2'>
                                    Release Date :
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3} className='mt-2'>
                                    {item.release_date}
                                </Grid>
                                <Grid item xs={1} sm={1} md={1} lg={1} className='mt-2'>
                                    <button className='btn btn-danger'
                                        onClick=
                                        {(event) => submitDeleteEpisode(item.id, event)}
                                    >
                                        -
                                    </button>
                                </Grid>
                            </>
                        ))}

                    <Grid item xs={6} sm={6} md={6} lg={6} className='mt-2'>
                        <Box>
                            <TextField
                                label="Episode Number"
                                name="episode_number"
                                type="text"
                                fullWidth
                                onChange={handleAddEpisode}
                            />
                             {errorsEpisodeForm.episode_number && (
                            <p className="text-danger">{errorsEpisodeForm.episode_number}</p>
                        )}


                        </Box>
                       
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Box style={{ width: "100%" }}>
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
                                <LocalizationProvider dateAdapter={AdapterDayjs}  >
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            label="Release date of its episodes's"
                                            name="release_date_of_the_season"
                                            value={episodeFormData.release_date}
                                            onChange={handleEpisodeReleaseDate}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    height: {
                                                        xs: '48px', // height for extra-small screens
                                                        sm: '52px', // height for small screens
                                                        md: '56px', // height for medium screens
                                                        lg: '62px', // height for large screens
                                                    },
                                                    width: {
                                                        xs: '100%', // 100% width on extra-small screens
                                                        sm: '100%', // 100% width on small screens
                                                        md: '640px', // 100% width on medium screens
                                                        lg: '640px', // 100% width on large screens
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
                                    </DemoContainer>
                                </LocalizationProvider>
                            </FormControl>
                        </Box>
                        {errorsEpisodeForm.release_date && (
                            <p className="text-danger">{errorsEpisodeForm.release_date}</p>
                        )}
                    </Grid>
                </Grid>
            </form>

            <Grid className='container'>
                <Grid item xs={12} sm={12} md={12} lg={12} className='mt-4'>
                    <Box className="d-flex justify-content-end">
                        <button className='btn btn-success text-capitalize' onClick={submitAddEpisode}>Submit and Add More</button>
                    </Box>

                </Grid>
            </Grid>

        </>
    )
}

export default Season