import React, { Component, PropTypes } from 'react';
import { connect } from 'dva'
import styles from './ProjMenu.css';

const ProjMenu = ({ cns, files, proj, dispatch }) => {

  function showConsole(show){

      dispatch({
        type: 'cns/changeStatus',
        payload: { show },
      });

  }

  function startProj(){
      dispatch({
        type: 'proj/startProj',
      });
  }

  function stopProj(){
    dispatch({
      type: 'proj/stopProj',
    });
  }

  function buildProj(){
    dispatch({
      type: 'proj/buildProj',
    });
  }

  return (
    <div className={styles['proj-footer-grp']}>
      { files.folder && <button onClick={e => startProj()} >Start</button>}
      { files.folder && <button onClick={e => stopProj()} >Stop</button>}
      { files.folder && <button onClick={e => buildProj()} >Build</button>}
      <button onClick={e => showConsole(!cns.show)} >{cns.show ? 'Hide' : 'Show'} Console</button>
    </div>
  );
};

ProjMenu.propTypes = {};

export default connect(({ cns, files, proj }) => ({  cns, files, proj }))(ProjMenu);

// <input type="checkbox" onChange={e => showRun(e.target.checked)} />
