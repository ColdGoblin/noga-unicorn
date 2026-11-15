#!/bin/bash
# usage: runtest.sh <js-file> [screenshot.png]   runs the JS (an async function body returning a string) after the game loads
PROJ="G:/My Drive/Projects/אייל/noga-unicorn"
SP="${TMPDIR:-/tmp}"
python - "$1" <<'PY'
import sys
proj="G:/My Drive/Projects/אייל/noga-unicorn"
js=open(sys.argv[1],encoding='utf-8').read()
s=open(proj+'/index.html',encoding='utf-8').read()
t='<script>window.__errs=[];window.addEventListener("error",e=>window.__errs.push(e.message));setTimeout(async()=>{try{const r=await (async()=>{'+js+'})();document.title="RESULT "+JSON.stringify(r)+" ERRS "+JSON.stringify(window.__errs)}catch(e){document.title="FAIL "+e.message+" "+(e.stack||"").slice(0,300)+JSON.stringify(window.__errs)}},1500);</script></body>'
open(proj+'/_t.html','w',encoding='utf-8').write(s.replace('</body>',t))
PY
CH="/c/Program Files/Google/Chrome/Application/chrome.exe"
SHOT=${2:-$SP/shot.png}
"$CH" --headless=new --disable-gpu --allow-file-access-from-files --window-size=${WS:-1024,768} --virtual-time-budget=20000 --screenshot="$SHOT" --dump-dom "file:///G:/My%20Drive/Projects/%D7%90%D7%99%D7%99%D7%9C/noga-unicorn/_t.html" 2>/dev/null | grep -o "<title>[^<]*" | cut -c1-1500
rm -f "$PROJ/_t.html"
