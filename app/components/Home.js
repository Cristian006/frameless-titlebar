// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import styles from './Home.css';

const ToolBar = styled.div`
  height: 50px;
  background-color: #24292e;
  line-height: 50px;
  padding 0 1vw;
`;

export default class Home extends Component {
  render() {
    return (
      <div>
        <ToolBar>
          <div style={{ fontSize: '0.8em' }}>Electron TitleBar</div>
        </ToolBar>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link style={{ color: '#cadef3' }} to="/counter">Example Application</Link>
        </div>
      </div>
    );
  }
}
