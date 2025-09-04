import { projects } from "./../../lib/github";

export default async (req, res) => {
  try {
    // const [gitHubDispatch] = await Promise.all([projects()]);
    return res.status(200).send({
      message: "Successful",
      dispatch: [],
      results: true
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "Not Successful",
      error: "Something went wrong on our end, Please Try Again!",
      results: false
    });
  }
};
