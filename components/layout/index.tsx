import React from "react"
import Header from "../header"
import TypeSelector from "../type-selector"

interface Props {
  children: JSX.Element
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-slate-50 text-slate-500 flex h-screen w-screen flex-col select-none overflow-hidden">
      <div className="mt-20 flex-1 h-full w-full items-center justify-center overflow-y-auto pb-4o">
        {children}
      </div>
      <div className="fixed bg-inherit inset-x-0 top-0">
        <Header />
        <TypeSelector />
      </div>
    </div>
  )
}

export default Layout
