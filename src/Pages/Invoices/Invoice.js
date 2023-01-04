import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ThemeContext } from "../../App"
import InvoiceStyles from "./Invoice.module.css"
import arrowRight from "../../assets/icon-arrow-right.svg"

export default function Invoice({invoice, invoices, setInvoices}) {
    const [totalPrice, setTotalPrice] = useState(0)
    const [width, setWidth] = useState(window.innerWidth);
    const darkMode = useContext(ThemeContext)

    const widthBreak = 649
    
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

    function calculateTotalPrice() {
        var newTotalPrice = 0
        for (let i = 0; i < invoice.itemList.length; i++) {
            newTotalPrice += invoice.itemList[i].quantity * invoice.itemList[i].price
        }
        setTotalPrice(newTotalPrice)
    }

    useEffect(() => {
        calculateTotalPrice()
    }, [])

    return (
        <Link to={invoice.number} className={`invoice ${InvoiceStyles["invoices--container"]} ${InvoiceStyles[`invoices--container__${darkMode}`]}`}>
            {width < widthBreak ? 
                <div className={`invoice ${InvoiceStyles["invoice"]} ${InvoiceStyles[`invoice__${darkMode}`]}`}> 
                    <div className={InvoiceStyles["invoice__number-name"]}>
                        <p className={`${InvoiceStyles["invoice__number"]} ${InvoiceStyles[`invoice__number__${darkMode}`]}`}><span className={InvoiceStyles["invoice__number-span"]}>#</span>{invoice.number}</p>
                        <p className={`${InvoiceStyles["invoice__name"]} ${InvoiceStyles[`invoice__name__${darkMode}`]}`}>{invoice.clientName}</p>
                    </div>
                    <div className={InvoiceStyles["invoice__date-price-status"]}>
                        <div className={InvoiceStyles["invoice__date-price"]}>
                            <p className={`${InvoiceStyles["invoice__date"]} ${InvoiceStyles[`invoice__date__${darkMode}`]}`}>Due {invoice.paymentDue}</p>
                            <p className={`${InvoiceStyles["invoice__price"]} ${InvoiceStyles[`invoice__price__${darkMode}`]}`}>€ {totalPrice}.00</p>
                        </div>
                        {invoice.status === "Draft" && <p className={`${InvoiceStyles["invoice__status--draft"]} ${InvoiceStyles[`invoice__status--draft__${darkMode}`]}`}><span className={InvoiceStyles["invoice__status-dot"]}></span> Draft</p>}
                        {invoice.status === "Paid" && <p className={`${InvoiceStyles["invoice__status--paid"]} ${InvoiceStyles[`invoice__status--paid__${darkMode}`]}`}><span className={InvoiceStyles["invoice__status-dot"]}></span> Paid</p>}
                        {invoice.status === "Pending" && <p className={`${InvoiceStyles["invoice__status--pending"]} ${InvoiceStyles[`invoice__status--pending__${darkMode}`]}`}><span className={InvoiceStyles["invoice__status-dot"]}></span> Pending</p>}
                    </div>
                </div> : 
                <div className={`invoice ${InvoiceStyles["invoice"]} ${InvoiceStyles[`invoice__${darkMode}`]}`}>
                    <p className={`${InvoiceStyles["invoice__number"]} ${InvoiceStyles[`invoice__number__${darkMode}`]}`}><span className={InvoiceStyles["invoice__number-span"]}>#</span>{invoice.number}</p>
                    <p className={`${InvoiceStyles["invoice__date"]} ${InvoiceStyles[`invoice__date__${darkMode}`]}`}>Due {invoice.paymentDue}</p>
                    <p className={`${InvoiceStyles["invoice__name"]} ${InvoiceStyles[`invoice__name__${darkMode}`]}`}>{invoice.clientName}</p>
                    <p className={`${InvoiceStyles["invoice__price"]} ${InvoiceStyles[`invoice__price__${darkMode}`]}`}>€ {totalPrice}.00</p>
                    {invoice.status === "Draft" && <p className={`${InvoiceStyles["invoice__status--draft"]} ${InvoiceStyles[`invoice__status--draft__${darkMode}`]}`}><span className={InvoiceStyles["invoice__status-dot"]}></span> Draft</p>}
                    {invoice.status === "Paid" && <p className={`${InvoiceStyles["invoice__status--paid"]} ${InvoiceStyles[`invoice__status--paid__${darkMode}`]}`}><span className={InvoiceStyles["invoice__status-dot"]}></span> Paid</p>}
                    {invoice.status === "Pending" && <p className={`${InvoiceStyles["invoice__status--pending"]} ${InvoiceStyles[`invoice__status--pending__${darkMode}`]}`}><span className={InvoiceStyles["invoice__status-dot"]}></span> Pending</p>}
                    <img className={InvoiceStyles["invoice__arrow-icon"]} src={arrowRight} alt="arrow right"/>
                </div>
            } 
        </Link>
    )
}