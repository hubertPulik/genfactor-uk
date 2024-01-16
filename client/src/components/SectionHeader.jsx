

export default function SectionHeader({ sectionData }) {

  return (
    <div className='sectionHeader'>
      <div className={`sectionHeader__background header-${sectionData.img}`}>
        <h1 className="sectionHeader__title">
          {sectionData.title}
        </h1>
      </div>
    </div>
  )
}
