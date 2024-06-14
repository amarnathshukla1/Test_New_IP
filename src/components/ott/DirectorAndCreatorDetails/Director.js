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

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
const Director = ({ proms = {} }) => {

    const { putRequest, getRequest, deleteRequest } = ApiClient();
    const [errorsForm, setErrorsForm] = useState({});
    const [preData, setPreData] = useState([]);
    const [formData, setformData] = React.useState({
        name: '',
        country_id: null,
        phone: null,
        email: null,
        website: null,
        ott_form_id: '1',
    });
    const loadData = async () => {
        const preData = await getRequest(`ott/1/creator/type/${proms.type}`);
        const data = preData.data;

        //  if (data && data.length < 5) setShowAddNewEntry(true)
        setPreData(data);
    }
    useEffect(() => {
        loadData();

    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Competition name is required';
        if (!formData.country_id) newErrors.country_id = 'form id  is missing';
        if (!formData.phone) newErrors.phone = 'Details is required';
        if (!formData.email) newErrors.email = 'Release Date is required';
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

            const response = await putRequest(`ott/${id}/creator/type/${proms.type}`, formData)

            if (!response.status) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            console.log("Response producer:", response);

            // Reset form after co-Producer submission
            setformData({
                name: '',
                country_id: null,
                phone: null,
                email: null,
                website: null,
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
            const response = await deleteRequest(`ott/${id}/creator/${prepareDelete}`, formData)

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
                        {(index == 0) ?

                            <>
                                <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                                    Name :
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                                    country :
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                                    Phone:
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3} className='mt-2'>
                                    Email:
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                                    Website:
                                </Grid>
                            </>
                            : ''
                        }
                        <>
                            <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                                {item.name}
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                                {item.country_id}
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                                {item.phone}
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} lg={3} className='mt-2'>
                                {item.email}
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2} className='mt-2'>
                                {item.website}
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


                    </>
                ))}
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                    <TextField
                        label={(proms.type == 1) ? `Name of the creator's` : `Name of the director's`}
                        type="text"
                        fullWidth
                        name="name"
                        onChange={handleFormData}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                    <TextField
                        label="Nationality"
                        type="text"
                        fullWidth
                        name="country_id"
                        onChange={handleFormData}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box className='d-flex align-items-center'>
                    <FormControl
                        //  sx={{ m: 1, minWidth: 120 }}>
                        sx={{ minWidth: 120 }}
                        style={{ border: "1px", borderRadius: "5px" }}
                    >
                        <Select
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label', border: "1px", borderRadius: "5px", }}
                        // InputProps={{
                        //   style: {
                        //     border: "1px solid #CF528A",
                        //     borderRadius: "5px",
                        //   },
                        // }}
                        >
                            <MenuItem value="">
                                +91
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        variant="outlined"
                        type='number'
                        fullWidth
                        placeholder='Number'
                        name="phone"
                        InputProps={{
                            style: {
                                border: "1px",
                                borderRadius: "5px",
                            },
                        }}
                        className="input_border"
                        onChange={handleFormData}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder='Email ID'
                    name="email"
                    InputProps={{
                        style: {
                            border: "1px",
                            borderRadius: "5px",
                        },
                    }}
                    className="input_border"
                    onChange={handleFormData}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder='Website'
                    name="website"
                    onChange={handleFormData}
                    InputProps={{
                        style: {
                            border: "1px",
                            borderRadius: "5px",
                        },
                    }}
                    className="input_border"

                />
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

export default Director