<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  let canvas: HTMLCanvasElement;
  let animationId: number;
  let mounted = false;

  interface Point {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
  }

  // Color palette - warm ember tones with cool accents
  const colors = [
    'rgba(255, 107, 53, 0.08)',   // ember orange
    'rgba(247, 147, 30, 0.06)',   // golden orange  
    'rgba(255, 69, 0, 0.05)',     // red orange
    'rgba(139, 92, 246, 0.07)',   // violet
    'rgba(236, 72, 153, 0.06)',   // pink
    'rgba(6, 182, 212, 0.05)',    // cyan
  ];

  onMount(() => {
    if (!browser) return;

    let handleResize: (() => void) | undefined;

    // Dynamic import to avoid SSR issues
    import('d3-delaunay').then(({ Delaunay }) => {
      mounted = true;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width = window.innerWidth;
      let height = window.innerHeight * 3; // Extend for scroll
      canvas.width = width;
      canvas.height = height;

      // Generate random points with velocities
      const numPoints = 60;
      const points: Point[] = [];

      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      function animate() {
        if (!mounted || !ctx) return;

        ctx.clearRect(0, 0, width, height);

      // Update point positions
      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Keep in bounds
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      }

      // Create Delaunay triangulation and Voronoi diagram
      const delaunay = Delaunay.from(points.map(p => [p.x, p.y]));
      const voronoi = delaunay.voronoi([0, 0, width, height]);

      // Draw Voronoi cells
      for (let i = 0; i < points.length; i++) {
        const cell = voronoi.cellPolygon(i);
        if (!cell) continue;

        ctx.beginPath();
        ctx.moveTo(cell[0][0], cell[0][1]);
        for (let j = 1; j < cell.length; j++) {
          ctx.lineTo(cell[j][0], cell[j][1]);
        }
        ctx.closePath();

        // Fill with gradient-like color
        ctx.fillStyle = points[i].color;
        ctx.fill();

        // Draw cell edges with subtle glow
        ctx.strokeStyle = 'rgba(255, 107, 53, 0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Add subtle glow points at vertices
      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 107, 53, 0.15)';
        ctx.fill();
      }

        animationId = requestAnimationFrame(animate);
      }

      animate();

      // Handle resize
      handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight * 3;
        canvas.width = width;
        canvas.height = height;
      };

      window.addEventListener('resize', handleResize);
    });

    return () => {
      mounted = false;
      if (handleResize) {
        window.removeEventListener('resize', handleResize);
      }
      if (animationId) cancelAnimationFrame(animationId);
    };
  });

  onDestroy(() => {
    mounted = false;
    if (animationId) cancelAnimationFrame(animationId);
  });
</script>

<canvas
  bind:this={canvas}
  class="fixed inset-0 -z-10 pointer-events-none"
  style="background: linear-gradient(180deg, hsl(240 10% 4%) 0%, hsl(240 10% 6%) 50%, hsl(240 10% 4%) 100%);"
></canvas>
