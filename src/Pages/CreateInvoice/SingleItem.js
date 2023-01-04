import React, { useEffect, useState } from 'react';
import styles from "./SingleItem.module.css"
import trashCan from "../../assets/icon-delete.svg"
import { ThemeContext } from "../../App"
import { useContext } from 'react';

export default function SingleItem({editInvoice, handleDelete, id, updateItem}) {
  const darkMode = useContext(ThemeContext)
  const [width, setWidth] = useState(window.innerWidth);
  const [pageLoaded, setPageLoaded] = useState(false)
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState(0)
  const [itemId, setItemId] = useState(id)

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


  function editItem() {  // change values of item list
    setItemName(editInvoice.name)
    setItemQuantity(editInvoice.quantity)
    setItemPrice(editInvoice.price)
  }

  useEffect(() => {  // updates total Price when price or quantity changes
    setTotalPrice(itemPrice * itemQuantity)
  }, [itemPrice, itemQuantity])
  
  useEffect(() => { // when item is in edit mode fill in the item list
    if(editInvoice) {
      editItem()
      setPageLoaded(true)
    }
  }, [])


  useEffect(() => {  // makes sure item in item list is up to date
    updateItem(itemName, itemQuantity, itemPrice, totalPrice, itemId)
  }, [itemName, totalPrice, pageLoaded])


  return (
    <div key={id} className={`${styles["item-list"]} ${styles[`item-list__${darkMode}`]}`}>
      <div className={styles["item-list__item-name"]}>
        {width < widthBreak && <label className={styles["item-list__label"]} htmlFor="itemName">Item Name</label>}
        <input className={styles["item-list__input"]} id="itemName" type="text" value={itemName} onChange={(e) => setItemName(e.target.value)}/>
      </div>
      <div className={styles["item-list__qty-price--container"]}>
        <div className={styles["item-list__quantity"]}>
        {width < widthBreak && <label className={styles["item-list__label"]} htmlFor="itemQuantity">Quantity</label>}
          <input className={styles["item-list__input"]} id="itemQuantity" type="number" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)}/>
        </div>
        <div className={styles["item-list__price"]}>
          {width < widthBreak && <label className={styles["item-list__label"]} htmlFor="itemPrice">Price</label>}
          <input className={styles["item-list__input"]} id="itemPrice" type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)}/>
        </div>
        <div className={styles["item-list__total-price"]}>
          {width < widthBreak && <p>Total</p>}
          <p className={styles["item-list__total-price--price"]}>{totalPrice ? totalPrice : 0}.00</p>
        </div>
        <img className={styles["item-list__trash-can"]} src={trashCan} onClick={() => handleDelete(id)} alt="trash can"/>
      </div>
    </div>
    
  )
}