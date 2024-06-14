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
const Broadcasted = () => {

    const { putRequest, getRequest, deleteRequest } = ApiClient();
    const [errorsForm, setErrorsForm] = useState({});
    const [preData, setPreData] = useState([]);
    const [formData, setformData] = React.useState({
       
        stream_date: null,
        platform_name: "",
        ott_form_id: '1',
    });
    const loadData = async () => {
        const preData = await getRequest(`ott/1/broardcast`);
        const data = preData.data;

        //  if (data && data.length < 5) setShowAddNewEntry(true)
        setPreData(data);
    }
    useEffect(() => {
        loadData();

    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.ott_form_id) newErrors.ott_form_id = 'form id  is missing';
        if (!formData.platform_name) newErrors.platform_name = 'Platform Name is required';
        if (!formData.stream_date) newErrors.stream_date = 'Date of streaming is required';
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
                stream_date: dayjs(formattedDate)
            }));
        }

    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;
        const id = 1;
        try {

            const response = await putRequest(`ott/${id}/broardcast`, formData)

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
            const response = await deleteRequest(`ott/${id}/broardcast/${prepareDelete}`, formData)

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
                        <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                            Date of streaming:
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                            {item.stream_date}
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                            Nameof the platform :
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                            {item.platform_name}
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} className='mt-2'>
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
            {/* <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                    <TextField
                        name="country_id"
                        label="Name of country"
                        type="text"
                        fullWidth
                        onChange={handleFormData}
                    />
                </Box>
            </Grid> */}

            {/* <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box
                    sx={{
                        width: '100%',
                    }}
                >
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Date of Streaming"
                                name="Date of Streaming"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        height: {
                                            xs: '48px',
                                            sm: '52px',
                                            md: '56px',
                                            lg: '62px',
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
                        </LocalizationProvider>
                    </FormControl>
                </Box>

            </Grid> */}

            <Grid className='container'>
                
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
                    }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}  >
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                   label="Date of the Streaming"
                                   name="stream_date"
                                    value={formData.stream_date}
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
                    {errorsForm.stream_date && (
                            <p className="text-danger">{errorsForm.stream_date}</p>
                        )}
                </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} className='mt-2'>
                <Box>
                    <TextField
                        label="Name of the platform"
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
            {/* <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box style={{ width: "100%" }}>
                    <FormControl
                        sx={{
                            width: "100%",

                            borderRadius: "5px",
                        }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}  >
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    label="Release date of its episodes's"
                                    name="release_date_of_the_season"
                                    value={formData.release_date}
                                    onChange={handleReleaseDate}
                                    // InputProps={{
                                    // }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            width: '100% !important',
                                            height: "62px",
                                            borderRadius: "5px",
                                        },
                                        '& .MuiInputAdornment-root': {
                                        },
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>
                </Box>
            </Grid> */}
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

export default Broadcasted