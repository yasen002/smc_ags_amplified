import React from 'react'
import { varNameGenerator } from '../utils/helper'
import styles from '../styles/RadioSelect.module.scss'

function RadioSelect({ data, selectHandler }) {
    return (
        <div className={styles.container}>
            <p>{data.title}</p>
            {data.values.map((value, index) => {
                let ids = varNameGenerator(value, true);
                return <div key={index} className={styles.row}>
                    <input onClick={selectHandler} type="radio" id={ids} name={data.name} defaultValue={value} />
                    <label htmlFor={ids}> {value}</label><br />
                </div>
            })}
        </div>

    )
}

export default RadioSelect