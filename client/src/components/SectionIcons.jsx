import SectionIcon from "./SectionIcon"

export default function SectionIcons({ sectionData }) {

  return (
    <div className="sectionIcons marginTop2">
      {sectionData.icons.map(icon => (<SectionIcon icon={icon} key={icon.heading}/>))}
    </div>
  )
}
