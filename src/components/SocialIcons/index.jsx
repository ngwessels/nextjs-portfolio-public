//React
import React from "react";

//Redux
import { connect } from "react-redux";

class index extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/nathanael-wessels/"
            target="_blank"
          >
            <i className="fa fa-linkedin"></i>
          </a>
          <a href="https://github.com/ngwessels" target="_blank">
            <i className="fa fa-github"></i>
          </a>
        </div>
        <style jsx>{`
          .social-links {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width: 90%;
            max-width: 400px;
            margin: 20px;
            gap: 15px;
            flex-wrap: wrap;

            /* LinkedIn Button */
            a:first-child {
              background: linear-gradient(135deg, #0077b5 0%, #005885 100%);
              box-shadow: 0 4px 15px rgba(0, 119, 181, 0.3);

              &:hover {
                background: linear-gradient(135deg, #005885 0%, #004471 100%);
                box-shadow: 0 8px 25px rgba(0, 119, 181, 0.4);
                transform: translateY(-3px) scale(1.05);
              }

              &:active {
                transform: translateY(-1px) scale(1.02);
              }
            }

            /* GitHub Button */
            a:last-child {
              background: linear-gradient(135deg, #333 0%, #24292e 100%);
              box-shadow: 0 4px 15px rgba(51, 51, 51, 0.3);

              &:hover {
                background: linear-gradient(135deg, #24292e 0%, #1a1e22 100%);
                box-shadow: 0 8px 25px rgba(51, 51, 51, 0.4);
                transform: translateY(-3px) scale(1.05);
              }

              &:active {
                transform: translateY(-1px) scale(1.02);
              }
            }

            a {
              height: 50px;
              width: 120px;
              color: white;
              margin: 0;
              border-radius: 25px;
              border: 2px solid transparent;
              transition: all 0.3s ease;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              overflow: hidden;

              i {
                color: white;
                font-size: 24px;
                position: relative;
                z-index: 2;
                transition: color 0.3s ease;
              }

              &:hover i {
                color: white;
              }
            }
          }

          @media only screen and (max-width: 768px) {
            .social-links {
              gap: 12px;
              margin: 15px;

              a {
                height: 45px;
                width: 100px;

                i {
                  font-size: 22px;
                }
              }
            }
          }

          @media only screen and (max-width: 480px) {
            .social-links {
              gap: 10px;

              a {
                height: 40px;
                width: 80px;

                i {
                  font-size: 20px;
                }
              }
            }
          }
        `}</style>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(index);
