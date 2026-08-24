import ProgressBar from './components/ProgressBar';
import Nav from './components/Nav';
import Hero from './sections/Hero';
import Preparatifs from './sections/Preparatifs';
import Aeroport from './sections/Aeroport';
import FlightMap from './sections/FlightMap';
import Sacralisation from './sections/Sacralisation';
import OmraSteps from './sections/OmraSteps';
import Placeholder from './sections/Placeholder';
import Recap from './sections/Recap';
import content from './content/fr.json';
import './styles/global.css';

function App() {
  return (
    <>
      <ProgressBar />
      <Nav />

      <main>
        <Hero />
        <Preparatifs />
        <Aeroport />
        <FlightMap />
        <Sacralisation />
        <OmraSteps />

        <Placeholder
          id="medine"
          number="Chapitre 7"
          title={content.medine.sectionTitle}
          subtitle={content.medine.sectionSubtitle}
          note={content.medine.note}
        />

        <Placeholder
          id="invocations"
          number="Chapitre 8"
          title={content.invocations.sectionTitle}
          subtitle={content.invocations.sectionSubtitle}
          note={content.invocations.note}
        />

        <Recap />
      </main>
    </>
  );
}

export default App;
