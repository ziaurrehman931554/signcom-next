'use client'

import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';

import "../globals.css";

export default function Home() {
  const windowHeight = 800;
  const [hasPermission, setHasPermission] = useState(false);
  const [text, setText] = useState("This is container where the text of the signs are displayed.");
  const [cameraType, setCameraType] = useState('front');
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCallOngoing, setIsCallOngoing] = useState(true);

  useEffect(() => {
    (async () => {
      setHasPermission(true);
    })();
  }, []);

  if (hasPermission === null) {
    return <div />;
  }
  if (hasPermission === false) {
    return <p>No access to camera</p>;
  }

  const handleEndCall = () => {
    setIsCallOngoing((prev) => !prev);
  };

  const toggleCameraType = () => {
    setCameraType(cameraType === 'front' ? 'back' : 'front');
  };

  const toggleMic = () => {
    setIsMicMuted(!isMicMuted);
  };

  return (
    <section className='flex w-full justify-center  body content' >
      <div className='self-center flex content relative border-x-2 border-black justify-center background' style={{ width: 400 }}>
        <div className='flex self-center top-0 w-44 h-7 absolute rounded-b-2xl z-30 bg-black'></div>
        <div className='flex self-center bottom-2 w-28 h-1 absolute rounded-full z-30 bg-white'></div>
        <div className='w-full' style={{ position: 'absolute', bottom: 0, zIndex: 2 }}>
          <div className='flex w-full'>
            <div style={{ height: 86, width: '62%', borderRadius: 11, margin: 6, backgroundColor: 'white', alignSelf: 'flex-end' }}>
              <a style={{ fontSize: 17, padding: 5 }}>{text}</a>
            </div>
            <div style={{ borderWidth: 15, bottom: 0, overflow: "hidden", height: 211, borderWidth: 1, width: '37%', borderRadius: 11, margin: 3, backgroundColor: 'black', borderColor: '#74ACD9', }}>
              {isCallOngoing && (
                <Webcam
                  style={{ height: '100%', width: '100%' }}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    width: { min: 148, max: 148 },
                    height: { min: 211, max: 211 },
                    aspectRatio: 138 / 211,
                    facingMode: cameraType === 'front' ? 'user' : 'environment',
                  }}
                  mirrored={cameraType === 'front' ? true : false}
                />
              )}
            </div>
          </div>
          <div className='flex justify-center w-full m-3 items-center'>
            <button onClick={toggleCameraType} className='rounded-full h-16 w-16 items-center justify-center bg-slate-600 mx-2'>
              <div className='text-2xl'>📷</div>
            </button>
            <button onClick={handleEndCall} className='rounded-full h-20 w-20 items-center justify-center bg-red-400 mx-2'>
              <div className='text-2xl'>📞</div>
            </button>
            <button onClick={toggleMic} className='rounded-full h-16 w-16 items-center justify-center bg-slate-600 mx-2'>
              <div className='text-2xl'>{isMicMuted ? '🔇' : '🎤'}</div>
            </button>
          </div>
        </div>
        <div style={{ height: (windowHeight - (windowHeight * 10 / 100) - 190), marginTop: 5, overflow: "hidden", top: 0, zIndex: 1, width: '95%', borderRadius: 20, borderWidth: 1, borderColor: '#74ACD9', borderWidth: 2, backgroundColor: 'grey' }}>
          {isCallOngoing && (
            <>
              <Webcam
                  style={{ height: '100%', width: '100%' }}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    width: { min: 148, max: 148 },
                    height: { min: 211, max: 211 },
                    aspectRatio: 138 / 211,
                    facingMode: cameraType === 'front' ? 'user' : 'environment',
                  }}
                  mirrored={cameraType === 'front' ? true : false}
                />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
