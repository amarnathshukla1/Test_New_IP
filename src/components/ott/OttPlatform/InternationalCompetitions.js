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
const InternationalCompetitions = () => {

    const { putRequest, getRequest, deleteRequest } = ApiClient();
    const [errorsForm, setErrorsForm] = useState({});
    const [preData, setPreData] = useState([]);
    const [formData, setformData] = React.useState({
        competition_name: 1,
        competition_date: '',
        details: null,
        ott_form_id: '1',
    });
    const loadData = async () => {
        const preData = await getRequest(`ott/1/international-competition`);
        const data = preData.data;

        //  if (data && data.length < 5) setShowAddNewEntry(true)
        setPreData(data);
    }
    useEffect(() => {
        loadData();

    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.competition_name) newErrors.competition_name = 'Competition name is required';
        if (!formData.ott_form_id) newErrors.ott_form_id = 'form id  is missing';
        if (!formData.details) newErrors.details = 'Details is required';
        if (!formData.competition_date) newErrors.competition_date = 'Release Date is required';
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
    const handleCompetitionDate = (e) => {

        if (e) {
            const formattedDate = e.format('YYYY-MM-DD');
            setformData(prevData => ({
                ...prevData,
                competition_date: dayjs(formattedDate)
            }));
        }

    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;
        const id = 1;
        try {

            const response = await putRequest(`ott/${id}/international-competition`, formData)

            if (!response.status) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            console.log("Response producer:", response);

            // Reset form after co-Producer submission
            setformData({
                competition_name: '',
                competition_date: '',
                details: null,
                ott_form_id: '1',
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
            const response = await deleteRequest(`ott/${id}/international-competition/${prepareDelete}`, formData)

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
                            Competition Name:
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                            {item.competition_name}
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                            Competition Date :
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                            {item.competition_date}
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} lg={1} className='mt-2'>
                            Details:
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                            {item.details}
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
                        label="Name of the Competition"
                        type="text"
                        fullWidth
                        name="competition_name"
                        value={formData.competition_date}
                        onChange={handleFormData}
                    />
                    {errorsForm.competition_date && (
                            <p className="text-danger">{errorsForm.competition_date}</p>
                        )}
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
                                name="competition_date"
                                onChange={handleCompetitionDate}
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
                        name="details"
                        label="Details of the Awards won (if any)"
                        type="text"
                        fullWidth
                        onChange={handleFormData}
                    />
                </Box>
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

export default InternationalCompetitions