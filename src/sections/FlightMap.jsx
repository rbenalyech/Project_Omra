import { useEffect, useRef, useState, useCallback } from 'react';
import content from '../content/fr.json';
import './FlightMap.css';

const CITIES = [
  { name: 'Bruxelles', code: 'BRU', x: 285, y: 140, labelPos: 'top' },
  { name: 'Athènes', code: 'ATH', x: 430, y: 210, labelPos: 'top' },
  { name: 'Djeddah', code: 'JED', x: 500, y: 310, labelPos: 'right' },
];

const FLIGHT_PATH_D = 'M285,140 Q360,150 430,210 Q475,250 500,310';

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
        <svg
          viewBox="0 0 700 450"
          className="flight-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="landGrad" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#E8DCC8" />
              <stop offset="100%" stopColor="#D4C4A8" />
            </radialGradient>
            <radialGradient id="waterGrad" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#C5D8E8" />
              <stop offset="100%" stopColor="#A8C4D8" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width="700" height="450" fill="url(#waterGrad)" rx="20" />

          <ellipse cx="200" cy="180" rx="220" ry="140" fill="url(#landGrad)" opacity="0.7" />
          <ellipse cx="500" cy="250" rx="180" ry="200" fill="url(#landGrad)" opacity="0.7" />
          <ellipse cx="380" cy="160" rx="120" ry="60" fill="url(#landGrad)" opacity="0.5" />

          <text x="120" y="100" fill="#88BBAA" fontSize="10" fontFamily="var(--font-body)" opacity="0.5">EUROPE</text>
          <text x="520" y="150" fill="#88BBAA" fontSize="10" fontFamily="var(--font-body)" opacity="0.5">ASIE</text>
          <text x="430" y="380" fill="#88BBAA" fontSize="10" fontFamily="var(--font-body)" opacity="0.5">ARABIE</text>
          <text x="80" y="350" fill="#88BBAA" fontSize="10" fontFamily="var(--font-body)" opacity="0.5">AFRIQUE</text>

          <path
            ref={pathRef}
            d={FLIGHT_PATH_D}
            fill="none"
            stroke="rgba(200,164,90,0.2)"
            strokeWidth="2"
            strokeDasharray="8 6"
          />

          <path
            ref={trailRef}
            d={FLIGHT_PATH_D}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2.5"
            filter="url(#glow)"
          />

          {CITIES.map((city, i) => (
            <g key={city.code}>
              <circle
                cx={city.x}
                cy={city.y}
                r={activeCity >= i ? 7 : 5}
                fill={activeCity >= i ? 'var(--color-accent)' : 'rgba(200,164,90,0.3)'}
                style={{ transition: 'fill 0.3s ease' }}
              />
              {activeCity === i && (
                <circle
                  cx={city.x}
                  cy={city.y}
                  r="14"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="1.5"
                  opacity="0.5"
                  className="city-pulse"
                />
              )}
              <text
                x={city.x}
                y={city.labelPos === 'top' ? city.y - 16 : city.y + 4}
                dx={city.labelPos === 'right' ? 16 : 0}
                textAnchor={city.labelPos === 'right' ? 'start' : 'middle'}
                fill={activeCity >= i ? 'var(--color-primary-dark)' : '#999'}
                fontSize="12"
                fontWeight="700"
                fontFamily="var(--font-body)"
              >
                {city.code}
              </text>
              <text
                x={city.x}
                y={city.labelPos === 'top' ? city.y - 28 : city.y + 18}
                dx={city.labelPos === 'right' ? 16 : 0}
                textAnchor={city.labelPos === 'right' ? 'start' : 'middle'}
                fill={activeCity >= i ? 'var(--color-text-light)' : '#bbb'}
                fontSize="9"
                fontFamily="var(--font-body)"
              >
                {city.name}
              </text>
            </g>
          ))}

          {showMiqat && (
            <g className="miqat-marker">
              <circle cx="490" cy="290" r="18" fill="none" stroke="#D44" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
              <text x="490" y="294" textAnchor="middle" fill="#D44" fontSize="8" fontWeight="700" fontFamily="var(--font-body)">MIQAT</text>
            </g>
          )}

          <g ref={planeRef} className="plane-icon">
            <g transform="translate(-12,-12) scale(1)">
              <path
                d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                fill="var(--color-primary)"
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
    </section>
  );
}
