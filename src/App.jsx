import { LanguageProvider } from './context/LanguageContext';
import ProgressBar from './components/ProgressBar';
import Nav from './components/Nav';
import Hero from './sections/Hero';
import Preparatifs from './sections/Preparatifs';
import Aeroport from './sections/Aeroport';
import FlightMap from './sections/FlightMap';
import Sacralisation from './sections/Sacralisation';
import OmraSteps from './sections/OmraSteps';
import Medine from './sections/Medine';
import Invocations from './sections/Invocations';
import Recap from './sections/Recap';
import './styles/global.css';

function App() {
  return (
    <LanguageProvider>
      <a href="#preparatifs" className="skip-link">Aller au contenu</a>
      <ProgressBar />
      <Nav />

      <main>
        <Hero />
        <Preparatifs />
        <Aeroport />
        <FlightMap />
        <Sacralisation />
        <OmraSteps />
        <Medine />
        <Invocations />
        <Recap />
      </main>
    </LanguageProvider>
  );
}

export default App;
