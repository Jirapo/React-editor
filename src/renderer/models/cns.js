import { transformCode } from '../utils'
import React, { Component } from 'react';
import ReactDOM, {findDOMNode} from 'react-dom'
import _ from 'lodash'
import CaptureConsole from '../services/cns'


export default {

  namespace: 'cns',

  state: {
    show: false,
    content: '',
    err: '',
    isExec: false
  },

  effects: {
    *transCode({ payload: { contents }}, {put, call, select }){

        const {code, err} = transformCode(contents);

        yield put({
          type: 'changeStatus',
          payload: {
              content: code,
              err
            }
        });
    },
    *execCode({ payload: { mount, contents }}, {put, call, select }){

      yield put({
        type: 'transCode',
        payload: {
            contents,
          }
      });

      const { content } = yield select(state => state.cns);

      let capturingConsole = CaptureConsole();
      var str = 'ReactDOM, React, mountNode, console'
      var strp = [ReactDOM, React, mount, capturingConsole]

      try{
        let f = (new Function(str, content))
        f.apply(null, strp)
        let buffer = capturingConsole.getBuffer();

        yield put({
          type: 'changeStatus',
          payload: {
              isExec: true,
              content: buffer
            }
        });

      }catch (err){
        yield put({
          type: 'changeStatus',
          payload: {
              err: err.toString(),
              isExec: false
            }
        });
      }
    }
  },

  reducers: {
    changeStatus(state, action){
      return { ...state, ...action.payload};
    },


  },

};
