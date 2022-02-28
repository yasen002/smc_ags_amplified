import React, { useEffect, useState } from 'react'
import styles from '../../../styles/ags/signup/welcome.module.scss'
import { DataStore } from '@aws-amplify/datastore';
import { Student } from '../../../src/models';
import { Auth } from 'aws-amplify';
import Layout from '../../../Component/layouts/Layout';
import Button from '../../../Component/Button';

export default function Welcome({ signOut, user }) {
    const [students, setStudents] = useState([])

    useEffect(() => {
        fetchStudents()
        async function fetchStudents() {
            const studentData = await DataStore.query(Student);
            setStudents(studentData)
            console.log(studentData);
        }
    }, [])
    console.log(students)
    return (
        <>
            <Layout>
                <div className={styles.center}>
                    <div className={styles.container}>
                        <p>Hello New and Continuing AGS members!
                        </p>
                        <p>Please provide all of the information in the application below so that we will have a complete record for you in the AGS database.  Once you have submitted the application, paid the scholarship dues and club donation, and satisfy all requirements you will earn an AGS transcript notation!</p>
                        <p>PLEASE NOTE:  It is your responsibility to learn about all requirements to be eligible to earn an AGS transcript notation.  The scholarship dues is a non-refundable requirement for all members, with the following exceptions:  students in EOPS or Guardian Scholars, and AGS Permanent Members.
                            Our Alpha Gamma Chapter of the statewide AGS organization is mandated to contribute scholarship dues so that AGS members from throughout California can be awarded scholarships for service and academic achievement.  At the annual AGS Spring Convention, approximately $40,000 in scholarships are awarded to AGS members from about forty AGS chapters, from San Diego to Sacramento.</p>
                        <p>The AGS scholarship dues are completely separate from the A.S. Resource fee, which is required of any student who joins any SMC club.  If you are a Promise Grant recipient and your A.S. Resource fee is paid for by the Promise Grant,  there will be a place in this application where you can upload a screenshot for proof.</p>
                        <p>Please fill out this form completely. Note that all our board members are FERPA certified in accordance with SMC&apos;s policies on student information. Only faculty advisers will have access to transcripts.</p>
                        <p>We hope you had a restful and productive break and we Welcome you to the AGS family!</p>
                        <div>
                            {/* <h1>Hello {user.username}</h1>
                            <button onClick={signOut}>Sign out</button> */}
                            <Button onclick={() => Auth.federatedSignIn({ provider: "Google" })} >Sign in with SMC email</Button>
                        </div>
                    </div>
                </div>
            </Layout>

        </>
    )
}


// import { useAuthenticator } from '@aws-amplify/ui-react';

// const App = () => {
//   const { route } = useAuthenticator(context => [context.route]);

//   // Use the value of route to decide which page to render
//   return route === 'authenticated' ? <Home /> : <Authenticator />;
// };

// await Auth.signOut({ global: true });