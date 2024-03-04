import { useState } from 'react'
import NewHeader from '../newtemplate/header'
import NewSidebar from '../newtemplate/sidebar'
import DrawingList from './innerpage/drawing'


const Drawing = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <NewHeader OpenSidebar={OpenSidebar}/>
      <NewSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <DrawingList />
    </div>
  )
}

export default Drawing