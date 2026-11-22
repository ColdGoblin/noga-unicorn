# Round 5 voice clips (8), Hebrew for Whisper: the flower tea in stage 3 and the friend picker
Same voice and direction as the 108 + 21 clips (warm, full, not whispery, feminine commands to a 5-year-old girl, excited for praise). Output: `voice\he\<id>.mp3`, same format and loudness as the others. The exact text is `LINES_HE` in `lines.js` (source of truth). Until a file exists the browser reads the text aloud.

Stage 3 (the forest) now has a tea chain: find 3 flowers and a drop of water, put all four in the teapot, carry the teapot and put it on the fire, then carry the cup of tea to the little tree.

| id | when it plays | Hebrew | English meaning | direction |
|---|---|---|---|---|
| x_tea_start | she walks near the start of the tea part (x 2450) | בואי נכין תה! צריך פרחים ומים. | Let's make tea! We need flowers and water. | inviting, cheerful |
| x_tea_flowers | hint while a flower is still to find | מצאי שלושה פרחים! | Find three flowers! | clear instruction (same style as "מצאי חמישה כוכבי ירח!") |
| x_tea_water | hint while the water drop is still to find | מצאי טיפת מים! | Find a drop of water! | clear instruction |
| x_tea_pot | when she comes near the teapot | שימי הכול בקומקום! | Put everything in the teapot! | clear instruction |
| x_tea_fire | the moment the teapot is full | עכשיו שימי את הקומקום על האש! | Now put the teapot on the fire! | clear, a little excited |
| x_tea_boil | the teapot is on the fire | המים רותחים! התה מוכן! | The water is boiling! The tea is ready! | happy, bubbly |
| x_tea_thanks | she gives the tea to the little tree (the tree speaks) | תודה! איזה תה טעים! | Thank you! What a tasty tea! | the tree's voice: a little character, warm, delighted |
| x_pick | the new "choose your friends" screen opens (pictures only, she cannot read) | בחרי שני חברים שיבואו איתך! | Choose two friends to come with you! | friendly, clear |

Notes: "מצאי" and "שימי" are feminine commands. Keep each clip short (under 3 seconds). Check after delivery: 8 playable files with exactly these ids, text matches.
