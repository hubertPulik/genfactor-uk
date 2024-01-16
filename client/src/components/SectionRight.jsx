import React from 'react'

export default function SectionRight({ sectionData }) {

  const d = sectionData
  
  return (
    <div className='sectionRight'>
      <div className='sectionRight__inner'>
        <div className='sectionRight__text'>
          <h2>{d.heading}</h2>
          {d.paragraphs.map(p => (<p key={p.id}>{p.c}</p>))}
          {d.btn ? <button className='btn'>Learn more</button> : <></>}
        </div>
        <div className='sectionRight__img'>
          <img src={d.img} alt={d.alt} />
        </div>
      </div>
    </div>
  )
}
