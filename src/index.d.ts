declare module '*.css';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';


declare interface Window {
    api: {
      send: (channel: string, ...arg: any) => void;
      receive: (channel: string, func: (event: any, ...arg: any) => void) => void;

      // https://github.com/frederiksen/angular-electron-boilerplate/blob/master/src/window-interface/index.d.ts 
      /** Electron ipcRenderer wrapper of send method */
      electronIpcSend: (channel: string, ...arg: any) => void;
      /** Electron ipcRenderer wrapper of sendSync method */
      electronIpcSendSync: (channel: string, ...arg: any) => any;
      /** Electron ipcRenderer wrapper of on method */
      electronIpcOn: (channel: string, listener: (event: any, ...arg: any) => void) => void;
      /** Electron ipcRenderer wrapper of onOnce method */
      electronIpcOnce: (channel: string, listener: (event: any, ...arg: any) => void) => void;
      /** Electron ipcRenderer wrapper of removeListener method */
      electronIpcRemoveListener: (channel: string, listener: (event: any, arg: any) => void) => void;
      /** Electron ipcRenderer wrapper of removeAllListeners method */
      electronIpcRemoveAllListeners: (channel: string) => void;
    }
}
