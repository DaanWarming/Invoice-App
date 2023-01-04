import BackBtnStyles from "./BackBtn.module.css"
import ArrowLeft from "../../assets/icon-arrow-left.svg"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { ThemeContext } from "../../App"

export default function BackBtn() {
    const darkMode = useContext(ThemeContext)
    return (
        <Link to="/" className={`back-btn ${BackBtnStyles["back-btn"]} ${BackBtnStyles[`back-btn__${darkMode}`]}`}>
            <img src={ArrowLeft} alt="arrow left"/>
            <p className={`${BackBtnStyles["back-btn__text"]} ${BackBtnStyles[`back-btn__text__${darkMode}`]}`}>Go Back</p>
        </Link>
    )
}