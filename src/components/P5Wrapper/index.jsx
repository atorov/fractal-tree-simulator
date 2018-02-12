import React, { Component } from "react";
import PropTypes from "prop-types";

import sketch from "./sketch.js";

class P5Wrapper extends Component {
  static propTypes = {
    plants: PropTypes.array.isRequired,
    getBranchesNum: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.canvas = new window.p5(sketch, "app-p5_container");
    setTimeout(() => this.canvas.pushProps({ ...this.props }), 1000);
  }

  componentWillReceiveProps(nextProps) {
    this.canvas.pushProps(nextProps);
  }

  render() {
    // console.log("::: P5Wrapper.props:", this.props);
    return <div id="app-p5_container" style={{ width: "fit-content", margin: "auto" }} />;
  }
}

export default P5Wrapper;
