import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import IP from "../../../images/IP_Image.png";
import TajMahal from "../../../images/TajMahal.png";
import "../Registration/Registration.css";
import InputAdornment from "@mui/material/InputAdornment";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { postRequestGlobal, getRequestGlobal } from "../../../API/global"
import { postRequest } from "../../../API/IP";

const Registration = () => {

  const [organisationIdToTexttest, setOrganisationIdToTexttest] = useState({});
  console.log(organisationIdToTexttest,"organisationIdToTexttest")
  const [error, setError] = useState(null);

  useEffect(() => {
    getRequestGlobal('ip_type_list', {})
      .then((data) => {
        setOrganisationIdToTexttest(data.data);
      })
      .catch((error) => {
      });
  }, []);




  // const organisationIdToTexttest = {
  //   1: "Individual Producers",
  //   2: "Production Company",
  //   3: "Institutes",
  //   4: "Govt. Organizations",
  //   5: "Other Such Entities",
  // };

  const organisationIdToText = {
    "Individual Producers": 1,
    "Production Company": 2,
    "Institutes": 3,
    "Govt. Organizations": 4,
    "Other Such Entities": 5,
  };
  const [showPasswordOne, setShowPasswordOne] = React.useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = React.useState(false);

  const handleClickShowPasswordOne = () => setShowPasswordOne((show) => !show);
  const handleClickShowPasswordTwo = () => setShowPasswordTwo((show) => !show);

  // const url = "192.168.1.205/nfdc-development/api/ip/register"
  // console.log(url, "url")

  const handleMouseDownPasswordOne = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPasswordTwo = (event) => {
    event.preventDefault();
  };
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    password_confirmation: "",
    type_id: "",
  });


  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validateValues = (inputValues) => {
    let errors = {};


    // if (inputValues.name.length) {
    //   errors.name = "Name is too short";
    // }

    if (!inputValues.name || inputValues.name.length === 0) {
      errors.name = "Mention your full name";
    }
    if (inputValues.mobile.length < 10) {
      errors.mobile = "Mobile number is too short";
    }
    if (inputValues.email.length < 10) {
      errors.email = "Email is too short";
    }
    if (inputValues.password.length < 5) {
      errors.password = "Password is too short";
    }
    if (inputValues.password_confirmation.length < 5) {
      errors.password_confirmation = "Password confirmation is too short";
    }
    if (inputValues.type_id.length < 1) {
      errors.type_id = "Type ID is required";
    }
    return errors;
  };


  //   const validateValues = (inputValues) => {
  //     let errors = {};
  //     if (!inputValues.name || inputValues.name.length < 5) {
  //         errors.name = "Name is too short";
  //     }
  //     if (!inputValues.mobile || inputValues.mobile.length < 10) {
  //         errors.mobile = "Mobile number is too short";
  //     }
  //     if (!inputValues.email || inputValues.email.length < 15) {
  //         errors.email = "Email is too short";
  //     }
  //     if (!inputValues.password || inputValues.password.length < 5) {
  //         errors.password = "Password is too short";
  //     }
  //     if (!inputValues.password_confirmation || inputValues.password_confirmation.length < 5) {
  //         errors.password_confirmation = "Password confirmation is too short";
  //     }
  //     if (!inputValues.type_id || inputValues.type_id.length < 1) {
  //         errors.type_id = "Type ID is required";
  //     }
  //     return errors;
  // };

  // const validateValues = (inputValues) => {
  //   let errors = {};

  //   // Check if name is empty or too short
  //   if (!inputValues.name || inputValues.name.length < 5) {
  //     errors.name = "Name is too short";
  //   }

  //   // Check if mobile number is empty or too short
  //   if (!inputValues.mobile || inputValues.mobile.length < 10) {
  //     errors.mobile = "Mobile number is too short";
  //   }

  //   // Check if email is empty or too short
  //   if (!inputValues.email || inputValues.email.length < 15) {
  //     errors.email = "Email is too short";
  //   }

  //   // Check if password is empty or too short
  //   if (!inputValues.password || inputValues.password.length < 5) {
  //     errors.password = "Password is too short";
  //   }

  //   // Check if password confirmation is empty or too short
  //   if (!inputValues.password_confirmation || inputValues.password_confirmation.length < 5) {
  //     errors.password_confirmation = "Password confirmation is too short";
  //   }

  //   // Check if type_id is empty
  //   if (!inputValues.type_id) {
  //     errors.type_id = "Type ID is required";
  //   }

  //   return errors;
  // };


  console.log(formData, "formData")

  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOrganisationData = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: parseInt(value) });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const formErrors = validateValues(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }
    console.log("pass")

    if (formData.password !== formData.password_confirmation) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Create a new formData object with type_id replaced by its textual value
      const payload = {
        ...formData,

      };
      // const data = await postRequestGlobal('register', payload)
      const data = await postRequest('register', payload)
      console.log(data, "data");

      // Reset form after successful registration
      setFormData({
        name: "",
        mobile: "",
        email: "",
        password: "",
        password_confirmation: "",
        type_id: "",
      });
      alert('User registered successfully');
      navigate('/');
    } catch (error) {
      console.error("Error: ", error);
      alert('Error submitting form. Please try again later.');
    }
  };


  // Effect to run when component mounts
  // useEffect(() => {

  // }, []);
  return (
    <div className="container-fluid px-0 w-100 h-100 overflow-x-hidden position-absolute">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-6">
          <img src={IP} alt="Indian Panorama" width="100%" height="773vh" />
        </div>
        <div className={"col-sm-12 col-md-12 col-lg-6 second-box"}>
          <p className="register me-3">
            Do you have account?{" "}
            <b>
              <Link to="/" className="log_in_now">
                Log In Now
              </Link>
            </b>
          </p>
          <div className="container">
            <div className="row">
              <div className="col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
              <div className="col-sm-10 col-md-10 col-lg-10 col-xl-10">
                <h1 className="welcome welcome_details">Welcome</h1>
                <p className="login_with_email">
                  Registration is simply dummy text of the printingl
                </p>
                <form className="scrollable" encType="multipart/form-data" >
                  <div className="input_field">
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Full Name"
                      InputProps={{
                        style: {
                          border: "1px solid #CF528A",
                          borderRadius: "5px",
                        },
                      }}
                      // Other props as needed
                      className="input_border"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {errors.name ? (
                      <p className="error text-danger">
                        Mention your full name
                      </p>
                    ) : null}
                  </div>

                  <div className="input_field">
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">+91</InputAdornment>
                        ),
                        style: {
                          border: "1px solid #CF528A",
                          borderRadius: "5px",
                        },
                      }}
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                    />
                    {errors.mobile ? (
                      <p className="error text-danger">
                        Mobile number should be at least 10 digit long
                      </p>
                    ) : null}
                  </div>
                  <div className="input_field">
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Email ID"
                      // iconStart={<EmailIcon />}
                      InputProps={{
                        // startAdornment: (
                        //     <InputAdornment position="start">
                        //         <EmailIcon />
                        //     </InputAdornment>
                        // ),
                        style: {
                          border: "1px solid #CF528A",
                          borderRadius: "5px",
                        },
                      }}
                      // Other props as needed
                      className="input_border"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email ? (
                      <p className="error text-danger">
                        Email should be at least 10 characters long
                      </p>
                    ) : null}
                  </div>
                  <div className="input_field">
                    {/* <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <VisibilityIcon />
                            </InputAdornment>
                          ),
                          style: {
                            border: "1px solid #CF528A",
                            borderRadius: "5px",
                          },
                        }}
                        type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
            
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
                        name="password"
                        value={formData.password} 
                        onChange={handleInputChange}
                      /> */}

                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswordOne}
                              onMouseDown={handleMouseDownPasswordOne}
                              edge="end"
                            >
                              {showPasswordOne ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                        style: {
                          border: "1px solid #CF528A",
                          borderRadius: "5px",
                        },
                      }}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      type={showPasswordOne ? "text" : "password"}
                    // endAdornment={
                    //   <InputAdornment position="end">
                    //     <IconButton
                    //       aria-label="toggle password visibility"
                    //       onClick={handleClickShowPasswordOne}
                    //       onMouseDown={handleMouseDownPasswordOne}
                    //       edge="end"
                    //     >
                    //       {showPasswordOne ? <VisibilityOff /> : <Visibility />}
                    //     </IconButton>
                    //   </InputAdornment>
                    // }
                    />
                    {errors.password ? (
                      <p className="error text-danger">
                        Password should be at least 5 characters long
                      </p>
                    ) : null}
                  </div>
                  <div className="input_field">
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Reenter Password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswordTwo}
                              onMouseDown={handleMouseDownPasswordTwo}
                              edge="end"
                            >
                              {showPasswordTwo ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                        style: {
                          border: "1px solid #CF528A",
                          borderRadius: "5px",
                        },
                      }}
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={handleInputChange}
                      type={showPasswordTwo ? "text" : "password"}
                    // endAdornment={
                    //   <InputAdornment position="end">
                    //     <IconButton
                    //       aria-label="toggle password visibility"
                    //       onClick={handleClickShowPasswordTwo}
                    //       onMouseDown={handleMouseDownPasswordTwo}
                    //       edge="end"
                    //     >
                    //       {showPasswordTwo ? <VisibilityOff /> : <Visibility />}
                    //     </IconButton>
                    //   </InputAdornment>
                    // }
                    />
                    {errors.password_confirmation ? (
                      <p className="error text-danger">
                        Confirm Password should be at least 5 characters long
                      </p>
                    ) : null}
                  </div>
                  <div className="input_field">
                    <FormControl
                      sx={{
                        width: "100%",
                        border: "1px solid #CF528A",
                        borderRadius: "5px",
                      }}
                    >
                      <Select
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        name="type_id"
                        value={formData.type_id}
                        onChange={handleOrganisationData}
                      >
                        <MenuItem key="0" value=''>
                          Types of Organisation
                        </MenuItem>
                        {Object.entries(organisationIdToTexttest).map(([key, value]) => (
                          <MenuItem key={key} value={key}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>

                    </FormControl>
                    {errors.type_id ? (
                      <p className="error text-danger">
                        This field is required
                      </p>
                    ) : null}
                  </div>
                  <div className="optional_option">
                    <p className="optional_text_details">
                      <span>Optional</span>
                    </p>
                  </div>
                  <div className="input_field">
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Website url"
                      InputProps={{
                        style: {
                          border: "1px solid #CF528A",
                          borderRadius: "5px",
                        },
                      }}
                      // Other props as needed
                      className="input_border"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                    />
                    {errors.websiteUrl ? (
                      <p className="error text-danger">
                        Website URL is required
                      </p>
                    ) : null}
                  </div>
                  <div className="register_details">
                    {/* <button className="login">Register</button> */}
                    {/* <button className="login">Register</button> */}
                  </div>
                </form>
                <div className="register_details">
                  <button className="login" onClick={handleSubmit}>
                    Register
                  </button>
                </div>
              </div>
              <div className="col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
            </div>
            {/* <img src={TajMahal} className='registration_tajmahal_image' alt='Taj Mahal' width="100%" height="100%" /> */}
            <img
              src={TajMahal}
              className="tajmahal"
              alt="Tajmal image"
              width="100%"
              height="130vh"
            />
          </div>
          {/* <div className='container'>
                        <div className='row' >
                            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                                <div>
                                    <img src={TajMahal} className='registration_tajmahal_image' alt='Taj Mahal' width="100%" height="100%" />
                                </div>
                            </div>
                        </div>
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default Registration;
