import React, { Component } from 'react';
import ReactDom, {findDOMNode, unmountComponentAtNode} from 'react-dom'
import { connect } from 'dva'

import styles from './Console.css'

class Console extends Component {

// const Console = ({ cns, dispatch}) => {
	constructor(props){
    super(props);
    this.transCode = this.transCode.bind(this)
    this.clearConsole = this.clearConsole.bind(this)
    this.execCode = this.execCode.bind(this)
 	}

	transCode() {
		const { files: { current, tabs }, dispatch } = this.props;
		const tab = tabs[current];

		dispatch({
			type: 'cns/transCode',
			payload: { 
				// mount: findDOMNode(this.refs.result), 
				contents: tab.contents 
			},
      });
	}

	execCode(){
		const { files: { current, tabs }, dispatch } = this.props;
		const tab = tabs[current];

		dispatch({
			type: 'cns/execCode',
			payload: { 
				mount: findDOMNode(this.refs.result), 
				contents: tab.contents 
			},
      });
	}

	clearConsole() {
		unmountComponentAtNode(this.refs.result)
		this.props.dispatch({
        type: 'cns/changeStatus',
        payload: { content: '', err: '' },
      });
	}


	render(){
		const { cns: {content, err, isExec}, proj } = this.props;
		let cnt = err || proj.err ? <span style={{ color: 'red'}}>{ err || proj.err }</span> 
			: <span>{ content }</span>;

		const showResult = isExec ? 'block' : 'none';

		return( 
			<div className={styles.console}>
				<div className={styles.btnGrp}>
					<button className={styles.btn} onClick={ e => this.transCode()}>BABEL</button>
					<button className={styles.btn} onClick={ e => this.execCode()}>EXEC</button>
					<button className={styles.btn} onClick={ e => this.clearConsole()}>CLEAR</button>
				</div>
				<div className={styles.result} >{ cnt }</div>
				<div className={styles.result} style={{display: {showResult}}} ref='result'></div>
			</div>
		)
	}
}

Console.propTypes = {};

export default connect(({ cns, files, proj }) => ({ cns, files, proj }))(Console);

// <div className={styles.result} ref='result'>{ cnt }</div>
