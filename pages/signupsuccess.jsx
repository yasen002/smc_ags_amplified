import React from "react";
import Layout from "../Component/layouts/Layout";

function SignupSuccess() {
  return (
    <Layout>
      <div>
        <div>
          <p>
            You have submitted you AGS application and should receive an email confirmation. You will hear back from our officers after an advisor reviews your uploaded documents.{" "}
          </p>
          <br />
          <a style={{ textDecoration: "underline" }} href="http://www.agssmc.org/">
            Go to AGS main page
          </a>
        </div>
      </div>
    </Layout>
  );
}

export default SignupSuccess;
