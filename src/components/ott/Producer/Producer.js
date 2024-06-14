import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import PartialInfo from './PartialInfo';
import PartnalnfoSingle from './PartnalnfoSingle';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Producer = ({ formData, setFormData, errors, setProducerErrors }) => {
    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        errors[name] = ""
        setProducerErrors(errors);

    };

    return (
        <>
            <h5 className="text-capitalize">
                Details Of Production<span className="text-danger">*</span>
            </h5>


            <form>
                <Grid container spacing={2} className='mt-2'>
                    <Grid item xs={12} sm={12} md={12} lg={12}>

                        <div>
                            <h6>Wheather the web series is a co-production</h6>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="has_coproduction"
                                    value="1"
                                    checked={formData.has_coproduction == 1}
                                    id="is_co_producer_yes"
                                    onChange={handleFormData}
                                />
                                <label className="form-check-label" htmlFor="is_co_producer_yes">
                                    Yes
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="has_coproduction"
                                    id="is_co_producer_no"
                                    value="0"
                                    onChange={handleFormData}
                                    checked={formData.has_coproduction === 0 || formData.has_coproduction === "0"}
                                />
                                <label className="form-check-label" htmlFor="is_co_producer_no">
                                    No
                                </label>
                            </div>
                            {errors.has_coproduction && (
                                <p className="text-danger">{errors.has_coproduction}</p>
                            )}

                        </div>

                    </Grid>
                    {/* <PartialInfo/> */}

                    {(formData.has_coproduction == 1) ?
                        <PartialInfo setFormDataMain={setFormData} FormDataMain={formData} errors={errors} setProducerErrors={setProducerErrors} />
                        :
                        <PartnalnfoSingle formData={formData} setFormData={setFormData} errors={errors} setProducerErrors={setProducerErrors} />
                    }
                </Grid>
            </form>
        </>
    )
}

export default Producer