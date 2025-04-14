import React, { useRef, useEffect } from 'react';

function WindAnimation({ speed }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let lines = [];
    for (let i = 0; i < 5; i++) {
      lines.push({
        x: Math.random() * 10,
        y: 8 + i * 5,
        length: 15 + Math.random() * 10,
        speed: 0.3 + Math.random() * 0.2,
        thickness: 1.5 + Math.random()
      });
    }

    const drawWind = () => {
      ctx.fillStyle = 'rgba(212, 241, 249, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#d4f1f9';
      ctx.beginPath();
      ctx.arc(20, 20, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#2d88c5';
      ctx.lineCap = 'round';

      lines.forEach(line => {
        ctx.beginPath();
        ctx.lineWidth = line.thickness;
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + line.length, line.y);
        ctx.stroke();

        line.x += line.speed;

        if (line.x > canvas.width) {
          line.x = -line.length;
          line.y = 8 + Math.random() * 25;
          line.length = 15 + Math.random() * 10;
        }
      });

      animationFrameId = requestAnimationFrame(drawWind);
    };

    drawWind();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="animations">
      <canvas ref={canvasRef} width={40} height={40} className="weather-canvas" />
      <div>
        {speed} m/s <br />
        <span> Wind speed</span>
      </div>
    </div>
  );
}

export default WindAnimation;
