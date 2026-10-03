import { useEffect, useRef, useState, useCallback } from 'react';
import content from '../content/fr.json';
import './FlightMap.css';

const basePath = import.meta.env.BASE_URL;

const CITIES = [
  { name: 'Bruxelles', code: 'BRU', x: 367, y: 131 },
  { name: 'Athènes', code: 'ATH', x: 530, y: 284 },
  { name: 'Djeddah', code: 'JED', x: 743, y: 489 },
];

const FLIGHT_PATH_D = 'M367,131 Q450,190 530,284 Q640,380 743,489';

export default function FlightMap() {
  const sectionRef = useRef(null);
  const planeRef = useRef(null);
  const pathRef = useRef(null);
  const trailRef = useRef(null);
  const athRatioRef = useRef(0.45);
  const [activeCity, setActiveCity] = useState(-1);
  const [showMiqat, setShowMiqat] = useState(false);

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    const plane = planeRef.current;
    const trail = trailRef.current;
    if (!section || !path || !plane || !trail) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;

    const scrollStart = 0;
    const scrollEnd = -(sectionHeight - viewportHeight);
    const rawProgress = (scrollStart - rect.top) / (scrollStart - scrollEnd);
    const p = Math.max(0, Math.min(1, rawProgress));

    const pathLength = path.getTotalLength();
    const athR = athRatioRef.current;

    let pathP;
    if (p <= 0.35) {
      pathP = (p / 0.35) * athR;
    } else if (p <= 0.65) {
      pathP = athR;
    } else {
      pathP = athR + ((p - 0.65) / 0.35) * (1 - athR);
    }

    const pointOnPath = pathP * pathLength;
    const point = path.getPointAtLength(pointOnPath);
    const pointAhead = path.getPointAtLength(Math.min(pointOnPath + 2, pathLength));
    const angle = Math.atan2(pointAhead.y - point.y, pointAhead.x - point.x) * (180 / Math.PI);

    plane.setAttribute('transform', `translate(${point.x}, ${point.y}) rotate(${angle})`);
    trail.style.strokeDashoffset = String(pathLength * (1 - pathP));

    if (p < 0.03) setActiveCity(-1);
    else if (p < 0.35) setActiveCity(0);
    else if (p < 0.65) setActiveCity(1);
    else setActiveCity(2);
    setShowMiqat(p > 0.75);
  }, []);

  useEffect(() => {
    const trail = trailRef.current;
    const path = pathRef.current;
    if (trail && path) {
      const len = path.getTotalLength();
      trail.style.strokeDasharray = String(len);
      trail.style.strokeDashoffset = String(len);

      let athLen = 0;
      let minDist = Infinity;
      for (let l = 0; l <= len; l += 1) {
        const pt = path.getPointAtLength(l);
        const d = Math.hypot(pt.x - CITIES[1].x, pt.y - CITIES[1].y);
        if (d < minDist) { minDist = d; athLen = l; }
      }
      athRatioRef.current = athLen / len;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section id="vol" className="flight-map section" ref={sectionRef}>
      <div className="section-header">
        <span className="section-number">Chapitre 3</span>
        <h2 className="section-title">{content.vol.sectionTitle}</h2>
        <p className="section-subtitle">{content.vol.sectionSubtitle}</p>
      </div>

      <div className="flight-map-container">
        <div className="flight-map-visual">
        <svg
          viewBox="0 0 1024 559"
          className="flight-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="mapClip">
              <rect width="1024" height="559" rx="20" />
            </clipPath>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <image
            href={`${basePath}images/map-satellite.webp`}
            width="1024"
            height="559"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#mapClip)"
          />

          <path
            ref={pathRef}
            d={FLIGHT_PATH_D}
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2.5"
            strokeDasharray="10 8"
            clipPath="url(#mapClip)"
          />

          <path
            ref={trailRef}
            d={FLIGHT_PATH_D}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="4"
            filter="url(#glow)"
            clipPath="url(#mapClip)"
          />

          <g ref={planeRef} className="plane-icon">
            <g transform="translate(-14,-14) scale(1.2)">
              <path
                d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                fill="#fff"
              />
            </g>
          </g>
        </svg>

        <div className="flight-info-cards">
          {activeCity === 1 && (
            <div className="flight-info-card flight-info-card--athens">
              <h4>Escale à Athènes (7h10)</h4>
              <p>Longue escale — profite pour te reposer, prier et te préparer mentalement. Prépare ta tenue d'Ihram.</p>
            </div>
          )}
          {activeCity === 2 && (
            <div className="flight-info-card flight-info-card--jeddah">
              <h4>Arrivée à Djeddah</h4>
              <p>Porte d'entrée des Lieux Saints. Prépare ton Ihram avant l'atterrissage !</p>
            </div>
          )}
          {showMiqat && (
            <div className="flight-info-card flight-info-card--miqat">
              <span className="flight-info-card-icon">&#9888;&#65039;</span>
              <p>{content.vol.miqatWarning}</p>
            </div>
          )}
        </div>
        </div>

        {content.vol.flightDetails && (
          <div className="flight-details-card card">
            <h4 className="flight-details-title">{content.vol.flightDetails.airline}</h4>
            <p className="flight-details-total">Durée totale : {content.vol.flightDetails.totalDuration} — Classe {content.vol.flightDetails.class}</p>
            <div className="flight-legs">
              {content.vol.flightDetails.outbound.map((leg, i) => (
                <div key={i} className="flight-leg">
                  <span className="flight-leg-badge">Vol {leg.flight}</span>
                  <span className="flight-leg-route">{leg.from} → {leg.to}</span>
                  <span className="flight-leg-times">{leg.departure} → {leg.arrival}</span>
                  <span className="flight-leg-duration">{leg.duration}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
