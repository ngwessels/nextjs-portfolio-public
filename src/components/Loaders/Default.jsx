//React
import React from "react";

//Redux
import { connect } from "react-redux";

class index extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    if (this.props.loading === true || this.props.override === true)
      this.setState({ loading: true });
  }

  componentDidUpdate(prevProps) {
    let prevObject = { ...prevProps },
      currentObject = { ...this.props };
    delete prevObject.children;
    delete prevObject.dispatch;
    delete currentObject.children;
    delete currentObject.dispatch;
    const prev = JSON.stringify(prevObject);
    const current = JSON.stringify(currentObject);
    if (prev !== current) {
      if (this.props.loading === true || this.props.override === true)
        this.setState({ loading: true });
      else this.setState({ loading: false });
    }
  }

  page = () => {
    if (true) {
      return (
        <div>
          <div className="loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <div className={"children"}>{this.props.children}</div>

          <style jsx>{`
            .top {
              width: 100vw;
              height: 100vh;
              z-index: 1;
              background-color: white;
              position: fixed;
            }
            .children {
              width: 100vw;
              min-height: 100vh;
              position: absolute;
              z-index: -1;
            }
            .loader {
              position: absolute;
              top: 50%;
              left: 50%;

              width: 200px;
              height: 200px;

              margin-top: -100px;
              margin-left: -100px;
            }

            /* The dot */
            .loader > .dot {
              position: absolute;
              top: 50%;
              left: 50%;
              z-index: 10;

              width: 160px;
              height: 100px;

              margin-top: -50px;
              margin-left: -80px;

              border-radius: 5px;

              background-color: #1e3f57;

              transform-type: preserve-3d;

              animation: dot1 3s cubic-bezier(0.55, 0.3, 0.24, 0.99) infinite;
            }

            .loader > .dot:nth-child(2) {
              z-index: 11;

              width: 150px;
              height: 90px;

              margin-top: -45px;
              margin-left: -75px;

              border-radius: 3px;

              background-color: #3c617d;

              animation-name: dot2;
            }

            .loader > .dot:nth-child(3) {
              z-index: 12;

              width: 40px;
              height: 20px;

              margin-top: 50px;
              margin-left: -20px;

              border-radius: 0 0 5px 5px;

              background-color: #6bb2cd;

              animation-name: dot3;
            }

            @keyframes dot1 {
              3%,
              97% {
                width: 160px;
                height: 100px;

                margin-top: -50px;
                margin-left: -80px;
              }
              30%,
              36% {
                width: 80px;
                height: 120px;

                margin-top: -60px;
                margin-left: -40px;
              }
              63%,
              69% {
                width: 40px;
                height: 80px;

                margin-top: -40px;
                margin-left: -20px;
              }
            }

            @keyframes dot2 {
              3%,
              97% {
                width: 150px;
                height: 90px;

                margin-top: -45px;
                margin-left: -75px;
              }
              30%,
              36% {
                width: 70px;
                height: 96px;

                margin-top: -48px;
                margin-left: -35px;
              }
              63%,
              69% {
                width: 32px;
                height: 60px;

                margin-top: -30px;
                margin-left: -16px;
              }
            }

            @keyframes dot3 {
              3%,
              97% {
                width: 40px;
                height: 20px;

                margin-top: 50px;
                margin-left: -20px;
              }
              30%,
              36% {
                width: 8px;
                height: 8px;

                margin-top: 49px;
                margin-left: -5px;

                border-radius: 8px;
              }
              63%,
              69% {
                width: 16px;
                height: 4px;

                margin-top: -37px;
                margin-left: -8px;

                border-radius: 10px;
              }
            }
          `}</style>
        </div>
      );
    } else {
      return <div style={{ minHeight: "100vh" }}>{this.props.children}</div>;
    }
  };

  render() {
    return <div>{this.page()}</div>;
  }
}

const mapStateToProps = (state) => ({
  loading: state.pageLoading,
});

export default connect(mapStateToProps)(index);
