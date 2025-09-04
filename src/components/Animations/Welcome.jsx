//React
import React from "react";

//Redux
import { connect } from "react-redux";

//Gsap
import SlowMo, {
  TweenMax,
  Power0,
  Power2,
  Power4,
  Power1,
  Elastic,
  gsap,
  TweenLite,
  TimelineMax,
  Power3
} from "gsap";
gsap.registerPlugin();
import $ from "jquery";

class index extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      display: true
    };
  }

  componentDidMount() {
    this.setup();
  }

  setup = () => {
    const played = localStorage.getItem("animation");
    var quotes = [
      "Hi I'm Nate, I am a Full-Stack Developer located in Forest Grove, Oregon"
    ];
    if (!played) {
      $(".quote").html(quotes[Math.floor(Math.random() * quotes.length)]);
      TweenLite.fromTo(
        ".quote",
        0.7,
        {
          y: "-20px"
        },
        {
          y: "0",
          ease: Power2.easeOut
        }
      );

      var aboutAnimation = new TimelineMax();
      aboutAnimation
        .set(".load", { opacity: 0 })
        .to(".load", 3.5, {
          opacity: 1,
          y: "-40%"
        })
        .to(".load", 0.25, {
          autoAlpha: 0
        })
        .from(".aboutAni", 1, {
          scale: 1,
          autoAlpha: 0,
          y: "20px",
          width: "100px",
          height: "20px",
          ease: Elastic.easeOut.config(1, 0.5)
        })
        .from(".text-design", 0.3, {
          autoAlpha: 0,
          y: "-20px",
          ease: Power3.easeOut
        })
        .from(".head", 0.5, {
          autoAlpha: 0,
          y: "-20px",
          ease: Power3.easeOut
        })
        .staggerFrom(
          ".box",
          0.5,
          {
            autoAlpha: 0,
            y: "-20px",
            ease: Power3.easeOut
          },
          ".15",
          "-=.3"
        )
        .to(".text-design", 0.3, {
          display: "none",
          autoAlpha: 0,
          y: "20px",
          ease: Power3.easeIn,
          delay: 0.5
        })
        .to(".design", 0.5, {
          autoAlpha: 0,
          y: "20px",
          ease: Power3.easeIn,
          display: "none"
        })
        .to(
          ".aboutAni",
          1,
          {
            scale: ".3",
            rotation: "360deg",
            ease: Power3.easeIn
          },
          "-=.5"
        )
        .to(".aboutAni", 1, {
          scale: "1",
          rotation: "720deg",
          ease: Power3.easeOut
        })
        .from(
          ".text-develop",
          0.3,
          {
            display: "none",
            autoAlpha: 0,
            y: "-20px",
            ease: Power3.easeOut
          },
          "-=.5"
        )
        .from(
          ".develop",
          0.5,
          {
            autoAlpha: 0,
            ease: Power3.easeOut
          },
          "-=1"
        )
        .from(
          ".sidebar",
          0.5,
          {
            autoAlpha: 0,
            ease: Power3.easeOut,
            x: "-20px"
          },
          "-=.3"
        )
        .staggerFrom(
          ".line",
          0.3,
          {
            autoAlpha: 0,
            y: "-20px",
            ease: Power4.easeOut
          },
          ".15",
          "-=.3"
        )
        .to(".text-develop", 0.3, {
          display: "none",
          autoAlpha: 0,
          y: "20px",
          ease: Power3.easeIn,
          delay: 0.7
        })
        .to(
          ".develop",
          0.5,
          {
            autoAlpha: 0,
            y: "20px",
            ease: Power3.easeIn
          },
          "-=.3"
        )
        .to(".aboutAni", 1, {
          borderRadius: "25px",
          width: "50px",
          height: "50px",
          top: "50%",
          y: "-50%",
          ease: Elastic.easeInOut.config(1, 0.75)
        })
        .to(
          ".aboutAni",
          0.3,
          {
            autoAlpha: 0
          },
          "-=.3"
        )
        .fromTo(
          ".browser",
          1,
          {
            autoAlpha: 0,
            scale: 0.5
          },
          {
            autoAlpha: 1,
            scale: 1,
            y: "-50%",
            borderRadius: "50%",
            ease: Elastic.easeOut.config(1, 0.75)
          },
          "-=1"
        )
        .to(
          ".browser",
          1,
          {
            width: "100%",
            height: "210px",
            borderRadius: "5px",
            delay: 1,
            ease: Elastic.easeOut.config(1, 0.75)
          },
          "-=.5"
        )
        .fromTo(
          ".text-screen",
          0.3,
          {
            autoAlpha: 0,
            y: "-10px"
          },
          {
            autoAlpha: 1,
            y: "0"
          },
          "-=.5"
        )
        .to(".icon", 0.3, {
          autoAlpha: 0,
          display: "none",
          ease: Power3.easeIn
        })
        .fromTo(
          ".header",
          0.3,
          {
            autoAlpha: 0,
            y: "-10px"
          },
          {
            autoAlpha: 1,
            y: "0"
          }
        )
        .to(".header, .body", 0.3, {
          autoAlpha: 0,
          y: "10px",
          display: "none",
          delay: 1.2
        })
        .to(".browser", 1, {
          width: "200px",
          ease: Elastic.easeOut.config(1, 0.75)
        })
        .fromTo(
          ".tablet",
          0.3,
          {
            autoAlpha: 0,
            y: "-10px"
          },
          {
            autoAlpha: 1,
            y: "0"
          },
          "-=.3"
        )
        .to(".tablet", 0.3, {
          autoAlpha: 0,
          y: "10px",
          display: "none",
          delay: 0.7
        })
        .to(".browser", 1, {
          width: "90px",
          height: "160px",
          ease: Elastic.easeOut.config(1, 0.75)
        })
        .fromTo(
          ".phone",
          0.3,
          {
            autoAlpha: 0,
            y: "-10px"
          },
          {
            autoAlpha: 1,
            y: "0"
          },
          "-=.5"
        )
        .to(".text-screen", 0.3, {
          autoAlpha: 0,
          y: "10px",
          display: "none",
          delay: 0.7
        })
        .fromTo(
          ".text-web",
          0.3,
          {
            autoAlpha: 0,
            y: "-10px"
          },
          {
            autoAlpha: 1,
            y: "0"
          }
        )
        .to(".phone", 0.3, {
          autoAlpha: 0,
          y: "10px",
          display: "none"
        })
        .to(".body", 0, {
          autoAlpha: 1,
          y: "0",
          display: "",
          height: "100%",
          padding: 0
        })
        .to(".browser", 0.5, {
          width: "10px",
          height: "10px",
          ease: Power3.easeIn
        })
        .to(".browser", 0.5, {
          width: "200px",
          height: "200px",
          borderRadius: "5px",
          ease: Elastic.easeOut.config(1, 0.75)
        })
        .fromTo(
          ".heart span",
          0.5,
          {
            autoAlpha: 0
          },
          {
            autoAlpha: 1,
            fontSize: "100px",
            ease: Elastic.easeOut.config(1, 0.75)
          }
        )
        .to(".heart", 0.3, {
          autoAlpha: 0,
          y: "10px",
          display: "none",
          delay: 0.7
        })
        .to(".text-web", 0.3, {
          autoAlpha: 0,
          y: "10px",
          display: "none"
        })
        .to(
          ".browser",
          1,
          {
            width: "200px",
            height: "60px",
            borderRadius: "5px",
            ease: Elastic.easeOut.config(1, 0.75)
          },
          "-=.5"
        )
        .fromTo(
          ".more",
          0.3,
          {
            alpha: 0,
            y: "10px",
            display: ""
          },
          {
            autoAlpha: 1,
            y: "10px"
          }
        )
        .to(".more", 0.3, {
          alpha: 0,
          y: "10px",
          display: "none",
          delay: 1
        })
        .to(".browser", 0, {
          maxWidth: "initial",
          maxHeight: "initial"
        })
        .to(".browser", 0.5, {
          opacity: 0,
          ease: Power4.easeOut
        })
        .set(".browser-wrap", {
          autoAlpha: 0,
          display: "none"
        })
        .set(".about", {
          autoAlpha: 0,
          y: "0",
          display: "",
          onComplete: () => {
            localStorage.setItem("animation", "true");
          }
        });
    } else {
      this.setState({ display: false });
    }

    $(window).resize(function () {
      $(".browser-height").height($(this).height());
    });
    $(window).resize();
  };

  render() {
    if (!this.state.display) return null;
    return (
      <div>
        <div className={"container"}>
          <div className="load">
            <span className="icon ion-50 ion-gear-a spin"></span>
            <div className="quote"></div>
          </div>

          <div className="browser-wrap browser-height">
            <div className="text aboutText">
              <div className="text-design">I Love Designing</div>
              <div className="text-develop">and Developing</div>
            </div>

            <div className="aboutAni">
              <div className="design">
                <div className="head"></div>
                <div className="box-contain">
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box box-large"></div>
                </div>
              </div>
              <div className="develop">
                <div className="sidebar"></div>
                <div className="codebar">
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                  <br />
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                  <br />
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
              </div>
            </div>

            <div className="text">
              <div className="text-screen">I create for all screen sizes.</div>
              <div className="text-web">
                I love creating amazing experiences.
              </div>
            </div>

            <div className="browser">
              <div className="icon">
                <span className="ion-40 ion-ios-world"></span>
              </div>

              <div className="header">
                <span className="back ion-20 ion-arrow-left-b"></span>
                <span className="right">
                  <span className="ion-record"></span>
                  <span className="ion-record"></span>
                  <span className="ion-record"></span>
                </span>
              </div>
              <div className="body">
                <div className="heart">
                  <span className="ion-heart"></span>
                </div>
                <div className="more">
                  <span className="spin ion-30 ion-load-c" /> Initializing
                </div>
              </div>

              <div className="tablet">
                <span className="ion-30 ion-ios-circle-filled"></span>
              </div>
              <div className="phone"></div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @for $i from 20 through 50 {
            .ion-#{$i} {
              font-size: $i + px;
            }
          }

          $percent-light: 5%;
          $percent: 10%;
          $percent-strong: 15%;

          $primary: #e74c3c;
          $primary-lighter: adjust($primary, $percent-strong);
          $primary-light: adjust($primary, $percent);
          $primary-dark: adjust($primary, $percent);
          $primary-darker: adjust($primary, $percent-strong);

          $secondary: #0087f7;
          $secondary-lighter: adjust($secondary, $percent-strong);
          $secondary-light: adjust($secondary, $percent);
          $secondary-dark: adjust($secondary, $percent);
          $secondary-darker: adjust($secondary, $percent-strong);

          $blue: #3498db;
          $red: #e74c3c;
          $yellow: #f1c40f;
          $teal: #2ecc71;
          $purple: #9b59b6;
          $green: #2ecc71;
          $turquoise: #1abc9c;

          $colors: (
            "blue": $blue,
            "red": $red,
            "yellow": $yellow,
            "teal": $teal,
            "purple": $purple,
            "green": $green,
            "turquoise": $turquoise
          );
          @each $color, $hex in $colors {
            .#{$color} {
              color: $hex;
            }
          }

          $white: #fff;
          $white-lighter: #fafafa;
          $white-light: #eee;
          $white-dark: #ccc;
          $white-darker: #999;

          $gray: #666;

          $black: #222;
          $black-lighter: adjust($black, $percent-strong);
          $black-light: adjust($black, $percent);
          $black-dark: adjust($black, $percent);
          $black-darker: adjust($black, $percent-strong);

          .container {
            max-width: 100vw;
            min-width: 100vw;
            padding: 0px;
            overflow-x: hidden;
            position: fixed;
            top: 0px;
            z-index: 10000000000000;
          }

          .element-invisible {
            border: 0;
            clip: rect(0 0 0 0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
          }

          .element-invisible.element-focusable:active,
          .element-invisible.element-focusable:focus {
            clip: auto;
            height: auto;
            margin: 0;
            overflow: visible;
            position: static;
            width: auto;
          }

          .animate {
            transition: all 0.2s ease;
          }

          .tac {
            text-align: center;
          }

          %hide-text {
            text-indent: 100%;
            white-space: nowrap;
            overflow: hidden;
          }

          .hide-text {
            display: block;
            @extend %hide-text;
          }

          .hidden {
            display: none !important;
          }

          .spin:before {
            animation: spin 3s linear 0s infinite;
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          .btn {
            display: inline-block;
            text-align: center;
            padding: 1em 1.5em;
            background: $primary;
            text-transform: uppercase;
            border-radius: 5px;
            font-weight: bold;
            &:hover {
              background: $primary-dark;
            }
            &:active {
              background: $primary-darker;
            }
          }

          a.btn {
            color: $white;
            &:hover {
              color: $white;
            }
          }

          html {
            box-sizing: border-box;
            font-size: 62.5%;
            height: 100%;
          }

          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }

          body {
            font-size: 16px;
            font-family: "Lato", sans-serif;
            background: $white-lighter;
            height: 100%;
            position: relative;
          }

          a {
            text-decoration: none;
            &:hover,
            &:focus {
              text-decoration: none;
            }
          }

          a,
          input {
            transition: all 0.2s ease;
          }

          a,
          input,
          button,
          textarea,
          select {
            outline: none;
            box-shadow: none;
          }

          p {
            line-height: 1.7;
          }

          .browser-wrap {
            position: relative;
            width: 100%;
            background-image: radial-gradient(
              circle farthest-corner at center,
              #22211f 0%,
              #22211f 100%
            );
          }

          .browser {
            display: inline-block;
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            margin: 0 auto;
            background: $white-light;
            max-width: 550px;
            max-height: 300px;
            width: 80px;
            height: 80px;
            overflow: hidden;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba($black, 0.5);
            .icon {
              display: table;
              width: 100%;
              height: 100%;
              text-align: center;
              span {
                display: table-cell;
                vertical-align: middle;
                color: $gray;
              }
            }

            .header,
            .body {
              padding: 0.5em 1em;
            }

            .header {
              background: $white-dark;
              color: $white-darker;
              .right {
                float: right;
              }
            }

            .tablet {
              text-align: center;
              // border: 1px solid $white-darker;
              color: $white-darker;
              background: $white-dark;
              margin: 10px 10px 0;
              height: 75%;
              position: relative;
              span {
                position: absolute;
                bottom: -38px;
                left: 0;
                right: 0;
                text-align: center;
              }
            }

            .phone {
              background: $white-dark;
              margin: 10px 0;
              height: 80%;
              span {
                position: absolute;
                bottom: -28px;
                left: 0;
                right: 0;
                text-align: center;
              }
            }
          }

          .aboutAni {
            max-width: 250px;
            width: 100%;
            height: 300px;
            position: absolute;
            margin: auto;
            top: 50%;
            left: 0;
            right: 0;
            overflow: hidden;
            background: $white-light;
            z-index: 2;
            transform: translateY(-50%);
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba($black, 0.5);
          }

          .design {
            .head {
              margin-bottom: 1em;
              width: 100%;
              height: 100px;
              background: $white-dark;
            }

            .box-contain {
              margin: 0 auto;
              width: 245px;
              text-align: center;
            }

            .box {
              display: inline-block;
              margin: 5px 5px 5px;
              width: 20%;
              height: 50px;
              background: $white-dark;
            }

            .box-large {
              width: 70%;
              height: 60px;
            }
          }

          .develop {
            height: 100%;
            background: $white-darker;
            .sidebar {
              width: 30%;
              height: 100%;
              float: left;
              background: $white-light;
            }

            .codebar {
              width: 70%;
              height: 100%;
              padding: 1em;
              float: right;
            }

            .line {
              margin-bottom: 15px;
              width: 100%;
              height: 7px;
              background: $white;
            }
          }
          .heart {
            text-align: center;
            height: 100%;
            span {
              display: inherit;
              position: relative;
              top: 50%;
              color: $red;
              transform: translateY(-50%);
            }
          }

          .more {
            color: $gray;
            top: 50%;
            font-weight: bold;
            text-transform: uppercase;
            white-space: nowrap;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              margin-right: 5px;
              color: $white-darker;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }

          .load {
            z-index: 1;
            position: absolute;
            left: 0;
            right: 0;
            top: 50%;
            margin: auto;
            max-width: 500px;
            color: $white;
            text-align: center;
            transform-style: preserve-3d;
            transform: translateY(-50%);
            .quote {
              margin-top: 1em;
              font-size: 23px;
              font-weight: lighter;
              color: $white-dark;
            }
          }

          .text {
            position: absolute;
            top: 50%;
            bottom: 0;
            margin-top: -150px;
            width: 100%;
            color: $white-darker;
            text-align: center;
            text-transform: uppercase;
            font-weight: bold;
          }

          .aboutText {
            margin-top: -200px;
            div {
              display: inline-block;
            }
          }
        `}</style>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.pageLoading
});

export default connect(mapStateToProps)(index);
