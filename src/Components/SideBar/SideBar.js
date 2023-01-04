
import SideBarStyles from "./SideBar.module.css"
import Logo from "../../assets/logo.svg"
import Avatar from "../../assets/image-avatar.jpg"
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import Shape from "../../assets/rectangle-background.png"
import { useContext } from "react"
import { ThemeContext } from "../../App"

// 

export default function SideBar({isDarkMode, toggleDarkMode}) {
    const darkMode = useContext(ThemeContext)
    return (
        <>
        <div className={`${SideBarStyles["side-bar--container"]} ${SideBarStyles[`side-bar--container__${darkMode}`]}`}>
            <div className={SideBarStyles["side-bar__logo-background"]}>
                <img src={Shape} className={SideBarStyles["side-bar__icon-background"]} alt="background shape"/>
                <img src={Logo} className={SideBarStyles["side-bar__logo"]} alt="logo"/>
            </div>
            <DarkModeSwitch className={SideBarStyles["side-bar__toggle"]}  // https://www.npmjs.com/package/react-toggle-dark-mode
                checked={isDarkMode}
                onChange={toggleDarkMode}
                sunColor="#858BB2;"
                moonColor="#7E88C3"
            />
            <div className={SideBarStyles["side-bar__avatar--container"]} >
                <img src={Avatar} className={SideBarStyles["side-bar__avatar"]} alt="avatar"/>
            </div>
        </div>
        </>
    )
}