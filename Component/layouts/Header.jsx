import styles from "../../styles/header.module.scss"
import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify';

export default function Header({ info = false }) {
    const [email, setEmail] = useState(null)
    useEffect(() => {
        if (info) {
            setEmail(info.email)
        }
    }, [])

    return (
        <header>
            <noscript>
                <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
            </noscript>
            <div className={styles.signedInStatus}>
                {!email && email !== false && (
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

                {/* need this part for all signins */}
                {email && (
                    <>
                        <span className={styles.signedInText}>
                            <small>Signed in as</small>
                            <br />
                            <strong>{email || info.name}</strong>
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
