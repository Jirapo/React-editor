import React, { Component } from 'react';
import Pane from './Pane';
import PaneGroup from './PaneGroup';
import TabItem from './TabItem';
import styles from './Layout.css';

class TabGroup extends Component {
  constructor(props){
    super(props);
  }


  render(){
    const { tabComponents, activeIndex, onSelectItem, onCloseItem } = this.props;
    const tabItems = tabComponents.map((it, i) =>
        <TabItem
          key={i}
          index={i}
          title={it.title}
          className={ activeIndex == i ? 'active' : ''}
          onSelectItem={onSelectItem}
          onCloseItem={onCloseItem}
        />
      )

    const tabPanes = tabComponents.map((it, i) =>
        <Pane
          className={ activeIndex != i ? 'hide' : ''}
          key={i}>{it.comp}</Pane>
      )

    return(
      <div className={styles['window-content']}>
        <div className={styles.tabgrp}>
          {tabItems}
        </div>
        <PaneGroup style={{marginTop: 25}}>
        {tabPanes}
        </PaneGroup>
      </div>
    )
  }
}
// const TabGroup = (props) => <div className={styles.tabgrp}>{props.children}</div>

TabGroup.propTypes = {};

export default TabGroup
