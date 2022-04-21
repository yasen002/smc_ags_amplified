import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/Home.module.scss";
import { DataStore } from "@aws-amplify/datastore";
import { Student } from "../src/models";
import { Auth, Hub } from "aws-amplify";
import Layout from "../Component/layouts/Layout";
import Dashboard from "../Component/Dashboard";
import NotFound from "../Component/NotFound";

export default function Home() {
  const [user, setUser] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const mountedRef = useRef(true);
  useEffect(() => {
    if (!mountedRef.current) return null;

    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          setLoading(true);
          getUser().then((userData) => setUser(userData));
          break;
        case "signOut":
          setUser(null);
          setStudentData(null);
          setLoading(false);
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data);
          break;
      }
    });
    setLoading(true);
    getUser().then((userData) => setUser(userData));
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!mountedRef.current) return null;
    if (user) {
      getStudent(user.attributes.email).then((student) => {
        if (student.length > 0) {
          setStudentData(student);
        } else {
          setStudentData(null);
        }
        setLoading(false);
      });
    }
  }, [user, studentData]);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log("Not signed in"));
  }

  async function getStudent(email) {
    const student = await DataStore.query(Student, (c) => c.email("eq", email));
    return student;
  }
  return (
    <>
      <Layout info={user ? { email: user.attributes.email } : false}>
        <div className={styles.center}>
          <div className={styles.container}>
            {loading && user && <h1>Loading ... </h1>}
            {!loading && studentData && <Dashboard data={studentData[0]} />}
            {!loading && !studentData && <NotFound />}
          </div>
        </div>
      </Layout>
    </>
  );
}
