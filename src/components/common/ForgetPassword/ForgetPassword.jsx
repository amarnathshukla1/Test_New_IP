import React, { useEffect, useState } from "react";
// import IP from "../../images/IP.png"
import IP from "../../../images/IP.png"
// import TajMahal from "../../images/TajMahal.png"
import TajMahal from "../../../images/TajMahal.png"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import "./ForgetPassword.css"
import { Link } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { postRequestGlobal } from "../../../API/global"
import ForgetPasswordDetails from "../PartialsView/ForgetPasswordDetails";
import VerifyOtpVerification from "../PartialsView/VerifyOtpVerification";
import ChangedPasswordDetails from "../PartialsView/ChangedPasswordDetails";
// import NewPassword from "../NewPassword/NewPassword";

const ForgetPassword = () => {

    const [showForgetPasswordForm, setShowForgetPasswordForm] = useState(true);
    const [showOtpForm, setShowOtpForm] = useState(true);
    // const [otpValue, setOtpValue] = useState(null);
    const [otpValue, setOtpValue] = useState("");

    const [formData, setFormData] = useState({email: ""});
    
    // const [formData, setFormData] = useState("");
    const [otpVerification, setOtpVerification] = useState({
        email: "",
        otp: "",
    });
    const [changedPassword, setChangedPassword] = useState({
        email: "",
        password: "",
        password_confirmation: "",
    })

    const [errors, setErrors] = useState({});

    const validateValues = (inputValues) => {
        let errors = {};
        if (!inputValues.email || inputValues.email.length < 10) {
            errors.email = "Email is too short";
        }
        return errors;
    };

    const navigate = useNavigate();

    console.log(formData, "formData")

    // Function to handle form input changes
    const handleInputChange = (event) => {
        console.log(event)
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        setOtpVerification({ ...otpVerification, [name]: value });

        // formData changes
        if (name === "email") {
            setChangedPassword({ ...changedPassword, [name]: value });
        }
    };
    const handleInputOtp = (value) => {

        setOtpValue(value)
        setOtpVerification({ ...otpVerification, 'otp': value });
    };
    const handlePasswordChange = (event) => {
        console.log(event)
        const { name, value } = event.target;
        // setChangedPassword({ ...changedPassword, [name]: value });
        setChangedPassword({ ...changedPassword, [name]: value, email: formData.email });
   
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateValues(formData);


        // Check if there are any errors
        if (Object.keys(formErrors).length > 0) {
            // There are validation errors, do not submit the form
            return;
        }
        try {

            const payload = {
                ...formData,
            };
            const response = await postRequestGlobal('forgot/resetPassword', payload)
          
            setShowForgetPasswordForm(false)
            //   const data = await response.json();
            console.log("Response:", response);
            // Handle success or further actions here
            alert('Otp has sent successfully!');
         
        } catch (error) {
            console.error("Error: ", error);
            // Handle error or display error message
            alert('Error submitting form. Please try again later.');
        }
    };

    const handleSubmitOtpVerification = async (e) => {
        e.preventDefault();
        const formErrors = validateValues(formData);
        setShowOtpForm(0)
        console.log("handleSubmitOtpVerification");
        // Check if there are any errors
        if (Object.keys(formErrors).length > 0) {
            // There are validation errors, do not submit the form
           // return;
        }
        try {

            const payload = {
                ...otpVerification,
            };
            const response = await postRequestGlobal('forgot/verifyOtp', payload);
          
            setShowOtpForm(0)
        
            console.log("Response:", response);
            // Handle success or further actions here
            alert('Otp has sent successfully!');
          
        } catch (error) {
            console.error("Error: ", error);
            // Handle error or display error message
            alert('Error submitting form. Please try again later.');
        }
    };

    const handleSubmitChangedPassword = async (e) => {
        e.preventDefault();

        console.log("testing")

        const formErrors = validateValues(formData);
        console.log(formErrors)
        setErrors(formErrors);

        // Check if there are any errors
        if (Object.keys(formErrors).length > 0) {
            // There are validation errors, do not submit the form
           //  return;
        }

        // Perform form validation here
        if (changedPassword.password !== changedPassword.password_confirmation) {
            alert('Passwords do not match');
            return;
        }
        try {
            const payload = {
                ...changedPassword,
            };
            const response = await postRequestGlobal('forgot/changePassword', payload)
            // setChangedPassword(0)
            // if (response.ok) {
            //     alert('Password changed successfully!');
            //     navigate('/');
            // } else {
            //     // const data = await response.json();
            //     setErrors('Failed to reset password. Please try again.');
            // }

            // const data = await response.json();
            console.log("Response:", response);
            // Handle success or further actions here, such as redirecting to another page
            navigate('/');
        } catch (error) {
            console.error("Error: ", error);
            setErrors('Failed to reset password. Please try again.');
        }
    };



    return (

        <>
            {
                showForgetPasswordForm ?
                    <ForgetPasswordDetails
                        formData={formData}
                        errors={errors}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit} />
                    :( showOtpForm ?
                        <VerifyOtpVerification
                            otpValue={otpValue}
                            handleInputOtp={handleInputOtp}
                            handleSubmitOtpVerification={handleSubmitOtpVerification}
                        />
                        :
                        <ChangedPasswordDetails
                            changedPassword={changedPassword}
                            errors={errors}
                            handlePasswordChange={handlePasswordChange}
                            handleSubmitChangedPassword={handleSubmitChangedPassword}
                        />)
                        // <NewPassword/>
            }




        </>

    )
}

export default ForgetPassword