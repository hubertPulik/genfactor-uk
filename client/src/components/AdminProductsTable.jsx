

export default function AdminProductsTable({ products, isPennding, err, viewProduct }) {

  return (
    
    <div className="adminOrders">
      <h3>Produkty w sklepie</h3>
      <div className="adminOrders__row">
          <div className="adminOrders__col id heading">Numer</div>
          <div className="adminOrders__col prodName heading">Nazwa</div>
          <div className="adminOrders__col prodNetto heading">Cena netto</div>
          <div className="adminOrders__col prodVat heading">VAT</div>
          <div className="adminOrders__col prodQty heading">Ilość</div>
        </div>
      {isPennding ? <div>Wczytywanie danych</div> : <></>}
      {err ? <div>{err}</div> : <></>}
      {products ? <div className="adminOrders__table">
        {products.map(product => {
      return (
        <div className="adminOrders__row" key={product.id}>
          <div className={`adminOrders__col id`} onClick={() => viewProduct(product.id, true)}>{product.id}</div>
          <div className="adminOrders__col prodName">{product.name}</div>
          <div className="adminOrders__col prodNetto">{product.netto}</div>
          <div className="adminOrders__col prodVat">{product.vat}</div>
          <div className="adminOrders__col prodQty">{product.stock}</div>
        </div>
      )})}</div> : <></>}
      <button className="btn marginTop2" onClick={() => viewProduct(null, true)}>Dodaj produkt</button>
    </div>
  )
}
