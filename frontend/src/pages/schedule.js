import { useState } from 'react'

import NewHeader from '../newtemplate/header'
import NewSidebar from '../newtemplate/sidebar'
import ScheduleItem from '../pages/innerpage/schedules'

const Schedule = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <NewHeader OpenSidebar={OpenSidebar}/>
      <NewSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <ScheduleItem />
    </div>
  )
}

export default Schedule