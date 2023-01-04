import { useContext } from "react"
import { ThemeContext } from "../../App"
import styles from "./SaveButton.module.css"

export default function SaveButton({setGoToHomePage, handleSave}) {
    const darkMode = useContext(ThemeContext)

    return (
        <section className={`${styles["buttons--container"]} ${styles[`buttons--container__${darkMode}`]}`}>
            <div className={`edit-invoice--buttons ${styles["edit-invoice--buttons"]}`}>
                <button className={`${styles["button"]} ${styles["buttons__cancel"]}`} onClick={() => setGoToHomePage(true)}>Cancel</button>
                <button className={`${styles["button"]} ${styles["buttons__save"]}`} onClick={handleSave}>Save Changes</button>        
            </div>
        </section>
    )
}