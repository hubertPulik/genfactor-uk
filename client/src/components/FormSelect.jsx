
export default function FormSelect({ controls, register }) {

  const { name, label, options } = controls

  return (
    <div className="form__input">
      <label htmlFor={name} >{label}</label>
      <select name={name} id={name} {...register(name)}>
        {options.map(item => (
          <option key={item.value} value={item.value}>{item.name}</option>
        ))}
      </select> 
    </div>
  )
}
