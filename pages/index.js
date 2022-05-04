import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { DataStore } from "@aws-amplify/datastore";
import { Student } from "../src/models";
import { Auth, Hub } from "aws-amplify";
import Layout from "../Component/layouts/Layout";
import Dashboard from "../Component/Dashboard";
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

function getStudent(email) {
  return DataStore.query(Student, (c) => c.email("eq", email));
}

export default function Home() {
  const [user, setUser] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataReady, setDataReady] = useState(false);

  //amplify hub for auth
  useEffect(() => {
    const authListener = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          getUser()
            .then((userData) => {
              setUser(userData);
              var inTwoHours = new Date(new Date().getTime() + 120 * 60 * 1000);
              Cookies.set("user", JSON.stringify(userData.attributes), {
                expires: inTwoHours,
              });
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
      authListener();
    };
  }, []);

  //amplify hub for datastore
  useEffect(() => {
    // Start the DataStore, this kicks-off the sync process.
    DataStore.start();

    // install Amplify user hub for datastore
    const datastoreListener = Hub.listen("datastore", async (capsule) => {
      const {
        payload: { event, data },
      } = capsule;

      if (event === "ready") {
        setDataReady(true);
      }
    });

    return () => {
      //removes listener once the sync is done
      datastoreListener();
    };
  }, []);

  useEffect(() => {
    if (!!!user?.attributes.email || !dataReady) return;

    const fetchStudentData = async () => {
      let studentData = await getStudent(user.attributes.email);
      if (studentData.length > 0) {
        setStudentData(studentData[0]);
      } else {
        setStudentData(null);
      }
      setLoading(false);
    };

    fetchStudentData().catch(console.error);
  }, [dataReady, user]);

  return (
    <>
      <Layout info={user ? { email: user.attributes.email } : false}>
        {!!user && loading && <Loading />}
        {!!!user && <h1>Please Sign in </h1>}
        {!!user && !loading && !!studentData && <Dashboard data={studentData} />}
        {!!user && !loading && !!!studentData && (
          <div>
            <h1>
              Your Data was not found. Please
              <Link href="/signup">
                <a>click here to sign up</a>
              </Link>
            </h1>
          </div>
        )}
      </Layout>
    </>
  );
}
