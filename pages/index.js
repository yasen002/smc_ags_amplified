import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";
import { DataStore } from "@aws-amplify/datastore";
import { Student } from "../src/models";
import Cookies from "js-cookie";
import { Auth } from "aws-amplify";
import Layout from "../Component/layouts/Layout";
import { useRouter } from "next/router";

export default function Home() {
  const [attributes, setAttributes] = useState(null);
  const [student, setStudent] = useState(null);

  const router = useRouter();

  useEffect(() => {
    setAuth();
    async function setAuth() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const { attributes } = user;
        const { email } = attributes;

        const studentData = await DataStore.query(Student, (student) =>
          student.email("eq", email)
        );
        var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
        Cookies.set("student", JSON.stringify(studentData), {
          expires: inFifteenMinutes,
        });

        if (studentData.length === 0) {
          router.push("/ags/signup");
        } else {
          router.push("student/dashboard");
        }

        setStudent(studentData);
        //---------------------------------------
        ////this is not checking student email
        // if (!isStudentMail(email)) {
        //   router.replace("/unauthorizedemail");
        //   return;
        // } else {
        // }
        //---------------------------------------

        setAttributes(attributes);
      } catch (error) {
        setAttributes(false);
        if (error === "The user is not authenticated") {
          Auth.federatedSignIn({ provider: "Google" });
        } else {
          router.push("/welcome");
        }
        console.log("error from index useeffect: ", error);
      }
    }
  }, []);

  return (
    <>
      <Layout>
        <div className={styles.center}>
          <div className={styles.container}>Loading...</div>
        </div>
      </Layout>
    </>
  );
}

function isStudentMail(email) {
  return email.includes("@student.smc.edu");
}
