import styles from "../../styles/header.module.scss"
import React, { } from 'react'
import { Auth } from 'aws-amplify';

export default function Header({ info = false }) {

    return (
        <header>
            <noscript>
                <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
            </noscript>
            <div className={styles.signedInStatus}>
                {!info?.email && (
                    <>
                        <span className={styles.notSignedInText}>
                            You are not signed in
                        </span>
                        <span
                            className={styles.buttonPrimary}
                            onClick={() => Auth.federatedSignIn({ provider: "Google" })}
                        >
                            Sign in
                        </span>
                    </>
                )}


                {info?.email && (
                    <>
                        <span className={styles.signedInText}>
                            <small>Signed in as</small>
                            <br />
                            <strong>{info.email || info.name}</strong>
                        </span>
                        <span
                            className={styles.button}
                            onClick={(e) => {
                                Auth.signOut();
                            }}
                        >
                            Sign out
                        </span>
                    </>
                )}
            </div>
        </header >
    )
}
