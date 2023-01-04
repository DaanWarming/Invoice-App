import { createContext, useState } from "react"
import Invoices from "./Pages/Invoices/Invoices";
import SideBar from "./Components/SideBar/SideBar";
import ViewInvoice from "./Pages/ViewInvoice/ViewInvoice";
import { HashRouter, Route, Routes } from "react-router-dom";
import CreateInvoice from "./Pages/CreateInvoice/CreateInvoice";
import { useEffect } from "react";
import EditInvoice from "./Pages/EditInvoice/EditInvoice";
import exampleInvoices from "./data.json"

export const ThemeContext = createContext("light")

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [darkMode, setDarkMode] = useState("light")
  const [editInvoice, setEditInvoice] = useState()
  const [invoices, setInvoices] = useState(() => {
    let localInvoices = localStorage.getItem("invoices")
    localInvoices = JSON.parse(localInvoices)
    if (localInvoices === null) {
      return exampleInvoices
    } else {
      return localInvoices
    }})
  const [invoicesDisplayList, setInvoicesDisplayList] = useState()

  let localInvoices = localStorage.getItem("invoices")

  // useEffect(() => {
  //   localInvoices = JSON.parse(localInvoices)
  //   if (localInvoices === null) {
  //     setInvoices(exampleInvoices)
  //   } else {
  //     setInvoices(localInvoices)
  //   }
  // }, [])

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices))
  }, [invoices])


  function toggleDarkMode() {
    if (isDarkMode) {
      setDarkMode("dark")
      setIsDarkMode(!isDarkMode)
    } else {
      setDarkMode("light")
      setIsDarkMode(!isDarkMode)
    }    
  }
  
  useEffect(() => {
    setInvoicesDisplayList(invoices.map((invoice) => (
      <Route key={invoice.number} path={invoice.number} element={<ViewInvoice setEditInvoice={setEditInvoice} darkMode={darkMode} invoices={invoices} invoice={invoice} setInvoices={setInvoices} key={invoice.number}/>} />
    )))
  }, [invoices])

  return (
    <HashRouter>
      <ThemeContext.Provider value={darkMode}>
        <SideBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route index element={<Invoices invoices={invoices} setInvoices={setInvoices}/>} />
          {invoicesDisplayList}
          <Route path="/CreateInvoice" element={<CreateInvoice invoices={invoices} setInvoices={setInvoices}/>} />
          {editInvoice && <Route path={`/EditInvoice/${editInvoice.number}`} element={<EditInvoice editInvoice={editInvoice} invoices={invoices} setInvoices={setInvoices}/>} />}
        </Routes>
      </ThemeContext.Provider>
    </HashRouter>
  );
}

export default App;
