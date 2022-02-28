import React from 'react'
import { varNameGenerator } from '../utils/helper'
import styles from '../styles/Checkbox.module.scss'
function Checkbox({ data, checkHandler }) {
    return (
        <div className={styles.container}>
            <p>{data.title}</p>
            {data.values.map((value, index) => {
                let ids = varNameGenerator(value, true);
                return <div key={index} className={styles.row}>
                    <input onClick={checkHandler} type="checkbox" id={ids} name={data.name} defaultValue={value} />
                    <label htmlFor={ids}> {value}</label><br />
                </div>
            })}
        </div>
    )
}

export default Checkbox
