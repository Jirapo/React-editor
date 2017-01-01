import React from 'react';

import styles from './Layout.css'
const TabItem = ({ index, className, title, onSelectItem, onCloseItem  }) => {

  const newClz = styles['tab-item'] + (className ? ' ' + styles[className] : '')
  return(
    <div className={newClz}
      onClick={ e => {
        e.stopPropagation();
        onSelectItem(index)
      }}
      >
      <span
        className={styles['ic-close-tab']}
        onClick={ e => {e.stopPropagation(); onCloseItem(index)}}>x</span>
      { title }
    </div>
    )
}

TabItem.propTypes = {};

export default TabItem
