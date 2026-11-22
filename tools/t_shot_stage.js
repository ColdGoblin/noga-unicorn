const g = __g; g.reset(); g.start(LVL); const P = g.P(); P.x = XPOS; P.y = 560; P.vy = 0; g.step(60); return ['x ' + Math.round(P.x), g.LV().name];
