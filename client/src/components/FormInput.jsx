
export default function FormInput({ controls, register }) {

  const { name, label, type } = controls
 
  return (
    <div className="form__input">
      <label htmlFor={name}>{label}</label>
      <input {...register(name)} id={name} type={type}/>
    </div>
  )
}
