import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

// NEW MODEL
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import * as cocossd from "@tensorflow-models/coco-ssd";

import Webcam from "react-webcam";
import { drawMesh, drawRect } from "../utils/utilities";

import '../css/App.css';

function Cam() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })
    .then(function (stream) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(scriptProcessor);
      scriptProcessor.connect(audioContext.destination);
      scriptProcessor.onaudioprocess = function () {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        const arraySum = array.reduce((a, value) => a + value, 0);
        const average = arraySum / array.length;
        const audio = Math.round(average);
        console.log(audio)
      };
    })
    .catch(function (err) {
      console.error(err);
    });

  //  Load posenet
  const run = async () => {
    // detector objectos
    const netCoco = await cocossd.load();

    // ver si se puede encontrar algo mejor que facemesh
    // detector facemesh
    const netFacemesh = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);

    setInterval(() => {
      detect(netFacemesh, netCoco);
    }, 10);
  };

  const detect = async (net1, net2) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      // NEW MODEL
      const faces = await net1.estimateFaces({ input: video });
      const objects = await net2.detect(video);
      
      if (faces.length > 0) {
        faces.forEach(element => {
          console.log(element)
        });
      }

      if (objects.length > 0) {
        objects.forEach(element => {
          if (element.class == "cell phone") {
            console.log(element)
          }
        });
      }

      // Get canvas context
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(() => { drawMesh(faces, ctx); drawRect(objects, ctx); });
    }else{
      console.log(webcamRef.readyState)
    }
  };


  useEffect(() => {
    run()
  }, []);

  return (
    <div className="App">

        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        ></Webcam>

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

    </div>
  );
}

export default Cam;
