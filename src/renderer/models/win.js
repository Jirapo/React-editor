import { remote } from 'electron'

export default {

  namespace: 'win',

  state: {
    instance: null,
    url: '',
  },

  effects: {
    *newWindow({ }, {put, call, select }){
      let win = remote.getGlobal('services').window.create({ width: 800, height: 600 })
      yield put({
        type: 'changeStatus',
        payload: {
            instance: win,
          }
      });
    },
    *closeWindow({ }, {put, call, select }){
      const { instance } = yield select(state => state.win)
      instance.close()
      yield put({
        type: 'changeStatus',
        payload: {
            instance: null,
          }
      });
      // remote.getGlobal('services').window.create({ width: 800, height: 600 })

    }
  },

  reducers: {
    changeStatus(state, action){
      return { ...state, ...action.payload};
    },

  },

};
