import InvoicesInfo from "./InvoicesMenu";
import InvoicesStyles from "./Invoices.module.css"
import Invoice from "./Invoice";
import NothingHere from "./NothingHere";
import { useContext, useEffect, useState } from "react";
import InvoicesMenu from "./InvoicesMenu";
import { ThemeContext } from "../../App";


export default function Invoices({invoices, setInvoices}) {
    const [filterStatus, setFilterStatus] = useState({all: true, paid: false, pending: false, draft: false})
    const [invoicesList, setInvoicesList] = useState(invoices)
    const [displayList, setDisplayList] = useState()
    const darkMode = useContext(ThemeContext)

    function updateDisplayList() {
        setDisplayList(invoicesList.map((invoice) => (
            <Invoice darkMode={darkMode} invoice={invoice} key={invoice.number} invoices={invoices} setInvoices={setInvoices}/>
        )))
    }

    function filterDisplayList(status, extraStatus) {
        console.log(invoices)
        setInvoicesList(invoices.filter(singleInvoice => {
            return singleInvoice.status === status || singleInvoice.status === extraStatus
        }))
    }

    function changeDisplayList() {
        if (filterStatus.pending === false && filterStatus.draft == false && filterStatus.paid === false) {
            setInvoicesList(invoices)
        } else if (filterStatus.pending && filterStatus.draft && filterStatus.paid) {
            setInvoicesList(invoices)
        } else if (filterStatus.paid && filterStatus.pending === false && filterStatus.draft == false) { // only displays paid invoices
            filterDisplayList("Paid")
        } else if (filterStatus.pending && filterStatus.paid === false && filterStatus.draft == false) { // only displays pending invoices
            filterDisplayList("Pending")
        } else if (filterStatus.draft && filterStatus.paid === false && filterStatus.pending == false) { // only displays draft invoices
            filterDisplayList("Draft")
        } else if (filterStatus.pending === true && filterStatus.paid === true && filterStatus.draft == false) { // only displays pending and paid invoices
            filterDisplayList("Pending", "Paid")
        } else if (filterStatus.pending && filterStatus.draft && filterStatus.paid == false) { // only displays pending and draft invoices
            filterDisplayList("Draft", "Pending")
        } else if (filterStatus.paid && filterStatus.draft && filterStatus.pending == false) { // only displays paid and draft invoices
            filterDisplayList("Paid", "Draft")
        } 
    }

    function handlePaidFilter() {
        setFilterStatus(currentStatus => {
            return {
                ...currentStatus,
                paid: !currentStatus.paid
            }
        })
    }

    function handlePendingFilter() {
        setFilterStatus(currentStatus => {
            return {
                ...currentStatus,
                pending: !currentStatus.pending
            }
        })
    }

    function handleDraftFilter() {
        setFilterStatus(currentStatus => {
            return {
                ...currentStatus,
                draft: !currentStatus.draft
            }
        })
    }

    

    useEffect(() => {
        updateDisplayList()
    }, [])

    useEffect(() => {
        updateDisplayList()
    }, [invoicesList, darkMode])

    useEffect(() => {
        changeDisplayList()
    }, [filterStatus])



    return (
        <main className={`${InvoicesStyles["invoices"]} ${InvoicesStyles[`invoices__${darkMode}`]}`}>
            <InvoicesMenu invoices={invoices} filterStatus={filterStatus} displayList={displayList} handlePaidFilter={handlePaidFilter} handlePendingFilter={handlePendingFilter} handleDraftFilter={handleDraftFilter}/>
            {invoices.length > 0 ? displayList : <NothingHere />}
        </main>
    )
}