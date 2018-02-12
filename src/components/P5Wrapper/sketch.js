/* globals $ */

export default function sketch(p) {
  // Methods -------------------------------------------------------------------
  p.pushProps = function (_props) {
    props = _props;
    p.loop();
  }

  // Private members -----------------------------------------------------------
  let props = {};
  let plants = [];

  // Private classes -----------------------------------------------------------
  class Plant {
    constructor(width, height, play, id) {
      this.pg = p.createGraphics(width, height);
      this.pg.colorMode(p.HSB, 360, 100, 100, 1.0);
      this.play = play;
      this.id = id;
    }

    render(cfg) {
      const pg = this.pg;
      const {
        brightness,
        gamma,
        hue,
        recursionDepth, randomization,
        saturation, size
      } = cfg;

      this.branchesCounter = 0;
      this.noiseOffset = (p.frameCount + this.id * 20);

      pg.clear();
      pg.background(0, 0);

      pg.translate(pg.width / 2, pg.height - size / 6); // mark the bottom center of pg
      pg.ellipseMode(p.CENTER); pg.noStroke(); pg.fill(hue, saturation, 100 * brightness, 0.1);
      pg.ellipse(0, 0, size * 1.5, size / 2);
      pg.resetMatrix();

      pg.translate(pg.width / 2, pg.height - size / 6); // move to the bottom center of pg
      // pg.translate(pg.width / 2, pg.height / 2 ); // move to the center of pg

      const deltaGammaNoise = (this.play ? (p.noise(this.noiseOffset / 150 + 4000) - 0.5) * 2 : 0) * gamma;

      const sizeNoise = 1 - p.noise(this.id + 1 * 10, this.branchesCounter * 10) ** (randomization + 2);
      const scaledSize = size * sizeNoise;
      const dir = pg.createVector(0, -1) // v(0, -1) -> grow to top
        .setMag(scaledSize).rotate(gamma + deltaGammaNoise);

      this.renderBranch(dir, recursionDepth, cfg);
      pg.resetMatrix();
    }

    renderBranch(dir, depth, cfg) {
      const pg = this.pg;
      const {
        alpha,
        branchMinLength, brightness,
        decCoeffA, decCoeffB,
        deltaAlpha, deltaBeta,
        hue,
        randomization, recursionDepth,
        saturation,
        thickness,
      } = cfg;

      this.branchesCounter++;

      const size = dir.mag();
      const sizeNoise = 1 - p.noise(this.id + 1 * 10, this.branchesCounter * 10) ** randomization;
      const scaledSize = size * sizeNoise;
      const rescaledDir = dir.copy().setMag(scaledSize);

      pg.stroke(hue, saturation, (recursionDepth - depth) / recursionDepth * 100 * brightness, depth / recursionDepth + 0.33);
      pg.strokeWeight((depth + 1) * thickness);
      pg.line(0, 0, rescaledDir.x, rescaledDir.y);
      // pg.noFill(); pg.ellipse(rescaledDir.x, rescaledDir.y, 5);

      if (depth > 0 && scaledSize >= branchMinLength) {
        const alphaNoise = (this.play ? (p.noise(this.noiseOffset / 110 + 1000) - 0.5) * 2 : 0) * alpha;
        const deltaAlphaNoise = (this.play ? (p.noise(this.noiseOffset / 60 + 2000) - 0.5) * 2 : 0) * deltaAlpha;
        const deltaBetaNoise = (this.play ? (p.noise(this.noiseOffset / 60 + 3000) - 0.5) * 2 : 0) * deltaBeta;


        pg.push();
        pg.translate(rescaledDir.x, rescaledDir.y);
        const newDirA = rescaledDir.copy().setMag(scaledSize * decCoeffA)
          .rotate(alpha + alphaNoise + deltaAlpha + deltaAlphaNoise);
        this.renderBranch(newDirA, depth - 1, cfg);
        pg.pop()

        pg.push();
        pg.translate(rescaledDir.x, rescaledDir.y);
        const newDirB = rescaledDir.copy().setMag(scaledSize * decCoeffB)
          .rotate(-alpha - alphaNoise + deltaBeta + deltaBetaNoise);
        this.renderBranch(newDirB, depth - 1, cfg);
        pg.pop()
      }
    }
  }

  // Lifecycle methods =========================================================
  // preload() -----------------------------------------------------------------
  p.preload = function() {}

  // setup() -------------------------------------------------------------------
  p.setup = function() {
    // console.log("::: setup() props:", props);

    p.createCanvas(800, 300);
    p.colorMode(p.RGB, 255, 255, 255, 1.0);
    p.pixelDensity(1);
    p.frameRate(15);
    p.noLoop();

  }

  // draw() --------------------------------------------------------------------
  p.draw = function() {
    // console.log("::: draw() props:", props);

    if (!plants.length && !$.isEmptyObject(props)) {
      console.log("::: draw()/init props:", props);
      props.plants.forEach((_, index) => plants.push(new Plant(500, 300, !(index % 1), index)));
    }
    else if (plants.length && !$.isEmptyObject(props)) {
      // console.log("::: draw()/loop props:", props);
      p.background(120, 120, 120);

      plants.forEach((plant, index) => {
        const plantProps = props.plants[index];
        plant.render(plantProps);
        const x = p.width / (plants.length + 1) * (index + 1);
        const y = p.height / 2;
        p.imageMode(p.CENTER); p.image(plant.pg, x, y);

        if (!(p.frameCount % (60 + index)) && p.frameCount) {
          props.getBranchesNum(index, plant.branchesCounter);
        }
      });
    }

    // p.noLoop();
  }
}
