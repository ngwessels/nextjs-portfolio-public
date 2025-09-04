//React
import React from "react";

//Redux
import { connect } from "react-redux";

import Head from "next/head";
import SEOHelper from "nextjs-seo-manager/seohelper";

class SEO extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false
    };
  }

  //JavaScript
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loaded: true });
    }, 500);
  }

  render() {
    return (
      <>
        <SEOHelper
          data={this.props.data}
          head={(data) => <Head>{data}</Head>}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    url: state.url
  };
}

export default connect(mapStateToProps)(SEO);
