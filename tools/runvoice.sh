#!/bin/bash
# usage: runvoice.sh [levels...]  plays each stage with the generic bot and reports which voice lines were requested (named directions, no generic go-to)
cd "$(dirname "$0")"
for n in ${@:-1 5 6 13}; do
  { echo "const LVL = $((n-1));"; echo "const __calls = []; { const V = __g.Voice, os = V.say.bind(V); V.say = (id, m) => { __calls.push(id + (m ? '@' + m : '')); return os(id, m); }; }"; sed 's/^return out;$/out.push("CALLS go=" + __calls.filter(c => \/^go_\/.test(c)).join(",") + " ins_24=" + __calls.filter(c => c.startsWith("ins_24")).length + " named=" + __calls.filter(c => \/^(x_eat_|x_feed_bilam|x_table_farm)\/.test(c)).join(",") + " generic=" + __calls.filter(c => \/^(x_eat|x_feed|x_table)(@|$)\/.test(c)).join(",")); return out;/' t_bot.js; } > _v.js
  echo "== level $n"; VT=60000 CUT=3000 bash runtest.sh _v.js | grep -o "CALLS[^\"]*"
done
rm -f _v.js
