import { useState } from 'react'
import NewHeader from '../newtemplate/header'
import NewSidebar from '../newtemplate/sidebar'
import ReportList from './innerpage/reports'

const Meeting = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <NewHeader OpenSidebar={OpenSidebar}/>
      <NewSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <ReportList />
    </div>
  )
}

export default Meeting