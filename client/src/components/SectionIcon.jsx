
export default function SectionIcon({ icon }) {
  return (
    <div className='sectionIcons__icon'>
      <div className="sectionIcons__img">
        <img src={icon.ico} alt={icon.id} />
      </div>
      <h3>{icon.heading}</h3>
      <p>{icon.p}</p>
    </div>
  )
}
