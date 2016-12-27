import React from "react";

import styles from './Layout.css'

const Footer = (props) => <div className={styles.footer}>{props.children}</div>

Footer.propTypes = {};

export default Footer;

