# Noga game art, round 3

## Bil'am riding rig

- `hero/donkey_full.png`: complete standing pose.
- `hero/donkey_body.png`, `hero/donkey_leg_back.png`, `hero/donkey_leg_front.png`: layers cut from the standing pose with matching 1011 × 1000 canvases. Draw the legs behind the body; they overlap at the hips to cover moving joints.
- `hero/donkey_happy.png`: raised-arms dance body on the same canvas. Draw the same leg layers beneath it.
- `hero/donkey_wings.png`: separate Super Jump wing overlay, 500 px wide.

Hip points from the top-left corner of the standing canvas:

| Leg | x | y |
| --- | ---: | ---: |
| Back | 268 | 681 |
| Front | 626 | 678 |

Bil'am follows the existing grey donkey design and small colored-pencil wing motif in `art/friends/bilam_happy.png`. Noga follows the round-three wardrobe spec.

## Flying unicorn and trampoline

- `friends/unicorn_fly_a.png`, `friends/unicorn_fly_b.png`, `friends/unicorn_fly_happy.png`: wing up, wing down, and dance poses in matching 300 px wide frames. The foal's coloration follows the game spec and the unicorn seen in the Noga 6 story plates.
- `props/prop_trampoline.png`, `props/prop_trampoline_squash.png`: flat and dipped mat, matching 500 px wide frames. Original prop drawn for the game.

## Dad and Luna

- `friends/dad_sad.png`, `friends/dad_happy.png`: worried and open-arm poses on matching 250 px tall frames, aligned at the feet. The owner supplied the likeness reference. The game version uses everyday clothing.
- Luna's two existing sprites are white and match the white coat in scenes 1–6 of Noga, Luna, and the Wandering Shadow. Both sprites were retained.

The standing layers reconstruct the original standing image in their neutral positions. In-game animation, scale and Super Jump wing placement still need a playtest. The current donkey draw path uses the whole standing sprite and needs to composite the legs under the dance body.
