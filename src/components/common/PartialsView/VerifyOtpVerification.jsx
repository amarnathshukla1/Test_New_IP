import React from 'react';
import OtpInput from 'react-otp-input';
import IP from "../../../images/IP_Image.png"

const VerifyOtpVerification = ({ otpValue, handleInputOtp, handleSubmitOtpVerification, handleSubmit }) => {
    return (
        <div className="container-fluid px-0 w-100 overflow-x-hidden position-absolute">
            <div className="row">
                <div className="d-md-none d-lg-block col-sm-12 col-md-12 col-lg-6">
                    <img src={IP} alt='Indian Panorama' width="100%" height="773vh" />
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
                                    <p className='resend_text_details'>If you didn't receive code? <b style={{ cursor: 'pointer' }} onClick={handleSubmit}>Resend</b></p>
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
    );
};

export default VerifyOtpVerification;
