import React from 'react'
import styles from '../styles/Button.module.scss'

export default function Button({ children, onclick = () => { }, styleOverride = {} }) {
    return (
        <button className={styles.button} style={styleOverride} onClick={onclick}>{children}</button>
    )
}
