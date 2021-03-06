import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import Layout from "../../../Component/layouts/Layout";
// import Button from '../../../Component/Button';
import { useRouter } from "next/router";
import Form from "../../../Component/Form";

export default function Page({ signOut, user }) {
  const [attributes, setAttributes] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setAuth();
    async function setAuth() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const { attributes } = user;
        const { email } = attributes;
        if (!isStudentMail(email)) {
          router.replace("/ags/signup/unauthorizedemail");
          return;
        } else {
          setAttributes(attributes);
        }
      } catch (error) {
        setAttributes(false);
        router.push("/ags/signup/welcome");
        console.log("error from index useeffect: ", error);
      }
    }
  }, []);

  return (
    <Layout info={attributes}>
      {/* {attributes !== null && <Form attributes={attributes} />} */}
      <Form attributes={{ email: "yasen362@gmail.com", given_name: "yase", family_name: "sen" }} />
      <p>AGS Sign up has ended</p>
    </Layout>
  );
}

function isStudentMail(email) {
  return email.includes("@student.smc.edu");
}
