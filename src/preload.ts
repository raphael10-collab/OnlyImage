const {
  contextBridge,
  ipcRenderer
} = require("electron")

//const url = require('url');

// https://github.com/electron/electron/blob/master/spec-main/api-context-bridge-spec.ts

const validChannels = ["path-to-url"];

// https://github.com/electron/electron/issues/21437#issuecomment-573522360

contextBridge.exposeInMainWorld(
  "api", {
      send: (channel, data) => {
          ipcRenderer.invoke(channel, data).catch(e => console.log(e))
      },
      receive: (channel, func) => {
        //ipcRenderer.on(channel, (event, ...args) => func(...args)).catch(e => console.log(e))
        //console.log("preload-receive called. args: ");
        ipcRenderer.on(channel, (event, ...args) => func(...args));
        //ipcRenderer.on(channel, (event, ...args) => {
          //console.log("ipcRenderer.on-args: ", args);
        //});
        //ipcRenderer.invoke(channel, (event, ...args) => func(...args)).catch(e => console.log(e))
      },
      // https://github.com/frederiksen/angular-electron-boilerplate/blob/master/src/preload/preload.ts
      electronIpcSend: (channel: string, ...arg: any) => {
        ipcRenderer.send(channel, arg);
      },
      electronIpcSendSync: (channel: string, ...arg: any) => {
        return ipcRenderer.sendSync(channel, arg);
      },
      electronIpcOn: (channel: string, listener: (event: any, ...arg: any) => void) => {
        ipcRenderer.on(channel, listener);
      },
      electronIpcOnce: (channel: string, listener: (event: any, ...arg: any) => void) => {
        ipcRenderer.once(channel, listener);
      },
      electronIpcRemoveListener:  (channel: string, listener: (event: any, ...arg: any) => void) => {
        ipcRenderer.removeListener(channel, listener);
      },
      electronIpcRemoveAllListeners: (channel: string) => {
        ipcRenderer.removeAllListeners(channel);
      }
  }
)


