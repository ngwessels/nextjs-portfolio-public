import React from "react";
import Error from "next/error";
import f from "../functions";

export default class Page extends React.Component {
  constructor({ errorCode, stars }) {
    super();
    this.state = {};
  }

  UNSAFE_componentWillMount = () => {
    // f.SSRSetup(this.props, this.props.response);
  };

  render() {
    return (
      <div>
        <Error statusCode={404} />
      </div>
    );
  }
}

// export async function getServerSideProps(context) {
//   try {
//     const cookies = nookies.get(context);
//     const token = cookies.token;
//     const { pid } = context.query;
//     let url = `http://localhost:3000/`;
//     if (process.env.NODE_ENV === "production") {
//       url = `https://${context.req.headers["x-forwarded-host"]}/`;
//     }
//     const response = await f.Api(
//       false,
//       "get",
//       `${url}api/user`,
//       null,
//       null,
//       token
//     );
//     return {
//       props: { response },
//     };
//   } catch (err) {
//     return {
//       notFound: true,
//     };
//   }
// }
