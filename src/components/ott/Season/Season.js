import * as React from 'react'

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
import { useState, useReducer } from 'react';


import dayjs from 'dayjs';
import ApiClient from '../../common/ApiClient';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialog from '../../ip/DeleteDialog';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Season = ({ formData, setFormData, errors, setSeasonEpisodeErrors }) => {
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
    const { id = null } = useParams();
    const { putRequest, getRequest, deleteRequest } = ApiClient();
    const [errorsEpisodeForm, setErrorsEpisodeForm] = useState({});
    const [preEpisodeData, setPreEpisodeData] = useState([]);
    const [episodeFormData, setEpisodeFormData] = React.useState({
        episode_number: '',
        release_date: null,
        ott_form_id: id,
    });
    const loadEpisodeData = async () => {
        const preEpisodeData = await getRequest(`ott/${id}/episode`);
        const data = preEpisodeData.data;

        if (data.length > 0) {
            setFormData({
                ...formData,
                is_episode_added: true
            })
            setSeasonEpisodeErrors({
                ...errors,
                is_episode_added: null
            })
        } else {
            setFormData({
                ...formData,
                is_episode_added: null
            })

        }
        setPreEpisodeData(data);
    }
    useEffect(() => {
        loadEpisodeData();

    }, [reducerValue]);

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
            console.log(formattedDate)
            setFormData(prevData => ({
                ...prevData,
                release_date: dayjs(formattedDate)
            }));
        }

    };

    const submitAddEpisode = async (e) => {
        e.preventDefault();

        if (!validateEpisodeForm()) return;

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
                ott_form_id: id,
            });
            // loadEpisodeData();
            forceUpdate();
            alert('Form has submitted successfully!');
            //  await loadpreEpisodeData();
        } catch (error) {
            console.error("Error: ", error);
            alert('Error submitting form. Please try again later.');
        }
    };
    const submitDeleteEpisode = async (index, e) => {
        e.preventDefault();

        try {

            const response = await deleteRequest(`ott/${id}/episode/${index}`, episodeFormData)

            if (!response.status) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            console.log("Response producer:", response);

            // Reset form after co-Producer submission

            // loadEpisodeData();
            alert('Episode deleted successfully!');
            forceUpdate();
            //  await loadpreEpisodeData();
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

    const handleKeyDown = (event) => {
        // Prevent the letter 'e', '+', '-', '.' and other non-numeric characters
        if (['e', 'E', '+', '-', '.'].includes(event.key)) {
            event.preventDefault();
        }
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
                        <Box>
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
                                type="tel"
                                fullWidth
                                name="runtime"
                                value={formData.runtime}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                inputProps={{ maxLength: 5 }}
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
                                type="number"
                                fullWidth
                                name="number_of_episode"
                                value={formData.number_of_episode}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
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
                                    checked={formData.is_long_duration_timing === 0 || formData.is_long_duration_timing === "0"}
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
                            >
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            label="Release date of the season"
                                            name="release_date"
                                            value={formData.release_date}
                                            onChange={handleSeasonReleaseDate}
                                            minDate={dayjs('2023-08-01')}
                                            maxDate={dayjs('2024-07-31')}
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


                {preEpisodeData && preEpisodeData.length > 0 ? (
                    <TableContainer component={Paper} style={{ marginTop: '10px' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="caption table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>Date of the Streaming</TableCell>
                                    <TableCell align="center">Name of the platform</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {preEpisodeData.map((row) => (
                                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="center">{row.episode_number}</TableCell>
                                        <TableCell align="center">{row.release_date}</TableCell>
                                        <TableCell align="center">
                                            <Button onClick={(event) => submitDeleteEpisode(row.id, event)} variant="outlined" color="error" startIcon={<DeleteIcon style={{ color: '#d32f2f' }} />}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                <TableRow>
                                    <TableCell align="center" colSpan={4}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                                <Box>
                                                    <TextField
                                                        label="Episode Number"
                                                        name="episode_number"
                                                        type="number"
                                                        fullWidth
                                                        onChange={handleAddEpisode}
                                                        onKeyDown={handleKeyDown}
                                                    />
                                                    {errorsEpisodeForm.episode_number && (
                                                        <p className="text-danger">{errorsEpisodeForm.episode_number}</p>
                                                    )}


                                                </Box>

                                            </Grid>
                                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                                <Box style={{ width: "100%" }}>
                                                    <FormControl>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}  >
                                                            <DemoContainer components={['DatePicker']}>
                                                                <DatePicker
                                                                    label="Release date of episodes's"
                                                                    name="release_date_of_the_season"
                                                                    value={episodeFormData.release_date}
                                                                    onChange={handleEpisodeReleaseDate}
                                                                    minDate={dayjs('2023-08-01')}
                                                                    maxDate={dayjs('2024-07-31')}
                                                                />
                                                            </DemoContainer>
                                                        </LocalizationProvider>
                                                    </FormControl>
                                                </Box>
                                                {errorsEpisodeForm.release_date && (
                                                    <p className="text-danger">{errorsEpisodeForm.release_date}</p>
                                                )}
                                            </Grid>
                                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                                <Box>
                                                    <Button variant="contained" color="success" onClick={submitAddEpisode}>
                                                        Submit and Add More
                                                    </Button>
                                                    {errors.is_episode_added && (
                                                        <p className="text-danger error-handling">{errors.is_episode_added}</p>
                                                    )}
                                                </Box>
                                            </Grid>
                                        </Grid >
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            {/* </TableFooter> */}
                        </Table>
                    </TableContainer>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <Box>
                                <TextField
                                    label="Episode Number"
                                    name="episode_number"
                                    type="number"
                                    fullWidth
                                    onChange={handleAddEpisode}
                                    onKeyDown={handleKeyDown}
                                />
                                {errorsEpisodeForm.episode_number && (
                                    <p className="text-danger">{errorsEpisodeForm.episode_number}</p>
                                )}


                            </Box>

                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <Box style={{ width: "100%" }}>
                                <FormControl>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}  >
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker
                                                label="Release date of its episodes's"
                                                name="release_date_of_the_season"
                                                value={episodeFormData.release_date}
                                                onChange={handleEpisodeReleaseDate}
                                                minDate={dayjs('2023-08-01')}
                                                maxDate={dayjs('2024-07-31')}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </FormControl>
                            </Box>
                            {errorsEpisodeForm.release_date && (
                                <p className="text-danger">{errorsEpisodeForm.release_date}</p>
                            )}
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <Box className="d-flex align-items-center  justify-content-end">
                                <Box>
                                    <button className='btn btn-success text-capitalize' onClick={submitAddEpisode}>Submit and Add More</button>
                                    <br />
                                    {errors.is_episode_added && (
                                        <p className="text-danger">{errors.is_episode_added}</p>
                                    )}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid >
                )}

            </form>





        </>
    )
}

export default Season