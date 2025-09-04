//React
import React from "react";

//Redux
import { connect } from "react-redux";

//Nextjs
import dynamic from "next/dynamic";
import Link from "next/link";

//Components

class index extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      technologies: [
        "JavaScript 6 yrs",
        "ES6 6 yrs",
        "ReactJS 6 yrs",
        "React Native 5+yrs",
        "HTML 6 yrs",
        "C# 4 yrs",
        "C++ 4 yrs",
        ".NET 4 yrs",
        "Python 6 yrs",
        "Expo",
        "Stripe",
        "jQuery",
        "NoSQL",
        "MongoDB",
        "NextJS",
        "AngularJS",
        "NodeJS",
        "Express",
        "Vercel",
        "Firebase",
        "AWS",
        "Bootstrap",
        "Material UI",
        "SCSS",
        "CSS"
      ]
    };
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <section className="hero" id="welcome-section">
          <article>
            <div className={"description"}>
              <p>I'm a software developer in Forest Grove, Oregon.</p>
              <p>
                I recently worked for{" "}
                <Link href={"https://www.simpluris.com/"}>Simpluris</Link> as a
                Software Developer making websites for Class Action Lawsuits and
                internal technologies.
              </p>
            </div>
            <div className="big-text">
              Nate
              <br />
              Wessels
            </div>



            <div className="small-text">
              JavaScript
              <br />
              React
              <br />
              React Native
              <br />
              NextJs
              <br />
            </div>
          </article>
        </section>
        <div className={"outer-description"}>
          <p>I'm a developer in Forest Grove, Oregon.</p>
          <p>
          I recently worked for{" "}
            <Link href={"https://www.simpluris.com/"}>Simpluris</Link> as a
            Software Developer making websites for Class Action Lawsuits and
            internal technologies.
          </p>
        </div>


        <style jsx>{`


          .outer-description {
            padding: 20px;
            font-size: 1.4rem;
            font-weight: 300;
            transition: 2s;
            color: #22211f;
            display: none;
            width: 100%;

            @media only screen and (max-width: 768px) {
              display: block;
            }
          }
          section.hero {
            min-height: 50vh;
            background: #222;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            min-width: 100vw;
            margin: 0 auto 0;
            z-index: 1000000;
            article {
              display: flex;
              flex-direction: column-reverse;
              justify-content: space-between;
              width: 100%;
              margin: 0 auto;
              div {
                // flex: 1;
                width: 100%;
              }
            }

            div {
              padding: 20px;
              background: url("/backgrounds/header.jpg") fixed center no-repeat;
              background-size: cover;
              filter: brightness(1.3) contrast(1.1);
              color: #27999d;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;

              &:last-of-type {
                text-align: right;
              }
            }
          }
          .big-text {
            margin: 0;
            font-size: 6rem;
            line-height: 6rem;
            font-weight: 600;
          }


          .description {
            margin: 0;
            font-size: 1.4rem;
            font-weight: 300;
            transition: 2s;
            color: white;
            &:hover {
              opacity: 1;
              color: #64b2b1;
            }
            @media only screen and (max-width: 768px) {
              display: none;
            }
          }


          .small-text {
            margin: 0;
            font-size: 3rem;
            font-weight: 300;
            transition: 2s;

            &:hover {
              opacity: 1;
              color: #64b2b1;
            }
          }
        `}</style>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(index);
