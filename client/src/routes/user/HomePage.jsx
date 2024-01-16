
import Hero from '../../components/Hero'
import SectionLeft from '../../components/SectionLeft'
import SectionRight from '../../components/SectionRight'
import SectionCenter from '../../components/SectionCenter'
import SectionIcons from '../../components/SectionIcons'

export default function HomePage() {

  const s1 = {
    img: '../assets/img-01.png',
    alt: 'gen factor',
    heading: 'What is Gen Factor?',
    paragraphs: [{id: 's01', c: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris '},{id: 's02', c: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in'}],
    btn: '...'
  }

  const s2 = {
    img: '../assets/img-02.png',
    alt: 'termography',
    heading: 'What is Gen Factor?',
    paragraphs: [{id: 's03', c: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris '},{id: 's04', c: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in'}],
    btn: '...'
  }

  const s3 = {
    images: ['../assets/img-03.png', '../assets/img-04.png'],
    alt: 'termography',
    heading: 'What effects does Gen Factor guarantee?',
    paragraphs: [{id: 's05', c: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris'}]
  }

  const s4 = {
    icons: [
      {id:1,
        ico: '../assets/icon-01.svg',
        heading: 'EFFECTIVE',
        p: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      },
      {id:1,
        ico: '../assets/icon-02.svg',
        heading: 'POVEN',
        p: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      },
      {id:1,
        ico: '../assets/icon-03.svg',
        heading: 'SAFE',
        p: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      },
    ]
  }



  return (
    <div>
      <Hero />
      <div className='page'>
        <SectionLeft sectionData={s1} />
        <SectionRight sectionData={s2} />
        <SectionLeft sectionData={s1} />
        <SectionCenter sectionData={s3}/>
        <SectionIcons sectionData={s4} />
      </div>
      
    </div>
  )
}
