import React, { Component, PropTypes } from 'react';
import { connect } from 'dva'
import { EDITOR_THEMES, EDITOR_MODE } from '../../../shared/constants'
import styles from './EditorSelectPane.css';

const EditorSelectPane = ({ editor:{ mode, theme} }) => {

  function changeThemeHandler(theme) {
    dispatch({
      type: 'editor/changeStatus',
      payload: { theme },
    });
  }

  function changeModeHandler(mode) {
    dispatch({
      type: 'editor/changeStatus',
      payload: { mode },
    });
  }

  // function showConsole(show){
  //
  //     dispatch({
  //       type: 'cns/changeStatus',
  //       payload: { show },
  //     });
  //
  // }

  // function newWindow(){
  //   if(!win.instance){
  //     dispatch({
  //       type: 'win/newWindow',
  //       // payload: { show },
  //     });
  //   }else{
  //     dispatch({
  //       type: 'win/closeWindow',
  //       // payload: { instance: null },
  //     });
  //   }
  // }
  //
  // function startProj(){
  //   // if(proj.start){
  //
  //   // }else{
  //     dispatch({
  //       type: 'proj/startProj',
  //       // payload: { show },
  //     });
  //   // }
  // }
  //
  // function stopProj(){
  //   dispatch({
  //     type: 'proj/stopProj',
  //   });
  // }
  //
  // function buildProj(){
  //   dispatch({
  //     type: 'proj/buildProj',
  //   });
  // }

  return (
    <div className={styles['select-grp']}>

      <label>Theme: </label>
      <select value={theme} onChange={ e => changeThemeHandler(e.target.value)}>
        {EDITOR_THEMES.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      {' '}
      <label>Language: </label>
      <select value={mode} onChange={ e => changeModeHandler(e.target.value)}>
        {EDITOR_MODE.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
    </div>
  );
};

EditorSelectPane.propTypes = {};

export default connect(({ editor }) => ({ editor }))(EditorSelectPane);

// <input type="checkbox" onChange={e => showRun(e.target.checked)} />
// <button onClick={e => startProj()} >Start</button>
// <button onClick={e => stopProj()} >Stop</button>
// <button onClick={e => buildProj()} >Build</button>
// <button onClick={e => showConsole(!cns.show)} >{cns.show ? 'Hide' : 'Show'} Console</button>
