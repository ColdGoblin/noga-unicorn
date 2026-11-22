#!/bin/bash
# usage: runtest.sh <js-file> [shot.png]  (private Keeper copy: project dir = parent of tools/)
HERE="$(cd "$(dirname "$0")" && pwd)"; PROJ="${PROJ:-$(cd "$HERE/.." && pwd)}"
PROJW="$(cygpath -m "$PROJ")"
SP="${TMPDIR:-/tmp}"
TN="_t_$$.html"; UD="$(cygpath -m "${TMPDIR:-/tmp}")/nogachrome_$$"
python - "$1" "$PROJW" "$TN" <<'PY'
import sys
proj=sys.argv[2]
js=open(sys.argv[1],encoding='utf-8').read()
s=open(proj+'/index.html',encoding='utf-8').read()
t='<script>window.__errs=[];window.addEventListener("error",e=>window.__errs.push(e.message));setTimeout(async()=>{try{const r=await (async()=>{'+js+'})();document.title="RESULT "+JSON.stringify(r)+" ERRS "+JSON.stringify(window.__errs)}catch(e){document.title="FAIL "+e.message+" "+(e.stack||"").slice(0,300)+JSON.stringify(window.__errs)}},1500);</script></body>'
open(proj+'/'+sys.argv[3],'w',encoding='utf-8').write(s.replace('</body>',t))
PY
CH="/c/Program Files/Google/Chrome/Application/chrome.exe"
SHOT=${2:-$SP/shot.png}
"$CH" --headless=new --disable-gpu --user-data-dir="$UD" --no-first-run --allow-file-access-from-files --window-size=${WS:-1024,768} --virtual-time-budget=${VT:-20000} --screenshot="$(cygpath -m "$SHOT")" --dump-dom "file:///$PROJW/$TN" 2>/dev/null | grep -o "<title>[^<]*" | cut -c1-${CUT:-1500}
rm -f "$PROJ/$TN"; rm -rf "$UD"
