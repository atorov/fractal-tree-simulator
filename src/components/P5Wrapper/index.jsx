import React, { Component } from "react";
import PropTypes from "prop-types";

import sketch from "./sketch.js";

class P5Wrapper extends Component {
  static propTypes = {
    plants: PropTypes.array.isRequired,
    getBranchesNum: PropTypes.func.isRequired,
    onReady: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.canvas = new window.p5(sketch, "app-p5_container");
    this.canvas.setOnReady(this.props.onReady);
  }

  componentWillReceiveProps(nextProps) {
    this.canvas.pushProps(nextProps);
  }

  shouldComponentUpdate() { // just in case :)
    return false;
  }

  componentWillUnmount() {
    this.canvas.remove();
  }

  render() {
    // console.log("::: P5Wrapper.props:", this.props);
    return (
      <div
        id="app-p5_container"
        style={{ width: "100%", textAlign: "center" }}
      />
    );
  }
}

export default P5Wrapper;
