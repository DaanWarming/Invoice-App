import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react"
import styles from "./NewInvoice.module.css"
import SingleItem from './SingleItem';
import calendarIcon from "../../assets/icon-calendar.svg"
import { ThemeContext } from "../../App"
import { useContext } from 'react';


export default function NewInvoice({editInvoice, setNewInvoice, formError, itemListError}) {
    const darkMode = useContext(ThemeContext)
    const [width, setWidth] = useState(window.innerWidth);
    const [invoiceNumber, setInvoiceNumber] = useState(randomNumber() )
    const [invoiceDate, setInvoiceDate] = useState(() => {
        if (editInvoice) {
            return new Date(editInvoice.date)
        } else {
            return new Date() 
        }});
    const [id, setId] = useState(2)
    const [itemList, setItemList] = useState(<></>)
    const [newItemList, setNewItemList] = useState()
    const [contentLoaded, setContentLoaded] = useState(false)
    const [invoiceInput, setInvoiceInput] = useState({
        fromStreetAddress: "",
        fromCity: "",
        fromPostCode: "",
        fromCountry: "",
        clientName: "",
        clientEmail: "",
        clientStreetAddress: "",
        clientCity: "",
        clientPostCode: "",
        clientCountry: "",
        paymentTerm: 30,
        projectDescription: "",
        status: "",
        items: ""
    })

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


    function editContent() {  // when invoice is in edit mode fill in the value of invoice
        setInvoiceInput({
            ...invoiceInput, 
            fromStreetAddress: editInvoice.street,
            fromCity: editInvoice.city,
            fromPostCode: editInvoice.postCode,
            postCode: editInvoice.postCode,
            fromCountry: editInvoice.country,
            clientName: editInvoice.clientName,
            clientEmail: editInvoice.clientEmail,
            clientStreetAddress: editInvoice.clientStreet,
            clientCity: editInvoice.clientCity,
            clientPostCode: editInvoice.clientPostCode,
            clientCountry: editInvoice.clientCountry,
            paymentTerm: editInvoice.paymentTerm,
            projectDescription: editInvoice.projectDescription,
            status: editInvoice.status,
            items: editInvoice.itemList
        })
    }

    useEffect(() => {  
        if (editInvoice) {  // only change values when invoices is in edit mode
            setInvoiceNumber(editInvoice.number)
            editContent()
            setContentLoaded(true)
            setId(getRandomInt(100))            
        } else displayOneItemMin()
        
    }, [editInvoice])

    function displayOneItemMin() {
        const newItem = {
            name: "",
            quantity: "",
            price: "",
            totalPrice: 0,
            id: id
        }
        setInvoiceInput({...invoiceInput,
            items: [
                    newItem
                ] 
            })
        setId(getRandomInt(1000))
    }

    function getRandomInt(max) { // generate a random number
        return Math.floor(Math.random() * max);
        }
    
    function randomNumber() { // generate a random invoice number
        const firstLetter = String.fromCharCode(65+Math.floor(Math.random() * 26))
        const secondLetter = String.fromCharCode(65+Math.floor(Math.random() * 26))
        const invoiceNumber =   firstLetter + secondLetter + getRandomInt(9) + getRandomInt(9) + getRandomInt(9) + getRandomInt(9)
        return invoiceNumber
    }

    function formatDate(date) {   // re format the date so it can be displayed
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 12) 
            month = date.toLocaleString('en-US', {
                        month: 'short',
                    });
        if (day.length < 2) 
            day = '0' + day;
        
        return [day, month, year].join(' ');
    }

    function addDays(date, days) {  // adds payment term to the original invoice date 

        const newDate = new Date(date)
        newDate.setDate(newDate.getDate() + Number(days))
        return newDate
    }

    const handleChange = (event) => { // update state when input is changed
        setInvoiceInput({ ...invoiceInput, [event.target.id]: event.target.value })
    }

    function updateItemList() {  // updates the itemList so it shows as many input field as there are items
        if (invoiceInput.items !== "") {
            setItemList(invoiceInput.items.map((item, i) => <SingleItem key={item.id} id={item.id} editInvoice={item} handleDelete={handleDelete} updateItem={updateItem} />))
        }
    }


    function addNewItem(e) {  // adds a new item to the list
        e.preventDefault()
        const newItem = {
                            name: "",
                            quantity: "",
                            price: "",
                            totalPrice: 0,
                            id: id
                        }
        setInvoiceInput({...invoiceInput,
            items: [
                    ...invoiceInput.items,
                    newItem
                ] 
            })
        setId(getRandomInt(1000))
    }

    function updateInvoice() { // Sends invoice to mother component
        setNewInvoice({
            number: invoiceNumber,
            status: invoiceInput.status,
            street: invoiceInput.fromStreetAddress,
            city: invoiceInput.fromCity,
            postCode: invoiceInput.fromPostCode,
            country: invoiceInput.fromCountry,
            clientName: invoiceInput.clientName,
            clientEmail: invoiceInput.clientEmail,
            clientStreet: invoiceInput.clientStreetAddress,
            clientCity: invoiceInput.clientCity,
            clientPostCode: invoiceInput.clientPostCode,
            clientCountry: invoiceInput.clientCountry,
            date: formatDate(invoiceDate),
            paymentTerm: invoiceInput.paymentTerm,
            paymentDue: formatDate(addDays(invoiceDate, invoiceInput.paymentTerm)),
            projectDescription: invoiceInput.projectDescription,
            itemList: invoiceInput.items
        })
    }
    
    function handleDelete(id) {   // deletes an item from the product list
        const newItems = invoiceInput.items.filter((item) => item.id !== id)
        setInvoiceInput({...invoiceInput, 
            items: newItems
        })
    }

    function updateItem(itemName, itemQuantity, itemPrice, totalPrice, id) {  // updates the product list when items have chanced
        const updatedItems = invoiceInput.items.map(oldItem => {
            if (oldItem.id === id) {
                return {
                    ...oldItem,
                    name: itemName,
                    quantity: itemQuantity,
                    price: itemPrice,
                    totalPrice: totalPrice,
                    id: id,
                }
            } else {
                return oldItem
            }
        })
        setNewItemList(updatedItems)
    }

    useEffect(() => { // useEffect is used other wise couldn't access the updated invoiceInput state
        if (newItemList) {
            setInvoiceInput({...invoiceInput, 
                items:  newItemList
                })
        }
    }, [newItemList])

    useEffect(() => {
        updateInvoice()
    }, [invoiceNumber, invoiceInput, invoiceDate])

    useEffect(() => {
        updateItemList()
    }, [invoiceInput.items])

    return (
        <form className={`new-invoice ${styles["new-invoice"]} ${styles[`new-invoice__${darkMode}`]}`}>
            <h1 className={`${styles["new-invoice__title"]} ${styles[`new-invoice__title__${darkMode}`]}`}>{editInvoice ? `Edit #${editInvoice.number}` : "New Invoice"}</h1>
            <section className={`${styles["invoices"]} ${styles[`invoices__${darkMode}`]}`}>
                <h2 className={styles["new-invoice__section-title"]}>Bill From</h2>
                <label className={styles["new-invoice__label"]} htmlFor="fromStreetAddress">Street Address</label>
                <input className={styles["new-invoice__input"]} type="text" id="fromStreetAddress" value={invoiceInput.fromStreetAddress} onChange={handleChange}/>
                <div className={styles["new-invoice__bill-from"]}>
                    <div className={styles["new-invoice__city-code"]}>
                        <div className={styles["new-invoice__city--container"]}>
                            <label className={styles["new-invoice__label"]} htmlFor="fromCity">City</label>
                            <input className={`${styles["new-invoice__input"]} ${styles["new-invoice__city"]}`} type="text" id="fromCity"  value={invoiceInput.fromCity} onChange={handleChange}/>
                        </div>
                        <div className={styles["new-invoice__post-code--container"]}>
                            <label className={styles["new-invoice__label"]} htmlFor="fromPostCode">Post Code</label>
                            <input className={`${styles["new-invoice__input"]} ${styles["new-invoice__post-code"]}`} type="text" id="fromPostCode"  value={invoiceInput.fromPostCode} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className={styles["new-invoice__country--container"]}>
                        <label className={styles["new-invoice__label"]} htmlFor="fromCountry">Country</label>
                        <input className={styles["new-invoice__input"]} type="text" id="fromCountry"  value={invoiceInput.fromCountry} onChange={handleChange}/>
                    </div>
                </div>
            </section>
            <section className={`${styles["invoices"]} ${styles[`invoices__${darkMode}`]}`}>
                <h2 className={styles["new-invoice__section-title"]}>Bill To</h2>
                <label className={styles["new-invoice__label"]} htmlFor="clientName">Client's Name</label>
                <input className={styles["new-invoice__input"]} type="text" id="clientName"  value={invoiceInput.clientName} onChange={handleChange} required/>
                <label className={styles["new-invoice__label"]} htmlFor="clientEmail">Client's Email</label>
                <input className={styles["new-invoice__input"]} type="email" id="clientEmail" placeholder="e.g. email@example.com" value={invoiceInput.clientEmail} onChange={handleChange} />
                <label className={styles["new-invoice__label"]} htmlFor="clientStreetAddress">Street Address</label>
                <input className={styles["new-invoice__input"]} type="text" id="clientStreetAddress" value={invoiceInput.clientStreetAddress} onChange={handleChange} />
                <div className={styles["new-invoice__bill-from"]}>
                    <div className={styles["new-invoice__city-code"]}>
                        <div className={styles["new-invoice__city--container"]}>
                            <label className={styles["new-invoice__label"]} htmlFor="clientCity">City</label>
                            <input className={`${styles["new-invoice__input"]} ${styles["new-invoice__city"]}`} type="text" id="clientCity" value={invoiceInput.clientCity} onChange={handleChange} />
                        </div>
                        <div className={styles["new-invoice__post-code--container"]}>
                            <label className={styles["new-invoice__label"]} htmlFor="clientPostCode">Post Code</label>
                            <input className={`${styles["new-invoice__input"]} ${styles["new-invoice__post-code"]}`} type="text" id="clientPostCode" value={invoiceInput.clientPostCode} onChange={handleChange} />
                        </div>
                    </div>
                    <div className={styles["new-invoice__country--container"]}>
                        <label className={styles["new-invoice__label"]} htmlFor="clientCountry">Country</label>
                        <input className={styles["new-invoice__input"]} type="text" id="clientCountry" value={invoiceInput.clientCountry} onChange={handleChange} />  
                    </div>
                </div>
            </section>
            <section className={`${styles["invoices"]} ${styles[`invoices__${darkMode}`]} ${styles["new-invoice__date"]}`}>
                <div className={styles["new-invoice__date-term--container"]}>
                    <div className={styles["new-invoice__date-term"]}>
                        <label className={styles["new-invoice__label"]} htmlFor="invoiceDate">Invoice Date</label>
                        <div className={styles["new-invoice__date-picker-container"]}>
                            <DatePicker
                                id="invoiceDate"
                                className={`${styles["new-invoice__input"]} ${styles["new-invoice__date-picker"]}`}
                                dateFormat="dd-MM-yyyy"
                                selected={invoiceDate}
                                onChange={date => setInvoiceDate(date)}
                            />
                            <img className={styles["new-invoice__calendar-icon"]} src={calendarIcon} alt="calender"></img>
                        </div>
                    </div>
                    <div className={styles["new-invoice__date-term"]}>
                        <label className={styles["new-invoice__label"]} htmlFor="paymentTerm">Payment Terms</label>
                        <select className={`${styles["new-invoice__input"]} ${styles["new-invoice__payment-term"]}`} id="paymentTerm" value={invoiceInput.paymentTerm} onChange={handleChange}>
                            <option className={styles["new-invoice__drop-down"]} value="1">Net 1 Day</option>
                            <option className={styles["new-invoice__drop-down"]} value="7">Net 7 Days</option>
                            <option className={styles["new-invoice__drop-down"]} value="14">Net 14 Days</option>
                            <option className={styles["new-invoice__drop-down"]} value="30">Net 30 Days</option>
                        </select>
                    </div>
                </div>
                <label className={styles["new-invoice__label"]} htmlFor="projectDescription">Project Description</label>
                <input className={styles["new-invoice__input"]} id="projectDescription" value={invoiceInput.projectDescription} placeholder="e.g. Graphic Design Service" onChange={handleChange} />
            </section>
            <section className={`${styles["invoices"]} ${styles[`invoices__${darkMode}`]} ${styles["new-invoice__item-list"]}`}>
                <h3 className={styles["new-invoice__item-list--title"]}>Item List</h3>
                {width > widthBreak &&
                <div className={styles["new-invoice__item-list--descriptions"]}>
                    <p className={styles["new-invoice__item-list--item-name"]}>Item Name</p>
                    <p className={styles["new-invoice__item-list--item-quantity"]}>Qty.</p>
                    <p className={styles["new-invoice__item-list--item-price"]}>Price</p>
                    <p className={styles["new-invoice__item-list--item-total"]}>Total</p>
                    <div className={styles["new-invoice__item-list--empty-div"]}></div>
                </div>}
                {itemList}
                <button className={styles["new-invoice__button--new-item"]} onClick={addNewItem}>+ Add New Item</button>
            </section>
            {formError && <p className={styles["new-invoice__error"]}>- All fields must be added</p>}
            {itemListError && <p className={styles["new-invoice__error"]}>- An item must be added</p>}
        </form>
    )
}