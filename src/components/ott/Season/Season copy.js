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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Season = () => {
    const [inputFields, setInputFields] = React.useState([{ value: '' }]);
    const [inputDateFields, setinputDateFields] = React.useState([{ value: null }]);

    const handleInputChange = (index, event) => {
        const newInputFields = inputFields.map((inputField, i) => {
            if (i === index) {
                return { ...inputField, value: event.target.value };
            }
            return inputField;
        });

        setInputFields(newInputFields);
    };
    const handleDateChange = (index, event) => {
        const newInputDateFields = inputDateFields.map((inputField, i) => {

            if (i === index) {
                return { ...inputDateFields, value: event };
            }
            return inputDateFields;
        });

        setinputDateFields(newInputDateFields);
    };

    const handleAddField = () => {
        setInputFields([...inputFields, { value: '' }]);
    };

    const handleRemoveField = (index) => {
        const newInputFields = inputFields.filter((_, i) => i !== index);
        setInputFields(newInputFields);
    };
    return (
        <>
            <h1 className="text-capitalize">
                Details Of Season & Episodes<span className="text-danger">*</span>
            </h1>
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

                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Box>
                            <TextField
                                label="Total Runtime (in minutes)"
                                type="text"
                                fullWidth
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Box>
                            <TextField
                                label="Number of episodes"
                                type="text"
                                fullWidth
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>

                        <div>
                            <h6>Wheather the duration of each episodes of the season is 25 min or more</h6>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="category"
                                    id="category_yes"
                                />
                                <label className="form-check-label" htmlFor="category_yes">
                                    Yes
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="category"
                                    id="category_no"
                                />
                                <label className="form-check-label" htmlFor="category_no">
                                    No
                                </label>
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Box style={{ width: "100%" }}>
                            <FormControl
                                sx={{
                                    width: "100%",
                                    borderRadius: "5px",
                                }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            label="Release date of the season"
                                            name="Release date of the season"

                                            // InputProps={{
                                            // }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    width: '640px !important',
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
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container spacing={2}>
                    {inputFields.map((inputField, index) => (
                        <>
                            <Grid key={index} item xs={5} sm={5} md={5} lg={5} className='mt-2'>
                                <TextField
                                    label="Episode Number"
                                    type="text"
                                    fullWidth
                                    value={inputField.value}
                                    onChange={(event) => handleInputChange(index, event)}
                                />
                            </Grid>
                            <Grid item xs={5} sm={5} md={5} lg={5}>
                                <Box style={{ width: "100%" }}>
                                    <FormControl
                                        sx={{
                                            width: "100%",

                                            borderRadius: "5px",
                                        }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{
                                            width: "100%",

                                            borderRadius: "5px",
                                        }}>
                                            <DemoContainer components={['DatePicker']} sx={{
                                                width: "100%",

                                                borderRadius: "5px",
                                            }}>
                                                <DatePicker
                                                    label="Release date of its episodes's"
                                                    name="Release date of the season"
                                                    onChange={(event) => handleDateChange(index, event)}
                                                    value={inputDateFields[index]?.value}
                                                    // InputProps={{
                                                    // }}
                                                    sx={{
                                                        width: "100%",

                                                        borderRadius: "5px",
                                                    }}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <button className="btn btn-danger" type="button" onClick={() => handleRemoveField(index)} disabled={inputFields.length === 1}>
                                    Remove
                                </button>
                            </Grid>

                        </>
                    ))}
                    <button className="btn btn-success" type="button" onClick={handleAddField}>
                        Add More
                    </button>

                </Grid>
            </form>










        </>
    )
}

export default Season