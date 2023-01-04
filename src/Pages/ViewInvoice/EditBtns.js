import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import EditBtnsStyles from "./EditBtns.module.css"
import { ThemeContext } from "../../App";

export default function EditBtns({setEditInvoice, invoice, invoices, setInvoices}) {
    const [deletePrompt, setDeletePrompt] = useState(false)
    const darkMode = useContext(ThemeContext)

    function deleteInvoice(id) {
        const updateInvoices = invoices.filter(singleInvoice => {
            return singleInvoice.number !== invoice.number
        })
        setInvoices(updateInvoices)
    }

    function handleClickDelete() {
        setDeletePrompt(!deletePrompt)
    }

    function markAsPaid() {
        const newInvoiceStatus = invoices.map(oldInvoice => {
            if (oldInvoice.number === invoice.number) {
                return {
                    ...oldInvoice,
                    status: "Paid"
                }
            } else return oldInvoice
        })
        setInvoices(newInvoiceStatus)
    }

    // Confirm delete popup screen

    function ConfirmDeletion() {
        function closeConfirmDelete(event) {  // close the confirm deletion screen when clicked next to it
            event.preventDefault()
            if (event.target === event.currentTarget) {
                setDeletePrompt(false)
            }
        }

        return (
            <div className={EditBtnsStyles["btns__confirm--container"]} onClick={closeConfirmDelete}>
                <div className={`${EditBtnsStyles["btns__confirm"]} ${EditBtnsStyles[`btns__confirm__${darkMode}`]}`}>
                    <h2 className={`${EditBtnsStyles["btns__confirm--title"]} ${EditBtnsStyles[`btns__confirm--title__${darkMode}`]}`}>Confirm Deletion</h2>
                    <p className={`${EditBtnsStyles["btns__confirm--text"]} ${EditBtnsStyles[`btns__confirm--text__${darkMode}`]}`}>Are you sure you want to delete invoice #{invoice.number}? This action cannot be undone.</p>
                    <div className={EditBtnsStyles["btns__confirm--buttons"]}>
                        <button className={`${EditBtnsStyles["btns__cancel"]} ${EditBtnsStyles[`btns__cancel__${darkMode}`]}`} onClick={handleClickDelete}>Cancel</button>
                        <Link to="/"> <button className={EditBtnsStyles["btns__delete"]} onClick={deleteInvoice}>Delete</button> </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {deletePrompt ? <ConfirmDeletion /> : null}
            <section className={`btns--container ${EditBtnsStyles["btns--container"]} ${EditBtnsStyles[`btns--container__${darkMode}`]}`}>
                <div className={EditBtnsStyles["btns"]}>
                    <Link to={`/EditInvoice/${invoice.number}`} onClick={() => setEditInvoice(invoice)} ><button className={`${EditBtnsStyles["btns__edit"]} ${EditBtnsStyles[`btns__edit__${darkMode}`]} `}>Edit</button></Link>
                    <button className={EditBtnsStyles["btns__delete"]} onClick={handleClickDelete}>Delete</button>
                    <button className={EditBtnsStyles["btns__paid"]} onClick={markAsPaid}>Mark as Paid</button>
                </div>
            </section>
        </>
        
    )
}