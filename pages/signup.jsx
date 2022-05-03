import React, { useEffect, useState, useRef } from "react";
// import styles from "../styles/Signup.module.scss";
// import { DataStore } from "@aws-amplify/datastore";
// import { Student } from "../src/models";
import { Auth, Hub } from "aws-amplify";
import Cookies from "js-cookie";
import Layout from "../Component/layouts/Layout";
import Form from "../Component/Form";
// import Dashboard from "../Component/Dashboard";
// import Loading from "../Component/Loading";

function resolveAfter3Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 3000);
  });
}

export default function Signup() {
  const [student, setStudent] = useState(null);
  useEffect(() => {
    let tokenExist = Cookies.get("student") !== "null" && Cookies.get("student") !== "undefined";
    if (tokenExist) {
      setStudent(JSON.parse(Cookies.get("student")));
    }
  }, []);

  return (
    <>
      <Layout info={!!student ? { email: student.email } : false}>
        {!!!student && <h1>Please Sign in with your student email.</h1>}
        {!!student && <Form attributes={{ email: student.email, given_name: student.given_name, family_name: student.family_name }} />}
        {/* {loading && user && <Loading />}
        {!user && !loading && <h1>Please Sign in </h1>}
        {!loading && studentData && <Dashboard data={studentData} />}
        {!loading && !studentData && <NotFound />} */}
      </Layout>
    </>
  );
}
