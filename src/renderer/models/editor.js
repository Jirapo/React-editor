//
// import { remote, ipcRenderer } from 'electron'
// import { mapToMode, getFileName, formatFile } from '../utils'


export default {

  namespace: 'editor',

  state: {
    theme: 'github',
    mode: 'jsx',
  },

  reducers: {
    changeStatus(state, action){
      return { ...state, ...action.payload};
    },
    changeTheme(state, action){
      return { ...state, ...action.payload};
    },
    changeMode(state, action){
      return { ...state, ...action.payload};
    },

  },

};
