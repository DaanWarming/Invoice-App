import { useContext, useEffect } from "react"
import { useState } from "react"
import BackBtn from "../../Components/BackBtn/BackBtn"
import ActionButtons from "./ActionButtons"
import styles from "./CreateInvoice.module.css"
import NewInvoice from "./NewInvoice"
import {useNavigate } from "react-router-dom"
import { ThemeContext } from "../../App"
import Invoices from "../Invoices/Invoices"

export default function CreateInvoice({invoices, setInvoices}) {
    const darkMode = useContext(ThemeContext)
    const [width, setWidth] = useState(window.innerWidth);
    const [newInvoice, setNewInvoice] = useState()
    const [sendInvoiceToList, setSendInvoiceToList] = useState(false)
    const [goToHomePage, setGoToHomePage] = useState(false)
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
        } else if (checkInput.every(element => element === true) === false || newInvoice.itemList.length === 0) {
            setFormError(false);
            setItemListError(true);
            return false
        } else {
            return true
        }
    }

    function addNewInvoiceDraft() {  // Updates invoice status to Draft
        setNewInvoice({...newInvoice, status: "Draft"})
        setSendInvoiceToList(true)
    }

    function addNewInvoiceSend() {  // Updates invoice status to Pending
        if (formValidation()) {
            setNewInvoice({...newInvoice, status: "Pending"})
            setSendInvoiceToList(true)
        } else return
        
    }

    useEffect(() => {  // Sends invoice to the invoice List
        if (sendInvoiceToList) {
            setInvoices(invoices => [...invoices, newInvoice])
            setGoToHomePage(true)
        }
    }, [sendInvoiceToList])

    let navigate = useNavigate();

    useEffect(() => {  // Navigates to the home page
        if (goToHomePage) {
            navigate("/")
        }
    }, [goToHomePage])

    return (
        <>
            <main className={`${styles["create-invoice--container"]} ${styles[`create-invoice--container__${darkMode}`]}`}>
                <div className={`${styles["create-invoice"]} ${styles[`create-invoice__${darkMode}`]}`}>
                    {width < widthBreak && <div className={styles["create-invoice--back-btn"]}><BackBtn /></div>}
                    <NewInvoice setNewInvoice={setNewInvoice} itemListError={itemListError} formError={formError} />
                    <ActionButtons addNewInvoiceDraft={addNewInvoiceDraft} addNewInvoiceSend={addNewInvoiceSend} setGoToHomePage={setGoToHomePage} />
                </div>
            </main>
            {width > widthBreak && <div className={styles["create-invoice__invoice-list"]}><Invoices invoices={invoices} setInvoices={setInvoices}/></div>}
        </>
    )
}