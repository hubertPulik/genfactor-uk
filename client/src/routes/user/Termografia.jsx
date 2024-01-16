import SectionLeft from '../../components/SectionLeft'
import SectionRight from '../../components/SectionRight'
import SectionHeader from '../../components/SectionHeader'

export default function Termografia() {

  const header = {
    title: 'Termografia',
    img: 'termo'
  }

  const s1 = {
    img: '../assets/img-02.png',
    alt: 'termografia',
    heading: 'W jaki sposób termografia jest stosowana w medycynie i kosmetologii?',
    paragraphs: [{id: 's01', c: 'Termografia jest stosowana w medycynie do diagnostyki i monitorowania różnych stanów zdrowotnych. Dzięki obrazom termicznym można zobaczyć różnice temperatur na powierzchni ciała, które mogą wskazywać na obecność stanów zapalnych, infekcji, urazów, zmian krążenia krwi lub guzów. Może być wykorzystywana w diagnostyce chorób układu mięśniowo-szkieletowego, takich jak zapalenie stawów, urazy sportowe, a także w diagnostyce nowotworów piersi.'},{id: 's02', c: 'Termografia może być wykorzystywana do monitorowania postępu leczenia i rehabilitacji. Obrazy termiczne umożliwiają ocenę skuteczności terapii, zmian w procesie gojenia się ran, redukcji stanów zapalnych lub obniżeniu bólu.'}],
    btn: null
  }

  const s2 = {
    img: '../assets/img-02.png',
    alt: 'termography',
    heading: '',
    paragraphs: [{id: 's05', c: 'W kosmetologii termografia może być stosowana do analizy skóry, oceny jej kondycji i monitorowania efektów terapii kosmetycznych. Może pomóc w identyfikacji problemów skórnych, takich jak trądzik, łuszczyca, trudności z ukrwieniem lub zmiany temperatury skóry. Ponadto, termografia może być używana do oceny stanu skóry po zabiegach medycyny estetycznej, takich jak laseroterapia, mezoterapia czy lifting.'}, {id: 's06', c: 'Termografia może być stosowana w badaniach przesiewowych, aby wczesniej wykrywać potencjalne problemy zdrowotne. Na przykład, termografia piersi może być stosowana jako metoda uzupełniająca w wykrywaniu zmian w tkance piersi, które mogą wskazywać na obecność guza.'}],
    btn: null
  }

  const s3 = {
    img: '../assets/img-02.png',
    alt: 'termografia',
    heading: 'Termografia może być wykorzystana do diagnozowania i oceny blizn w różnych sposób.',
    paragraphs: [{id: 's07', c: 'Analiza krążenia krwi: Blizny często mają zmienioną mikrokrążenie, co może wpływać na temperaturę powierzchni skóry nad nimi. Termografia może pomóc w identyfikacji obszarów bliznowatych, gdzie występują różnice temperatur w porównaniu do otaczającej skóry. Zmienione krążenie krwi może wskazywać na problemy z gojeniem się blizny, niewłaściwą reakcję zapalną lub obecność zrostów.'},{id: 's08', c: 'Ocena stanu zapalnego: Termografia może dostarczyć informacji na temat obecności stanu zapalnego w obrębie blizny. Zwiększona temperatura w obszarze blizny może wskazywać na nadmierne wydzielanie cytokin prozapalnych i zwiększoną aktywność metabolizmu komórek zapalnych.'},{id: 's09', c: 'Monitorowanie postępu terapii: Termografia może być wykorzystana do monitorowania skuteczności terapii mającej na celu poprawę wyglądu i funkcji blizn. Powtarzane badania termograficzne mogą pomóc w ocenie zmian temperatury, co może świadczyć o poprawie krążenia krwi, redukcji stanu zapalnego lub normalizacji funkcji tkane'}],
    btn: null
  }

  return (
    <div className='termo'>
      <SectionHeader sectionData={header}/>
      <SectionLeft sectionData={s1}/>
      <SectionRight sectionData={s2}/>
      <SectionLeft sectionData={s3}/>
    </div>
  )
}
