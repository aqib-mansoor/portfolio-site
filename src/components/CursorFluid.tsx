import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

export const CursorFluid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const maxParticles = 80;
    const colors = [
      'rgba(204, 255, 0, ', // Main theme yellow-green
      'rgba(255, 255, 255, ', // White spark
      'rgba(0, 255, 136, ', // Green
      'rgba(255, 215, 0, ', // Gold
    ];

    let lastMouseX = -1;
    let lastMouseY = -1;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (lastMouseX !== -1 && lastMouseY !== -1) {
        const dx = mouseX - lastMouseX;
        const dy = mouseY - lastMouseY;
        const speed = Math.hypot(dx, dy);

        // Spawn particles based on mouse movement speed
        if (speed > 2) {
          const count = Math.min(4, Math.floor(speed / 4));
          for (let i = 0; i < count; i++) {
            // Randomize position along the line segment
            const ratio = Math.random();
            const px = lastMouseX + dx * ratio;
            const py = lastMouseY + dy * ratio;

            particles.push({
              x: px,
              y: py,
              // Move slightly in opposite direction of travel + random jitter
              vx: -dx * 0.1 + (Math.random() - 0.5) * 1.5,
              vy: -dy * 0.1 + (Math.random() - 0.5) * 1.5,
              alpha: 0.6,
              size: Math.random() * 8 + 4,
              color: colors[Math.floor(Math.random() * colors.length)],
            });
          }
        }
      }

      lastMouseX = mouseX;
      lastMouseY = mouseY;
    };

    const handleMouseLeave = () => {
      lastMouseX = -1;
      lastMouseY = -1;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render and update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        
        // Decelerate and shrink
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.alpha -= 0.015;
        p.size *= 0.96;

        if (p.alpha <= 0 || p.size < 0.5) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, `${p.color}${p.alpha})`);
        grad.addColorStop(1, `${p.color}0)`);
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Limit particle count to avoid CPU bottleneck
      if (particles.length > maxParticles) {
        particles.splice(0, particles.length - maxParticles);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999, // Overlay above all content
        mixBlendMode: 'screen', // Blends nicely with dark elements
      }}
    />
  );
};
