// FaceDetectionComponent.js
import React, { useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';

const FaceDetectionComponent = () => {
  const videoRef = useRef();
  const [studentId, setStudentId] = useState(null);

  const detectFace = async () => {
    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.offsetWidth;
      canvas.height = video.offsetHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const detections = await faceapi.detectAllFaces(canvas).withFaceLandmarks().withFaceDescriptors();
      if (detections.length === 0) {
        console.log('No face detected.');
        return;
      }

      // Assuming you have a backend endpoint for face recognition
    //   const recognitionEndpoint = '/api/recognition';
    //   const response = await axios.post(recognitionEndpoint, { faceDescriptor: detections[0].descriptor });

    //   if (response.data && response.data.studentId) {
    //     setStudentId(response.data.studentId);
    //   } else {
    //     console.log('Student ID not found.');
    //   }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <video ref={videoRef} width="720" height="560" autoPlay muted playsInline />
      <canvas />
      <button onClick={detectFace}>Detect Faces</button>
      {studentId && <div>Student ID: {studentId}</div>}
    </div>
  );
};

export default FaceDetectionComponent;