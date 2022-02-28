import React, { useEffect, useState } from 'react'
// import styles from '../../../styles/ags/signup/welcome.module.scss'
// import { DataStore } from '@aws-amplify/datastore';
// import { Student } from '../../../src/models';
import { Auth } from 'aws-amplify';
import Layout from '../../../Component/layouts/Layout';
// import Button from '../../../Component/Button';
import { useRouter } from 'next/router';
import Form from '../../../Component/Form';


export default function page({ signOut, user }) {
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


// useEffect(() => {
//     fetchStudents()
//     async function fetchStudents() {
//         const studentData = await DataStore.query(Student);
//         setStudents(studentData)
//     }
// }, [])

// {
//     "sub": "d35d91f0-48b8-4629-8a7f-6c3f362f16e8",
//     "identities": "[{\"userId\":\"104142427804075574374\",\"providerName\":\"Google\",\"providerType\":\"Google\",\"issuer\":null,\"primary\":true,\"dateCreated\":1646034013110}]",
//     "email_verified": false,
//     "given_name": "ABUDIKERANMU",
//     "family_name": "YASEN",
//     "email": "yasen_abudikeranmu@student.smc.edu"
// }