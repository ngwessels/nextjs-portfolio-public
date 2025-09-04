import React from "react";

//Redux
import { connect } from "react-redux";

//Styling

//Next.js Router
import Link from "next/link";

//jQuery
import $ from "jquery";

//Axios
import axios from "axios";

//components
import Dropdown from "./../Github/Button/index";

class MyApp extends React.Component {
  constructor() {
    super();
    this.state = {
      projects: {},
      languages: {}
    };
  }

  UNSAFE_componentWillMount() {}

  componentDidMount() {
    // this.github();
    // let mn = $(".topNavbar"),
    //   mns = "main-nav-scrolled",
    //   hdr = $(".titles").height(),
    //   brand = $(".navbar-brand"),
    //   visible = "fadeIn visible",
    //   invisible = "fadeOut invisible";
    // $(window).scroll(function () {
    //   if ($(this).scrollTop() >= 0) {
    //     mn.addClass(mns);
    //     brand.addClass(visible);
    //     brand.removeClass(invisible);
    //   } else {
    //     mn.removeClass(mns);
    //     brand.removeClass(visible);
    //     brand.addClass(invisible);
    //   }
    // });
  }

  // github = () => {
  //   const object = {
  //     method: "get",
  //     url: "https://api.github.com/users/ngwessels/repos"
  //   };
  //   axios(object)
  //     .then((res) => {
  //       let projects = {},
  //         languages = {},
  //         languageLength = 0;
  //       if (res?.data) {
  //         for (let x in res.data) {
  //           const project = res.data[x];
  //           projects[project.id] = project;
  //           if (languages[project.language]) {
  //             languages[project.language].push(project.id);
  //           } else {
  //             languages[project.language] = [project.id];
  //             languageLength++;
  //           }
  //         }
  //         const level1Height = 40 * languageLength;
  //         this.setState({ projects, languages, level1Height });
  //       }
  //     })
  //     .catch((err) => {});
  // };

