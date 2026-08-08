import React, { useEffect, useRef } from 'react';

interface Tag {
  x: number;
  y: number;
  z: number;
  text: string;
}

export const SkillsSphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const texts = [
      'React', 'TypeScript', 'Node.js', 'Laravel', 'MySQL', 'MongoDB',
      'Git', 'AWS', 'Firebase', 'Supabase', 'Firestore', 'Expo',
      'Redux', 'GSAP', 'Tailwind', 'PHP', 'React Native', 'Postman'
    ];

    let width = (canvas.width = 340);
    let height = (canvas.height = 340);
    const radius = 120;

    const tags: Tag[] = [];
    const count = texts.length;

    // Distribute tags uniformly on a sphere using Golden Spiral
    for (let i = 0; i < count; i++) {
      const theta = Math.acos(-1 + (2 * i) / count);
      const phi = Math.sqrt(count * Math.PI) * theta;

      tags.push({
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(theta),
        text: texts[i]
      });
    }

    let angleX = 0.003;
    let angleY = 0.003;

    // Mouse interaction to speed up rotation
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left - width / 2;
      const my = e.clientY - rect.top - height / 2;

      // Adjust rotation speed depending on cursor distance from center
      angleX = -my * 0.00005;
      angleY = mx * 0.00005;
    };

    const handleMouseLeave = () => {
      angleX = 0.003;
      angleY = 0.003;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const rotateX = (tag: Tag, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y1 = tag.y * cos - tag.z * sin;
      const z1 = tag.z * cos + tag.y * sin;
      tag.y = y1;
      tag.z = z1;
    };

    const rotateY = (tag: Tag, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x1 = tag.x * cos - tag.z * sin;
      const z1 = tag.z * cos + tag.x * sin;
      tag.x = x1;
      tag.z = z1;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Sort tags by Z coordinate (depth-sorting for rendering order)
      const sortedTags = [...tags].sort((a, b) => b.z - a.z);

      sortedTags.forEach((tag) => {
        rotateX(tag, angleX);
        rotateY(tag, angleY);

        // Perspective projection
        const depth = 250;
        const scale = depth / (depth + tag.z);
        const screenX = tag.x * scale + width / 2;
        const screenY = tag.y * scale + height / 2;

        // Visual presentation based on depth
        const alpha = Math.max(0.15, (depth - tag.z) / (2 * depth));
        const fontSize = Math.max(10, Math.floor(14 * scale));

        ctx.font = `600 ${fontSize}px var(--ff-outfit, sans-serif)`;
        
        // Multi-color themed texts based on depth and brand consistency
        if (tag.text === 'React' || tag.text === 'TypeScript' || tag.text === 'React Native') {
          ctx.fillStyle = `rgba(97, 218, 251, ${alpha})`; // react/ts cyan
        } else if (tag.text === 'Laravel' || tag.text === 'PHP') {
          ctx.fillStyle = `rgba(255, 45, 32, ${alpha})`; // laravel red
        } else if (tag.text === 'MySQL' || tag.text === 'Postman') {
          ctx.fillStyle = `rgba(255, 108, 55, ${alpha})`; // postman orange
        } else {
          ctx.fillStyle = `rgba(255, 219, 112, ${alpha})`; // theme gold
        }
        ctx.fillText(tag.text, screenX, screenY);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        background: 'transparent',
        cursor: 'pointer',
        display: 'block'
      }}
    />
  );
};
