import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../App"
import BackBtn from "../../Components/BackBtn/BackBtn";
import NewInvoice from "../CreateInvoice/NewInvoice";
import ViewInvoice from "../ViewInvoice/ViewInvoice";
import styles from "./EditInvoice.module.css"
import SaveButton from "./SaveButton";


export default function EditInvoice({editInvoice, invoices, setInvoices}) {
    const darkMode = useContext(ThemeContext)
    const [width, setWidth] = useState(window.innerWidth);
    const [goToHomePage, setGoToHomePage] = useState(false)
    const [newInvoice, setNewInvoice] = useState()
    const [sendNewInvoice, setSendNewInvoice] = useState(false)
    const [formError, setFormError] = useState(false)
    const [itemListError, setItemListError] = useState(false)

    const widthBreak = 749

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)
        handleResize() 

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [setWidth])

    function formValidation() {  // Validates the form input
        var checkInput = newInvoice.itemList.map(item => {
            if (item.name === "" || item.price === "" || item.quantity === "") {
                return false
            } else return true
        })
        if (!newInvoice.street || !newInvoice.city || !newInvoice.postCode || !newInvoice.country || 
        !newInvoice.clientName || !newInvoice.clientStreet || !newInvoice.clientPostCode || 
        !newInvoice.clientCountry || !newInvoice.projectDescription) {
            setFormError(true);
            return false
        } else if (checkInput.every(element => element === true) === false) {
            setFormError(false);
            setItemListError(true);
            return false
        } else {
            return true
        }
    }

    function handleSave() {
        if (formValidation()) {
            if (newInvoice.status === "Paid") {
                handleStatus()
            } else {
                setSendNewInvoice(true)
                setNewInvoice({...newInvoice, status: "Pending"})
            }
        }
    }

    function handleStatus() {
        const editedInvoicesList =  invoices.map(oldInvoice => {
            if (oldInvoice.number === editInvoice.number) {
                return newInvoice
            } else return oldInvoice
        })
        setInvoices(editedInvoicesList)
        setGoToHomePage(true)
    }

    useEffect(() => {
        if (sendNewInvoice) {
            handleStatus()
        }
    }, [sendNewInvoice])

    let navigate = useNavigate();

    useEffect(() => {  // Navigates to the home page
        if (goToHomePage) {
            navigate("/")
        }
    }, [goToHomePage])

    return (
        <>
            <main className={`${styles["edit-invoice--container"]} ${styles[`edit-invoice--container__${darkMode}`]}`}>
                <div className={`${styles["edit-invoice"]} ${styles[`edit-invoice__${darkMode}`]}`}>
                    {width < widthBreak && <div className={styles["edit-invoice--back-btn"]}><BackBtn /></div>}
                    <NewInvoice editInvoice={editInvoice} setNewInvoice={setNewInvoice} itemListError={itemListError} formError={formError} />
                    <SaveButton handleSave={handleSave} setGoToHomePage={setGoToHomePage} />
                </div>
            </main>
            {width > widthBreak && <div className={styles["invoice-on-background"]}><ViewInvoice invoice={editInvoice} setInvoices={setInvoices} invoices={invoices} /></div>}
        </>

    )
}
