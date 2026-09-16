/* ============================================================
   Hero 3D object — dark iridescent torus knot.

   Expects THREE on the global scope (pinned UMD build, loaded in the
   document head). Self-contained: no textures, no loaders, no env map —
   the iridescence is a fresnel-driven cosine palette in the shader.

   Never initialises when the visitor prefers reduced motion, or when
   WebGL is unavailable. In both cases the static fallback image that is
   already in the markup is what stays on screen.
   ============================================================ */

(function () {
  'use strict';

  var canvas = document.getElementById('hero-canvas');
  var fallback = document.querySelector('.hero-fallback');
  if (!canvas) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // The fallback <img> is painted by default, so bailing just means getting
  // the dead canvas out of the way and leaving the image in place.
  function bailToFallback() {
    canvas.remove();
  }

  if (reduceMotion || typeof window.THREE === 'undefined') {
    bailToFallback();
    return;
  }

  var THREE = window.THREE;

  /* ---------- Shaders ---------- */

  var VERT = [
    'uniform float uTime;',
    'uniform float uAmp;',
    'varying vec3 vNormalW;',
    'varying vec3 vViewDir;',
    'varying float vWave;',
    'void main() {',
    '  vec3 pos = position;',
    '  float w = sin(pos.x * 2.0 + uTime * 0.55)',
    '          + sin(pos.y * 2.6 - uTime * 0.42)',
    '          + sin(pos.z * 2.2 + uTime * 0.33);',
    '  w *= 0.3333;',
    '  vWave = w;',
    '  pos += normal * w * uAmp;',
    '  vec4 worldPos = modelMatrix * vec4(pos, 1.0);',
    '  vNormalW = normalize(mat3(modelMatrix) * normal);',
    '  vViewDir = normalize(cameraPosition - worldPos.xyz);',
    '  gl_Position = projectionMatrix * viewMatrix * worldPos;',
    '}'
  ].join('\n');

  var FRAG = [
    'uniform float uTime;',
    'uniform vec3  uBase;',
    'uniform float uSheen;',
    'uniform float uRim;',
    'varying vec3 vNormalW;',
    'varying vec3 vViewDir;',
    'varying float vWave;',
    '',
    '// A hand-picked four-stop ramp rather than a full-spectrum cosine.',
    '// A rainbow would fight the lime headline and read as neon; this stays',
    '// in a muted indigo -> teal -> violet -> bronze band, none of it',
    '// saturated enough to compete with the type.',
    'vec3 palette(float t) {',
    '  vec3 c0 = vec3(0.10, 0.15, 0.32);',
    '  vec3 c1 = vec3(0.11, 0.34, 0.39);',
    '  vec3 c2 = vec3(0.31, 0.18, 0.44);',
    '  vec3 c3 = vec3(0.42, 0.28, 0.21);',
    '  float s = fract(t) * 4.0;',
    '  if (s < 1.0) return mix(c0, c1, smoothstep(0.0, 1.0, s));',
    '  if (s < 2.0) return mix(c1, c2, smoothstep(0.0, 1.0, s - 1.0));',
    '  if (s < 3.0) return mix(c2, c3, smoothstep(0.0, 1.0, s - 2.0));',
    '  return mix(c3, c0, smoothstep(0.0, 1.0, s - 3.0));',
    '}',
    '',
    'void main() {',
    '  vec3 N = normalize(vNormalW);',
    '  vec3 V = normalize(vViewDir);',
    '  // High exponent keeps the lit edge thin, so the body stays dark.',
    '  float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.9);',
    '',
    '  // Thin-film style shift: hue tracks view angle plus the surface wave,',
    '  // with a slow global drift so the object never looks frozen.',
    '  float t = fres * 0.7 + vWave * 0.16 + uTime * 0.016;',
    '  vec3 irid = palette(t);',
    '',
    '  // Dark body. The colour lives in the rim, not the fill.',
    '  vec3 col = uBase + irid * fres * uRim;',
    '  col += irid * uSheen;',
    '',
    '  gl_FragColor = vec4(col, 1.0);',
    '}'
  ].join('\n');

  /* ---------- Scene ---------- */

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
  } catch (e) {
    bailToFallback();
    return;
  }
  if (!renderer || !renderer.getContext()) {
    bailToFallback();
    return;
  }

  var stage = canvas.parentElement;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 8.2);

  var THEMES = {
    dark:  { base: new THREE.Color(0x0a0c10), sheen: 0.05, rim: 2.15 },
    light: { base: new THREE.Color(0x2b3039), sheen: 0.10, rim: 1.6 }
  };

  var uniforms = {
    uTime:  { value: 0 },
    uAmp:   { value: 0.075 },
    uBase:  { value: THEMES.dark.base.clone() },
    uSheen: { value: THEMES.dark.sheen },
    uRim:   { value: THEMES.dark.rim }
  };

  var geometry = new THREE.TorusKnotGeometry(1.25, 0.4, 320, 48, 2, 3);
  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: VERT,
    fragmentShader: FRAG
  });

  var mesh = new THREE.Mesh(geometry, material);
  var group = new THREE.Group();
  group.add(mesh);
  scene.add(group);

  /* ---------- Layout ---------- */

  // The hero copy is left-aligned, so the object is pushed right on wide
  // viewports and recentred (and shrunk) once the copy spans the column.
  function layout() {
    var w = stage.clientWidth || window.innerWidth;
    var h = stage.clientHeight || window.innerHeight;
    if (!w || !h) return;

    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    var wide = w >= 900;
    group.position.x = wide ? 2.5 : 0;
    group.position.y = wide ? 0.1 : 0.4;
    group.scale.setScalar(wide ? 1 : 0.8);
  }

  layout();

  // The hero height moves when the webfont swaps in, so re-measure then.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(layout);
  }

  // Watch the stage itself rather than the window: it catches the font swap,
  // scrollbar changes and orientation flips that a resize listener misses.
  if ('ResizeObserver' in window) {
    new ResizeObserver(layout).observe(stage);
  } else {
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layout, 120);
    }, { passive: true });
  }

  /* ---------- Pointer parallax ---------- */

  var pointer = { x: 0, y: 0 };
  var eased = { x: 0, y: 0 };

  window.addEventListener('pointermove', function (e) {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  /* ---------- Theme ---------- */

  function applyTheme(name) {
    var t = THEMES[name] || THEMES.dark;
    uniforms.uBase.value.copy(t.base);
    uniforms.uSheen.value = t.sheen;
    uniforms.uRim.value = t.rim;
  }

  /* ---------- Loop ---------- */

  // Pause when the hero scrolls away or the tab is hidden — no reason to
  // burn a GPU on an object nobody is looking at.
  var visible = true;
  var firstFrame = true;
  var clock = new THREE.Clock();

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
    }, { threshold: 0 }).observe(stage);
  }

  function frame() {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) return;

    var t = clock.getElapsedTime();
    uniforms.uTime.value = t;

    // Slow, continuous drift.
    group.rotation.y = t * 0.11;
    group.rotation.x = Math.sin(t * 0.17) * 0.22;
    group.position.y += 0; // base offset is set in layout()
    mesh.position.y = Math.sin(t * 0.5) * 0.09;

    // Pointer parallax, heavily eased so it reads as drift, not tracking.
    eased.x += (pointer.x - eased.x) * 0.035;
    eased.y += (pointer.y - eased.y) * 0.035;
    group.rotation.z = eased.x * 0.1;
    camera.position.x = eased.x * -0.32;
    camera.position.y = eased.y * 0.22;
    camera.lookAt(group.position.x * 0.35, 0, 0);

    renderer.render(scene, camera);

    if (firstFrame) {
      firstFrame = false;
      canvas.classList.add('is-ready');
      if (fallback) fallback.remove();
    }
  }

  frame();

  // Consumed by the theme toggle in dark-main.js
  window.__heroScene = { setTheme: applyTheme };
})();
