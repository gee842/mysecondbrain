<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  // @ts-ignore - d3-force types are installed but TS may not find them immediately
  import {
    forceSimulation,
    forceLink,
    forceManyBody,
    forceCenter,
    forceCollide,
    forceX,
    forceY
  } from 'd3-force';

  let canvas: HTMLCanvasElement;
  let mounted = false;
  let hoveredNode: SimNode | null = null;
  let draggedNode: SimNode | null = null;
  let mouseX = 0;
  let mouseY = 0;

  interface NodeData {
    id: string;
    label: string;
    category: 'center' | 'person' | 'topic' | 'event' | 'date';
    color: string;
  }

  interface SimNode extends NodeData {
    x: number;
    y: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;
    radius: number;
    index?: number;
  }

  interface SimLink {
    source: SimNode;
    target: SimNode;
  }

  // Node dataset
  const nodeData: NodeData[] = [
    // Center node
    { id: 'you', label: 'You', category: 'center', color: '#ff6b35' },

    // People (green shades)
    { id: 'mom', label: 'Mom', category: 'person', color: '#4ade80' },
    { id: 'james', label: 'James', category: 'person', color: '#4ade80' },
    { id: 'sarah', label: 'Sarah', category: 'person', color: '#22c55e' },
    { id: 'dad', label: 'Dad', category: 'person', color: '#4ade80' },
    { id: 'maria', label: 'Maria', category: 'person', color: '#22c55e' },
    { id: 'alex', label: 'Alex', category: 'person', color: '#4ade80' },
    { id: 'david', label: 'David', category: 'person', color: '#22c55e' },
    { id: 'emma', label: 'Emma', category: 'person', color: '#4ade80' },
    { id: 'mike', label: 'Mike', category: 'person', color: '#22c55e' },
    { id: 'lisa', label: 'Lisa', category: 'person', color: '#4ade80' },

    // Topics (various colors)
    { id: 'work', label: 'Work', category: 'topic', color: '#fbbf24' },
    { id: 'health', label: 'Health', category: 'topic', color: '#fbbf24' },
    { id: 'travel', label: 'Travel', category: 'topic', color: '#a78bfa' },
    { id: 'anxiety', label: 'Anxiety', category: 'topic', color: '#f472b6' },
    { id: 'gym', label: 'Gym', category: 'topic', color: '#4ade80' },
    { id: 'career', label: 'Career', category: 'topic', color: '#fbbf24' },
    { id: 'finances', label: 'Finances', category: 'topic', color: '#fbbf24' },
    { id: 'relationship', label: 'Relationship', category: 'topic', color: '#f472b6' },
    { id: 'hobbies', label: 'Hobbies', category: 'topic', color: '#a78bfa' },
    { id: 'growth', label: 'Growth', category: 'topic', color: '#4ade80' },

    // Events (blue shades)
    { id: 'birthday', label: 'Birthday', category: 'event', color: '#60a5fa' },
    { id: 'dinner', label: 'Dinner', category: 'event', color: '#38bdf8' },
    { id: 'meeting', label: 'Meeting', category: 'event', color: '#60a5fa' },
    { id: 'wedding', label: 'Wedding', category: 'event', color: '#38bdf8' },
    { id: 'trip', label: 'Italy Trip', category: 'event', color: '#60a5fa' },

    // Dates (small, gray)
    { id: 'date1', label: 'Nov 15', category: 'date', color: '#64748b' },
    { id: 'date2', label: 'Oct 22', category: 'date', color: '#64748b' },
    { id: 'date3', label: 'Sep 8', category: 'date', color: '#64748b' },
    { id: 'date4', label: 'Dec 1', category: 'date', color: '#64748b' },
    { id: 'date5', label: 'Aug 14', category: 'date', color: '#64748b' },
    { id: 'date6', label: 'Jan 5', category: 'date', color: '#64748b' },
    { id: 'date7', label: 'Jul 20', category: 'date', color: '#64748b' },
    { id: 'date8', label: 'Jun 12', category: 'date', color: '#64748b' },
  ];

  // Connections between nodes
  const connectionData: [string, string][] = [
    // You connections
    ['you', 'mom'], ['you', 'james'], ['you', 'sarah'], ['you', 'dad'],
    ['you', 'work'], ['you', 'health'], ['you', 'anxiety'], ['you', 'growth'],
    ['you', 'maria'], ['you', 'alex'], ['you', 'relationship'],

    // People connections
    ['mom', 'birthday'], ['mom', 'dad'], ['mom', 'date1'],
    ['james', 'dinner'], ['james', 'work'], ['james', 'date2'],
    ['sarah', 'travel'], ['sarah', 'trip'], ['sarah', 'date3'],
    ['dad', 'health'], ['dad', 'date4'],
    ['maria', 'work'], ['maria', 'meeting'], ['maria', 'date5'],
    ['alex', 'gym'], ['alex', 'health'], ['alex', 'date6'],
    ['david', 'career'], ['david', 'finances'],
    ['emma', 'wedding'], ['emma', 'relationship'],
    ['mike', 'hobbies'], ['mike', 'gym'],
    ['lisa', 'travel'], ['lisa', 'trip'],

    // Topic connections
    ['work', 'meeting'], ['work', 'career'], ['work', 'anxiety'],
    ['health', 'gym'], ['health', 'anxiety'], ['health', 'growth'],
    ['travel', 'trip'], ['travel', 'hobbies'],
    ['relationship', 'anxiety'], ['relationship', 'growth'],
    ['career', 'finances'], ['career', 'growth'],

    // Date connections
    ['birthday', 'date1'], ['dinner', 'date2'], ['meeting', 'date5'],
    ['wedding', 'date7'], ['trip', 'date8'],

    // Cross connections for density
    ['james', 'sarah'], ['mom', 'maria'], ['alex', 'mike'],
    ['work', 'finances'], ['health', 'hobbies'], ['growth', 'career'],
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let simulation: any = null;
  let nodes: SimNode[] = [];
  let links: SimLink[] = [];
  let animationId: number;
  let width = 800;
  let height = 600;
  let time = 0;

  // Particles traveling along links for visual effect
  interface Particle {
    link: SimLink;
    progress: number;
    speed: number;
  }
  let particles: Particle[] = [];

  function getNodeRadius(category: string, baseSize: number): number {
    switch (category) {
      case 'center': return baseSize * 2.5;
      case 'person': return baseSize * 1.2;
      case 'topic': return baseSize * 1.0;
      case 'event': return baseSize * 0.9;
      case 'date': return baseSize * 0.5;
      default: return baseSize;
    }
  }

  function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function findNodeAtPosition(x: number, y: number): SimNode | null {
    for (const node of nodes) {
      const dx = x - node.x;
      const dy = y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < node.radius + 5) {
        return node;
      }
    }
    return null;
  }

  function handleMouseMove(e: MouseEvent) {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    mouseX = (e.clientX - rect.left) * (canvas.width / rect.width) / dpr;
    mouseY = (e.clientY - rect.top) * (canvas.height / rect.height) / dpr;

    if (draggedNode && simulation) {
      // Update dragged node position
      draggedNode.fx = mouseX;
      draggedNode.fy = mouseY;
      simulation.alpha(0.3).restart();
    } else {
      hoveredNode = findNodeAtPosition(mouseX, mouseY);
    }
  }

  function handleMouseDown(e: MouseEvent) {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = (e.clientX - rect.left) * (canvas.width / rect.width) / dpr;
    const y = (e.clientY - rect.top) * (canvas.height / rect.height) / dpr;

    const node = findNodeAtPosition(x, y);
    if (node && simulation) {
      draggedNode = node;
      draggedNode.fx = node.x;
      draggedNode.fy = node.y;
      simulation.alphaTarget(0.3).restart();
    }
  }

  function handleMouseUp() {
    if (draggedNode && simulation) {
      draggedNode.fx = null;
      draggedNode.fy = null;
      draggedNode = null;
      simulation.alphaTarget(0);
    }
  }

  function handleMouseLeave() {
    hoveredNode = null;
    if (draggedNode && simulation) {
      draggedNode.fx = null;
      draggedNode.fy = null;
      draggedNode = null;
      simulation.alphaTarget(0);
    }
  }

  function handleTouchStart(e: TouchEvent) {
    if (!canvas || e.touches.length === 0) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = (touch.clientX - rect.left) * (canvas.width / rect.width) / dpr;
    const y = (touch.clientY - rect.top) * (canvas.height / rect.height) / dpr;

    const node = findNodeAtPosition(x, y);
    if (node && simulation) {
      draggedNode = node;
      draggedNode.fx = node.x;
      draggedNode.fy = node.y;
      simulation.alphaTarget(0.3).restart();
    }
  }

  function handleTouchMove(e: TouchEvent) {
    if (!canvas || !draggedNode || e.touches.length === 0) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    mouseX = (touch.clientX - rect.left) * (canvas.width / rect.width) / dpr;
    mouseY = (touch.clientY - rect.top) * (canvas.height / rect.height) / dpr;

    if (simulation) {
      draggedNode.fx = mouseX;
      draggedNode.fy = mouseY;
      simulation.alpha(0.3).restart();
    }
  }

  function handleTouchEnd() {
    if (draggedNode && simulation) {
      draggedNode.fx = null;
      draggedNode.fy = null;
      draggedNode = null;
      simulation.alphaTarget(0);
    }
  }

  function initSimulation() {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    width = canvas.parentElement?.clientWidth || 800;
    height = canvas.parentElement?.clientHeight || 600;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Calculate base node size based on canvas size
    const baseSize = Math.min(width, height) * 0.025;

    // Create nodes with initial positions spread out
    const nodeMap = new Map<string, SimNode>();
    nodes = nodeData.map((data, i) => {
      // Start with positions spread in a circle
      const angle = (i / nodeData.length) * Math.PI * 2;
      const radius = Math.min(width, height) * 0.3;
      const centerX = width * 0.55;
      const centerY = height * 0.5;
      
      const node: SimNode = {
        ...data,
        x: data.category === 'center' ? centerX : centerX + Math.cos(angle) * radius * (0.5 + Math.random() * 0.5),
        y: data.category === 'center' ? centerY : centerY + Math.sin(angle) * radius * (0.5 + Math.random() * 0.5),
        radius: getNodeRadius(data.category, baseSize)
      };
      nodeMap.set(data.id, node);
      return node;
    });

    // Create links
    links = connectionData
      .map(([sourceId, targetId]) => {
        const source = nodeMap.get(sourceId);
        const target = nodeMap.get(targetId);
        if (!source || !target) return null;
        return { source, target };
      })
      .filter((link): link is SimLink => link !== null);

    // Graph center (offset to the right for text overlay)
    const graphCenterX = width * 0.55;
    const graphCenterY = height * 0.5;

    // Create force simulation
    simulation = forceSimulation(nodes)
      .force('link', forceLink(links)
        .id((d: SimNode) => d.id)
        .distance((d: SimLink) => {
          // Vary link distance based on node types
          const sourceRadius = d.source.radius;
          const targetRadius = d.target.radius;
          return (sourceRadius + targetRadius) * 2.5 + 30;
        })
        .strength(0.4)
      )
      .force('charge', forceManyBody()
        .strength((d: SimNode) => {
          // Stronger repulsion for larger nodes
          if (d.category === 'center') return -400;
          if (d.category === 'person') return -150;
          if (d.category === 'topic') return -120;
          return -80;
        })
        .distanceMax(300)
      )
      .force('center', forceCenter(graphCenterX, graphCenterY).strength(0.05))
      .force('collision', forceCollide()
        .radius((d: SimNode) => d.radius + 8)
        .strength(0.9)
      )
      .force('x', forceX(graphCenterX).strength(0.02))
      .force('y', forceY(graphCenterY).strength(0.02))
      .alphaDecay(0.01)
      .velocityDecay(0.3);

    // Initialize particles on some links
    particles = links
      .filter(() => Math.random() > 0.6) // Only some links get particles
      .map(link => ({
        link,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003
      }));

    // Render loop
    function render() {
      if (!mounted || !ctx) return;

      time += 0.016; // ~60fps timing
      ctx.clearRect(0, 0, width, height);

      // Update particles
      for (const particle of particles) {
        particle.progress += particle.speed;
        if (particle.progress > 1) {
          particle.progress = 0;
        }
      }

      // Draw links
      ctx.lineCap = 'round';
      for (const link of links) {
        const source = link.source;
        const target = link.target;

        const isHighlighted = 
          hoveredNode === source || 
          hoveredNode === target ||
          draggedNode === source ||
          draggedNode === target;

        // Calculate alpha based on distance from center for depth effect
        const centerNode = nodes.find(n => n.category === 'center');
        const linkCenterX = (source.x + target.x) / 2;
        const linkCenterY = (source.y + target.y) / 2;
        const distFromCenter = centerNode 
          ? Math.sqrt((linkCenterX - centerNode.x) ** 2 + (linkCenterY - centerNode.y) ** 2)
          : 0;
        const depthAlpha = Math.max(0.15, 1 - distFromCenter / 400);

        // Gradient line from source to target color
        const gradient = ctx.createLinearGradient(source.x, source.y, target.x, target.y);
        if (isHighlighted) {
          gradient.addColorStop(0, `${source.color}bb`);
          gradient.addColorStop(1, `${target.color}bb`);
        } else {
          const alphaHex = Math.round(depthAlpha * 60).toString(16).padStart(2, '0');
          gradient.addColorStop(0, `${source.color}${alphaHex}`);
          gradient.addColorStop(1, `${target.color}${alphaHex}`);
        }

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = isHighlighted ? 2.5 : 1;
        ctx.stroke();
      }

      // Draw particles on links
      for (const particle of particles) {
        const { link, progress } = particle;
        const x = link.source.x + (link.target.x - link.source.x) * progress;
        const y = link.source.y + (link.target.y - link.source.y) * progress;
        
        // Particle glow
        const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, 6);
        particleGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        particleGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
        particleGradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = particleGradient;
        ctx.fill();

        // Particle core
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
      }

      // Draw nodes
      for (const node of nodes) {
        const isHovered = hoveredNode === node;
        const isDragged = draggedNode === node;
        const isActive = isHovered || isDragged;
        
        // Subtle pulsing animation for center and active nodes
        const pulse = node.category === 'center' || isActive
          ? 1 + Math.sin(time * 2) * 0.05
          : 1;
        const scale = (isActive ? 1.15 : 1) * pulse;
        const r = node.radius * scale;

        // Outer glow with pulsing
        const glowPulse = node.category === 'center' ? 1 + Math.sin(time * 1.5) * 0.2 : 1;
        const glowSize = (isActive ? r * 3.5 : (node.category === 'center' ? r * 3 : r * 2)) * glowPulse;
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize);
        gradient.addColorStop(0, `${node.color}${isActive ? '60' : '30'}`);
        gradient.addColorStop(0.4, `${node.color}${isActive ? '25' : '12'}`);
        gradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Node ring for larger nodes
        if (node.category !== 'date') {
          ctx.beginPath();
          ctx.arc(node.x, node.y, r + 2, 0, Math.PI * 2);
          ctx.strokeStyle = `${node.color}50`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Node fill with inner gradient
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        
        const nodeGradient = ctx.createRadialGradient(
          node.x - r * 0.3, node.y - r * 0.3, 0,
          node.x, node.y, r * 1.2
        );
        nodeGradient.addColorStop(0, lightenColor(node.color, 60));
        nodeGradient.addColorStop(0.6, node.color);
        nodeGradient.addColorStop(1, darkenColor(node.color, 30));
        ctx.fillStyle = nodeGradient;
        ctx.fill();

        // Label with better styling
        const showLabel = node.category !== 'date' || isActive;
        if (showLabel) {
          const fontSize = node.category === 'center' ? 13 : 
                           node.category === 'date' ? 8 : 10;
          ctx.font = `${isActive ? '600' : '500'} ${fontSize}px "Space Grotesk", system-ui, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Multiple shadow layers for depth
          ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
          ctx.fillText(node.label, node.x + 1, node.y + 1);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
          ctx.fillText(node.label, node.x + 0.5, node.y + 0.5);
          
          ctx.fillStyle = '#ffffff';
          ctx.fillText(node.label, node.x, node.y);
        }
      }

      animationId = requestAnimationFrame(render);
    }

    render();
  }

  function darkenColor(hex: string, percent: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, (num >> 16) - percent);
    const g = Math.max(0, ((num >> 8) & 0x00FF) - percent);
    const b = Math.max(0, (num & 0x0000FF) - percent);
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  }

  function lightenColor(hex: string, percent: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, (num >> 16) + percent);
    const g = Math.min(255, ((num >> 8) & 0x00FF) + percent);
    const b = Math.min(255, (num & 0x0000FF) + percent);
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  }

  function handleResize() {
    if (!canvas || !mounted) return;
    
    // Stop current simulation and restart
    if (simulation) {
      simulation.stop();
    }
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    initSimulation();
  }

  onMount(() => {
    if (!browser) return;
    mounted = true;
    
    initSimulation();
    window.addEventListener('resize', handleResize);

    return () => {
      mounted = false;
      window.removeEventListener('resize', handleResize);
      if (simulation) simulation.stop();
      if (animationId) cancelAnimationFrame(animationId);
    };
  });

  onDestroy(() => {
    mounted = false;
    if (simulation) simulation.stop();
    if (animationId) cancelAnimationFrame(animationId);
  });
</script>

<section id="graph" class="graph-section">
  <!-- Background graph canvas -->
  <div class="graph-canvas-wrapper">
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <canvas
      bind:this={canvas}
      class="graph-canvas"
      on:mousemove={handleMouseMove}
      on:mousedown={handleMouseDown}
      on:mouseup={handleMouseUp}
      on:mouseleave={handleMouseLeave}
      on:touchstart={handleTouchStart}
      on:touchmove={handleTouchMove}
      on:touchend={handleTouchEnd}
      aria-label="Interactive knowledge graph visualization"
    ></canvas>
  </div>

  <!-- Instruction hint -->
  <div class="drag-hint">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
    </svg>
    <span>Drag nodes to explore</span>
  </div>

  <!-- Content overlay -->
  <div class="graph-content">
    <div class="graph-text">
      <span class="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4 block">
        Knowledge Graph
      </span>
      <h2 class="text-4xl sm:text-5xl font-black tracking-tight mb-6 text-white">
        See how everything connects
      </h2>
      <p class="text-xl text-white/60 mb-8 max-w-md">
        People, topics, events—all linked. Search "that restaurant Maria mentioned" and find it instantly.
      </p>

      <button
        on:click={scrollToFeatures}
        class="explore-button"
      >
        <span>Explore the graph</span>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Stats -->
      <div class="graph-stats">
        <span>{nodeData.length} nodes</span>
        <span class="text-white/20">•</span>
        <span>{connectionData.length} connections</span>
      </div>
    </div>
  </div>
</section>

<style>
  .graph-section {
    position: relative;
    min-height: 600px;
    height: 80vh;
    max-height: 800px;
    overflow: hidden;
    background: 
      radial-gradient(ellipse at 70% 40%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 30% 70%, rgba(34, 197, 94, 0.06) 0%, transparent 40%),
      radial-gradient(ellipse at 60% 50%, rgba(20, 25, 40, 0.95) 0%, rgba(8, 8, 16, 0.99) 70%);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .graph-canvas-wrapper {
    position: absolute;
    inset: 0;
  }

  .graph-canvas {
    width: 100%;
    height: 100%;
    cursor: grab;
  }

  .graph-canvas:active {
    cursor: grabbing;
  }

  .drag-hint {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.875rem;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 2rem;
    backdrop-filter: blur(8px);
    pointer-events: none;
    z-index: 20;
  }

  .graph-content {
    position: relative;
    z-index: 10;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 3rem;
    pointer-events: none;
  }

  .graph-text {
    max-width: 500px;
    pointer-events: auto;
  }

  .explore-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    color: white;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.75rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .explore-button:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateX(4px);
  }

  .graph-stats {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    .graph-section {
      min-height: 500px;
      height: 70vh;
    }

    .graph-content {
      padding: 2rem;
      align-items: flex-end;
      padding-bottom: 3rem;
    }

    .graph-text h2 {
      font-size: 1.875rem;
    }

    .graph-text p {
      font-size: 1rem;
    }

    .drag-hint {
      top: 1rem;
      right: 1rem;
    }
  }
</style>
