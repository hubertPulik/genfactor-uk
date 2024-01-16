import React from 'react'

export default function SectionLeft({ sectionData }) {

  const d = sectionData
  
  return (
    <div className='sectionLeft'>
      <div className='sectionLeft__inner'>
        <div className='sectionLeft__img'>
          <img src={d.img} alt={d.alt} />
        </div>
        <div className='sectionLeft__text'>
          <h2>{d.heading}</h2>
          {d.paragraphs.map(p => (<p key={p.id}>{p.c}</p>))}
          {d.btn ? <button className='btn'>Learn more</button> : <></>}
        </div>
      </div>
    </div>
  )
}
