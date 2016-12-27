import React from 'react';
// import { connect } from 'dva'

import styles from './Layout.css'

const Sidebar = (props) => <div className={styles.panegroup} style={props.style}>{props.children}</div>

Sidebar.propTypes = {};

export default Sidebar

// export default connect()(Sidebar);
