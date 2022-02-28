import React from 'react'
import styles from "../../../styles/unauthorizedemail.module.scss"
import Layout from '../../../Component/layouts/Layout'
import Button from '../../../Component/Button'

function success() {
    return (
        <Layout>
            <div >
                <div>
                    <p>You have successfully submited you AGS applicaiton. You will hear back from our officers after an advisor reviews your uploaded documents. </p>
                    <br />
                    <a style={{ textDecoration: "underline" }} href='http://www.agssmc.org/'>Go to AGS main page</a>
                </div>
            </div>
        </Layout>
    )
}

export default success
