import React, {Component} from 'react';
import { connect } from 'dva';
import {Treebeard} from 'react-treebeard';
import { remote } from 'electron'
import { mapToMode } from '../../utils'

class FileTree extends Component {

  constructor(props){
    super(props);
    this.state = {
      cursor: props.list
    };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(node, toggled){
    const { dispatch } = this.props;

    if(this.state.cursor){
      this.state.cursor.active = false;
    }

    node.active = true;

    if(node.children){
      node.toggled = toggled;
    }else{
      // console.log(node)
      dispatch({
        type: 'files/openFile',
        payload: {
          path: node.path,
        }
      });

    }

    this.setState({ cursor: node });
  }

  render(){
    const {files: { treeList }, dispatch} = this.props

    return <Treebeard data={ treeList } onToggle={this.onToggle} />
  }
}

FileTree.propTypes = {};

export default connect(({ files }) => ({ files }))(FileTree);
