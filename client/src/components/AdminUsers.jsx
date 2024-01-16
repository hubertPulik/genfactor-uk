import { useState, useEffect } from "react"
import Axios from 'axios'

import AdminUsersTable from "./AdminUsersTable"
import AdminUser from "./AdminUser"

export default function AdminUsers() {

  const [ users, setUsers ] = useState([])
  const [ isPennding, setIsPennding ] = useState(true);
  const [ err, setErr ] = useState(null)
  const [ userDetails, setUserDetails ] = useState(false)
  const [ activeUser, setActiveUser ] = useState()

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/admin/users`)
      .then(res => {
        setUsers(res.data);
        setIsPennding(false);
        setErr(null);
      })
      .catch(err => {
        console.log(err)
        setIsPennding(false);
        setErr(err.message);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const viewUser = (userId, state) => {
    setUserDetails(state)
    setActiveUser((users.filter(user => {return user.id === userId}))[0])
  }

  return (
    <>
    {userDetails ?
    (users.length !== 0 ? 
    <AdminUser user={activeUser} viewUser={viewUser}/> : <></>) :
    <AdminUsersTable 
      users={users}
      isPennding={isPennding}
      err={err}
      viewUser={viewUser}
    /> }
    </>
    
  )
}
