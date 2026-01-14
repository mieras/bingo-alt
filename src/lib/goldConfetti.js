/**
 * Gouden confetti animatie module
 * Gebaseerd op ribbon-style confetti effect
 */

import React from 'react';

export class GoldConfetti {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.ribbons = [];
    this.animationId = null;
    this.isRunning = false;

    // Config - gouden variant
    this.config = {
      amount: 100,
      baseSize: 4,
      baseLength: 10,
      speedMult: 1.5,
      infinite: true,
      colorMode: 'gold',
    };

    // Gouden kleuren
    this.goldColors = ['#b8860b', '#ffd700', '#fff2b0'];

    // Bind resize handler voor correcte cleanup
    this.handleResize = () => this.resize();
    
    this.resize();
    window.addEventListener('resize', this.handleResize);
  }

  resize() {
    this.w = this.canvas.width = window.innerWidth;
    this.h = this.canvas.height = window.innerHeight;
  }

  initRibbons() {
    this.ribbons = Array.from({ length: this.config.amount }, () => new Ribbon(this));
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.initRibbons();
    this.animate();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    // Clear canvas
    this.ctx.clearRect(0, 0, this.w, this.h);
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.w, this.h);
    this.ribbons.forEach(r => {
      r.update();
      r.draw();
    });
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
  }
}

class Ribbon {
  constructor(confetti) {
    this.confetti = confetti;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.confetti.w;
    this.y = Math.random() * -this.confetti.h;
    this.size = this.confetti.config.baseSize * (0.5 + Math.random());
    this.length = this.confetti.config.baseLength * (0.5 + Math.random());
    this.speedY = (1 + Math.random() * 2) * this.confetti.config.speedMult;
    this.speedX = (Math.random() - 0.5) * 1;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = 0.03 + Math.random() * 0.05;
    this.flip = 0;
    this.flipSpeed = 0.08 + Math.random() * 0.08;
    this.gradientColors = this.confetti.goldColors;
  }

  draw() {
    const { ctx } = this.confetti;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    const flipScale = Math.sin(this.flip);

    const grad = ctx.createLinearGradient(-this.size, 0, this.size, 0);
    grad.addColorStop(0, this.gradientColors[0]);
    grad.addColorStop(0.5, this.gradientColors[1]);
    grad.addColorStop(1, this.gradientColors[2]);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(-this.size * flipScale, 0);
    ctx.lineTo(this.size * flipScale, 0);
    ctx.lineTo(this.size * flipScale, this.length);
    ctx.lineTo(-this.size * flipScale, this.length);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;
    this.flip += this.flipSpeed;
    if (this.y > this.confetti.h + this.length && this.confetti.config.infinite) {
      this.reset();
      this.y = -this.length;
    }
  }
}

/**
 * React hook voor gouden confetti
 * @param {React.RefObject<HTMLCanvasElement>} canvasRef - Ref naar canvas element
 * @param {boolean} enabled - Of confetti moet draaien
 */
export function useGoldConfetti(canvasRef, enabled = true) {
  const confettiRef = React.useRef(null);

  React.useEffect(() => {
    if (!canvasRef.current || !enabled) return;

    const confetti = new GoldConfetti(canvasRef.current);
    confettiRef.current = confetti;
    confetti.start();

    return () => {
      confetti.destroy();
      confettiRef.current = null;
    };
  }, [canvasRef, enabled]);

  return confettiRef.current;
}
