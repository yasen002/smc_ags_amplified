import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/Home.module.scss";
import { DataStore } from "@aws-amplify/datastore";
import { Student } from "../src/models";
import { Auth, Hub } from "aws-amplify";
import Layout from "../Component/layouts/Layout";
import Dashboard from "../Component/Dashboard";
import NotFound from "../Component/NotFound";
import Loading from "../Component/Loading";

function resolveAfter3Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 3000);
  });
}

function getUser() {
  return Auth.currentAuthenticatedUser();
}

async function getStudent(email) {
  await resolveAfter3Seconds();
  return await DataStore.query(Student, (c) => c.email("eq", email));
}

export default function Home() {
  const [user, setUser] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    // install Amplify user hub
    if (!mountedRef.current) return null;
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          getUser()
            .then((userData) => {
              setUser(userData);
              return getStudent(userData.attributes.email);
            })
            .then((studentData) => {
              if (studentData.length > 0) {
                setStudentData(studentData[0]);
              } else {
                setStudentData(null);
              }
              setLoading(false);
            })
            .catch((e) => console.log("index.js-> Error in getting user info: \n", e));
          break;
        case "signOut":
          setUser(null);
          setStudentData(null);
          setLoading(true);
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          break;
      }
    });

    return () => {
      mountedRef.current = false;
    };
  }, [loading]);

  return (
    <>
      <Layout info={user ? { email: user.attributes.email } : false}>
        {loading && user && <Loading />}
        {!user && !loading && <h1>Please Sign in </h1>}
        {!loading && studentData && <Dashboard data={studentData} />}
        {!loading && !studentData && <NotFound />}
      </Layout>
    </>
  );
}
