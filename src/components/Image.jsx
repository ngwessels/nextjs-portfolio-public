import React from "react";
import { default as NextImage } from "next/image";
import clsx from "clsx";

class Image extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  componentDidMount() {}
  onLoadCallback = () => {
    if (this.state.isReady) return;
    this.setState({ isReady: true });
    typeof this.props.onLoad === "function" && this.props.onLoad();
  };

  render() {
    return (
      <div
        className={clsx([
          "opacity-0 transition-opacity duration-400",
          { "opacity-100": this.state.isReady },
          this.props.className
        ])}
      >
        <NextImage {...this.props} onLoadingComplete={this.onLoadCallback} />
      </div>
    );
  }
}

export default Image;
