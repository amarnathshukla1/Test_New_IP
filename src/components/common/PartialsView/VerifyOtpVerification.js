import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import IP from "../../../images/IP_Image.png"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { postRequestGlobal } from "../../../API/global"
import { Link } from 'react-router-dom';

const VerifyOtpVerification = ({ otpValue, handleInputOtp, handleSubmitOtpVerification,  errors }) => {


    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");

    const handleResendOtpSubmit = async (e) => {
        e.preventDefault();

        // const formErrors = validateValues(formData);
        // Check if there are any errors
        // if (Object.keys(formErrors).length > 0) {
        //     return;
        // }

        try {

            // const payload = {
            //     ...formData,
            // };
            const response = await postRequestGlobal('forgot/resetPassword')

            // setShowForgetPasswordForm(false)
            //   const data = await response.json();
            console.log("Response:", response);
            // Handle success or further actions here
            // alert('Otp has sent successfully!');
            setAlertMessage('Otp has sent successfully!');
            setAlertSeverity('success');
            setAlertOpen(true);

        } catch (error) {
            console.error("Error: ", error);
            // Handle error or display error message
            // alert('Error submitting form. Please try again later.');
            // setErrors('Error submitting form. Please try again later.');
            setAlertMessage('Error submitting form. Please try again later.');
            setAlertSeverity('error');
            setAlertOpen(true);
        }
    };

    return (

        <>
            <div className="container-fluid px-0 w-100 overflow-x-hidden position-absolute">
                <div className="row">
                    <div className="d-md-none d-lg-block col-sm-12 col-md-12 col-lg-6">
                        <img src={IP} className='mob-IP' alt='Indian Panorama' width="100%" height="773vh" />
                    </div>
                    <div className={"col-sm-12 col-md-12 col-lg-6 second-box"}>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-sm-1 col-md-1 col-lg-1 col-xl-1'></div>
                                <div className='col-sm-10 col-md-10 col-lg-10 col-xl-10'>
                                    <h1 className='verification_code_details'>Enter Verification Code</h1>
                                    <p className='login_with_email'>Registration is simply dummy text of the printing</p>
                                    <form>
                                        <div className='otp_input'>
                                            <OtpInput
                                                value={otpValue}
                                                name="otp"
                                                onChange={handleInputOtp}
                                                numInputs={6}
                                                separator={<span>&nbsp;&nbsp;</span>}
                                                containerStyle={{ justifyContent: 'space-between' }}
                                                inputStyle={{ width: '40px', height: '40px', margin: '0 8px', borderRadius: "9px", border: "1px solid #CF528A" }}
                                                renderInput={(props) => <input {...props} />}
                                                className="otp_code_details"
                                            />
                                            
                                        </div>
                                        <p className='resend_text_details'>If you didn't receive code?
                                            <b type='submit' style={{ cursor: 'pointer' }} onClick={handleResendOtpSubmit}>Resend</b>
                                            {/* <button type='submit' onClick={handleResendOtpSubmit}>Resend</button> */}

                                        </p>
                                        {/* <p className='Log_in'><Link to="/forget-password" className='back_to_log_in'>Back To Forget Password</Link></p> */}
                                        <div className='submit_details'>
                                            <button className='submit' type="submit" onClick={handleSubmitOtpVerification}>Verify</button>
                                        </div>
                                    </form>
                                </div>
                                <div className='col-sm-1 col-md-1 col-lg-1 col-xl-1'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar
                open={alertOpen}
                autoHideDuration={2000}
                onClose={() => setAlertOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setAlertOpen(false)}
                    severity={alertSeverity}
                    variant="filled"
                >
                    {alertMessage}
                </Alert>
            </Snackbar>

        </>

    );
};

export default VerifyOtpVerification;
