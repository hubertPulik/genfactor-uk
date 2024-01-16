
export default function SectionCenter({ sectionData }) {

  const d = sectionData
  
  return (
    <div className='sectionCenter'>
      <div className='sectionCenter__inner'>
        <h2>{d.heading}</h2>
        {d.paragraphs.map(p => (<p key={p.id}>{p.c}</p>))}
        <div className="sectionCenter__img" >
          {d.images.map(img => (<img src={img} alt={img} key={img} />))}
        </div>
      </div>
    </div>
  )
}
