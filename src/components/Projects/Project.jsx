//React
import React from "react";

//Redux
import { connect } from "react-redux";

//Next.js
import Image from "next/image";
import Link from "next/link";

//Image

//Functions
import f from "../../functions";
//Constants
import c from "../../constants"; //Constants used in redux

//components

class index extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const tech = {
      sass: "fab fa-sass",
      css: "fab fa-css3-alt",
      js: "fab fa-js-square",
      javascript: "fab fa-js-square",
      react: "fab fa-react",
      vue: "fab fa-vuejs",
      d3: "far fa-chart-bar",
      node: "fab fa-node",
      aws: "fab fa-aws",
      google: "fab fa-google",
      stripe: "fab fa-stripe",
      wordpress: "fab fa-wordpress",
      php: "fab fa-php",
      typescript: "fab fa-js-square",
      redux: "fas fa-layer-group",
      nextjs: "fas fa-code",
      dynamodb: "fas fa-database",
      dotnet: "fab fa-microsoft",
      divi: "fas fa-paint-brush",
      html: "fab fa-html5",
      expo: "fas fa-mobile-alt",
      firebase: "fas fa-fire",
      mongodb: "fas fa-database",
      livechat: "fas fa-comments"
    };

    const link = this.props.link || "http://";
    const repo = this.props.repo || "http://";
    return (
      <>
        <section>
          <div
            className={
              this.props.idx % 2 === 0 ? "project" : "project project-reverse"
            }
          >
            <Link href={link} legacyBehavior>
              <a
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="project-image"
                  src={this.props.img}
                  alt={"Screenshot of " + this.props.title}
                />
              </a>
            </Link>

            <div className="project-details">
              <div className="project-tile">
                <p className="icons">
                  {this.props.tech.split(" ").map((t) => (
                    <i className={tech[t]} key={t} />
                  ))}
                </p>
                {this.props.title}{" "}
              </div>
              {this.props.children}
              <div className="buttons">
                {this.props.repo ? (
                  <a href={repo} target="_blank" rel="noopener noreferrer">
                    View source <i className="fas fa-external-link-alt" />
                  </a>
                ) : null}
                {this.props.link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {this.props.linkText || "Try it Live"}{" "}
                    <i className="fas fa-external-link-alt" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <style jsx>{`
          /*****************
          *****************
            PROJECTS STYLES
          *****************
          *****************/

          section {
            min-height: 100px;
            font-size: 1.4rem;
            position: relative;
            background: transparent;
            background: linear-gradient(
              215deg,
              transparent 0%,
              transparent 100%
            );
            margin-top: 20px;
            z-index: 1;
          }

          section a,
          section a:visited {
            color: #f300b4;
          }

          section a:hover,
          section a:active {
            color: #252934;
          }

          /* Container */
          .projects-container {
            max-width: 1400px;
            margin: 0 auto;
            width: 100%;
            padding: 12rem 2rem 8rem;
          }

          /* Heading */
          .heading .title {
            text-align: center;
            font-size: 2.4rem;
            line-height: 2.4rem;
          }

          .heading .separator {
            background: #f300b4;
            width: 150px;
            height: 2px;
            margin: 1rem auto;
          }

          .heading .subtitle {
            font-size: 1.4rem;
            text-align: center;
            width: 70%;
            margin: 0 auto;
            text-align: justify;
          }

          /* Single Project */
          .project {
            margin: 1rem auto;
            width: 95%;
            max-width: 1080px;
            padding: 2rem 1rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr;
            grid-template-areas: "image details";
            grid-gap: 2rem;
            box-sizing: border-box;
          }

          /* Single Project */
          .project-reverse {
            @media only screen and (min-width: 768px) {
              grid-template-areas: "details image";
            }
          }

          .project-reverse .project-details {
            @media only screen and (min-width: 768px) {
              grid-area: details;
            }
          }

          .project-reverse .project-link {
            @media only screen and (min-width: 768px) {
              grid-area: image;
            }
          }

          /* Project Image */
          .project .project-link {
            display: block;
            margin: auto 0;
            color: #252934;
            overflow: hidden;
            text-align: center;
            border-radius: 5%;
            border: 1px solid #fafafa;
            box-shadow: 0 20px 10px -10px #25293450;
            transition: 300ms;
          }

          .project .project-link:hover {
            box-shadow: 0 50px 15px -30px #25293450;
          }

          .project .project-link:hover > img {
            filter: saturate(1);
            transform: scale(1.05);
          }

          .project .project-image {
            width: 100%;
            height: auto;
            max-width: 100%;
            transform: scale(1.2);
            filter: saturate(0);
            transition: all 300ms;
          }

          /* Project Details */
          .project .project-details {
            margin: auto 0;
          }

          .project-details .project-tile {
            font-size: 2rem;
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 0;
            color: #22211f;
          }

          /* Icons */
          .project-details .icons {
            margin: 0;
            color: #252934;
          }

          .project-details .icons i {
            margin-right: 0.4rem;
            font-weight: normal;
            font-size: 1.4rem;
          }

          /* Text */
          .project-details small {
            font-style: italic;
          }

          .project-details p {
            margin: 1rem 0;
          }

          /* Buttons */
          .project-details .buttons {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin-top: 1.5rem;
          }

          .project-details .buttons a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.75rem 1.25rem;
            border-radius: 25px;
            border: 2px solid transparent;
            color: white;
            background: linear-gradient(135deg, #64b2b1 0%, #27999d 100%);
            font-size: 0.9rem;
            font-weight: 600;
            text-align: center;
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(100, 178, 177, 0.3);
            min-width: 140px;
            position: relative;
            overflow: hidden;
            z-index: 1;
          }

          .project-details .buttons a::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #27999d 0%, #64b2b1 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
            border-radius: 23px;
            z-index: -1;
          }

          .project-details .buttons a:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(100, 178, 177, 0.4);
          }

          .project-details .buttons a:hover::before {
            opacity: 0.3;
          }

          .project-details .buttons a:active {
            transform: translateY(0);
          }

          .project-details .buttons i {
            font-size: 0.8rem;
            vertical-align: middle;
            margin-left: 0.25rem;
            transition: transform 0.3s ease;
          }

          .project-details .buttons a:hover i {
            transform: translateX(3px);
          }

          @media only screen and (max-width: 1149px) {
            .project {
              grid-template-columns: 1fr 2fr;
            }
          }

          @media only screen and (max-width: 949px) {
            .project {
              grid-template-columns: 1fr;
            }
          }

          @media only screen and (max-width: 768px) {
            .project-details .buttons {
              flex-direction: column;
              gap: 0.5rem;
            }

            .project-details .buttons a {
              width: 100%;
              min-width: unset;
              padding: 0.875rem 1rem;
              font-size: 0.85rem;
            }
          }

          @media only screen and (max-width: 649px) {
            section {
              background: transparent;
            }
            .projects-container {
              padding: 8rem 1rem 6rem;
            }
            .project {
              padding: 1rem 0;
              grid-gap: 1rem;
            }

            .project-tile {
              font-size: 1.5rem;
            }

            .project-details p {
              font-size: 0.9rem;
            }
          }
        `}</style>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(index);
