import React, { useState } from "react";
// import IP from "../../../images/IP.png"
// import TajMahal from "../../../images/TajMahal.png"
import "./ForgetPassword.css"
import { useNavigate } from 'react-router-dom';
import { postRequestGlobal } from "../../../API/global"
import ForgetPasswordDetails from "../PartialsView/ForgetPasswordDetails";
import VerifyOtpVerification from "../PartialsView/VerifyOtpVerification";
import ChangedPasswordDetails from "../PartialsView/ChangedPasswordDetails";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ForgetPassword = () => {

    const [showForgetPasswordForm, setShowForgetPasswordForm] = useState(true);
    const [showOtpForm, setShowOtpForm] = useState(true);
    const [loading, setLoading] = useState(false);
    

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");


    // const [otpValue, setOtpValue] = useState(null);
    const [otpValue, setOtpValue] = useState("");

    const [formData, setFormData] = useState({ email: "" });

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
        // if (!inputValues.email || inputValues.email.length < 10) {
        //     errors.email = "Email is too short";
        // }
        if (inputValues.email.length < 10) {
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
        setLoading(true)
        try {

            const payload = {
                ...formData,
            };
            const response = await postRequestGlobal('forgot/resetPassword', payload)

            setShowForgetPasswordForm(false)
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
            setErrors('Error submitting form. Please try again later.');
            setAlertMessage('Error submitting form. Please try again later.');
            setAlertSeverity('error');
            setAlertOpen(true);
        } finally {
            setLoading(false); // Set loading to false when the API call finishes
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
        setLoading(true)
        try {

            const payload = {
                ...otpVerification,
            };
            const response = await postRequestGlobal('forgot/verifyOtp', payload);

            setShowOtpForm(0)

            console.log("Response:", response);
            // Handle success or further actions here
            // alert('Verify otp has sent successfully!');
            setAlertMessage('Otp has successfully verified!');
            setAlertSeverity('success');
            setAlertOpen(true);

        } catch (error) {
            console.error("Error: ", error);
            // Handle error or display error message
            alert('Error submitting form. Please try again later.');
        } finally {
            setLoading(false); // Set loading to false when the API call finishes
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
            // alert('Passwords do not match');
            return;
        }
        setLoading(true)
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
            setAlertMessage('Password changed successfully!');
            setAlertSeverity('success');
            setAlertOpen(true);

            // navigate('/');
            setTimeout(()=>{
                navigate('/');
              },2000)


        } catch (error) {
            console.error("Error: ", error);
            setErrors('Failed to reset password. Please try again.');
            setAlertMessage('Error submitting form. Please try again later.');
            setAlertSeverity('error');
            setAlertOpen(true);
        } finally {
            setLoading(false); // Set loading to false when the API call finishes
        }
    };



    return (

        <>


{loading && (
    <Box display="flex" justifyContent="center" alignItems="center" 
         position="absolute" top={0} left={0} width="100%" height="100%" 
        //  bgcolor="rgba(255, 255, 255, 0.1)" zIndex={1000}>
         bgcolor="rgba(99, 35, 64, 0.5)" zIndex={1000}> 
        <CircularProgress />
    </Box>
)}
            


            {
                showForgetPasswordForm ?
                    <ForgetPasswordDetails
                        formData={formData}
                        errors={errors}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit} />
                    : (showOtpForm ?
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

    )
}

export default ForgetPassword