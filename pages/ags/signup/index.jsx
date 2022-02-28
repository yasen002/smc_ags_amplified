import React, { useEffect, useState } from 'react'
// import styles from '../../../styles/ags/signup/welcome.module.scss'
// import { DataStore } from '@aws-amplify/datastore';
// import { Student } from '../../../src/models';
import { Auth } from 'aws-amplify';
import Layout from '../../../Component/layouts/Layout';
// import Button from '../../../Component/Button';
import { useRouter } from 'next/router';
import Form from '../../../Component/Form';


export default function Page({ signOut, user }) {
    const [attributes, setAttributes] = useState(null)
    const router = useRouter()

    useEffect(() => {
        setAuth()
        async function setAuth() {
            try {
                const user = await Auth.currentAuthenticatedUser();
                const { attributes } = user;
                setAttributes(attributes)
            } catch (error) {
                setAttributes(false)
                router.push("/ags/signup/welcome")
                console.log(error)
            }
        }
    }, [])
    return (
        <Layout>
            {attributes !== null && <Form attributes={attributes} />}
        </Layout>


    )
}

