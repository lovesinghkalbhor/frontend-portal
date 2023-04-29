import "../login/login";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useFormik } from "formik";
import ReactTelInput from "react-telephone-input";
import "react-telephone-input/css/default.css";
import signUpSchema from "../../global component/schema for validation";
function Sign_up() {
  const navigate = useNavigate();
  function handleInputChange(telNumber, selectedCountry) {
    console.log(
      "input changed. number: ",
      telNumber,
      "selected country: ",
      selectedCountry
    );
  }

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [company, setcompany] = useState("");
  const [contact, setcontact] = useState("");
  const initialValues = {
    // name: "",
    email: "",
    password: "",
    company: "",
    phone: "",
  };
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      console.log(values);
      console.log(errors);
    },
  });
  function submitclicked(params) {
    params.preventDefault();
    console.log(contact);
    // console.log(email, password);
    // Cookies.set("session_id", "sess_he85f75e1doeim", { expires: 7 });

    // const url = `http://api.domain.com/auth/login/${email}/${password}`;

    // axios
    //   .post(url)
    //   .then(function (response) {
    //     // handle success
    //     console.log(response.data);
    //     if (response.status == 1 / 2) {
    //       navigate("/home");
    //     }

    //     //  else {
    //     //     setcrediential(false);
    //     // }
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   });
  }
  return (
    <div className="full-screen">
      <div className="form-box d-flex justify-content-center align-items-center">
        <div className="sign-in  d-none d-md-inline ">
          <label className="input-label">Already have an account ? </label>

          <Link className="sign-link" to="/login">
            Login
          </Link>
        </div>
        <div className="inner-from-box text-center">
          <h4 className="mb-3">Sign up</h4>
          <form
            method="POST"
            className="form d-flex flex-column text-start "
            onSubmit={handleSubmit}
          >
            <label className="input-label">Email address </label>
            <input
              className="inputs"
              type="text"
              name="email"
              autoComplete="off"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>

            <label className="input-label">Password </label>
            <input
              className="inputs"
              type="password"
              autoComplete="off"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            <label className="input-label">Company name</label>
            <input
              className="inputs"
              type="text"
              name="company"
              autoComplete="off"
              placeholder="Email"
              value={values.company}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            <label className="input-label">Contact no</label>
            {/* <input
            className="me-3 me-sm-0"
            type="number"
            name="phone"
            autoComplete="off"
            placeholder="Enter phone number"
            value={values.phone}
            onChange={handleInputChange}
          ></input> */}
            {/* <PhoneInput
            className="me-3 me-sm-0"
            name="phone"
            placeholder="Enter phone number"
            value={values.phone}
            // onChange={(e) => {
            //   if (e && e.target) {
            //     setcontact(e.target.value);
            //   }
            // }}
            // onChange={values.phone && handleChange}
            onChange={handleInputChange}

            onBlur={handleBlur}
          /> */}
            <ReactTelInput
              className="me-3 me-sm-0"
              name="phone"
              placeholder="Enter phone number"
              defaultCountry="in"
              flagsImagePath="flags.png"
              onChange={(phone, selectedCountry) => {
                setFieldValue("phone", phone);
                setFieldValue("selectedCountry", selectedCountry);
              }}
            />

            <button
              // onClick={submitclicked}
              className="submit-button inputs"
              type="submit"
            >
              Submit
            </button>
            <div className="text-center d-md-none">
              <h5>OR</h5>
              <Link className="sign-link text-center d-md-none" to="/login">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sign_up;

// import { useFormik } from 'formik';
// import ReactTelInput from 'react-telephone-input';

// function MyForm() {
//   const formik = useFormik({
//     initialValues: {
//       phone: '',
//     },
//     onSubmit: values => {
//       // handle form submission
//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <ReactTelInput
//         className="me-3 me-sm-0"
//         name="phone"
//         placeholder="Enter phone number"
//         defaultCountry="in"
//         flagsImagePath="flags.png"
//         onChange={phone => formik.setFieldValue('phone', phone)}
//       />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
