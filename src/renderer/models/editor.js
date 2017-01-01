
export default {

  namespace: 'editor',

  state: {
    theme: 'github',
    mode: 'jsx',
  },

  effects: {
    
  },

  reducers: {
    changeStatus(state, action){
      return { ...state, ...action.payload};
    },
    

  },

};
