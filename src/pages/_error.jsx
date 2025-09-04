//React
import React from "react";

//Redux
import { connect } from "react-redux";

//Next.js
import dynamic from "next/dynamic";
import Link from "next/link";

//Functions
import f from "../functions";

//Next.js Router
import { withRouter } from "next/router";

//components
const Loader = dynamic(() => import("./../components/Loaders/Default"));
const Footer = dynamic(() => import("./../components/Footer/index"));

class index extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = async () => {};
  render() {
    return (
      <>
        <Loader>
          <>
            <div className="container">
              <div className="gif">
                <img
                  src="https://i.postimg.cc/2yrFyxKv/giphy.gif"
                  alt="gif_ing"
                />
              </div>
              <div className="content">
                <h1 className="main-heading">This page is gone.</h1>
                <p>
                  ...maybe the page you're looking for is not found or never
                  existed.
                </p>
                <Link href="/" legacyBehavior>
                  <a>
                    <button>
                      Back to home <i className="far fa-hand-point-right"></i>
                    </button>
                  </a>
                </Link>
              </div>
            </div>
            <Footer />
            <style jsx>{`
              .container {
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }

              .gif {
                display: flex;
                justify-content: center;
              }

              .content {
                text-align: center;
                margin: 3rem 0;
              }

              .content .main-heading {
                font-size: 2.5rem;
                font-weight: 700;
              }
              p {
                font-size: 1.3rem;
                padding: 0.7rem 0;
              }

              button {
                padding: 1rem;
                border-radius: 15px;
                outline: none;
                border: none;
                background: #0046d4;
                color: #fff;
                font-size: 1.3rem;
                cursor: pointer;
              }
            `}</style>
          </>
        </Loader>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

export default withRouter(connect(mapStateToProps)(index));
