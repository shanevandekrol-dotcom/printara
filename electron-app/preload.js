const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('serialBridge', {
  list:       ()           => ipcRenderer.invoke('serial:list'),
  connect:    (path, baud) => ipcRenderer.invoke('serial:connect', path, baud),
  send:       (data)       => ipcRenderer.invoke('serial:send', data),
  disconnect: ()           => ipcRenderer.invoke('serial:disconnect'),
  onData:     (cb) => ipcRenderer.on('serial:data',   (_e, d) => cb(d)),
  onError:    (cb) => ipcRenderer.on('serial:error',  (_e, e) => cb(e)),
  onClosed:   (cb) => ipcRenderer.on('serial:closed', ()      => cb()),
});
