import React from "react";
import "./Map.scss";
import Obstacles from "./Obstacles";
import Character from "./Character";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xC: 1.5,
      yC: 4.05,
      canJump: true,
      transition: true,
      xO: 12,
      yO: 4.05
    };
    this.loopObstacle();
  }

  carte = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  loopObstacle() {
    if (this.state.xO === -2) {
      this.setState({
        xO: this.state.xO + 15,
        transition: false
      });
    } else {
      this.setState({
        xO: this.state.xO - 1,
        transition: true
      });
    }
    setTimeout(this.loopObstacle.bind(this), 250);
  }

  componentDidMount() {
    window.onkeydown = event => {
      this.getInput(event);
    };
  }

  getInput = event => {
    const key = event.code;
    if (key === "Space" && this.state.canJump) {
      this.setState({
        yC: 3,
        canJump: false
      });
      setTimeout(() => {
        this.setState({
          yC: 4.05
        });
      }, 300);
      setTimeout(() => {
        this.setState({
          canJump: true
        });
      }, 600);
    }
  };

  render() {
    return (
      <div className="map">
        {this.carte.map(row =>
          row.map(column => {
            return <div></div>;
          })
        )}
        <Character x={this.state.xC} y={this.state.yC} />
        <Obstacles
          x={this.state.xO}
          y={this.state.yO}
          transition={this.state.transition}
        />
      </div>
    );
  }
}

export default Map;
