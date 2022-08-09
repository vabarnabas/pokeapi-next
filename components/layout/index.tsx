import React from "react"
import Header from "../header"
import TypeSelector from "../type-selector"

interface Props {
  children: JSX.Element
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-slate-50 text-slate-500 h-screen w-screen flex flex-col select-none overflow-hidden">
      <Header />
      <TypeSelector />
      <div className="flex flex-1 items-center justify-center ">{children}</div>
    </div>
  )
}

export default Layout
