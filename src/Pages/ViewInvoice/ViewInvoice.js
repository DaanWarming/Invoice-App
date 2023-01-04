import BackBtn from "../../Components/BackBtn/BackBtn";
import InvoiceInfo from "./InvoiceInfo";
import EditBtns from "./EditBtns"
import ViewInvoiceStyles from "./ViewInvoice.module.css"
import { useContext } from "react";
import { ThemeContext } from "../../App";


export default function ViewInvoice({setEditInvoice, invoices, setInvoices, invoice}) {
    const darkMode = useContext(ThemeContext)
    return (
        <main className={`${ViewInvoiceStyles["view-invoice"]} ${ViewInvoiceStyles[`view-invoice__${darkMode}`]}`}>
            <BackBtn />
            <InvoiceInfo invoice={invoice}/>
            <EditBtns setEditInvoice={setEditInvoice} invoice={invoice} invoices={invoices} setInvoices={setInvoices}/>
        </main>
    )
}