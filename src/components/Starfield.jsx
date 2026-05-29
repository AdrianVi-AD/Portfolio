import React, { useRef, useEffect } from "react";

export default function Starfield({ count = 240 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let running = true;

    const DPR = Math.max(1, window.devicePixelRatio || 1);
    let width = window.innerWidth;
    let height = window.innerHeight;

    function setupCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    setupCanvas();

    function createStars(n) {
      const arr = [];
      for (let i = 0; i < n; i++) {
        const r = Math.random() * 1.6 + 0.2;
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r,
          alpha: Math.random() * 0.8 + 0.2,
          twinkle: Math.random() * 0.03 + 0.002,
          vx: (Math.random() - 0.5) * 0.06,
          vy: (Math.random() - 0.5) * 0.03,
        });
      }
      return arr;
    }

    let stars = createStars(count);
    let shootingStars = [];

    function spawnShootingStar() {
      const startX = Math.random() * width * 0.8 + width * 0.1;
      const startY = Math.random() * height * 0.25;
      const len = Math.random() * 260 + 120;
      const speed = Math.random() * 8 + 6;
      const angle = Math.PI * 0.75 + (Math.random() - 0.5) * 0.6;
      shootingStars.push({ x: startX, y: startY, len, speed, angle, life: 0 });
      // keep array small
      if (shootingStars.length > 3) shootingStars.shift();
    }

    const spawnInterval = setInterval(
      () => {
        if (Math.random() < 0.45) spawnShootingStar();
      },
      2500 + Math.random() * 3000,
    );

    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      // faint overlay
      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, "rgba(8,10,18,0.18)");
      g.addColorStop(1, "rgba(20,18,35,0.14)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.alpha += (Math.random() - 0.5) * s.twinkle;
        s.alpha = Math.max(0.08, Math.min(1, s.alpha));
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (s.r > 1.4) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 6);
          glow.addColorStop(0, `rgba(255,255,255,${s.alpha * 0.12})`);
          glow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // draw shooting stars
      for (let k = 0; k < shootingStars.length; k++) {
        const st = shootingStars[k];
        st.x += Math.cos(st.angle) * st.speed;
        st.y += Math.sin(st.angle) * st.speed;
        st.life += 1;
        const x2 = st.x - Math.cos(st.angle) * st.len;
        const y2 = st.y - Math.sin(st.angle) * st.len;
        const grad = ctx.createLinearGradient(st.x, st.y, x2, y2);
        grad.addColorStop(0, "rgba(255,255,255,0.95)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(st.x, st.y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    function handleResize() {
      setupCanvas();
      stars = createStars(count);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      clearInterval(spawnInterval);
      window.removeEventListener("resize", handleResize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
