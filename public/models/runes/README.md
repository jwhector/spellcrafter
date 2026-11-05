# Rune model files

Put a finished model for a rune here as `<rune>.glb`, named by the rune's
address on the rune page: `fire.glb`, `frost.glb`, `amplification.glb`,
`blank.glb`. The rune page (`/design/runes`) shows the file in place of the
coded stone the next time the site is built. Delete the file to go back to
the coded stone.

## What the file must be

- **glTF binary (`.glb`)**, one file per rune, textures packed inside. From
  Blender: File > Export > glTF 2.0, format "glTF Binary (.glb)".
- **The symbol faces Blender's front view.** In Blender's front view
  (numpad 1) you should be looking straight at the symbol. Keep the
  exporter's "+Y Up" option on (the default); it turns Blender's axes into
  the page's.
- **Any size and position.** The page scales the model so its widest side
  matches the coded stone and centres it, so metres, centimetres or an
  off-centre origin all work. Apply rotation in Blender (Ctrl+A) so the
  export matches what you see.
- **Small enough for the hotbar and, later, Discord.** Aim for under 1 MB
  and under about 20,000 triangles per rune. Decimate an AI-generated mesh
  before export, and keep textures at 1024 px or less.
- **Your own work.** RuneScape is a style reference only: no models,
  textures or symbols taken from it, and no RuneScape images given to an AI
  model generator.

The page lights every rune the same way and turns it slowly; materials with
an emissive colour glow. The coded stones' placeholder colours and symbols
are in `app/design/runes/look.ts`.
