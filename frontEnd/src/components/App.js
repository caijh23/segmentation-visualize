import React, { Component } from 'react';
import { Layout } from 'antd';
import '../css/App.css';
import RightPart from '../containers/RightPart'
import LeftPart from '../containers/LeftPart'


class App extends Component {
  render() {
    return (
      <Layout className="App">
        <LeftPart />
        <RightPart />
      </Layout>
    );
  }
}

export default App;
