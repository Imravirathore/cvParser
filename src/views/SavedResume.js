import React, { useEffect,useState } from "react";
import { FcOpenedFolder } from "react-icons/fc";
import axios from "axios";
import moment from 'moment';
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
 import DataTable, { createTheme } from 'react-data-table-component';

 // createTheme creates a new theme named solarized that overrides the build in dark theme
createTheme('solarized', {
  text: {
    primary: '#fff',
    secondary: 'green',
  },
  background: {
    default: '#1b1b1b',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: 'black',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
}, 'dark');

const resumeData = moment().format(' hh:mm: p');
console.log('aa',resumeData);

function SavedResume() {
// Loadaing for Table
const [pending, setPending] = React.useState(true);
	const [rows, setRows] = React.useState([]);
	React.useEffect(() => {
		const timeout = setTimeout(() => {
			setRows(data);
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);

  // const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const loadResume = async () => {
      // setLoading(true);
    let store = JSON.parse(localStorage.getItem("login"));
    // console.log('store is', store);
    axios({
    url: 'http://127.0.0.1:8000/userresume/',
    method: 'get',
    headers: {
      Authorization: `Bearer ${store.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
 })
 .then(response => {
    console.log('data',response.data)
    if (Array.isArray(response.data.data)) {
      setData(response.data.data);
    } else {
      setData([]);
    }
    
 }) 
 .catch(err => {
    console.log(err);
 })
 
      // setLoading(false);
    }
    setTimeout(() => {
      loadResume();
    }, 500);
    
  }, []);

  //Table 

  const columns = [
      {
      name:'User Name',
      selector: (row) =>row.name,
      sortable: true
    },

    {
      name:'User email',
      selector: (row) =>row.email,
      sortable: true
    },
   
    {
      name:'File Size',
      selector: '235KB',
      sortable: true
    },
    {
      name:'Date',
      selector: (row) =>row.my_date_field,
      format: (row) => moment(row.my_date_field).format('YYYY-MM-DD, h:mm a')
   },
    {
      name:'Download',
      cell: row =><button 
      onClick={()=> downloadCv(row.id)}
      variant="success"
      style={{
        color: "#fff",
        backgroundColor: "#05cb65",
        border: "none",
      }}>Download</button>
    },
  ]
  // console.log('my_date_field' ,my_date_field);
    

const downloadCv = (id) =>{
  let store = JSON.parse(localStorage.getItem("login"));
  let authToken = store.token;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authToken}`);
  myHeaders.append("Content-Type", "application/pdf");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(`https://639b-182-70-252-19.ngrok-free.app/download/28`, requestOptions)
  .then((response) => response.blob())
  .then(blob => {
    console.log(blob);
    var audioURL = window.URL.createObjectURL(blob);
      console.log(audioURL);
    // audio.src = audioURL;

    var reader = new FileReader()
    
                    reader.readAsDataURL(blob)
                    reader.onloadend = function () {
                        var base64data = reader.result
                        console.log(base64data)
                    }
    // const url = window.URL.createObjectURL(new Blob([blob]));
    // const link = document.createElement('a');
    // link.href = url;
    // link.setAttribute('download', 'document.docx');
    // document.body.appendChild(link);
    // link.click();
  });
}

function downloadPdf(){
  let store = JSON.parse(localStorage.getItem("login"));
  let authToken = store.token;
     // Fetch the PDF content from an API
  fetch('https://639b-182-70-252-19.ngrok-free.app/download/28', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/pdf',
      'Authorization':`Bearer ${authToken}`
    },
  })
    .then(response => response.blob())
    .then(blob => {
      // Create a download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'document.pdf';

      // Append the link to the document body and trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up by removing the link
      document.body.removeChild(link);
    })
    .catch(error => {
      console.error('Error fetching PDF:', error);
    })
}

  return (
    <>
      <Container fluid>
        <DataTable 
        title ="Last Profiles"
        columns= {columns} 
        data ={data}
        fixedHeader
        selectableRows
        highlightOnHover 
        pagination
        theme="solarized"
        progressPending={pending}
        /> 
    
      </Container>
      <button onClick={downloadPdf}>Download PDF</button>
    </>
  );
}

export default SavedResume;
