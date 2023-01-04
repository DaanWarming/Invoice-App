import { useContext, useEffect, useState } from "react"
import InvoiceInfoStyles from "./InvoiceInfo.module.css"
import { ThemeContext } from "../../App";


export default function InvoiceInfo({invoice}) {
    const [totalPrice, setTotalPrice] = useState(0)
    const [width, setWidth] = useState(window.innerWidth);
    const darkMode = useContext(ThemeContext)

    const widthBreak = 599

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
        <>
            <section className={`invoice__status--container ${InvoiceInfoStyles["invoice__status--container"]} ${InvoiceInfoStyles[`invoice__status--container__${darkMode}`]}`}>
                <div className={InvoiceInfoStyles["invoice__status"]}>
                    <p className={InvoiceInfoStyles["invoice__status__text"]}>Status</p>
                    {invoice.status === "Draft" && <p className={`${InvoiceInfoStyles["invoice__status--draft"]} ${InvoiceInfoStyles[`invoice__status--draft__${darkMode}`]}`}><span className={InvoiceInfoStyles["invoice__status-dot"]}></span> Draft</p>}
                    {invoice.status === "Paid" && <p className={`${InvoiceInfoStyles["invoice__status--paid"]} ${InvoiceInfoStyles[`invoice__status--paid__${darkMode}`]}`}><span className={InvoiceInfoStyles["invoice__status-dot"]}></span> Paid</p>}
                    {invoice.status === "Pending" && <p className={`${InvoiceInfoStyles["invoice__status--pending"]} ${InvoiceInfoStyles[`invoice__status--pending__${darkMode}`]}`}><span className={InvoiceInfoStyles["invoice__status-dot"]}></span> Pending</p>}
                </div>
            </section>

            <section className={`invoice__details--container ${InvoiceInfoStyles["invoice__details--container"]} ${InvoiceInfoStyles[`invoice__details--container__${darkMode}`]}`}>
                <div className={InvoiceInfoStyles["invoice__details"]}>
                    <div className={InvoiceInfoStyles["invoice__number-address--container"]}>
                        <div className={InvoiceInfoStyles["invoice__number"]}>
                            <p className={InvoiceInfoStyles["invoice__item-number"]} id={InvoiceInfoStyles[`invoice__item-number__${darkMode}`]}><span className={InvoiceInfoStyles["invoice__number--hashtag"]}>#</span>{invoice.number}</p>
                            <p className={InvoiceInfoStyles["invoice__item"]}>{invoice.projectDescription}</p>
                        </div>
                        <address className={InvoiceInfoStyles["invoice__address"]}>
                            <p className={InvoiceInfoStyles["invoice__address--line"]}>{invoice.street}</p>
                            <p className={InvoiceInfoStyles["invoice__address--line"]}>{invoice.city}</p>
                            <p className={InvoiceInfoStyles["invoice__address--line"]}>{invoice.postCode}</p>
                            <p className={InvoiceInfoStyles["invoice__address--line"]}>{invoice.country}</p>
                        </address>
                    </div>
                    <div className={InvoiceInfoStyles["invoice__date-address-email-container"]}>
                        <div className={InvoiceInfoStyles["invoice__date-address-container"]}>
                            <div className={InvoiceInfoStyles["invoice__date-container"]}>
                                <div className={InvoiceInfoStyles["invoice__date"]}>
                                    <p className={InvoiceInfoStyles["invoice__date__text"]}>Invoice Date</p>
                                    <time className={`${InvoiceInfoStyles["invoice__date__date"]} ${InvoiceInfoStyles[`invoice__date__date__${darkMode}`]}`}>{invoice.date}</time>
                                </div>
                                <div className={`${InvoiceInfoStyles["invoice__date"]} ${InvoiceInfoStyles["invoice__date--second"]}`}>
                                    <p className={InvoiceInfoStyles["invoice__date__text"]}>Payment Due</p>
                                    <time className={`${InvoiceInfoStyles["invoice__date__date"]} ${InvoiceInfoStyles[`invoice__date__date__${darkMode}`]}`}>{invoice.paymentDue}</time>
                                </div>
                            </div>
                            <div className={InvoiceInfoStyles["invoice__address-name--container"]}>
                                <div>
                                    <p className={InvoiceInfoStyles["invoice__name"]}>Bill To</p>
                                    <p className={InvoiceInfoStyles["invoice__name--name"]} id={InvoiceInfoStyles[`invoice__name--name__${darkMode}`]}>{invoice.clientName}</p>
                                </div>
                                <address className={InvoiceInfoStyles["invoice__address--bill"]}>
                                    <p className={InvoiceInfoStyles["invoice__address--line"]}>{invoice.clientStreet}</p>
                                    <p className={InvoiceInfoStyles["invoice__address--line"]}>{invoice.clientCity}</p>
                                    <p className={InvoiceInfoStyles["invoice__address--line"]}>{invoice.clientPostCode}</p>
                                    <p className={InvoiceInfoStyles["invoice__address--line"]}>{invoice.clientCountry}</p>
                                </address>
                            </div>
                        </div>
                        <div className={InvoiceInfoStyles["invoice__email"]}>
                            <p className={InvoiceInfoStyles["invoice__email--text"]}>Sent to</p>
                            <p className={InvoiceInfoStyles["invoice__email--email"]} id={InvoiceInfoStyles[`invoice__email--email__${darkMode}`]}>{invoice.clientEmail}</p>
                        </div>
                    </div>
                    
                    <div className={InvoiceInfoStyles["invoice__summary-total--container"]}>
                        <div className={`${InvoiceInfoStyles["invoice__summary"]} ${InvoiceInfoStyles[`invoice__summary__${darkMode}`]}`}>
                            {width > widthBreak && 
                                <div className={InvoiceInfoStyles["invoice__summary--description--container"]}>
                                    <p className={`${InvoiceInfoStyles["invoice__summary--description"]} ${InvoiceInfoStyles["invoice__summary--description--name"]}`}>Item Name</p>
                                    <p className={`${InvoiceInfoStyles["invoice__summary--description"]} ${InvoiceInfoStyles["invoice__summary--description--quantity"]}`}>QTY.</p>
                                    <p className={`${InvoiceInfoStyles["invoice__summary--description"]} ${InvoiceInfoStyles["invoice__summary--description--singe-price"]}`}>Price</p>
                                    <p className={`${InvoiceInfoStyles["invoice__summary--description"]} ${InvoiceInfoStyles["invoice__summary--description--total-price"]}`}>Total</p>
                                </div> }
                            {invoice.itemList.map((item) => (
                                <div className={InvoiceInfoStyles["invoice__summary--item"]} key={item.name}>
                                    <div className={InvoiceInfoStyles["invoice__summary--item--info"]}>
                                        <p className={InvoiceInfoStyles["invoice__summary--item--name"]} id={InvoiceInfoStyles[`invoice__summary--item--name__${darkMode}`]}>{item.name}</p>
                                        {width < widthBreak && <p className={InvoiceInfoStyles["invoice__summary--item--price"]} id={InvoiceInfoStyles[`invoice__summary--item--price__${darkMode}`]}>{item.quantity} x € {item.price}</p>}
                                    </div>
                                    {width > widthBreak &&
                                        <>
                                            <p className={`${InvoiceInfoStyles["invoice__summary--item--price"]} ${InvoiceInfoStyles["invoice__summary--item-quantity"]}`}>{item.quantity}</p>
                                            <p className={`${InvoiceInfoStyles["invoice__summary--item--price"]} ${InvoiceInfoStyles["invoice__summary--item-singe-price"]}`}>€ {item.price}</p>
                                        </>
                                    }
                                    <p className={InvoiceInfoStyles["invoice__summary--item--total"]} id={InvoiceInfoStyles[`invoice__summary--item--total__${darkMode}`]}>€ {item.quantity * item.price}</p>
                                </div>
                            ) )}
                        </div>
                        <div className={`${InvoiceInfoStyles["invoice__total--container"]} ${InvoiceInfoStyles[`invoice__total--container__${darkMode}`]}`}>
                            <div className={InvoiceInfoStyles["invoice__total"]}>
                                <p className={InvoiceInfoStyles["invoice__total--text"]}>Grand Total</p>
                                <p className={InvoiceInfoStyles["invoice__total--price"]} id={InvoiceInfoStyles[`invoice__total--price__${darkMode}`]}>€ {totalPrice}.00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}