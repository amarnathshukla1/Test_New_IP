import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';
import IP from "../../../images/IP_Image.png"
import "./forgotPassword.css"

const ForgetPasswordDetails = ({ formData, errors, handleInputChange, handleSubmit }) => {
    return (
        <div className="container-fluid px-0 w-100 h-100 overflow-x-hidden position-absolute">
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-6">
                    <img src={IP} className='mob_IP' alt='Indian Panorama' width="100%" height="773vh" />
                </div>
                <div className={"col-sm-12 col-md-12 col-lg-6 second-box"}>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-1 col-md-1 col-lg-1 col-xl-1'></div>
                            <div className='col-sm-10 col-md-10 col-lg-10 col-xl-10'>
                                <h1 className='forget_password_details'>Forget Password</h1>
                                <p className='login_with_email'>Registration is simply dummy text of the printing</p>
                                <form encType="multipart/form-data">
                                    <div className='input_field'>
                                        <TextField
                                            variant="outlined"
                                            type="email"
                                            fullWidth
                                            placeholder='Enter Email Address'
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailIcon />
                                                    </InputAdornment>
                                                ),
                                                style: { border: '1px solid #CF528A', borderRadius: '5px' }
                                            }}
                                            className='forget_password_input'
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                        {errors.email ? (
                                            <p className="error text-danger">
                                                Please provide valid email address
                                            </p>
                                        ) : null}
                                    </div>
                                    <p className='Log_in'><Link to="/" className='back_to_log_in'>Back To Log in</Link></p>
                                    
                                    <div className='button'>
                                        <button className='login' onClick={handleSubmit}>Send</button>
                                    </div>
                                </form>
                            </div>
                            <div className='col-sm-1 col-md-1 col-lg-1'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPasswordDetails;
