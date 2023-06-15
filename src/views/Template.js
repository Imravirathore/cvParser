import React, { useState, useRef, useEffect } from "react";
import { FaStar } from "react-icons/fa";


// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
// File Pond
import { FilePond, registerPlugin } from "./react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginImageEdit,FilePondPluginFileValidateType);

function Template() {
  // File Pond
  const pondRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [company, setCompany] = useState('')
  const [website, setWebsite] = useState('')

  // console.log("file is", files);
  useEffect(() => {
    // console.log("FilePond instance has initialized", pondRef.current);
  }, []);


  
  const handleUpdateFiles = (fileItems) => {
    setFiles(fileItems.map((fileItem) => fileItem.file));
  };
  //File Pond ENds

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    
  // Create a new object with the current form data
  const formData = {
    files: files,
    company: company,
    website: website,
  };
  
  // console.log('file is',files);
    // Add the new form data to the existing data array
    // const updatedData = [...storedData, formData];

// Save the updated data array in localStorage
localStorage.setItem("formData", JSON.stringify(formData));
  };

  return (
    <>
  
      {/*File Pond For Logo */}
      <Container fluid style={{ padding: "15px 15px", backgroundColor: "#1b1b1b" }}>
      <h5 className="contact_details_profile">Contact Details on Profile</h5>
   
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
 
      </Container>
      
    </>
  );
}

export default Template;
