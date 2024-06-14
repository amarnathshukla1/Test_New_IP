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
const StreamedCountry = () => {

    const { putRequest, getRequest, deleteRequest } = ApiClient();
    const [errorsForm, setErrorsForm] = useState({});
    const [preData, setPreData] = useState([]);
    const [formData, setformData] = React.useState({
        country_id: 1,
        platform_name: '',
        release_date: null,
        ott_form_id: '1',
    });
    const loadData = async () => {
        const preData = await getRequest(`ott/1/streamed-country`);
        const data = preData.data;

        //  if (data && data.length < 5) setShowAddNewEntry(true)
        setPreData(data);
    }
    useEffect(() => {
        loadData();

    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.country_id) newErrors.country_id = 'Country is required';
        if (!formData.ott_form_id) newErrors.ott_form_id = 'form id  is missing';
        if (!formData.platform_name) newErrors.platform_name = 'Platform name is required';
        if (!formData.release_date) newErrors.release_date = 'Release date is required';
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
        const id = 1;
        try {

            const response = await putRequest(`ott/${id}/streamed-country`, formData)

            if (!response.status) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            console.log("Response producer:", response);

            // Reset form after co-Producer submission
            setformData({
                episode_number: '',
                release_date: null,
                ott_form_id: 1,
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
        const id = 1;
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
            {
                preData.map((item, index) => (

                    <>
                        <Grid item xs={1} sm={1} md={1} lg={1} className='mt-2'>
                            Country:
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                            {item.country_id}
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                            Platform Name :
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                            {item.platform_name}
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                            Release Date:
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                            {item.release_date}
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} lg={1} className='mt-2'>
                            <button className='btn btn-danger'
                                // onClick=
                                // {(event) => submitDelete(item.id, event)}
                                value={item.id}
                                onClick={handleDeleteOpen}
                            >
                                -
                            </button>
                            <DeleteDialog open={openDeleteConfirm} handleClose={handleDeleteClose} handleDelete={submitDelete} />

                        </Grid>
                    </>
                ))}
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                    <TextField
                        name="country_id"
                        label="Name of country"
                        type="text"
                        fullWidth
                        value={formData.country_id}
                        onChange={handleFormData}
                    />
                     {errorsForm.country_id && (
                            <p className="text-danger">{errorsForm.country_id}</p>
                        )}
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                    <TextField
                        label="Name of the OTT platform"
                        type="text"
                        fullWidth
                        name="platform_name"
                        value={formData.platform_name}
                        onChange={handleFormData}
                    />
                     {errorsForm.platform_name && (
                            <p className="text-danger">{errorsForm.platform_name}</p>
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}  >
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    label="Release date of its episodes's"
                                    name="release_date"
                                    value={formData.release_date}
                                    onChange={handleReleaseDate}
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
                                                md: '640px',
                                                lg: '640px', 
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
                {errorsForm.release_date && (
                            <p className="text-danger">{errorsForm.release_date}</p>
                        )}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box className='d-flex align-items-center justify-content-end'>
                    <Box>
                        <button className='btn btn-success' onClick={submitForm}>Submit and Add More</button>
                    </Box>
                </Box>
            </Grid>
        </>
    )
}

export default StreamedCountry