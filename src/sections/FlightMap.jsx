import { useEffect, useRef, useState, useCallback } from 'react';
import content from '../content/fr.json';
import './FlightMap.css';

const basePath = import.meta.env.BASE_URL;

const CITIES = [
  { name: 'Bruxelles', code: 'BRU', x: 215, y: 82, labelPos: 'top' },
  { name: 'Athènes', code: 'ATH', x: 378, y: 255, labelPos: 'top' },
  { name: 'Djeddah', code: 'JED', x: 548, y: 395, labelPos: 'right' },
];

const FLIGHT_PATH_D = 'M215,82 Q300,145 378,255 Q468,320 548,395';

export default function FlightMap() {
  const sectionRef = useRef(null);
  const planeRef = useRef(null);
  const pathRef = useRef(null);
  const trailRef = useRef(null);
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
    const pointOnPath = p * pathLength;
    const point = path.getPointAtLength(pointOnPath);
    const pointAhead = path.getPointAtLength(Math.min(pointOnPath + 2, pathLength));
    const angle = Math.atan2(pointAhead.y - point.y, pointAhead.x - point.x) * (180 / Math.PI);

    plane.setAttribute('transform', `translate(${point.x}, ${point.y}) rotate(${angle})`);
    trail.style.strokeDashoffset = String(pathLength * (1 - p));

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
          viewBox="0 0 700 450"
          className="flight-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="mapClip">
              <rect width="700" height="450" rx="20" />
            </clipPath>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="textShadow">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.7" />
            </filter>
          </defs>

          <image
            href={`${basePath}images/map-satellite.webp`}
            width="700"
            height="450"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#mapClip)"
          />

          <rect width="700" height="450" rx="20" fill="rgba(0,0,0,0.15)" clipPath="url(#mapClip)" />

          <path
            ref={pathRef}
            d={FLIGHT_PATH_D}
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2"
            strokeDasharray="8 6"
          />

          <path
            ref={trailRef}
            d={FLIGHT_PATH_D}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="3"
            filter="url(#glow)"
          />

          {CITIES.map((city, i) => (
            <g key={city.code}>
              <circle
                cx={city.x}
                cy={city.y}
                r={activeCity >= i ? 8 : 5}
                fill={activeCity >= i ? 'var(--color-accent)' : 'rgba(255,255,255,0.5)'}
                stroke={activeCity >= i ? '#fff' : 'none'}
                strokeWidth="2"
                style={{ transition: 'fill 0.3s ease' }}
              />
              {activeCity === i && (
                <circle
                  cx={city.x}
                  cy={city.y}
                  r="16"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="1.5"
                  opacity="0.6"
                  className="city-pulse"
                />
              )}
              <text
                x={city.x}
                y={city.labelPos === 'top' ? city.y - 18 : city.y + 4}
                dx={city.labelPos === 'right' ? 18 : 0}
                textAnchor={city.labelPos === 'right' ? 'start' : 'middle'}
                fill="#fff"
                fontSize="13"
                fontWeight="700"
                fontFamily="var(--font-body)"
                filter="url(#textShadow)"
              >
                {city.code}
              </text>
              <text
                x={city.x}
                y={city.labelPos === 'top' ? city.y - 32 : city.y + 18}
                dx={city.labelPos === 'right' ? 18 : 0}
                textAnchor={city.labelPos === 'right' ? 'start' : 'middle'}
                fill="rgba(255,255,255,0.85)"
                fontSize="9"
                fontFamily="var(--font-body)"
                filter="url(#textShadow)"
              >
                {city.name}
              </text>
            </g>
          ))}

          {showMiqat && (
            <g className="miqat-marker">
              <circle cx="530" cy="375" r="20" fill="none" stroke="#FF6B6B" strokeWidth="2" strokeDasharray="4 3" opacity="0.8" />
              <text x="530" y="379" textAnchor="middle" fill="#FF6B6B" fontSize="8" fontWeight="700" fontFamily="var(--font-body)" filter="url(#textShadow)">MIQAT</text>
            </g>
          )}

          <g ref={planeRef} className="plane-icon">
            <g transform="translate(-12,-12) scale(1)">
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
