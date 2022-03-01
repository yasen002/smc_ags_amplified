import React, { useEffect, useState } from 'react'
import Layout from '../../../Component/layouts/Layout';
import Button from '../../../Component/Button';
import { Auth } from 'aws-amplify';

export default function Unauthorizedemail({ signOut, user }) {
    return (
        <>
            <Layout>
                <div >
                    <p>Inorder to sign up for SMC AGS, you must verify that you are an SMC student by signing in with an email that ends with @student.smc.edu.</p>
                    <p>Please sign in with an SMC student email.</p>
                    <Button onclick={() => Auth.federatedSignIn({ provider: "Google" })} >Sign in with SMC email</Button>
                </div>
            </Layout>
        </>
    )
}

