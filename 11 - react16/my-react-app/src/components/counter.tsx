/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from "react";
// import { Component } from 'react';

interface Props {}

interface State {}

class Counter extends React.Component<Props, State> {
  render() {
    return (
      <React.Fragment>
        <h1>Hello World</h1>
        <button>Increment</button>
      </React.Fragment>
    );
  }
}

export default Counter;
