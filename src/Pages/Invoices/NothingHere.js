import NothingHereStyles from './NothingHere.module.css'
import illustrationEmpty from "../../assets/illustration-empty.svg"
import { useContext } from 'react'
import { ThemeContext } from '../../App'


export default function NothingHere() {
    const darkMode = useContext(ThemeContext)
    return (
        <div className={`${NothingHereStyles["invoices-empty"]} ${NothingHereStyles[`invoices-empty__${darkMode}`]}`}>
            <img src={illustrationEmpty} className={NothingHereStyles ["invoices-empty--img"]}/>
            <h2 className={NothingHereStyles["invoices-empty--title"]}>There is nothing here</h2>
            <p className={NothingHereStyles["invoices-empty--text"]}>Create an invoice by clicking the <span className={NothingHereStyles ["invoices-empty--word"]}>New</span> button and get started</p>
        </div>
    )
}