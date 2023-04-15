import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

//Why const instead of func?
// const UploadImages = () => {
function UploadImages(props) {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const [message, setMessage] = useState([]);
  // const [imageInfos, setImageInfos] = useState([]);
  const progressInfosRef = useRef(null); //What's the use of useRef hook?

  // import UploadService from "../services/FileUploadService";
  // useEffect(() => {
  //   UploadService.getFiles().then((response) => {
  //     setImageInfos(response.data);
  //   });
  // }, []);

  const upload = (idx, file) => {
    console.log("upload")
    let formData2 = new FormData();
    formData2.append('file', file);
    let _progressInfos = [...progressInfosRef.current.val];
    let config = {
      headers: {
      "Content-Type": "multipart/form-data",
      },
      onUploadProgress: function(progressEvent) {
              _progressInfos[idx].percentage= Math.round(
               (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgressInfos({ val: _progressInfos });
      } 
    }

    //May need to change API URL on Deployment?
    return axios.post(process.env.REACT_APP_API_URL+'upload', formData2, config)
      .then(() => {
        setMessage((prevMessage) => [
          ...prevMessage,
          "Uploaded the image successfully: " + file.name,
        ]);
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        setProgressInfos({ val: _progressInfos });

        setMessage((prevMessage) => [
          ...prevMessage,
          "Could not upload the image: " + file.name,
        ]);
      });
  };

  const uploadImages = (event) => {
    let images = [];
    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]));
    }

    setImagePreviews(images);
    setProgressInfos({ val: [] });
    setMessage([]);
    console.log("selectFiles")

    const files = Array.from(event.target.files);

    let _progressInfos = files.map((file) => ({
      percentage: 0,
      fileName: file.name,
    }));

    progressInfosRef.current = {
      val: _progressInfos,
    };

    files.map((file, i) => upload(i, file));
    props.passData(files.map((file) => (file.name)));
    // const uploadPromises = files.map((file, i) => upload(i, file));
    // Promise.all(uploadPromises)
    //   .then(() => UploadService.getFiles())
    //   .then((files) => {
    //     setImageInfos(files.data);
    //   });

    setMessage([]);
  };

  return (
    <div>
      <Button variant="contained" component="label" sx={{width:'100%', marginBottom:'1rem',textTransform: "none"}} onChange={uploadImages} >
        {props.multi ? 'Add Pics' : 'Add Single Pic'}
        <input hidden accept="image/*" multiple={props.multi} type="file" />
        {/*<input hidden accept="image/*" {...(props.multi ? { multi: true } : {})} type="file" />*/}
      </Button>

      {progressInfos &&
        progressInfos.val.length > 0 &&
        progressInfos.val.map((progressInfo, index) => (
          <div className="mb-2" key={index}>
            <span>{progressInfo.fileName}</span>
            <LinearProgressWithLabel value={progressInfo.percentage} />
          </div>
        ))}

      {imagePreviews && (
        <div style={{margin:"1rem 0"}}>
          {imagePreviews.map((img, i) => {
            return (
              <img className="preview" src={img} alt={"image-" + i} key={i} height="100rem" />
            );
          })}
        </div>
      )}

      {message.length > 0 && (
        <Alert severity="info" style={{padding:'1rem'}}>
          <ul style={{margin:0}}>
            {message.map((item, i) => {
              return <li key={i}>{item}</li>;
            })}
          </ul>
        </Alert>
      )}
    </div>
  );
};

export default UploadImages;