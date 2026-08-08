import React, { useEffect, useState, useRef } from 'react';

interface StatItemProps {
  target: number;
  label: string;
  suffix?: string;
  icon: string;
}

const StatItem: React.FC<StatItemProps> = ({ target, label, suffix = '', icon }) => {
  const [count, setCount] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500; // ms
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            // Ease out function
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeProgress * target);
            
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${percentX}%`);
    card.style.setProperty('--mouse-y', `${percentY}%`);

    const rotateX = -(y - centerY) / 8;
    const rotateY = (x - centerX) / 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.5s ease-out';
  };

  return (
    <div
      className="service-item stats-item"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'flex', alignItems: 'center', gap: '15px', transition: 'transform 0.15s ease' } as React.CSSProperties}
    >
      <div className="service-icon-box" style={{ background: 'rgba(255, 219, 112, 0.08)', borderRadius: '12px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' } as React.CSSProperties}>
        <ion-icon name={icon} style={{ fontSize: '24px', color: 'var(--orange-yellow-crayola)' } as React.CSSProperties}></ion-icon>
      </div>
      <div className="service-content-box" style={{ textAlign: 'left' } as React.CSSProperties}>
        <h4 className="h3 stats-number" style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff', marginBottom: '2px', lineHeight: '1.2' } as React.CSSProperties}>
          {count}
          {suffix}
        </h4>
        <p className="service-item-text" style={{ fontSize: '0.78rem', margin: 0, opacity: 0.85 } as React.CSSProperties}>{label}</p>
      </div>
    </div>
  );
};

export const Stats: React.FC = () => {
  const statsData = [
    { target: 4, label: 'Years of Experience', suffix: '+', icon: 'time-outline' },
    { target: 25, label: 'Projects Completed', suffix: '+', icon: 'checkmark-done-outline' },
    { target: 15, label: 'Technologies Mastered', suffix: '+', icon: 'code-slash-outline' },
    { target: 100, label: 'Client Satisfaction', suffix: '%', icon: 'happy-outline' },
  ];

  return (
    <section className="service" style={{ marginTop: '35px' }}>
      <h3 className="h3 service-title">Stats & Accomplishments</h3>
      <div className="stats-grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px' } as React.CSSProperties}>
        {statsData.map((stat, idx) => (
          <StatItem
            key={idx}
            target={stat.target}
            label={stat.label}
            suffix={stat.suffix}
            icon={stat.icon}
          />
        ))}
      </div>
    </section>
  );
};
