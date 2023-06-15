import React, { useState, useRef, useEffect } from "react";

import ChartistGraph from "react-chartist";
// react-bootstrap components
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";

import { Button, Card, Container, Row, Col } from "react-bootstrap";
// File Pond
import { FilePond, registerPlugin } from "./react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

function ProfileGenerator() {
  // File Pond
  const cvRef = useRef(null);
  const logoRef = useRef(null);

  const [files, setFiles] = useState([]);
  // console.log('cv is',files);

  // PAge 2 State
  const [files2, setFiles2] = useState([]);
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false); // Add loading state
  // console.log('logo is',files2[0]);

  // Location
  const location = useLocation();
  const firstName = location.state?.firstName;
  // console.log('testing', firstName);

//Use History
let history = useHistory();

  useEffect(() => {
    console.log("FilePond instance has initialized", cvRef.current);
    console.log("FilePond instance has initialized", logoRef.current);
  }, []);

  // CV State Update
  const handleUpdateFiles = (fileItems) => {
    setFiles(fileItems.map((fileItem) => fileItem.file));
  };

  // Logo State Update
  const handleUpdateFiles2 = (fileItems) => {
    setFiles2(fileItems.map((fileItem) => fileItem.file));
  };
  //File Pond ENds
  {
    /* 
  const handleSubmit = (e) => {
    e.preventDefault();
    // testing data
    let store = JSON.parse(localStorage.getItem("login"));
    let authToken = store.token;

    const formData = new FormData();
    formData.append("resume", files[0]);
    formData.append("resume_logo", files2[0]);
    formData.append("company_name", company);
    formData.append("officialy_company_website", website);
    console.log(formData);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${store.token}`);
    

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    };

    fetch(`http://127.0.0.1:8000/upload/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result is", result);
        if (result.success) {
          toast.success("Successfully Upload!", {
            position: toast.POSITION.TOP_CENTER,
            className: "toast-message",
          });
        }
      })
      .catch((error) => console.error(error));
  };
*/
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    let store = JSON.parse(localStorage.getItem("login"));
    let authToken = store.token;

    const formData = new FormData();
    formData.append("resume", files[0]);
    formData.append("resume_logo", files2[0]);
    formData.append("company_name", company);
    formData.append("phone_no", phone);
    formData.append("officialy_company_website", website);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("result is", result);
        if (result.success) {
          toast.success("Successfully Upload!", {
            position: toast.POSITION.TOP_CENTER,
            className: "toast-message",
          });
          history.push("/admin/savedresume");

        }
      } else {
        
        throw new Error("Request failed with status: " + response.status);

      }
      
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  
  };

  return (
    <>

      <Container fluid>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Row style={{ background: "#1b1b1b", height: "" }}>

          {/* File Pond Starts*/}
            <Col style={{ backgroundColor: "#1b1b1b", height: "" }}>
              <FilePond
                ref={cvRef}
                files={files}
                allowMultiple={true}
                imagePreviewMaxHeight={200}
                server={{
                  process: (fieldName, file, metadata, load) => {
                    setTimeout(() => {
                      load(Date.now());
                    }, 1500);
                  },
                  load: (source, load) => {
                    fetch(source)
                      .then((res) => res.blob())
                      .then(load);
                  },
                }}
                onupdatefiles={handleUpdateFiles}
                labelIdle={
                  '<div><span class="filepond--label-action">Drop Down Your CV </span><br/><span class="custom-icon"><i class="fa-sharp fa-regular fa-file-pdf"></i></span></div>'
                }
              />
            </Col>
          </Row>

          {/*Row 2 Company Name and Website Address*/}

          <Row
            className="d-flex align-items-center"
            style={{ background: "", height: "", margin: "100px 0" }}
          >

          {/* Company Name Starts*/}

            <Col
              
              className=""
              style={{ backgroundColor: "", paddingLeft: "10px" }}
            >
              <div class="input-field">
                <input
                  type="text"
                  required
                  spellcheck="false"
                  name="company_name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
                <label>Company Name</label>
              </div>
            </Col>


          {/* Website Name Starts*/}

            <Col style={{ backgroundColor: "", paddingRight: "10px" }}>
              <div class="input-field">
                <input
                  type="text"
                  required
                  spellcheck="false"
                  name="officialy_company_website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
                <label>Website Address</label>
              </div>
            </Col>

          {/* Phone Number Starts*/}

          <Col
              
          className=""
          style={{ backgroundColor: "", paddingLeft: "10px" }}
        >
          <div class="input-field">
            <input
              type="text"
              required
              spellcheck="false"
              name="phone_no"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label>Phone Number</label>
          </div>
        </Col>
            
            {loading && <Loader />}

          {/* Template Logo Starts*/}

            <Col
              md={12}
              style={{
                backgroundColor: "",
                height: "",
                border: "1px solid #968f8f57",
                marginTop: "20px",
                padding: "0 10px",
                cursor: "pointer",
                borderRadius: "6px",
              }}
            >
              <FilePond
                ref={logoRef}
                files={files2}
                allowMultiple={true}
                imagePreviewMaxHeight={100}
                server={{
                  process: (fieldName, file, metadata, load) => {
                    setTimeout(() => {
                      load(Date.now());
                    }, 1500);
                  },
                  load: (source, load) => {
                    fetch(source)
                      .then((res) => res.blob())
                      .then(load);
                  },
                }}
                onupdatefiles={handleUpdateFiles2}
                acceptedFileTypes={"image/png"}
                acceptedFileExtensions={[".jpg", ".jpeg", ".png", ".gif"]}
                labelIdle={
                  '<div><span class="filepond--label-action">Upload Your Template Logo</span><br/><span class="custom-icon"><i class="fa-regular fa-image"></i></span></div>'
                }
              />
            </Col>
          </Row>
        
          <button style={{ marginTop: "40px" }} type="submit">
            SUBMIT
          </button>
        </form>
      </Container>

      {/* Container 2 
      {/*File Pond For Logo 
      <Container fluid style={{ padding: "15px 15px", backgroundColor: "#1b1b1b" }}>
      <h5 className="contact_details_profile">Contact Details on Profile</h5>
        <form onSubmit={handleSubmit}>
          <Row className="d-flex align-items-center" style={{ background: "", height: "" }}>

          <Col md={6} className="" style={{ backgroundColor: "",paddingLeft:'10px', }}>
              <div class="input-field">
                <input type="text" required spellcheck="false" name="company" value={company} onChange={(e) => setCompany(e.target.value)} />
                <label>Company Name</label>
              </div>
            </Col>
            <Col md={6}  style={{ backgroundColor: "", paddingRight:'10px' }}>
            <div class="input-field">
                <input type="text" required spellcheck="false"  name="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
                <label>Website Address</label>
              </div>
            </Col>

            <Col md={12} style={{ backgroundColor: "", height: "",border:'1px solid #968f8f57',marginTop:'20px',padding:'0 10px',cursor:'pointer', borderRadius:'6px' }}>
              <FilePond
                ref={pondRef}
                files={files}
                allowMultiple={true}
                imagePreviewMaxHeight={100}
                server={{
                  process: (fieldName, file, metadata, load) => {
                    setTimeout(() => {
                      load(Date.now());
                    }, 1500);
                  },
                  load: (source, load) => {
                    fetch(source)
                      .then((res) => res.blob())
                      .then(load);
                  },
                }}
                onupdatefiles={handleUpdateFiles}
                  acceptedFileTypes={"image/png"}
                  acceptedFileExtensions={[".jpg", ".jpeg", ".png", ".gif"]}
                labelIdle={
                  '<div><span class="filepond--label-action">Upload Your Template Logo</span><br/><span class="custom-icon"><i class="fa-regular fa-image"></i></span></div>'
                }
                
              />
            </Col>

           
          </Row>
          <button style={{marginTop:'200px'}} type="submit">Next</button>
        </form>
      </Container>
      */}
    </>
  );
}

export default ProfileGenerator;
