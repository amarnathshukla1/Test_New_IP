import React, {useState} from 'react'

const UploadDocuments = () => {
    const [inputFields, setInputFields] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirm_password: "",
        organization_types: "",
      });
    
      const [errors, setErrors] = useState({});
    
      const validateValues = (inputValues) => {
        let errors = {};
        if (inputValues.name.length < 15) {
          errors.name = "Name is too short";
        }
        if (inputValues.phone.length < 10) {
          errors.phone = "Phone is too short";
        }
        if (inputValues.email.length < 15) {
          errors.email = "Email is too short";
        }
        if (inputValues.password.length < 5) {
          errors.password = "Password is too short";
        }
        if (inputValues.confirm_password.length < 5) {
          errors.confirm_password = "Confirm Password is too short";
        }
        if (inputValues.organization_types.length < 5) {
          errors.organization_types = "Confirm Password is too short";
        }
        return errors;
      };
    
      const handleChange = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        setInputFields({ ...inputFields, [fieldName]: value });
        // Clear error for the field being edited
        setErrors({ ...errors, [fieldName]: '' });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validateValues(inputFields));
      };
  return (
    <div>
         <form style={{width:"100%"}} className="form cus-form-cls" onSubmit={handleSubmit}>
              <h4>Upload Documents</h4>
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="mb-4">
                    <input
                      type="text"
                      name="name"
                      value={inputFields.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Confirm"
                      aria-describedby="helpId"
                      style={{ borderColor: errors.name ? 'red' : '' }}
                      maxLength={25}
                    />
                    {errors.name ? (
                      <p className="error">
                        Name should be at least 15 characters long
                      </p>
                    ) : null}
                  </div>
                </div>
    
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="mb-4 position-relative">
                    <select
                      className="form-select cus-select position-absolute con-code bg-transparent border-0 shadow-none"
                      aria-label="Default select example"
                      disabled
                    >
                      <option selected>+91</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                    <input
                      // type="number"
                      type="text"
                      name="phone"
                      value={inputFields.phone}
                      onChange={handleChange}
                      className="form-control phone-num"
                      placeholder="Contact number with country code"
                      aria-describedby="helpId"
                      onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
                      maxLength={10}
                      style={{borderColor: errors.phone ? 'red' : ''}}
                      onInput={(evt) => {
                        // Remove non-numeric characters
                        const cleanedValue = evt.target.value.replace(/\D/g, '');
                        // Restrict to 10 digits
                        const truncatedValue = cleanedValue.slice(0, 10);
                        // Update the input value
                        evt.target.value = truncatedValue;
                        // Call onChange handler
                        handleChange(evt);
                    }}
    
                    />
                    {errors.phone ? (
                      <p className="error">
                        Phone should be at least 10 number long
                      </p>
                    ) : null}
                  </div>
                </div>
    
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="mb-4">
                    <input
                      type="email"
                      name="email"
                      value={inputFields.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Email Address"
                      aria-describedby="helpId"
                      style={{borderColor: errors.email ? 'red' : ''}}
                      maxLength={25}
                    />
                    {errors.email ? (
                      <p className="error">
                        Email should be at least 15 characters long
                      </p>
                    ) : null}
                  </div>
                </div>
    
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="mb-4">
                    <input
                      type="password"
                      name="password"
                      value={inputFields.password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Password"
                      aria-describedby="helpId"
                      style={{borderColor:errors.password ? 'red' : ''}}
                      maxLength={10}
                    />
                    {errors.password ? (
                      <p className="error">
                        Password should be at least 5 characters long
                      </p>
                    ) : null}
                  </div>
                </div>
    
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="mb-4">
                    <input
                      type="password"
                      name="confirm_password"
                      value={inputFields.confirm_password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Re-enter Password"
                      aria-describedby="helpId"
                      style={{borderColor:errors.confirm_password ? 'red':''}}
                      maxLength={10}
                    />
                    {errors.confirm_password ? (
                      <p className="error">
                        Confirm password should be at least 5 characters long
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="mb-4">
                    <input
                      type="text"
                      name="organization_types"
                      value={inputFields.organization_types}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Types of Organization"
                      aria-describedby="helpId"
                      // style={{borderColor:errors.organization_types ? 'red':''}}
                      maxLength={25}
                      />
                    
                    {/* {errors.organization_types ? (
                      <p className="error">
                        Organization types should be at least 15 characters long
                      </p>
                    ) : null} */}
                  </div>
                </div>
              </div>
              <div className="row justify-content-center my-md-5 mx-md-5 mx-sm-2 my-sm-5 my-5">
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 text-center">
                  {/* <button className="btn cus-btnPdf">Submit</button> */}
                </div>
              </div>
            </form>
    </div>
  )
}

export default UploadDocuments