import * as React from 'react';
import Viewer from 'react-viewer';

let path_1 = './images/natural-scene.jpeg'; 
let url_path;

// https://www.reddit.com/user/MarshallOfSound

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


function ViewerDemo() {
  const [ visible, setVisible ] = React.useState(false);
 
  let urlpath = pathToUrlFunc(path_1);
  console.log("urlpath: ", urlpath);

  //window.api.send("path-to-url", path_1);

  //window.api.receive("path-to-url", (event, args) => {
    //console.log("window.api.receive called!. args:", args);
    //console.log("window.api.receive-args[0]: ", args[0]);
  //});

  return (
    <div>
      <button onClick={() => { setVisible(true); } }>show</button>
      <Viewer
      visible={visible}
      onClose={() => { setVisible(false); } }
      images={[{src: 'https://www.fotolip.com/wp-content/uploads/2016/05/Nature-Scenes-21.jpg', alt: ''}]}
      //images={[{src: urlpath, alt: ''}]}
      />
    </div>
  );
}

export default ViewerDemo;
