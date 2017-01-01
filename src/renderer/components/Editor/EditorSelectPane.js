import React, { Component, PropTypes } from 'react';
import { connect } from 'dva'
import { EDITOR_THEMES, EDITOR_MODE } from '../../constants'
import styles from './EditorSelectPane.css';

const EditorSelectPane = ({ editor:{ mode, theme}, dispatch }) => {

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

