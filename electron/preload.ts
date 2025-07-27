import { ipcRenderer, contextBridge } from 'electron'
import { createRequire } from 'node:module'
import path from 'node:path'

const require = createRequire(path.join(process.env.APP_ROOT,import.meta.url))

// --------- Expose some API to the Renderer process ---------

contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },
})

contextBridge.exposeInMainWorld("require",require);

contextBridge.exposeInMainWorld("process",process);

contextBridge.exposeInMainWorld("electronAPI", {
  windowControl: (action: any) => ipcRenderer.invoke('window-control', action),
  
  clearCache: () => ipcRenderer.invoke('clear-cache'),
  
  onWindowStateChanged: (callback: Function) => {
    ipcRenderer.on('window-state-changed', (event, state) => callback(state));
  },
  
  removeAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel);
  }
})
export default {}