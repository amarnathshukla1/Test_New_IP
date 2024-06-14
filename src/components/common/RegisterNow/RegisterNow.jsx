import React, { useState } from 'react';
// import IP from "../../images/IP.png"
// import IP from "../../images/IP_Image.png"
import IP from "../../../images/IP_Image.png"

// import TajMahal from "../../images/TajMahal.png"
import TajMahal from "../../../images/TajMahal.png"
import "./registernow.css"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { postRequest } from "../../../API/IP";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const RegisterNow = () => {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [open, setOpen] = React.useState(false);


    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");

    console.log(formData)

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    // const validateValues = (inputValues) => {
    //     let errors = {};
    //     if (inputValues.email.length < 10) {
    //         errors.email = "Email is too short";
    //     }
    //     if (inputValues.password.length < 5) {
    //         errors.password = "Password is too short";
    //     }
    //     return errors;
    // };

    const validateValues = (inputValues) => {
        let errors = {};
        if (!inputValues.username || inputValues.username.length < 10) {
            errors.username = "Email is too short";
        }
        if (!inputValues.password || inputValues.password.length < 5) {
            errors.password = "Password is too short";
        }
        return errors;
    };


    console.log(formData, "formData")

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateValues(formData);
        setErrors(formErrors);
        // setOpen(true);
        // setAlertOpen(true)
        // setAlertMessage('Login successfully');
        // setAlertSeverity('success');

        // Check if there are any errors
        if (Object.keys(formErrors).length > 0) {
            // There are validation errors, do not submit the form
            return;
        }
        try {

            const payload = {
                ...formData,
            };
            const response = await postRequest('login', payload)
            console.log(response)
            // Reset form after successful login
            setFormData({
                username: "",
                password: "",
            });
            console.log(response.data)
            const token = response.data.access_token;


            localStorage.setItem('token', token);
            setAlertMessage('Login successfully');
            setAlertSeverity('success');
            setAlertOpen(true);

            navigate('/dashboard');
            // setTimeout(() => {
            //     navigate('/dashboard');
            // },2000);
            // alert('Login successfully');
        } catch (error) {
            console.error("Error: ", error);
            setErrors('Invalid username or password. Please try again.');
            setAlertMessage('Invalid username or password. Please try again.');
            setAlertSeverity('error');
            setAlertOpen(true);
        }
    };

    // const handleClose = ( reason) => {
    //     if (reason === 'clickaway') {
    //       return;
    //     }
    //     setOpen(false);
    //   };

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };


    return (
        <div className="container-fluid px-0 w-100 overflow-x-hidden position-absolute">
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-6 overflow-x-hidden">
                    <img src={IP} alt='Indian Panorama' width="100%" height="773vh" />
                </div>
                {/* <div className="d-none d-sm-block col-lg-6 col-12" style={{ backgroundColor: "Yellow" }}>
    <img src={IP} alt='Indian Panorama'width="100%" height="700vh" />
</div> */}
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 second-box">

                    <p className='register me-3'>Don't have account?<Link to="/registration" className='register_now'>Register Now</Link></p>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-2'></div>
                            <div className='col-8'>
                                <h1 className='welcome'>Welcome</h1>
                                <p className='login_with_email'>Login with Email</p>
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className='input_field'>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            type='email'
                                            placeholder='Email ID'
                                            iconstart={<EmailIcon />}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailIcon />
                                                    </InputAdornment>
                                                ),
                                                style: { border: '1px solid #CF528A', borderRadius: '5px' }
                                            }}

                                            className='input_border'
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                        />
                                        {errors.email ? (
                                            <p className="error text-danger">
                                                Email should be at least 10 characters long
                                            </p>
                                        ) : null}
                                    </div>
                                    <div>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            type='password'
                                            placeholder='*************'
                                            iconstart={<LockOutlinedIcon />}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockOutlinedIcon />
                                                    </InputAdornment>
                                                ),
                                                style: { border: '1px solid #CF528A', borderRadius: '5px' }
                                            }}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                        />
                                        {errors.password ? (
                                            <p className="error text-danger">
                                                Password should be at least 5 characters long
                                            </p>
                                        ) : null}
                                    </div>
                                    <p className='forget_password'><Link to="/forget-password" className='register_now'>Forget your password?</Link></p>
                                    <div className='button'>
                                        <button className='login'>Log in</button>
                                    </div>
                                    {/* {error && <p className="error">{error}</p>} */}
                                </form>
                            </div>
                            <div>
                                <img src={TajMahal} className='tajmahal' alt='Tajmal image' width="100%" height="154vh" />
                            </div>
                            <div className='col-2'></div>
                        </div>
                    </div>
                    {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Login successfully
        </Alert>
      </Snackbar> */}
                    {/* <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                        <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
                            {alertMessage}
                        </Alert>
                    </Snackbar> */}
                    <Snackbar
                        open={alertOpen}
                        autoHideDuration={6000}
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

                </div>
            </div>
        </div>


    )
}

export default RegisterNow