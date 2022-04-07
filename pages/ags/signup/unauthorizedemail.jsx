import React, { useEffect, useState } from 'react'
import Layout from '../../../Component/layouts/Layout';
import Button from '../../../Component/Button';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

export default function Unauthorizedemail({ signOut, user }) {
    const router = useRouter()
    return (
        <>
            <Layout>
                <div >
                    <p>Inorder to sign up for SMC AGS, you must verify that you are an SMC student by signing in with an email that ends with @student.smc.edu.</p>
                    <p>Please sign in with an SMC student email.</p>
                    <Button onclick={() => Auth.signOut({ global: true })} >Sign out and sign in with SMC email</Button>
                </div>
            </Layout>
        </>
    )
}

