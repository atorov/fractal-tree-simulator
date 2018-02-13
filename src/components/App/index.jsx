/* global $ */

import React, { Component } from "react";
import ControlPanel from "../ControlPanel/";
import Header from "../Header/";
import P5Wrapper from "../P5Wrapper/";
import config from "../../lib/config/";
import { getPlant } from "../../lib/sliders/";

export default class App extends Component {
  // Constructor ---------------------------------------------------------------
  constructor() {
    super();

    const plants = [];
    for (let i = 0; i < config.plantNum; i++) {
      plants.push({ ...getPlant() });
    }

    this.state = {
      p5Props: {
        status: "",
        plants,
      },
    };
  }

  // Event handlers ------------------------------------------------------------
  getBranchesNum = (index, num) => {
    const plants = $.extend(true, [], this.state.p5Props.plants);
    plants[index].branchesNum = num;
    this.setState({ p5Props: { ...this.state.p5Props, plants } });
  }

  onReady = () => this.setState({ status: "ready" });

  onSliderChange = (key) => (event) => {
    const plants = $.extend(true, [], this.state.p5Props.plants);
    plants.forEach((plant) => plant[key] = +event.target.value);
    this.setState({ p5Props: { ...this.state.p5Props, plants } });
  }

  // Main renderer -------------------------------------------------------------
  render() {
    return (
      <div className="app">
        {/* Header --------------------------------------------------------- */}
        <Header />

        {/* Main content --------------------------------------------------- */}
        <div
          className="jumbotron"
          style={{ marginTop: "-8px", background: "rgb(120, 120, 120)" }}
        >
          {/* p5.js sketch ------------------------------------------------- */}
          <P5Wrapper
            {...this.state.p5Props}
            getBranchesNum={this.getBranchesNum}
            onReady={this.onReady}
          />

          {/* Control panel ------------------------------------------------ */}
          <ControlPanel
            plants={this.state.p5Props.plants}
            onSliderChange={this.onSliderChange}
          />

          {/* Source code link --------------------------------------------- */}
          <br />
          <p style={{ textAlign: "center" }}>
            <a href="https://github.com/atorov/fractal-tree-simulator">
              <img border="0" alt="github logo" src="/img/github-logo.png" width="auto" height="28px" style={{ verticalAlign: "middle" }} />
            </a>
          </p>
        </div>
      </div>
    );
  }
}
