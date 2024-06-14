import React, { useState } from 'react';
import IP from "../../../images/IP_Image.png"
import TajMahal from "../../../images/TajMahal.png"
// import "../RegisterNow/registernow.css"
// import "../NewPassword/NewPassword.css"
import "../ForgetPasswordVerification/ForgetPasswordVerification.css"
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
// import {postRequestGlobal} from "../../API/global"
import {postRequestGlobal} from "../../../API/global"


const ForgetPasswordVerification = () => {

    // const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        email: "",
        otp:"",
      });
    
  const navigate = useNavigate();

  
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const payload = {
                ...formData,
              };
            const response = await postRequestGlobal('forgot/verifyOtp',payload)
            const data = await response.json();
            console.log("Response:", data);
            alert('OTP resent successfully!');
            // Handle success or further actions here, such as redirecting to another page
        } catch (error) {
            console.error("Error: ", error);
            setError('Failed to verify OTP. Please try again.');
            alert('Error submitting form. Please try again later.');
        }
    };


    return (
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
                                        // value={otp}
                                        // onChange={setOtp}
                                        numInputs={6}
                                        separator={<span>&nbsp;&nbsp;</span>}
                                        containerStyle={{ justifyContent: 'space-between' }}
                                        inputStyle={{ width: '40px', height: '40px', margin: '0 8px', borderRadius: "9px", border: "1px solid #CF528A"}}
                                        // renderSeparator={<span></span>}
                                        renderInput={(props) => <input {...props} />}
                                        className="otp_code_details"
                                    />
                                </div>
                                {error && <p className="error">{error}</p>}
                                <p className='resend_text_details'>If you did't receive code ? <b style={{ cursor: 'pointer' }}>Resend</b></p>
                                <div className='submit_details'>
                                    <button className='submit' onClick={handleSubmit}>Verify</button>
                                </div>
                                </form>
                               
                            </div>
                            <div className='col-sm-1 col-md-1 col-lg-1 col-xl-1'></div>
                        </div>
                        <img src={TajMahal} className='tajmahal_image_verification' alt='Tajmal image' width="100%" height="150vh" />
                    </div>
                    {/* <div className='container'>
                        <div className='row' >
                            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                                <div style={{ borderColor: "1px solid red" }}>
                                    <img src={TajMahal} className='tajmahal_image_verification' alt='Tajmal image' width="100%" height="100%" />
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default ForgetPasswordVerification