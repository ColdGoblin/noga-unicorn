# Keeper 22 Nov: synthetic OLD save (13 stages) loaded by the candidate; usage: python tools/t_save_old.py nogaReset20261121 (flag set = progress kept; unset = the one-time reset runs once). Uses a fresh Chrome profile, never a real save.
import subprocess,sys,json,re,os,tempfile
proj=os.environ.get("PROJ","C:/Users/kirga/noga-keeper-work/repo")
flag=sys.argv[1]
html=open(proj+'/index.html',encoding='utf-8').read()
pre='<script>try{localStorage.setItem("nogaUnicorn2",JSON.stringify({done:[true,true,true,false,false,false,false,false,false,false,false,false,true],dance:true,sup:true,half:{"2":{it:[1,2,3],bn:4},"12":{it:[5],bn:0}}}));localStorage.setItem("%s","1");}catch(e){}</script>'%flag
post='<script>setTimeout(()=>{document.title="RESULT inmem "+JSON.stringify(save)+" FLAG "+localStorage.getItem("%s")+" ERRS "+JSON.stringify(window.__errs||[])},2500)</script></body>'%flag
html=html.replace('<head>','<head>'+pre,1).replace('</body>',post)
open(proj+'/_save_test.html','w',encoding='utf-8').write(html)
ud=tempfile.mkdtemp()
r=subprocess.run([r'C:\Program Files\Google\Chrome\Application\chrome.exe','--headless=new','--disable-gpu','--user-data-dir='+ud,'--no-first-run','--allow-file-access-from-files','--virtual-time-budget=8000','--dump-dom','file:///'+proj+'/_save_test.html'],capture_output=True)
m=re.search(rb'<title>([^<]*)',r.stdout); print(m.group(1).decode() if m else 'NO TITLE')
os.remove(proj+'/_save_test.html')
