import React from 'react'

export default function AdminMenu({ toggleModule, activeModule }) {
  return (
    <div className='adminMenu'>
      <ul className='adminMenu__list'>
        <li className={`adminMenu__item ${activeModule === 'dashboard' ? 'active' : ''}`} onClick={() => toggleModule('dashboard')}>Przegląd</li>
        <li className={`adminMenu__item ${activeModule === 'orders' ? 'active' : ''}`} onClick={() => toggleModule('orders')}>Zamówienia</li>
        <li className={`adminMenu__item ${activeModule === 'produtcs' ? 'active' : ''}`} onClick={() => toggleModule('products')}>Produkty</li>
        <li className={`adminMenu__item ${activeModule === 'clients' ? 'active' : ''}`} onClick={() => toggleModule('clients')}>Klienci</li>
        <li className={`adminMenu__item ${activeModule === 'settings' ? 'active' : ''}`} onClick={() => toggleModule('settings')}>Ustawienia</li>
      </ul>
    </div>
  )
}
