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
import dayjs from 'dayjs';
import ApiClient from '../../common/ApiClient';
import { useEffect } from 'react';
import DeleteDialog from '../../ip/DeleteDialog';
import { useParams } from 'react-router-dom';
import styles from "../../ott/OttPlatform/Stream.module.css"


import { getRequestGlobal } from "../../../API/global"
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Margin } from '@mui/icons-material';


const StreamedCountry = ({ setFormDataMain, setOttPlatformErrors, errors, formDataMain }) => {

    // const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

    const { id = null } = useParams();
    const { putRequest, getRequest, deleteRequest } = ApiClient();
    const [errorsForm, setErrorsForm] = useState({});
    const [preData, setPreData] = useState([]);
    const [countryId, setCountryId] = useState({})
    const [formData, setformData] = React.useState({
        // country_id: 1,
        country_id: 0,
        platform_name: '',
        release_date: null,
        ott_form_id: id,
    });
    const loadData = async () => {
        const preData = await getRequest(`ott/${id}/streamed-country`);
        const data = preData.data;

        if (data.length > 0) {

            setFormDataMain(prevData => ({
                ...prevData,
                is_streamed_country: 1
            }));
            setOttPlatformErrors({
                ...errors,
                is_streamed_country: null
            })
        } else {
            setFormDataMain(prevData => ({
                ...prevData,
                is_streamed_country: null
            }));
        }

        setPreData(data);
    }
    useEffect(() => {
        loadData();

    }, []);

    useEffect(() => {
        getRequestGlobal('country', {})
            .then((data) => {
                console.log({ data })
                setCountryId(data.data)
            })
            .catch((error) => {
            });

    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.country_id) newErrors.country_id = 'Select country name';
        if (!formData.ott_form_id) newErrors.ott_form_id = 'form id  is missing';
        if (!formData.platform_name) newErrors.platform_name = 'Enter name of the OTT platform';
        if (!formData.release_date) newErrors.release_date = 'Select release date';
        setErrorsForm(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleFormData = (e) => {
        const { name, value } = e.target;
        setformData(prevData => ({
            ...prevData,
            [name]: value
        }));
        errorsForm[name] = ""
        setErrorsForm(errorsForm);

    };
    const handleReleaseDate = (e) => {

        if (e) {
            const formattedDate = e.format('YYYY-MM-DD');
            setformData(prevData => ({
                ...prevData,
                release_date: dayjs(formattedDate)
            }));
        }

    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {

            const response = await putRequest(`ott/${id}/streamed-country`, formData)

            if (!response.status) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            console.log("Response producer:", response);

            // Reset form after co-Producer submission
            setformData({
                country_id: null,
                release_date: null,
                ott_form_id: id,
            });
            loadData();
            alert('Form has submitted successfully!');
            //  await loadpreData();
        } catch (error) {
            console.error("Error: ", error);
            alert('Error submitting form. Please try again later.');
        }
    };

    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [prepareDelete, setPrepareDelete] = useState(null);

    const handleDeleteOpen = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setPrepareDelete(value);
        setOpenDeleteConfirm(true);
    };

    const handleDeleteClose = (e) => {
        e.preventDefault();
        setOpenDeleteConfirm(false);
    };
    const submitDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await deleteRequest(`ott/${id}/streamed-country/${prepareDelete}`, formData)

            if (!response.status) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            loadData();
            alert('Record deleted successfully!');
            //  await loadpreData();
        } catch (error) {
            console.error("Error: ", error);
            alert('Error submitting form. Please try again later.');
        }
        setOpenDeleteConfirm(false);
    };

    return (
        <>
            {preData && preData.length > 0 ? (
                <TableContainer component={Paper} style={{ marginTop: '10px' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Name of country</TableCell>
                                <TableCell align="center">Name of the OTT platform</TableCell>
                                <TableCell align="center">Release date of its episodes's</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {preData.map((row) => (
                                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="center">
                                        {/* {row.country_id} */}
                                        {countryId[row.country_id] || ''}
                                    </TableCell>
                                    <TableCell align="center">{row.platform_name}</TableCell>
                                    <TableCell align="center">{row.release_date}</TableCell>
                                    <TableCell align="center">
                                        <Button value={row.id} onClick={handleDeleteOpen} variant="outlined" color="error" startIcon={<DeleteIcon style={{ color: '#d32f2f' }} />}>
                                            Delete
                                        </Button>
                                        <DeleteDialog open={openDeleteConfirm} handleClose={handleDeleteClose} handleDelete={submitDelete} />
                                    </TableCell>
                                </TableRow>
                            ))}

                            {/* <TableFooter> */}
                            <TableRow>
                                <TableCell align="center" colSpan={4}>
                                    <Grid container spacing={2} >
                                        <Grid item xs={3} sm={3} md={3} lg={3}>
                                            <Box>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Name of country</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        onChange={handleFormData}
                                                        name="country_id"
                                                        label="Name of country"
                                                        value={formData.country_id || ''}
                                                    >
                                                        <MenuItem key="0" value="">Name of country</MenuItem>
                                                        {Object.entries(countryId).map(([key, value]) => (
                                                            <MenuItem key={key} value={key}>
                                                                {value}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                {errorsForm.country_id && (
                                                    <p className="text-danger">{errorsForm.country_id}</p>
                                                )}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={3} sm={3} md={3} lg={3}>
                                            <Box>
                                                <TextField
                                                    label="Name of the OTT platform"
                                                    type="text"
                                                    fullWidth
                                                    variant="outlined"
                                                    name="platform_name"
                                                    value={formData.platform_name}
                                                    onChange={handleFormData}
                                                />
                                                {errorsForm.platform_name && (
                                                    <p className="text-danger">{errorsForm.platform_name}</p>
                                                )}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={3} sm={3} md={3} lg={3}>
                                            <Box style={{ width: "100%" }}>
                                                <FormControl>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            label="Release date of episodes's"
                                                            name="release_date"
                                                            value={formData.release_date}
                                                            onChange={handleReleaseDate}
                                                            minDate={dayjs('2023-08-01')}
                                                            maxDate={dayjs('2024-07-31')}
                                                        />
                                                    </LocalizationProvider>
                                                </FormControl>
                                                {errorsForm.release_date && (
                                                    <p className="text-danger">{errorsForm.release_date}</p>
                                                )}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={3} sm={3} md={3} lg={3}>
                                            <Box>
                                                <Button variant="contained" color="success" onClick={submitForm}>
                                                    Submit and Add More
                                                </Button>
                                                {/* <Button className='btn btn-success' onClick={submitForm}>Submit and Add More</Button> */}
                                                {errorsForm.is_streamed_country && (
                                                    <p className="text-danger error-handling">{errorsForm.is_streamed_country}</p>
                                                )}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        {/* </TableFooter> */}
                    </Table>
                </TableContainer>
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Name of country</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    onChange={handleFormData}
                                    name="country_id"
                                    label="Name of country"
                                    value={formData.country_id || ''}
                                >
                                    <MenuItem key="0" value="">Name of country</MenuItem>
                                    {Object.entries(countryId).map(([key, value]) => (
                                        <MenuItem key={key} value={key}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {errorsForm.country_id && (
                                <p className="text-danger">{errorsForm.country_id}</p>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <Box>
                            <TextField
                                label="Name of the OTT platform"
                                type="text"
                                fullWidth
                                variant="outlined"
                                name="platform_name"
                                value={formData.platform_name}
                                onChange={handleFormData}
                            />
                            {errorsForm.platform_name && (
                                <p className="text-danger">{errorsForm.platform_name}</p>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <Box style={{ width: "100%" }}>
                            <FormControl>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Release date of episodes's"
                                        name="release_date"
                                        value={formData.release_date}
                                        onChange={handleReleaseDate}
                                        minDate={dayjs('2023-08-01')}
                                        maxDate={dayjs('2024-07-31')}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                            {errorsForm.release_date && (
                                <p className="text-danger">{errorsForm.release_date}</p>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <Box>
                            <Button variant="contained" color="success" onClick={submitForm}>
                                Submit and Add More
                            </Button>
                            {errorsForm.is_streamed_country && (
                                <p className="text-danger error-handling">{errorsForm.is_streamed_country}</p>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            )}
        </>
    )
}

export default StreamedCountry