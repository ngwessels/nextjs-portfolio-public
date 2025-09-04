//React
import React from "react";

//Redux
import { connect } from "react-redux";

//Next
import { withRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

//Firebase
import { getAuth } from "firebase/auth";
const auth = getAuth();

//components
// const Social = dynamic(() => import("./../SocialIcons/index"));

class index extends React.Component {
  constructor() {
    super();
    this.state = {
      year: ""
    };
  }

  UNSAFE_componentWillMount = () => {
    const d = new Date();
    const year = d.getFullYear();
    this.setState({ year });
  };

  componentDidMount() {}

  nestedDesktopNav = (data) => {
    return (
      <li
        className={
          (this.props?.router?.route || "").indexOf(data.path) >= 0
            ? "navbar-dropdown active"
            : "navbar-dropdown"
        }
      >
        <Link href={data.isLink ? data.path : "#"} legacyBehavior>
          <a
            id={`${data.path}`}
            data-dropdown={`dropdown-${data.name}`}
            data-dropdown-layer={layer}
            className={"dropdown-toggler nav-menu-item-a"}
            style={{ cursor: data.isLink ? "pointer" : "default" }}
            rel={data?.internalOrExternal === "external" ? "noreferrer" : ""}
            onMouseOver={(e) => {
              let target = document.querySelector(
                "#" + e.target.dataset.dropdown
              );
              this.closeOtherDropdowns({
                target: e.target.dataset.dropdown,
                layer: e.target.dataset.dropdownLayer
              });
              if (target) {
                if (!target.classList.contains("show")) {
                  target.classList.add("show");
                }
              }
              this.setState({ dropdownIsOpen: true });
            }}
          >
            {data.name}
          </a>
        </Link>

        <ul
          className={
            layer > 0
              ? `dropdown-side-${side} dropdown-side`
              : `dropdown-${side} dropdown`
          }
          id={`dropdown-${data.name}`}
        >
          {data.data.map((item, index) => {
            if (item.type === "link") {
              return (
                <div key={`${data.name}-${item.name}`}>
                  <li>
                    {!item.internalOrExternal ||
                    item.internalOrExternal === "internal" ? (
                      <div className={"nav-menu-item-a"}>
                        <Link href={item.path} legacyBehavior>
                          <a>{item.name}</a>
                        </Link>
                      </div>
                    ) : (
                      <div className={"nav-menu-item-a"}>
                        <a href={item.path} target="_blank" rel="noreferrer">
                          {item.name}
                        </a>
                      </div>
                    )}
                  </li>
                  <li className="separator"></li>
                </div>
              );
            } else if (item.type === "dropdown") {
              return (
                <div key={`${data.name}-${item.name}`}>
                  {this.nestedDesktopNav(item, layer + 1, side)}
                </div>
              );
            } else return null;
          })}
        </ul>
      </li>
    );
  };

  render() {
    return (
      <footer
        style={{
          width: "100vw",
          zIndex: 100000000,
          maxWidth: "100vw",
          overflow: "hidden",
          bottom: 0
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          {/* Footer Code Snippets */}
          <div className="footer-code-snippet">git commit -m "footer"</div>
          <div className="footer-code-snippet">npm run build</div>
          <div className="footer-code-snippet">docker deploy</div>

          <div className="row footer-row">
            {Object.keys(this.props.navigation).map((idx) => {
              const item = this.props.navigation[idx];

              if (item.type === "dropdown") {
                return (
                  <div className={"col-3 footer-column"} key={`Link-${idx}`}>
                    <div className="link-cat">
                      <span className="footer-toggle"></span>
                      <span className="footer-cat">{item.name}</span>
                    </div>
                    <ul className="footer-cat-links">
                      {Object.keys(item.data).map((idx2) => {
                        const item2 = item.data[idx2];
                        if (item2.internalOrExternal === "internal") {
                          return (
                            <li key={`Link-${idx}-Dropdown-${idx2}`}>
                              <Link href={item2.path} legacyBehavior>
                                <a>
                                  <span>{item2.name}</span>
                                </a>
                              </Link>
                            </li>
                          );
                        } else {
                          return (
                            <li key={`Link-${idx}-Dropdown-${idx2}`}>
                              <a
                                href={item2.path}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <span>{item2.name}</span>
                              </a>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                );
              } else {
                return (
                  <div className={"col-3 footer-column"} key={`Link-${idx}`}>
                    <div className="link-cat">
                      <span className="footer-toggle"></span>
                      <span className="footer-cat">{item.name}</span>
                    </div>
                    <ul className="footer-cat-links">
                      <li key={`Link-${idx}`}>
                        <Link href={item.path} legacyBehavior>
                          <a>
                            <span>Home Page</span>
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                );
              }
            })}

            {/* <div className="col-3 footer-column" id="newsletter">
              <div id="address">
                <span>Located</span>
                <ul>
                  <li>
                    <i className="far fa-building"></i>
                    <div>
                      Forest Grove, Oregon
                      <br />
                    </div>
                  </li>
                </ul>
              </div>
            </div> */}
            {/* <div className="col-3 footer-column">
              <Link href="/">
                <a
                  className={"header-logo footer-logo"}
                  style={{ paddingTop: 10, paddingBottom: 10 }}
                >
                  <Image
                    src={"/favicon.png"}
                    height={90}
                    width={78.75}
                    alt={"Verboort Logo"}
                    priority={true}
                  />
                </a>
              </Link>
            </div> */}
          </div>
          <div
            id="copyright"
            onClick={() => {
              document.getElementById("open-seo-manager")?.click();
            }}
            style={{ cursor: "pointer" }}
          >
            Open SEO Manager
          </div>
          <div id="copyright">
            &copy; All Rights Reserved By Nate Wessels 2020 - {this.state.year}
          </div>
        </div>
        <style jsx>{`
          h1 {
            text-align: center;
            font-family: roboto;
            font-weight: 400;
            font-size: 35px;
            color: #656565;
          }

          .dummy-text {
            color: #3c3b3b;
            font-family: lato;
            font-size: 20px;
            line-height: 1.5;
          }

          .col-6 {
            width: 50%;
            display: inline-table;
          }

          footer {
            background-color: #22211f;
            background-image:
              radial-gradient(circle at 20% 80%, rgba(0, 255, 157, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.05) 0%, transparent 50%),
              linear-gradient(45deg, transparent 40%, rgba(0, 255, 157, 0.02) 41%, rgba(0, 255, 157, 0.02) 59%, transparent 60%);
            background-attachment: fixed;
            animation: footer-glow 25s ease-in-out infinite;
            padding: 3em 4em 2em;
            padding-top: 50px;
            z-index: 1000000000000000;
            position: relative;
            @media only screen and (max-width: 1300px) {
              padding-top: 100px;
            }
            @media only screen and (max-width: 1130px) {
              padding-top: 50px;
            }
            @media only screen and (max-width: 600px) {
              padding-top: 50px;
            }
          }

          @keyframes footer-glow {
            0%, 100% {
              filter: hue-rotate(0deg) brightness(1) contrast(1);
            }
            25% {
              filter: hue-rotate(30deg) brightness(1.05) contrast(1.1);
            }
            50% {
              filter: hue-rotate(60deg) brightness(0.95) contrast(0.9);
            }
            75% {
              filter: hue-rotate(90deg) brightness(1.1) contrast(1.05);
            }
          }

          /* Footer Code Snippets */
          .footer-code-snippet {
            position: absolute;
            font-family: 'Courier New', monospace;
            font-size: 10px;
            color: rgba(0, 255, 157, 0.4);
            white-space: nowrap;
            pointer-events: none;
            z-index: 1;
            opacity: 0.6;
          }

          .footer-code-snippet:nth-child(1) {
            top: 20%;
            left: 10%;
            animation: footer-code-fade 12s ease-in-out infinite;
          }

          .footer-code-snippet:nth-child(2) {
            top: 60%;
            right: 15%;
            animation: footer-code-fade 15s ease-in-out infinite 3s;
          }

          .footer-code-snippet:nth-child(3) {
            bottom: 30%;
            left: 25%;
            animation: footer-code-fade 18s ease-in-out infinite 6s;
          }

          @keyframes footer-code-fade {
            0%, 80% {
              opacity: 0;
              transform: translateY(10px);
            }
            10%, 70% {
              opacity: 0.4;
              transform: translateY(0);
            }
            90%, 100% {
              opacity: 0;
              transform: translateY(-10px);
            }
          }

          .footer-logo {
            filter: invert(0.8);
            width: 80px;
          }

          footer .logo {
            color: #fff;
            font-size: 28px;
            font-family: roboto;
          }

          footer .row {
            margin: 2em 0;
            font-family: lato;
            color: #fff;
            border-bottom: 1px solid #cecece;
          }

          .footer-toggle {
            display: none;
          }

          .link-cat {
            cursor: pointer;
          }

          footer ul {
            padding: 0;
            -webkit-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
          }

          footer ul li {
            list-style-type: none;
            padding: 0;
            -webkit-transition: all 0.5s ease-in-out;
            transition: all 0.5s ease-in-out;
            line-height: 2;
          }

          footer .footer-cat,
          #newsletter span {
            font-size: 20px;
          }

          .footer-cat-links a {
            color: #cecece;
            text-decoration: none;
            position: relative;
          }

          .footer-cat-links.active > li a {
            pointer-events: auto;
          }

          .footer-cat-links a:after {
            top: 21px;
            content: "";
            display: block;
            height: 2px;
            left: 50%;
            width: 0;
            background: #fff;

            -webkit-transition: width 0.3s ease 0s, left 0.3s ease 0s;
            transition: width 0.3s ease 0s, left 0.3s ease 0s;
          }

          .footer-cat-links a:hover:after,
          .footer-cat-links a:focus:after {
            width: 60px;
            left: 0;
          }

          footer #subscribe {
            margin: 20px 0px 30px;
          }

          .footer-column {
            min-width: 300px;
            margin-bottom: 20px;
          }

          .footer-row {
            display: flex;
            justify-content: center;
            align-items: flex-start;
          }

          input#subscriber-email {
            outline: none;
            padding: 8px;
            background: #212121;
            border: 1px solid #cecece;
            color: #cecece;
            border-radius: 4px 0px 0px 4px;
          }

          input#subscriber-email::-webkit-input-placeholder {
            color: rgb(202, 196, 196);
          }

          input#subscriber-email:-ms-input-placeholder {
            color: #cecece;
          }

          input#subscriber-email::-ms-input-placeholder {
            color: #cecece;
          }

          input#subscriber-email::placeholder {
            color: #cecece;
          }

          .col-3 {
            display: inline-table;
            width: 25%;
          }

          .col-3#newsletter {
            width: 24%;
          }

          .col-3#newsletter #btn-scribe {
            margin-left: -4px;
            border: 1px solid #cecece;
            border-radius: 0px 4px 4px 0;
            padding: 8px 5px;
            background-color: #e2e2e2;
            color: #212121;
            cursor: pointer;
          }

          .social-2 {
            display: none;
          }

          .social-links {
            bottom: 44px;
            position: absolute;
            left: 0;
          }

          .social-links a {
            color: #fff;
            font-size: 20px;
            border: 1px solid;
            border-radius: 20px;
            padding: 6px;

            -webkit-transition: all 0.2s ease-in;
            transition: all 0.2s ease-in;
          }

          .social-links a:not(:last-child) {
            margin-right: 10px;
          }

          .social-links a:hover,
          .social-links a:focus {
            background-color: #212121;
          }

          .social-links a i {
            width: 25px;
            height: 25px;
            text-align: center;
          }

          #newsletter #address li:not(:first-child) {
            padding: 20px 0;
          }

          #newsletter #address li i {
            font-size: 45px;
            width: auto;
            padding: 5px;
          }

          #newsletter #address li div {
            color: #cecece;
            font-size: 14px;
            width: 80%;
            text-align: left;
            float: right;
            line-height: 1.3;
          }

          #copyright {
            text-align: center;
            color: #fff;
            font-family: lato;
          }

          #owner {
            text-align: center;
            padding: 20px 0 0px;
            color: #fff;
            font-family: lato;
          }

          #owner a {
            color: #fff;
          }

          /* iPads to Smartphone for Common Elements ----------- */

          /* iPads (portrait)----------- */

          /* iPads (landscape) ----------- */

          /* Mini Tablet ----------- */

          /* Smartphones (portrait and landscape) ----------- */
        `}</style>
      </footer>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  navigation: state.navigation
});

export default withRouter(connect(mapStateToProps)(index));
