import { useState } from 'react'

import AdminMenu from '../../components/AdminMenu'
import AdminDashboard from '../../components/AdminDashboard'
import AdminOrders from '../../components/AdminOrders'
import AdminProducts from '../../components/AdminProducts'
import AdminUsers from '../../components/AdminUsers'
import AdminSettings from '../../components/AdminSettings'

export default function AdminArea() {

  const [ activeModule, setActiveModule ] = useState('dashboard')

  const toggleModule = (module) => {
    setActiveModule(module)
  }

  return (
    <div className='adminArea'>
      
      
      <div className='adminArea__main'>
        <AdminMenu  toggleModule={toggleModule} activeModule={activeModule}/>
        <div className='adminArea__module'>
          <h3>Panel administratora</h3>
          {activeModule === 'dashboard' ? <AdminDashboard /> : <></>}
          {activeModule === 'orders' ? <AdminOrders /> : <></>}
          {activeModule === 'products' ? <AdminProducts /> : <></>}
          {activeModule === 'clients' ? <AdminUsers /> : <></>}
          {activeModule === 'settings' ? <AdminSettings /> : <></>}
        </div>
      </div>

    </div>
  )
}
