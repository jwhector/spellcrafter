# 0004. 3D with three.js and react-three-fiber

Status: ratified when it lands
Date: 2026-11-05

## Context

Jared asked for a design dashboard whose rune page shows each rune as a 3D
model (project thread, Nov 5). He chose to make the runes in code for now,
with a slot for model files he will make with AI in Blender. The app is
Next.js with React 19 (decision 0002), and the end target is a Discord
Activity, so the 3D must run in a browser and stay light.

## Decision

- **three.js** draws the 3D, through **react-three-fiber** (its React
  renderer) and **drei** (its helper library). react-three-fiber 9 supports
  React 19.0 to 19.3, which matches the repo; a React upgrade past that range
  waits for a react-three-fiber release that supports it.
- **One canvas per page**, with drei's View for each place that shows a 3D
  rune. Browsers allow only about 16 live WebGL canvases.
- **Model files are glTF binary (`.glb`)**, one per rune in
  `public/models/runes/`, whose README says what a Blender export must be.
- The 3D lives in client components under `app/`. The engine stays free of
  it (decision 0002).

## Why

three.js is the standard for 3D on the web, loads glTF (Blender's export
format) directly, and has no plugin or runtime to install. react-three-fiber
lets the 3D be React components beside the rest of the page.

## Alternatives rejected

- **three.js without react-three-fiber.** No extra dependency, but the scene
  would be managed by hand outside React, and the views would mix two ways
  of building UI.
- **Babylon.js.** Capable, but larger, and less used with React.
- **Pre-rendered images or video of each rune.** Light, but not turnable, and
  every rune change means rendering again.
