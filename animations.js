/**
 * Hacker-like animations for portfolio website
 * Uncomment the animation initialization you want to use at the bottom of this file
 */

document.addEventListener('DOMContentLoaded', function() {
  initMatrixRain('div.landing'); // Matrix rain effect (currently active)
  initMatrixRain('footer'); // Matrix rain effect (currently active)
  initParticleNetwork(); // Particle network effect
});

/**
 * Matrix Rain Effect
 * Creates a canvas with falling characters like in "The Matrix"
 * Attached to div.intro element
 */
function initMatrixRain(selector='div.landing', color='#00ffcc') {
  // Find the intro div
  const introDiv = document.querySelector(selector);
  if (!introDiv) {
    console.error('Could not find div.intro element for matrix rain animation');
    return;
  }

  // Create a canvas element for the matrix rain
  const canvas = document.createElement('canvas');
  canvas.id = 'matrix-canvas';
  canvas.width = introDiv.offsetWidth;
  canvas.height = introDiv.offsetHeight;
  introDiv.insertBefore(canvas, introDiv.firstChild);

  // Style the canvas
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '0'; // Ensure it's behind content but visible
  canvas.style.opacity = '0.07'; // Increased opacity for better visibility against dark background
  canvas.style.pointerEvents = 'none'; // Allow clicking through the canvas

  const ctx = canvas.getContext('2d');
  const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  // Make sure the intro div has position relative for proper absolute positioning of the canvas
  introDiv.style.position = 'relative';
  introDiv.style.overflow = 'hidden'; // Ensure the animation stays within the div
  const columns = canvas.width / 20;
  const drops = [];

  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = color; // Even brighter color for better visibility against dark backgrounds
    ctx.font = '15px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      ctx.fillText(text, i * 20, drops[i] * 20);
      
      if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      
      drops[i]++;
    }
  }

  // Handle window resize
  window.addEventListener('resize', function() {
    const introDiv = document.querySelector('div.intro');
    if (introDiv) {
      canvas.width = introDiv.offsetWidth;
      canvas.height = introDiv.offsetHeight;
    }
  });

  setInterval(draw, 35);
}



/**
 * Particle Network Effect
 * Adds an interactive particle network
 * Attached to div.projects element
 */
function initParticleNetwork() {
  // Find the projects div
  const projectsDiv = document.querySelector('main');
  if (!projectsDiv) {
    console.error('Could not find div.projects element for particle network animation');
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.id = 'particle-network';
  canvas.width = projectsDiv.offsetWidth;
  canvas.height = projectsDiv.offsetHeight;
  projectsDiv.insertBefore(canvas, projectsDiv.firstChild);
  
  // Make sure the projects div has position relative for proper absolute positioning of the canvas
  projectsDiv.style.position = 'relative';
  projectsDiv.style.overflow = 'hidden'; // Ensure the animation stays within the div
  
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = '1';
  canvas.style.pointerEvents = 'none'; // Allow clicking through the canvas
  
  const ctx = canvas.getContext('2d');
  const particles = [];
  const particleCount = 150;
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      color: '#d6a328',
      velocity: {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5
      }
    });
  }
  
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      
      // Move particles
      p.x += p.velocity.x;
      p.y += p.velocity.y;
      
      // Bounce off edges
      if (p.x < 0 || p.x > canvas.width) p.velocity.x *= -1;
      if (p.y < 0 || p.y > canvas.height) p.velocity.y *= -1;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      
      // Connect particles
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(214, 163, 40, ${1 - distance/100})`; // #d6a328 in rgba
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
      
    }
  }
  
  // Handle window resize
  window.addEventListener('resize', function() {
    const projectsDiv = document.querySelector('div.projects');
    if (projectsDiv) {
      canvas.width = projectsDiv.offsetWidth;
      canvas.height = projectsDiv.offsetHeight;
    }
  });
  
  animate();
}
