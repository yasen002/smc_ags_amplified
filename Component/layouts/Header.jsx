import $ from "../../styles/header.module.scss";
import React from "react";
import { Auth } from "aws-amplify";
import Cookies from "js-cookie";

export default function Header({ info = false }) {
  return (
    <header className={$.layoutHeader}>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={$.signedInStatus}>
        {!info?.email && (
          <>
            <span className={$.notSignedInText}>You are not signed in</span>
            <span className={$.buttonPrimary} onClick={() => Auth.federatedSignIn({ provider: "Google" })}>
              Sign in
            </span>
          </>
        )}

        {info?.email && (
          <>
            <span className={$.signedInText}>
              <small>Signed in as</small>
              <br />
              <strong>{info.email || info.name}</strong>
            </span>
            <span
              className={$.button}
              onClick={(e) => {
                Cookies.remove("student");
                Auth.signOut();
              }}
            >
              Sign out
            </span>
          </>
        )}
      </div>
    </header>
  );
}
