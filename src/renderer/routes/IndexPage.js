
import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'dva';
import { remote } from 'electron';


import styles from './IndexPage.css';

import EditorPane from '../components/Editor/EditorPane';
import EditorSelectPane from '../components/Editor/EditorSelectPane';
import FileTree from '../components/FileTree/FileTree';
import Console from '../components/ProjFunc/Console';
import ProjMenu from '../components/ProjFunc/ProjMenu';
import Layout from '../components/Layout'
const { Footer, PaneGroup, Pane, TabGroup } = Layout

class IndexPage extends Component {

  constructor(props){
    super(props);
  }

  onChange( contents ){
    const {files: { current, tabs}, dispatch } = this.props;
    dispatch({
        type: 'files/changeFile',
        payload: { current, file: { contents }}
    });
  }

  componentWillReceiveProps(next){
    const {files: { current, tabs}, dispatch} = next;

    if(tabs.length){
      const file = tabs[current];
      if(file.mode != this.props.editor.mode){
        dispatch({
          type: 'editor/changeStatus',
          payload: { mode: file.mode },
        });
      }
    }

  }

  render(){
    const { editor:{ theme }, files, cns, dispatch } = this.props

    const tabComponents = files.tabs.map( (it, i) => {
      const {title, mode, contents} = it;
      const editorPaneProps = {
          theme,
          mode,
          value: contents,
          onChange: this.onChange.bind(this)
      }
      const comp = <EditorPane {...editorPaneProps} />
      return {
        title,
        comp,
      }
    })

    const tabProps = {
      tabComponents,
      activeIndex: files.current,
      onSelectItem: (current) => {
        dispatch({
          type: 'files/changeStatus',
          payload: { current }
        })
      },
      onCloseItem: (current) => {
        dispatch({
          type: 'files/closeFile',
          payload: { current }
        })
      }
    }

    const cnsComp = cns.show ? <Console /> : null;

    return (
      <div className={styles.window}>
      	<div className={styles['window-content']}>
      		<PaneGroup>
      			<Pane className='sidebar'><FileTree /></Pane>
            <TabGroup {...tabProps}/>
      		</PaneGroup>
      	</div>
        { cnsComp }
      	<Footer><EditorSelectPane /><ProjMenu /></Footer>
      </div>
    );
  }
}

export default connect(({ editor, files, cns }) => ({ editor, files, cns }))(IndexPage);


