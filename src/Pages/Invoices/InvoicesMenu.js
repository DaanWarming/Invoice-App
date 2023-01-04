import { useContext, useEffect, useState } from "react"
import PlusIcon from "../../assets/icon-plus.svg"
import InvoicesMenuStyles from "./InvoicesMenu.module.css"
import arrowDown from "../../assets/icon-arrow-down.svg"
import { Link } from "react-router-dom"
import { ThemeContext } from "../../App"

export default function InvoicesMenu({invoices, filterStatus, displayList, handlePaidFilter, handlePendingFilter, handleDraftFilter}) {
    const [activeFilter, setActiveFilter] = useState(false)
    const [width, setWidth] = useState(window.innerWidth);
    const darkMode = useContext(ThemeContext)

    const widthBreak = 549

    function filterClick() {
        setActiveFilter(!activeFilter)
    }

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

    
    return (
        <>
            <div className={`invoices-menu ${InvoicesMenuStyles["invoices-menu"]} ${InvoicesMenuStyles[`invoices-menu__${darkMode}`]}`}>
                <div className={InvoicesMenuStyles["invoices-menu__text"]}>
                    <h1 className={InvoicesMenuStyles["invoices-menu__text--title"]}>Invoices</h1>
                    <p className={`${InvoicesMenuStyles["invoices-menu__text--count"]} ${InvoicesMenuStyles[`invoices-menu__text--count__${darkMode}`]}`}>{width > widthBreak ? `There are ${invoices.length} total invoices` : `${invoices.length} invoices`}</p>
                </div>
                <div className={InvoicesMenuStyles["invoices-menu__filter--container"]}>
                    <div className={InvoicesMenuStyles["invoices-menu__filter"]}>
                        <p onClick={filterClick} className={InvoicesMenuStyles["invoices-menu__filter--text"]}>{width > widthBreak ? "Filter by status" : "Filter"}</p>
                        <img className={InvoicesMenuStyles["invoices-menu__filter--arrow"]} src={arrowDown} alt="arrow down"/>
                    </div>
                    {activeFilter ?
                        <ul className={`${InvoicesMenuStyles["invoices-menu__filter--options"]} ${InvoicesMenuStyles[`invoices-menu__filter--options__${darkMode}`]}`}>
                            <li className={InvoicesMenuStyles["invoices-menu__filter--option"]}><input type="checkbox" checked={filterStatus.draft} onChange={handleDraftFilter} id="draft"/><label htmlFor="draft">Draft</label></li>
                            <li className={InvoicesMenuStyles["invoices-menu__filter--option"]}><input type="checkbox" checked={filterStatus.pending} onChange={handlePendingFilter} id="pending"/><label htmlFor="pending">Pending</label></li>
                            <li className={InvoicesMenuStyles["invoices-menu__filter--option"]}><input type="checkbox" checked={filterStatus.paid} onChange={handlePaidFilter} id="paid"/><label htmlFor="paid">Paid</label></li>
                        </ul> 
                    : undefined}
                </div>
                <Link to="CreateInvoice"><button className={InvoicesMenuStyles["invoices-menu__btn"]}><div className={InvoicesMenuStyles["invoices-menu__btn--plus"]}><img src={PlusIcon} alt="plus sign"/></div>{width > widthBreak ? "New Invoice" : "New"}</button></Link>
            </div>
        </>
    )
}