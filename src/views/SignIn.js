import React,{ useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import site from "../assets/img/site_logo_2.png";
import google from "../assets/img/google.png";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { SignInSchema } from "./validationSchema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import GoogleButton from "react-google-button";
import { GoogleLogin } from 'react-google-login';


function SignIn() {
  let history = useHistory();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state 
  const responseGoogle = (response) => {
    // Handle the response from Google Sign-In
    if (response.accessToken) {
      // Successful sign-in
      // Make a request to your API endpoint
      fetch('http://127.0.0.1:8000/google/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken: response.accessToken }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data from your API
        })
        .catch((error) => {
          // Handle any error that occurred during the API request
        });
    } else {
      // Sign-in failed
      // Handle the failure scenario
    }
  };
  
  const formInitialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: formInitialValues,
    validationSchema: SignInSchema,
    onSubmit: (values, action) => {
      const user = {
        email: values.email,
        password: values.password,
      };

      fetch(`http://127.0.0.1:8000/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem(
            "login",
            JSON.stringify({
              login: true,
              token: data.access,
            })
          );
          localStorage.setItem(
            "userName",
            JSON.stringify({
              fname: data.first_name,
              email:data.email,
            })
          );
          if (data.access) {
            toast.success("Success Notification !");
            history.push("/admin/profile-generator ");
          }else{
              
          }
          setUser(data.access);
          if (data.detail) {
            toast.error(data.detail, {
              position: toast.POSITION.TOP_CENTER,
              className: "toast-message",
            });
          }
        })
        .catch((e) => {
          console.log("errors", e);
        });
      action.resetForm();
    },
  });

  useEffect(()=>{
    let login = JSON.parse(localStorage.getItem("login"));
    if(!login){
     history.push("/signIn");
    } else{
      history.push("/admin/profile-generator");
    }
},[history])


  function googleSignIn(){
    fetch('http://127.0.0.1:8000/google/', {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data',data);
        if (data.access) {
          toast.success("Success Notification !");
          history.push("/admin/dashboard ");
        }
        setUser(data.access);
        if (data.detail) {
          toast.error(data.detail, {
            position: toast.POSITION.TOP_CENTER,
            className: "toast-message",
          });
        }
      })
      .catch((e) => {
        console.log("errors", e);
      });

  }

  return (
    <>
      <Container
        fluid
        style={{ backgroundColor: "", height: "100vh", padding: "0px" }}
      >
        <Row style={{ backgroundColor: "red" }}>
          <Col
            md={6}
            style={{
              backgroundColor: "#161816",
              padding: "40px",
              height: "100vh",
              position: "relative",
            }}
          >
            <img
              src={site}
              alt=""
              srcset=""
              width="60"
              style={{ marginLeft: "50px" }}
            />

            <div
              style={{
                border: "",
                width: "70%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <h1
                style={{
                  fontWeight: "800",
                  fontFamily: "Nunito Sans",
                  color: "#fff",
                }}
              >
                Get started with <br /> ProfileGenerator....{" "}
              </h1>
              <p
                style={{ color: "gray", margin: "30px 0", fontWeight: "bold" }}
              >
                Join hundreds of job seekers who use Profile Generator to submit better
                job applications in seconds—not hours.
              </p>
              <p style={{ color: "gray", fontWeight: "bold" }}>
                Don't have an account?{" "}
                <span
                  style={{
                    color: "#2ddb81",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  <Link to="/signup"> Sign Up </Link>
                </span>{" "}
              </p>
            </div>
          </Col>

          {/* Column 2 */}

          <Col
            md={6}
            style={{
              backgroundColor: "#212221",
              padding: "40px",
              height: "100vh",
            }}
          >
            <div
              style={{
                border: "",
                width: "70%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <Form onSubmit={formik.handleSubmit}>
                {/* Email */}

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ color: "#fff", fontWeight: "bold" }}>
                    Email
                  </Form.Label>
                  <Form.Control
                    className="signin_form"
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.email && formik.touched.email ? (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      {" "}
                      {formik.errors.email}{" "}
                    </span>
                  ) : null}
                </Form.Group>

                {/* Password */}

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={{ color: "#fff", fontWeight: "bold" }}>
                    Password
                  </Form.Label>
                  <Form.Control
                    className="signin_form"
                    type="password"
                    placeholder="Enter Password...."
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.password && formik.touched.password ? (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      {" "}
                      {formik.errors.password}{" "}
                    </span>
                  ) : null}
                </Form.Group>
                <ToastContainer autoClose={2000} />
                <Button
                  variant="primary btn-block"
                  type="submit"
                  style={{
                    backgroundColor: "#2ddb81",
                    color: "#fff",
                    border: "none",
                    margin: "30px 0",
                  }}
                >
                  Sign In
                </Button>
                {/* 
                <GoogleLogin
                clientId="181864207142-s4slltikflq119c40chqt343foit1gga.apps.googleusercontent.com"
                buttonText="signup"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                />
                */}
                <GoogleButton
                      onClick={googleSignIn}
                      style={{width:'100%'}}
                    />
              </Form>
              {/* 
              <GoogleButton style={{width:'100%'}}
                  onClick={googleSignIn}
              />
              */}
            </div>
          </Col>
        </Row>
      </Container>
      
    </>
  );
}

export default SignIn;
