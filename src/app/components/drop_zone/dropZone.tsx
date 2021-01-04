import ReactDOM from 'react-dom';
import React, { useState, useRef, useEffect, Component } from 'react';
import {useDropzone} from 'react-dropzone';

declare interface Window {
  api: {
    send: (channel: string, ...arg: any) => void;
    receive: (channel: string, func: (event: any, ...arg: any) => void) => void;
    electronIpcSend: (channel: string, ...arg: any) => void;
    electronIpcOn: (channel: string, listener: (event: any, ...arg: any) => void) => void;
  }
}

window.api.electronIpcSend("filepathUrl", "/home/marco/Downloads/2br02b_1_vonnegut_64kb.mp3");

window.api.electronIpcOn("filepathUrl", (event, args) => {
  console.log("window.api.electronIpcOn called");
  console.log("dropZone-window.api.electronIpcOn-args: ", args);
  console.log("dropZone-window.api.electronIpcOn-event: ", event);
});


export function Accept(props) {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: 'image/*, video/*, application/pdf, application/doc. application/epub'
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  // https://reactjs.org/docs/hooks-effect.html

  const [ visible, setVisible ] = React.useState(false);

  for(let i in acceptedFiles) {
    if (acceptedFiles[i].type.includes('/pdf')) {

      // https://github.com/yurydelendik/pdfjs-react
      // https://usefulangle.com/post/20/pdfjs-tutorial-1-preview-pdf-during-upload-wih-next-prev-buttons
      // // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

      console.log("PDF file to render: ", acceptedFiles[i].path);
      //pdfPath = acceptedFiles[i].path;
      //Loading the document
      // https://github.com/mozilla/pdf.js/blob/master/examples/webpack/main.js
      //let loadingTask = pdfjsLib.getDocument(pdfPath);
      //const pdfDoc = document.getElementById("canvas") as HTMLCanvasElement;
    }
    //else if (acceptedFiles[i].type.includes('image/')) {
      // https://github.com/infeng/react-viewer#readme
      //console.log("Image file to render: ", acceptedFiles[i].path);
      // https://stackoverflow.com/questions/56016696/argument-of-type-htmlelement-is-not-assignable-to-parameter-of-type-canvasima#56016851
      //const img = document.getElementById("imgFile") as HTMLImageElement;
    //}
  }


  // https://medium.com/better-programming/add-an-html-canvas-into-your-react-app-176dab099a79  
  // https://gist.githubusercontent.com/richarddprasad/d6f255d559bf14050a55b317c7318197/raw/5cff4c295810fd623379aa56c2fe4bd8ede8e4f4/canvas001.tsx

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(images, videos, pdf, doc will be accepted)</em>
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
      </aside>

    </section>
  );
}

<Accept />
