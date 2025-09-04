import { Provider } from "react-redux";
import React from "react";
// import withRedux, { createWrapper } from "next-redux-wrapper";
import store from "../redux/reducers/rootReducer";
import App from "next/app";
import Router, { withRouter } from "next/router";
import dynamic from "next/dynamic";

//Firebase
import firebase from "../firebase";
import { logEvent, getAnalytics } from "firebase/analytics";

//functions
import f from "../functions";

//constants
import c from "../constants";

//Nextjs-Seo-Manager
import SEOInit from "nextjs-seo-manager/init";

SEOInit({
  projectId: process.env.NEXT_PUBLIC_SEO_PROJECT_ID,
  projectKey: process.env.NEXT_PUBLIC_SEO_PROJECT_KEY,
  secretKey: process.env.NEXT_PUBLIC_SEO_PROJECT_SECRET_KEY
});

//Components
const NavBar = dynamic(() => import("./../components/NavBar/NavBar/index"));

//Styles
import "react-image-gallery/styles/css/image-gallery.css";
import "bootstrap/dist/css/bootstrap.min.css";

class MyApp extends App {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = async () => {
    const dispatch = store.getState();
    const analytics = getAnalytics();
    f.Auth({
      ...dispatch,
      router: this.props.router,
      dispatch: store.dispatch
    });
    //Firebase Analytics
    logEvent(analytics, "page_view", {
      page_location: f.currentUrl(""),
      page_path: this.props.router.asPath
    });

    //Next.js Router
    Router.onRouteChangeStart = (e) => {
      let actionArray = [
        {
          type: c.PAGE_LOADING,
          results: true
        }
      ];
      const path = e;
      if (path[path.length - 1] !== "#") {
        actionArray.push({
          type: c.ROUTER_HISTORY_PUSH,
          results: path
        });
      }
      f.reduxDispatch(store, actionArray);
    };

    Router.onRouteChangeComplete = () => {
      let actionArray = [
        {
          type: c.PAGE_LOADING,
          results: false
        }
      ];

      f.reduxDispatch(store, actionArray);
      logEvent(analytics, "page_view", {
        page_location: f.currentUrl(""),
        page_path: this.props.router.asPath
      });
    };

    Router.onRouteChangeError = () => {
      f.consoleLog("onRouteChangeError triggered");
    };
    const action = {
      type: c.ROUTER_HISTORY_PUSH,
      results: this.props.router.asPath
    };
    f.reduxDispatch(store, action);
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Provider store={store}>
          <NavBar />
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }
}

//withRedux wrapper that passes the store to the App Component
export default withRouter(MyApp);
