import React from "react";

//Redux
import { connect } from "react-redux";

class MyApp extends React.Component {
  constructor() {
    super();
    this.state = {
      projects: {},
      languages: {}
    };
  }

  componentDidMount() {
    this.runAnimation();
  }

  runAnimation = () => {};

  render() {
    return (
      <div style={{ position: "fixed", zIndex: 10 }}>
        <div>
          <nav id={"mobileNav"}>
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
              <li>
                <a
                  className="menu-link menu-bar-link"
                  aria-haspopup="true"
                  onClick={() => {
                    const el = document.getElementById("popup");
                    el.style.left = "0";
                  }}
                >
                  Projects
                </a>
                <ul className="mega-menu mega-menu--multiLevel" id={"popup"}>
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
                      onClick={() => {
                        const el = document.getElementById("popup");
                        el.style.left = "100%";
                      }}
                    >
                      Back
                    </a>
                  </li>
                  {Object.keys(this.props.languages).map((language) => {
                    const allProjects = this.props.languages[language];
                    return (
                      <li key={language}>
                        <a
                          className="menu-link mega-menu-link"
                          aria-haspopup="true"
                        >
                          {language}
                        </a>
                        <ul className="menu menu-list">
                          {allProjects.map((item, index) => {
                            const project = this.props.projects[item];
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
                                  >
                                    {project.name}
                                  </a>
                                  <ul className="menu menu-list">
                                    <li>
                                      <a
                                        className="menu-link menu-list-link"
                                        onClick={openGithubRepo}
                                      >
                                        Open Github
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="menu-link menu-list-link"
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
                  })}
                </ul>
              </li>
              <li>
                <a className="menu-link menu-bar-link">Static link</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  //Redux Props
  return {
    mq: state.mq
  };
}

export default connect(mapStateToProps)(MyApp); //Connects Redux
