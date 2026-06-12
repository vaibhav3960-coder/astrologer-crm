import React from 'react';
import styles from './BirthChart.module.css';

interface BirthChartProps {
  clientName: string;
}

export default function BirthChart({ clientName }: BirthChartProps) {
  const generatePlacements = () => {
    const planets = ['Su', 'Mo', 'Ma', 'Me', 'Ju', 'Ve', 'Sa', 'Ra', 'Ke'];
    let seed = 0;
    for (let i = 0; i < clientName.length; i++) {
      seed = clientName.charCodeAt(i) + ((seed << 5) - seed);
    }
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
    const houses: string[][] = Array.from({ length: 12 }, () => []);
    planets.forEach(p => {
      houses[Math.floor(random() * 12)].push(p);
    });
    return houses;
  };

  const housePlacements = generatePlacements();
  const houseCoords = [
    { x: 200, y: 110 }, { x: 120, y: 80 }, { x: 80, y: 120 }, { x: 110, y: 200 },
    { x: 80, y: 280 }, { x: 120, y: 320 }, { x: 200, y: 290 }, { x: 280, y: 320 },
    { x: 320, y: 280 }, { x: 290, y: 200 }, { x: 320, y: 120 }, { x: 280, y: 80 }
  ];

  return (
    <div className={`glass ${styles.chartContainer}`}>
      <h3 className={styles.chartTitle}>Lagna Chart (North Indian Style)</h3>
      <div className={styles.svgWrapper}>
        <svg viewBox="0 0 400 400" className={styles.kundliSvg}>
          {/* Outer Square */}
          <rect x="10" y="10" width="380" height="380" fill="none" stroke="var(--primary-light)" strokeWidth="2" />
          {/* Diagonals */}
          <line x1="10" y1="10" x2="390" y2="390" stroke="var(--primary-light)" strokeWidth="2" />
          <line x1="10" y1="390" x2="390" y2="10" stroke="var(--primary-light)" strokeWidth="2" />
          {/* Inner Diamond */}
          <polygon points="200,10 390,200 200,390 10,200" fill="none" stroke="var(--primary-light)" strokeWidth="2" />
          
          {/* House Numbers (Fixed) */}
          <text x="200" y="150" className={styles.houseNum}>1</text>
          <text x="100" y="50" className={styles.houseNum}>2</text>
          <text x="50" y="100" className={styles.houseNum}>3</text>
          <text x="150" y="200" className={styles.houseNum}>4</text>
          <text x="50" y="300" className={styles.houseNum}>5</text>
          <text x="100" y="350" className={styles.houseNum}>6</text>
          <text x="200" y="250" className={styles.houseNum}>7</text>
          <text x="300" y="350" className={styles.houseNum}>8</text>
          <text x="350" y="300" className={styles.houseNum}>9</text>
          <text x="250" y="200" className={styles.houseNum}>10</text>
          <text x="350" y="100" className={styles.houseNum}>11</text>
          <text x="300" y="50" className={styles.houseNum}>12</text>
          
          {/* Deterministic Unique Planet Placements */}
          {housePlacements.map((planets, i) => (
            planets.length > 0 && (
              <text key={i} x={houseCoords[i].x} y={houseCoords[i].y} className={styles.planet}>
                {planets.join(', ')}
              </text>
            )
          ))}
        </svg>
      </div>
      <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--primary-light)', opacity: 0.9, letterSpacing: '2px' }}>
        Su · Mo · Ma · Me · Ju · Ve · Sa · Ra · Ke
      </div>
      <p className={styles.note}>Mock chart generation for {clientName}</p>
    </div>
  );
}
