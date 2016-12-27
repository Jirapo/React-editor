import React, {Component} from 'react';
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';
import { connect } from 'dva';



// class EditorPane extends Component {

// 	onChange(contents) {
// 	  // console.log('change',newValue);
// 	  const {dispatch} = this.props
// 	  dispatch({
// 	  	type: 'editor/changeFile',
// 	  	payload: { contents}
// 	  })
// 	}

// 	render(){
// 		const {editor: { mode, theme, contents}, dispatch} = this.props

// 		const paneProps = {
// 			width: "100%",
// 			height: "100%",
// 			mode,
// 			theme,
// 			onChange: this.onChange.bind(this),
// 			name: "UNIQUE_ID_OF_DIV",
// 			editorProps: {$blockScrolling: true},
// 			value: contents,
// 			enableBasicAutocompletion: true
// 		}

// 		const AceEditorGen = () => <AceEditor {...paneProps} />

// 		return <AceEditor {...paneProps} />
// 	}
// }

const EditorPane = (editor) => {

		const paneProps = {
			...editor,
			width: "100%",
			height: "100%",
			name: "UNIQUE_ID_OF_DIV",
			editorProps: {$blockScrolling: true},
			enableBasicAutocompletion: true,
			enableLiveAutocompletion: true
		}

	return <AceEditor {...paneProps} />
}

EditorPane.propTypes = {};

export default EditorPane;

// export default connect(({ editor }) => ({ editor }))(EditorPane);
