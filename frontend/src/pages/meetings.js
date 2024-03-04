import { useState } from 'react'
import NewHeader from '../newtemplate/header'
import NewSidebar from '../newtemplate/sidebar'
import MeetingList from './innerpage/meetings'

const Meeting = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <NewHeader OpenSidebar={OpenSidebar}/>
      <NewSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <MeetingList />
    </div>
  )
}

export default Meeting