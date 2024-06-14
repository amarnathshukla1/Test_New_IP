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
const ThreatricalScreening = () => {

    const { putRequest, getRequest, deleteRequest } = ApiClient();
    const [errorsForm, setErrorsForm] = useState({});
    const [preData, setPreData] = useState([]);
    const [formData, setformData] = React.useState({
        ott_form_id: '1',
        festival_name: "",
        date_of_festival: null,
        address: "",
    });
    const loadData = async () => {
        const preData = await getRequest(`ott/1/threatrical-screening`);
        const data = preData.data;

        //  if (data && data.length < 5) setShowAddNewEntry(true)
        setPreData(data);
    }
    useEffect(() => {
        loadData();

    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.festival_name) newErrors.festival_name = 'Festival name is required';
        if (!formData.date_of_festival) newErrors.date_of_festival = 'Date of festival is required';
        if (!formData.address) newErrors.address = 'Address is required';
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
                date_of_festival: dayjs(formattedDate)
            }));
        }

    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;
        const id = 1;
        try {

            const response = await putRequest(`ott/${id}/threatrical-screening`, formData)

            if (!response.status) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            console.log("Response producer:", response);

            // Reset form after co-Producer submission
            setformData({
                festival_name: "",
                date_of_festival: null,
                address: "",
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
            const response = await deleteRequest(`ott/${id}/threatrical-screening/${prepareDelete}`, formData)

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
                            Name of the festival:
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                            {item.festival_name}
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                            Date of the festival :
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                            {item.date_of_festival}
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} lg={1} className='mt-2'>
                            Address of the festival:
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                            {item.address}
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
                        name="festival_name"
                        label="Name of the Festival/Screening"
                        type="text"
                        fullWidth
                        onChange={handleFormData}
                    />
                </Box>
                {errorsForm.festival_name && (
                            <p className="text-danger">{errorsForm.festival_name}</p>
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}  >
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    label="Date of the Festival/Screening"
                                    name="date_of_festival"
                                    value={formData.date_of_festival}
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
                    {errorsForm.date_of_festival && (
                            <p className="text-danger">{errorsForm.date_of_festival}</p>
                        )}
                </Box>
            </Grid>


            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                    <TextField
                        name="address"
                        label="Address of the festival"
                        type="text"
                        fullWidth
                        onChange={handleFormData}
                    />
                </Box>
                {errorsForm.address && (
                            <p className="text-danger">{errorsForm.address}</p>
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

export default ThreatricalScreening