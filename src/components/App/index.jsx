/* global $ */

import React, { Component } from "react";
import ControlPanel from "../ControlPanel/";
import Header from "../Header/";
import P5Wrapper from "../P5Wrapper/";
import config from "../../lib/config/";
import { getPlant } from "../../lib/sliders/";

export default class App extends Component {
  constructor() {
    super();

    const plants = [];
    for (let i = 0; i < config.plantNum; i++) {
      plants.push({ ...getPlant() });
    }

    this.state = {
      p5Props: {
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

  onSliderChange = (key) => (event) => {
    const plants = $.extend(true, [], this.state.p5Props.plants);
    plants.forEach((plant) => plant[key] = +event.target.value);
    this.setState({ p5Props: { ...this.state.p5Props, plants } });
  }

  // Main renderer -------------------------------------------------------------
  render() {
    return (
      <div className="app">
        <Header />
        <div
          className="jumbotron"
          style={{ marginTop: "-8px", background: "rgb(120, 120, 120)" }}
        >
          {/* p5.js sketch ------------------------------------------------- */}
          <P5Wrapper
            {...this.state.p5Props}
            getBranchesNum={this.getBranchesNum}
          />

          {/* Control panel ------------------------------------------------ */}
          <ControlPanel
            plants={this.state.p5Props.plants}
            onSliderChange={this.onSliderChange}
          />
        </div>
      </div>
    );
  }
}
