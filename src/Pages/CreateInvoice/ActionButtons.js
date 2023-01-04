import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from "./ActionButtons.module.css"
import { ThemeContext } from "../../App"
import { useContext } from "react"

export default function ActionButtons({setGoToHomePage, addNewInvoiceDraft, addNewInvoiceSend}) {
    const darkMode = useContext(ThemeContext)
    const [linkClicked, setLinkClicked] = useState(false)

    function handleSend() {
        addNewInvoiceSend()
        setLinkClicked(true)
    }

    function handleDraft() {
        addNewInvoiceDraft()
        setLinkClicked(true)
    }
    
    // className={`${styles["buttons--container"]} ${styles[`buttons--container__${darkMode}`]}`}

    return (
        <section className={`${styles["buttons--container"]} ${styles[`buttons--container__${darkMode}`]}`}>
            <div className={`new-invoice--buttons ${styles["new-invoice--buttons"]}`}>
                <button className={`${styles["button"]} ${styles["buttons__discard"]}`} onClick={() => setGoToHomePage(true)}>Discard</button>
                <div className={styles["save-buttons"]}>
                    <button className={`${styles["button"]} ${styles["buttons__draft"]}`} onClick={handleDraft}>Save as Draft</button>
                    <button className={`${styles["button"]} ${styles["buttons__send"]}`} onClick={handleSend}>Save & Send</button>        
                </div>
            </div>
        </section>
    )
}