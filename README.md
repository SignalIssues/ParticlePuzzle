# Particle Simulator

A simple “falling-sand” style physics sandbox built with Phaser 3 + Matter.js, TypeScript, and Vite.

## Setup

```bash
npm install
npm run dev    # starts local server
npm run build  # production build in dist/
```

Open `index.html` after running `npm run dev` to view the sandbox in your browser. Drag
the pointer to spawn sand particles. Interaction behavior between particles can be
extended in `src/utils/InteractionMap.ts`.
