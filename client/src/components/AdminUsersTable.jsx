

export default function AdminUsersTable({ users, isPennding, err, viewUser }) {

  return (
    
    <div className="adminOrders">
      <h3>Użytkownicy</h3>
      <div className="adminOrders__row">
          <div className="adminOrders__col id heading">Identyfikator</div>
          <div className="adminOrders__col prodName heading">Adres email</div>
          <div className="adminOrders__col prodNetto heading">Data utworzenia</div>
          <div className="adminOrders__col prodVat heading">Rola</div>
        </div>
      {isPennding ? <div>Wczytywanie danych</div> : <></>}
      {err ? <div>{err}</div> : <></>}
      {users ? <div className="adminOrders__table">
        {users.map(user => {
          const userDate = new Date(user.timestamp)
          const userDateString = userDate.toLocaleDateString('ISO', { day:"numeric",  month:"short", year:"numeric" })
      return (
        <div className="adminOrders__row" key={user.id}>
          <div className={`adminOrders__col id`} onClick={() => viewUser(user.id, true)}>{user.id}</div>
          <div className="adminOrders__col prodName">{user.email}</div>
          <div className="adminOrders__col userDate">{userDateString}</div>
          <div className={`adminOrders__col userRole type_${user.type}`}></div>
        </div>
      )})}</div> : <></>}
    </div>
  )
}