  render() {
    return (
      <nav style={{ minHeight: 40.1 }}>
        <div id={"navBar"} style={{ minHeight: 40 }}>
          <nav
            className="topNavbar navbar-expand-sm navbar-dark"
            id={"desktop"}
          >
            <div className="navbar-logo">
              <img src="/favicon.png" alt="Logo" className="navbar-logo-image" />
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                {/* <li className="nav-item">
                  <Link href="/" legacyBehavior>
                    <a
                      style={{ margin: 0, textAlign: "right" }}
                      className="nav-link"
                      href={"#"}
                    >
                      Home
                    </a>
                  </Link>
                </li> */}
                <li className="nav-item" style={{ marginRight: '20px' }}>
                  <Dropdown
                    title="Github Public Projects"
                    position={"right"}
                    buttonClassName={"nav-link"}
                    projects={this.props.github?.projects || {}}
                    languages={this.props.github?.languages || {}}
                  >
                    {Object.keys(this.props.github?.languages || {}).map(
                      (language) => {
                        return (
                          <div key={`Language-${language}`}>
                            <Dropdown.Item
                              className={"language"}
                              onMouseEnter={() => {
                                // Find the submenu and show it
                                const submenu = document.querySelector(`[data-language="${language}"]`);
                                if (submenu) {
                                  submenu.style.display = 'block';
                                  submenu.style.visibility = 'visible';
                                  submenu.style.opacity = '1';
                                }
                              }}
                              onMouseLeave={() => {
                                // Find the submenu and hide it
                                const submenu = document.querySelector(`[data-language="${language}"]`);
                                if (submenu) {
                                  submenu.style.display = 'none';
                                  submenu.style.visibility = 'hidden';
                                  submenu.style.opacity = '0';
                                }
                              }}
                            >
                              {language}
                              <Dropdown.Submenu
                                data-language={language}
                                onMouseEnter={() => {
                                  // Keep submenu visible when hovering over it
                                  const submenu = document.querySelector(`[data-language="${language}"]`);
                                  if (submenu) {
                                    submenu.style.display = 'block';
                                    submenu.style.visibility = 'visible';
                                    submenu.style.opacity = '1';
                                  }
                                }}
                                onMouseLeave={() => {
                                  // Hide submenu when leaving it
                                  const submenu = document.querySelector(`[data-language="${language}"]`);
                                  if (submenu) {
                                    submenu.style.display = 'none';
                                    submenu.style.visibility = 'hidden';
                                    submenu.style.opacity = '0';
                                  }
                                }}
                              >
                                {this.props.github?.languages?.[language].map(
                                  (item, index) => {
                                    const project =
                                      this.props.github?.projects?.[item] || {};
                                    const openGithubRepo = () => {
                                      window.open(project.svn_url, "_blank");
                                    };
                                    const openGithubPages = () => {
                                      window.open(
                                        `https://ngwessels.github.io/${project.name}/`,
                                        "_blank"
                                      );
                                    };
                                    if (project.has_pages) {
                                      return (
                                        <div
                                          key={`Language-${language}-Project-${item}`}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <Dropdown.Item
                                            onClick={openGithubRepo}
                                          >
                                            {project.name}
                                            <Dropdown.Submenu>
                                              <Dropdown.Item
                                                onClick={openGithubPages}
                                              >
                                                View Live Example
                                              </Dropdown.Item>
                                            </Dropdown.Submenu>
                                          </Dropdown.Item>
                                        </div>
                                      );
                                    } else {
                                      return (
                                        <div
                                          style={{ cursor: "pointer" }}
                                          key={`Language-${language}-Project-${item}`}
                                        >
                                          <Dropdown.Item
                                            onClick={openGithubRepo}
                                          >
                                            {project.name}
                                          </Dropdown.Item>
                                        </div>
                                      );
                                    }
                                  }
                                )}
                              </Dropdown.Submenu>
                            </Dropdown.Item>
                          </div>
                        );
                      }
                    )}
                  </Dropdown>
                </li>
                <li className="nav-item">
                  <a
                    style={{ margin: 0, width: 120 }}
                    className="nav-link"
                    href={"#contact"}
                    onClick={(e) => {
                      e.preventDefault();
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div id={"mobile"}>
            <div>
              <nav id={"mobileNav"}>
                <div className="mobile-logo">
                  <img src="/favicon.png" alt="Logo" className="mobile-logo-image" />
                </div>
                <div className={"hamburger-container"}>
                  <div
                    className="hamburger mobile-menu-trigger"
                    onClick={() => {
                      const el = document.getElementById("menu-bar");
                      el.style.left = 0;
                    }}
                  >
                    <div className="hamburgerTop"></div>
                    <div className="hamburgerMiddle"></div>
                    <div className="hamburgerBottom"></div>
                  </div>
                </div>

                <ul className="menu menu-bar" id={"menu-bar"}>
                  <li>
                    <div
                      className="close-container"
                      onClick={() => {
                        const el = document.getElementById("menu-bar");
                        el.style.left = "-100%";
                      }}
                    >
                      <div className="leftright"></div>
                      <div className="rightleft"></div>
                    </div>
                  </li>
                  {/* <li>
                    <Link href="/" legacyBehavior>
                      <a
                        className={"menu-link menu-list-link"}
                        href={"#"}
                        onClick={() => {
                          const el = document.getElementById("menu-bar");
                          el.style.left = "-100%";
                        }}
                      >
                        Home
                      </a>
                    </Link>
                  </li> */}
                  <li>
                    <a
                      className="menu-link menu-bar-link"
                      aria-haspopup="true"
                      href={"#"}
                      onClick={() => {
                        const el = document.getElementById("popup");
                        el.style.left = "0";
                      }}
                    >
                      Github Public Projects
                    </a>
                    <ul
                      className="mega-menu mega-menu--multiLevel"
                      id={"popup"}
                    >
                      <li>
                        <div
                          className="close-container"
                          onClick={() => {
                            const el = document.getElementById("menu-bar");
                            el.style.left = "-100%";
                          }}
                        >
                          <div className="leftright"></div>
                          <div className="rightleft"></div>
                        </div>
                      </li>
                      <li className="mobile-menu-back-item">
                        <a
                          className="menu-link mobile-menu-back-link"
                          href={"#"}
                          onClick={() => {
                            const el = document.getElementById("popup");
                            el.style.left = "100%";
                          }}
                        >
                          Back
                        </a>
                      </li>
                      {Object.keys(this.props.github?.languages).map(
                        (language) => {
                          const allProjects =
                            this.props.github?.languages?.[language];
                          return (
                            <li key={language}>
                              <a
                                className="menu-link mega-menu-link"
                                aria-haspopup="true"
                                href={"#"}
                              >
                                {language}
                              </a>
                              <ul className="menu menu-list">
                                {allProjects.map((item, index) => {
                                  const project =
                                    this.props.github?.projects?.[item];
                                  const openGithubRepo = () => {
                                    window.open(project.svn_url, "_blank");
                                  };
                                  const openGithubPages = () => {
                                    window.open(
                                      `https://ngwessels.github.io/${project.name}/`,
                                      "_blank"
                                    );
                                  };
                                  if (project.has_pages) {
                                    return (
                                      <li key={project.id}>
                                        <a
                                          className="menu-link menu-list-link"
                                          aria-haspopup="true"
                                          href={"#"}
                                        >
                                          {project.name}
                                        </a>
                                        <ul className="menu menu-list">
                                          <li>
                                            <a
                                              className="menu-link menu-list-link"
                                              href={"#"}
                                              onClick={openGithubRepo}
                                            >
                                              Open Github
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              className="menu-link menu-list-link"
                                              href={"#"}
                                              onClick={openGithubPages}
                                            >
                                              Visit Live Example
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    );
                                  } else {
                                    return (
                                      <li key={project.id}>
                                        <a
                                          className="menu-link menu-list-link"
                                          href={"#"}
                                          onClick={openGithubRepo}
                                        >
                                          {project.name}
                                        </a>
                                      </li>
                                    );
                                  }
                                })}
                              </ul>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </li>
                  <li>
                    <a
                      className={"menu-link menu-list-link"}
                      href={"#contact"}
                      onClick={() => {
                        const el = document.getElementById("menu-bar");
                        el.style.left = "-100%";
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          setTimeout(() => {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                          }, 300);
                        }
                      }}
                    >
                      Contact Me
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <style jsx global>{`
          #navBar {
            background-color: #22211f;
            position: fixed;
            width: 100vw;
            z-index: 1000;
            /* fading in my website name onto navbar after scrolling */
            .fadeIn {
              animation: fadein 1s;
              -moz-animation: fadein 1s;
              /* Firefox */
              -webkit-animation: fadein 1s;
              /* Safari and Chrome */
              -o-animation: fadein 1s;
              /* Opera */
            }

            /* fading out my website name onto navbar after scrolling */
            .fadeOut {
              animation: faceout 1s;
              -moz-animation: fadeout 1s;
              /* Firefox */
              -webkit-animation: fadeout 1s;
              /* Safari and Chrome */
              -o-animation: fadeout 1s;
              /* Opera */
            }

            .sitetitle {
              margin: 0;
              padding: 0;
              white-space: nowrap;
              color: white;
            }

            .sitesubtitle {
              text-align: left;
              margin-left: 0;
              height: 100%;
              white-space: nowrap;
              color: white;
              opacity: 0.65;
            }

            .navbar,
            main {
              position: relative;
            }

            small {
              opacity: 0.65;
            }

            .topNavbar {
              align-items: center;
              height: 70px;
              z-index: 150;
              margin-bottom: -70px;
              width: 100%;
              background-color: #fafafa;
              backdrop-filter: blur(10px);
              border-bottom: 1px solid rgba(100, 178, 177, 0.2);
              box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
              position: relative;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .navbar-logo {
              display: flex;
              align-items: center;
              height: 100%;
              padding-left: 20px;
            }

            .navbar-logo-image {
              height: 40px;
              width: auto;
              max-width: 100px;
              object-fit: contain;
              transition: transform 0.3s ease;
            }

            .navbar-logo-image:hover {
              transform: scale(1.05);
            }

            .topNavbar::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 1px;
              background: linear-gradient(90deg, transparent 0%, rgba(100, 178, 177, 0.3) 50%, transparent 100%);
            }

            .titles,
            .main-nav-scrolled {
              position: fixed;
              width: 100%;
              top: 0;
            }

            #navbarSupportedContent {
              margin: 0px;
              padding: 0px;
              display: flex !important;
              align-items: center;
              justify-content: flex-end;
              height: 100%;
              flex: 1;
              position: absolute;
              top: 0;
              right: 0;
            }

            .navbar-nav {
              padding-left: 100px;
              padding-right: 100px;
              margin: 0;
              display: flex;
              align-items: center;
              height: 100%;
            }

            .nav-item {
              min-width: 100px;
              display: flex;
              align-items: center;
              height: 100%;
            }
            .nav-link {
              color: #2c3e50;
              width: 180px;
              margin-right: 0px;
              padding: 0.5rem 0;
              font-weight: 500;
              transition: color 0.3s ease;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;
              text-decoration: none;
            }

            .nav-link:hover {
              color: #27999d;
            }

            .nav-item.nav-link {
              color: #2c3e50;
              width: 100px;
              margin-right: 0px;
              padding: 0px;
            }

            main {
              padding: 110px 50px 50px;
              background-color: #e1e3dd;
            }

            @supports (grid-area: auto) {
              /* Check for CSS Grid support: */
              @media only screen and (min-width: 600px) {
                .site {
                  /* Disable fallback max-width center aligned rule: */
                  max-width: none;
                }

                .page {
                  display: grid;
                  grid-template-columns: auto;
                  grid-template-areas:
                    "top"
                    "main"
                    "footer";
                }

                .top {
                  grid-area: top;
                  display: grid;
                  grid-template-areas:
                    "titles"
                    "navigation";
                }

                .sitetitle {
                  grid-column: 1/2;
                }

                .sitesubtitle {
                  grid-column: 2/3;
                }

                .navbar {
                  grid-area: navigation;
                }

                .pageTitle {
                  grid-row: 1/2;
                  grid-column: 1/3;
                }
              }
              @media only screen and (max-width: 768px) {
                .titles {
                  flex-direction: column;
                }

                .sitesubtitle {
                  margin-left: 0;
                }

                .navbar-logo {
                  padding-left: 15px;
                  display: none;
                }

                .navbar-logo-image {
                  height: 35px;
                  max-width: 80px;
                }
              }
            }
          }

          $color-accent: black;
          $color-light: #ffffff;
          $color-dark: black;
          $menu-link-padding: 20px 25px;
          $breakpoint: 950px;
          $mega-menu-multiLevel-colWidth: calc(100 / 3) + 0%;
          $mobile-menu-back-height: "calc(1.4em + 40px)";
          $mobile-menu-back-offset: "calc(0px - (1.4em + 40px))";
          $menu-mobile-width: 350px;

          // ------------------ SHARED STYLES

          nav {
            ul,
            li {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            a {
              display: block;
              text-decoration: none;
              &:hover,
              &:visited {
                text-decoration: none;
              }
            }
          }
          .nav {
            a {
              font-family: "Arial Black", Gadget, sans-serif;
            }
          }

          .menu-bar {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            padding: 80px 0 20px 0;
            min-height: 100vh;
          }

          .menu-link {
            padding: 16px 24px;
            background: transparent;
            color: #2c3e50;
            transition: all 0.3s ease;
            position: relative;
            z-index: 1;
            font-size: 18px;
            font-weight: 500;
            text-decoration: none;
            border: none;
            width: 100%;
            text-align: left;
            border-bottom: 1px solid rgba(100, 178, 177, 0.1);

            &:hover {
              background: rgba(100, 178, 177, 0.05);
              color: #27999d;
              padding-left: 32px;
            }

            &[aria-haspopup="true"] {
              &:after {
                content: "→";
                position: absolute;
                right: 24px;
                top: 50%;
                transform: translateY(-50%);
                color: #27999d;
                font-size: 16px;
                font-weight: bold;
                transition: transform 0.3s ease;
              }

              &:hover:after {
                transform: translate(8px, -50%);
              }
            }
          }

          .menu-list {
            padding: 0;
            margin: 0;
            list-style: none;
            background: rgba(100, 178, 177, 0.02);
            border-radius: 8px;
            overflow: hidden;
          }

          .menu-list .menu-link {
            padding: 14px 20px 14px 40px;
            font-size: 15px;
            border-bottom: 1px solid rgba(100, 178, 177, 0.08);
            position: relative;
            margin: 0;

            &:hover {
              padding-left: 48px;
              background: rgba(100, 178, 177, 0.08);
            }

            &:last-child {
              border-bottom: none;
            }

            &[aria-haspopup="true"] {
              &:after {
                content: "→";
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                color: #27999d;
                font-size: 12px;
                font-weight: bold;
              }

              &:hover:after {
                transform: translate(4px, -50%);
              }
            }
          }

          .menu-list .menu-list {
            margin: 8px 16px 8px 24px;
            background: rgba(100, 178, 177, 0.04);
            border-radius: 6px;

            .menu-link {
              padding: 12px 16px 12px 32px;
              font-size: 14px;

              &:hover {
                padding-left: 40px;
              }
            }
          }

          .mega-menu-header {
            font-size: 1.2em;
            text-transform: uppercase;
            font-weight: bold;
            color: adjust($color-accent, 5%);
          }

          .mega-menu {
            background: #ffffff;
            border-left: 3px solid rgba(100, 178, 177, 0.2);
            z-index: 10;
          }

          .mega-menu--multiLevel {
            flex-direction: column;
            padding: 20px 0;
          }

          // ------------------ MEDIA QUERIES

          @media all and (max-width: $breakpoint) {
            .nav {
              padding: 20px;
            }

            .mobile-menu-trigger,
            .mobile-menu-header,
            .mobile-menu-back-item {
            }

            .mobile-menu-trigger {
              color: $color-light;
              border: 0;
              padding: 0px;
              font-size: 1.2em;
              border-radius: 4px;
            }

            .mobile-menu-header {
              // order: -1;
              background: grey;
              a {
                padding: $menu-link-padding;
                color: $color-light;
                visibility: visible;
              }
            }

            .menu-bar {
              flex-direction: column;
              position: fixed;
              top: 0;
              left: -100%;
              bottom: 0;
              height: auto;
              width: 280px;
              max-width: 85vw;
              overflow-x: hidden;
              overflow-y: auto;
              transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              background-color: #ffffff;
              z-index: 1000;
              border-right: 1px solid rgba(100, 178, 177, 0.1);
              padding: 70px 0 0 0;
              box-sizing: border-box;
              > li {
                > [aria-haspopup="true"] {
                  ~ ul {
                    display: flex;
                    flex-direction: column;
                    background: #ffffff;
                    position: absolute;
                    left: 100%;
                    top: 0;
                    max-height: 100vh;
                    width: 100%;
                    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border-left: 2px solid rgba(100, 178, 177, 0.2);

                    box-sizing: border-box;
                    // Second level
                    > li {
                      > [aria-haspopup="true"] {
                        font-size: 16px;
                        ~ ul {
                          a {
                            padding-left: 32px;
                            font-size: 16px;
                          }
                          // Third level
                          > li {
                            > [aria-haspopup="true"] {
                              ~ ul {
                                a {
                                  padding-left: 48px;
                                  font-size: 15px;
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    [aria-haspopup="true"] {
                      color: #2c3e50;
                      font-weight: 500;
                      &:after {
                        content: "→";
                        color: #27999d;
                        font-size: 14px;
                        font-weight: bold;
                      }
                      ~ ul {
                        max-height: 0px;
                        transform-origin: top;
                        transform: scaleY(0);
                        transition: all 0.3s ease;
                      }
                    }
                  }
                }
              }
            }

            .mega-menu-content {
              padding: $menu-link-padding;
            }

            .mobile-menu-back-item {
              border-bottom: 1px solid rgba(100, 178, 177, 0.1);
              background: rgba(100, 178, 177, 0.02);
              a {
                background: transparent;
                color: #27999d;
                font-weight: 600;
                font-size: 16px;
                padding: 16px 24px 16px 16px;
                text-decoration: none;
                display: flex;
                align-items: center;
                transition: all 0.3s ease;
                &:before {
                  content: "←";
                  font-size: 18px;
                  margin-right: 12px;
                  transition: transform 0.3s ease;
                }
                &:hover {
                  background: rgba(100, 178, 177, 0.05);
                  padding-left: 24px;
                  &:before {
                    transform: translateX(-4px);
                  }
                }
              }
            }

            // ------------------------ ALL DEVICES

            .mobile-menu-trigger {
              // FUNCTIONALITY: Open mobile menu
              &:focus {
                ~ ul {
                  left: 0;
                }
              }
            }

            .menu-bar {
              // FUNCTIONALITY: Keep menu open
              &:hover,
              &:focus-within {
                left: 0;
              }
              > li {
                > [aria-haspopup="true"] {
                  // FUNCTIONALITY: Open mega menu
                  &:focus {
                    ~ ul {
                      left: 0;
                    }
                  }
                  ~ ul {
                    // STYLING: Back button offset
                    margin-top: $mobile-menu-back-height;

                    // FUNCTIONALITY: Keep mega menu open
                    &:hover,
                    &:focus-within {
                      left: 0;
                    }
                    // FUNCTIONALITY: Open dropdowns
                    [aria-haspopup="true"] {
                      &:focus {
                        ~ ul {
                          max-height: 500px;
                          animation: dropdown 0.3s forwards;
                        }
                      }
                    }
                    // FUNCTIONALITY: Keep dropdowns open
                    li {
                      &:focus-within {
                        > [aria-haspopup="true"] {
                          ~ ul {
                            max-height: 500px;
                            transform: scaleY(1);
                          }
                        }
                      }
                    }
                  }
                }
                // FUNCTIONALITY: Prevent clicks on link behind back button
                &:focus-within ~ .mobile-menu-header a {
                  visibility: visible;
                }
              }
            }

            // ------------------------ TOUCH DEVICES

            @media (hover: none) {
              // FUNCTIONALITY: Open mobile menu
              .mobile-menu-trigger {
                &:hover {
                  ~ ul {
                    left: 0;
                  }
                }
              }

              // FUNCTIONALITY: Open mega menu
              .menu-bar {
                > li {
                  > [aria-haspopup="true"] {
                    &:hover {
                      ~ ul {
                        left: 0;
                      }
                    }
                    ~ ul {
                      &:hover {
                        left: 0;
                      }
                      // FUNCTIONALITY: Open dropdowns
                      [aria-haspopup="true"] {
                        &:hover {
                          ~ ul {
                            max-height: 500px;
                            animation: dropdown 0.3s forwards;
                          }
                        }
                        ~ ul {
                          &:hover {
                            max-height: 500px;
                            transform: scaleY(1);
                          }
                        }
                      }
                    }
                  }
                  &:hover ~ .mobile-menu-header {
                    a {
                      visibility: hidden;
                    }
                  }
                }
              }
            }
          }

          @media only screen and (max-width: 600px) {
            #mobileNav {
              display: flex;
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              z-index: 1000;
            }
            #desktop {
              display: none !important;
            }
            .navbar-toggler {
              display: none !important;
            }
            .navbar-collapse {
              display: none !important;
            }
            .navbar-nav {
              display: none !important;
            }
            .navbar-logo {
              display: none !important;
            }
          }

          @media only screen and (min-width: 600px) {
            #mobileNav {
              display: none !important;
            }
            #desktop {
              display: block !important;
            }
            .navbar-toggler {
              display: none !important;
            }
            .navbar-collapse {
              display: block !important;
            }
            .navbar-nav {
              display: flex !important;
            }
            .navbar-logo {
              display: flex !important;
            }
          }

          #mobileNav {
            position: fixed;
            width: 100%;
            height: 70px;
            z-index: 1000;
            background-color: #fafafa;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
            border-bottom: 1px solid rgba(100, 178, 177, 0.2);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .mobile-logo {
            display: flex;
            align-items: center;
            height: 70px;
            padding-left: 20px;
            flex: 1;
          }

          .mobile-logo-image {
            height: 35px;
            width: auto;
            max-width: 80px;
            object-fit: contain;
          }

          .hamburger-container {
            height: 70px;
            width: auto;
            z-index: 1;
            margin-left: auto;
            margin-right: 20px;
            display: flex;
            align-items: center;
          }

          /* Main style of the hamburger icon */
          .hamburger {
            width: 30px;
            height: 30px;
            // margin: 20px auto;
            cursor: pointer;
            border-radius: 5px;
            transition: background 0.3s ease;
          }

          .hamburger:hover {
            background: rgba(100, 178, 177, 0.1);
          }

          /* Style of the layers of the hamburger */
          .hamburgerTop,
          .hamburgerMiddle,
          .hamburgerBottom {
            position: absolute;
            display: block;
            width: 30px;
            height: 3px;
            background: #2c3e50;
            transition: background 0.3s ease;
          }

          /* Animation from open (X) to close (hamburger) */
          .hamburgerTop,
          .hamburgerBottom {
            /*
   * Parameter explanation:
   * transform    - rotating back elements
   * 0.4s         - duration of 'transform'-animation
   * ease         - animation style for 'transform'
   *
   * margin-top   - bring layers to original position
   * 0.3s         - duration for 'margin-top'
   * ease         - animation style for 'margin-top'
   * 0.4s         - wait 0.4s (duration of 'transform') before starting 'margin-top'-animation
   */
            transition: transform 0.4s ease, margin-top 0.3s ease 0.4s;
          }

          .hamburgerMiddle {
            transition: opacity 0.2s ease 0.5s;
          }

          /* Margin between the layers */
          .hamburgerTop {
            margin-top: 7px;
          }

          .hamburgerMiddle {
            margin-top: 15px;
          }

          .hamburgerBottom {
            margin-top: 23px;
          }

          /* Animation from close (hamburger) to open (X) */
          .hamburgerTop.open,
          .hamburgerBottom.open {
            transition: margin-top 0.3s ease, transform 0.4s ease 0.3s;
          }

          /* 
 * All layers at same position.
 * One layer not visible at all.
 * Two layers forming an 'X'-shape.
 */
          .hamburgerTop.open {
            transform: rotate(45deg);
            margin-top: 15px;
          }

          .hamburgerMiddle.open {
            opacity: 0;
            transition: none;
          }

          .hamburgerBottom.open {
            transform: rotate(-45deg);
            margin-top: 15px;
          }

          // COLORS
          $softorange: black;
          $tomatored: black;
          // $mediumblu: #1E272D;

          .close-container {
            position: relative;
            margin: 16px 16px 8px auto;
            width: 36px;
            height: 36px;
            cursor: pointer;
            border-radius: 50%;
            background: rgba(100, 178, 177, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            border: 1px solid rgba(100, 178, 177, 0.2);
          }

          .close-container:hover {
            background: rgba(100, 178, 177, 0.2);
            transform: scale(1.1);
          }

          .close-container:before {
            content: "×";
            font-size: 20px;
            color: #27999d;
            font-weight: bold;
            line-height: 1;
          }

          .leftright,
          .rightleft {
            display: none;
          }

          // ------------------ ANIMATIONS

          @keyframes dropdown {
            0% {
              opacity: 0;
              transform: scaleY(0);
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: scaleY(1);
            }
          }

          @keyframes flyout {
            0% {
              opacity: 0;
              transform: scaleX(0);
            }
            100% {
              opacity: 1;
              transform: scaleX(1);
            }
          }
        `}</style>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    github: state.github
  };
}

export default connect(mapStateToProps)(MyApp); //Connects Redux
