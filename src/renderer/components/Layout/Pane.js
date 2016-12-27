import React from "react";
import { connect } from 'dva'

import styles from './Layout.css'

const Pane = (props) => {
	const newClz = styles.pane + ' ' + styles[props.className]

	return(
	<div className={newClz} style={props.style}>{props.children}</div>
	)
}

Pane.propTypes = {};

export default connect()(Pane);
