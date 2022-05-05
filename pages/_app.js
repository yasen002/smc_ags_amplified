import { Amplify } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Hub } from "aws-amplify";
import Cookies from "js-cookie";
import "../styles/globals.css";
import awsExports from "../src/aws-exports.js";

awsExports.oauth.redirectSignIn = `${process.env.NEXT_PUBLIC_REDIRECT_URL}`;
awsExports.oauth.redirectSignOut = `${process.env.NEXT_PUBLIC_REDIRECT_URL}`;
Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
  const [dataReady, setDataReady] = useState(false);
  const dataStoreCookieName = "datastore";

  useEffect(() => {
    if (dataReady) {
      Cookies.set(dataStoreCookieName, "true", {
        expires: 1,
      });
    }
  }, [dataReady]);

  //amplify hub for datastore
  useEffect(() => {
    // Start the DataStore, this kicks-off the sync process.
    DataStore.start();
    // install Amplify user hub for datastore
    const datastoreListener = Hub.listen(dataStoreCookieName, async (capsule) => {
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
      Cookies.remove(dataStoreCookieName);
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
