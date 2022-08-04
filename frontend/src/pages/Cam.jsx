import React, { useRef, useEffect, useState } from "react";
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
  const [alertaAudio, setAlertaAudio] = useState("Good")
  const [alertaCaras, setAlertaCaras] = useState(0)
  const [alertaObjetos, setAlertaObjetos] = useState(0)

  var contadorCaras = 0;
  var contadorObjetos = 0;
  var hayObjetos = false;

  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: { width: 640, height: 480 }
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
        if (audio < 30){
          setAlertaAudio("Good");
        }else if(audio < 50){
          setAlertaAudio("Warning")
        }else{
          setAlertaAudio("Error")
        }

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

      if (faces.length <= 0) {
        contadorCaras++;
        if (contadorCaras >= 50){
          setAlertaCaras(0)
        }
      }else if(faces.length == 1){
        setAlertaCaras(1)
        contadorCaras = 0;
      }else{
        setAlertaCaras(2)
        contadorCaras = 0;
      }

      if (objects.length > 0) {
        objects.forEach(element => {
          if (element.class == "cell phone" || element.class == "book" || element.class == "remote") {
            setAlertaObjetos(1)
            hayObjetos = true;
          }else{
            if (contadorObjetos > 30){
              setAlertaObjetos(0)
              hayObjetos = false;
              contadorObjetos = 0;
            }
          }
        });
      }
      if (hayObjetos == true){
        contadorObjetos++;
      }
      console.log(contadorObjetos)
      // Get canvas context
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(() => { drawMesh(faces, ctx); drawRect(objects, ctx); });
    }
  };


  useEffect(() => {
    run()
  }, []);



  return (
    <div className="App">

    {(alertaAudio=="Good")
    ?<div style={{backgroundColor: 'green'}}>No hay ruido</div>:
    (alertaAudio=="Warning") ?
    <div style={{backgroundColor: 'yellow'}}>Se detecta ruido de fondo</div>:
    <div style={{backgroundColor: 'red'}}>Hay mucho ruido</div>}

    {(alertaCaras == 0)
    ?<div style= {{backgroundColor: 'red'}}>No hay estudiantes</div>:
    (alertaCaras == 1) ?
    <div style={{backgroundColor: 'green'}}>Hay solo 1 estudiante</div>:
    <div style={{backgroundColor: 'red'}}>Hay muchos estudiantes</div>}

    {(alertaObjetos == 0)
    ?<div style= {{backgroundColor: 'green'}}>No hay objetos prohibidos</div>:
    <div style={{backgroundColor: 'red'}}>Hay objetos prohibidos</div>}

      <header className="App-header">
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
        />

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
      </header>
    </div>
  );
}

export default Cam;
