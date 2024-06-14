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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Director from './Director';

const DirectorAndCreatorDetails = ({ formData, setFormData, errors, setDirectorCreatorErrors }) => {
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
        setDirectorCreatorErrors(errors);
    };
    return (
        <>
            <h5 className="text-capitalize">
                Director's/Creator's Details<span className="text-danger">*</span>
            </h5>
            <p className='text-danger'>NOTE:</p>
            <p className='text-danger text-capitalize'>The Name of the Director/Creator's will be credited as declared in the Application form. No request for a change of name would be entertained at any stage.</p>

            <form>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={12} md={12} lg={12}>

                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <h3 className="text-capitalize">
                                    Creator's Details
                                </h3>

                            </Grid>

                            <Director proms={{ type: 1 }} setFormDataMain={setFormData} errors={errors} setDirectorCreatorErrors={setDirectorCreatorErrors} />
                        </Grid>

                        <Grid container spacing={2} className='mt-4'>


                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <h5 className="text-capitalize">
                                    Director's/Creator's Details<span className="text-danger">*</span>
                                </h5>

                            </Grid>

                            <Director proms={{ type: 2 }} setFormDataMain={setFormData} errors={errors} setDirectorCreatorErrors={setDirectorCreatorErrors} />
                        </Grid>
                    </Grid>
                </Grid>
            </form >
        </>
    )
}

export default DirectorAndCreatorDetails