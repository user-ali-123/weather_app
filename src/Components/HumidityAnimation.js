import React, { useRef, useEffect } from 'react';

function HumidityAnimation({ percentage }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let frame = 0;

    let droplets = [];
    for (let i = 0; i < 3; i++) {
      droplets.push({
        x: 20,
        y: 10,
        size: 2,
        speedX: 0.3 * (i === 1 ? -1 : 1) * (i === 2 ? 0 : 1),
        speedY: 0.4 + (i * 0.05),
        opacity: 0.8
      });
    }

    const drawHumidity = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      ctx.fillStyle = '#e6f7ff';
      ctx.beginPath();
      ctx.arc(20, 20, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#0078d7';
      ctx.beginPath();
      ctx.moveTo(20, 8);
      ctx.bezierCurveTo(13, 15, 13, 25, 20, 32);
      ctx.bezierCurveTo(27, 25, 27, 15, 20, 8);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.arc(17, 16, 3, 0, Math.PI * 2);
      ctx.fill();

      if (frame % 60 === 0) {
        droplets.forEach((droplet, i) => {
          droplet.x = 20;
          droplet.y = 10;
          droplet.size = 2;
          droplet.speedX = 0.3 * (i === 1 ? -1 : 1) * (i === 2 ? 0 : 1);
          droplet.speedY = 0.4 + (i * 0.05);
          droplet.opacity = 0.8;
        });
      }

      droplets.forEach(droplet => {
        droplet.x += droplet.speedX;
        droplet.y += droplet.speedY;
        droplet.opacity -= 0.01;

        if (droplet.opacity > 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${droplet.opacity})`;
          ctx.beginPath();
          ctx.arc(droplet.x, droplet.y, droplet.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(drawHumidity);
    };

    drawHumidity();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="detail-item">
      <canvas ref={canvasRef} width={40} height={40} className="weather-canvas" />
      <div>
        {percentage}% <br />
        <span>Humidity</span>
      </div>
    </div>
  );
}

export default HumidityAnimation;
