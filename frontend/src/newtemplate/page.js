import { useState } from 'react'
import './new.css'
import NewHeader from './header'
import NewSidebar from './sidebar'
import ScheduleItem from '../pages/innerpage/schedules'
import Home from './homepage'

const Homepage = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <NewHeader OpenSidebar={OpenSidebar}/>
      <NewSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
    </div>
  )
}

export default Homepage