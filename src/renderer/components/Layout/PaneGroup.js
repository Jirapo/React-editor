import React from 'react';

import styles from './Layout.css'

const Sidebar = (props) => <div className={styles.panegroup} style={props.style}>{props.children}</div>

Sidebar.propTypes = {};

export default Sidebar

