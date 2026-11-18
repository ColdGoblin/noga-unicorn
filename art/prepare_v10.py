from PIL import Image, ImageOps, ImageDraw
from pathlib import Path
import json
ROOT=Path(r'G:\My Drive\Projects\אייל\noga-unicorn')
spec={
'bg':('art/bg/bg_candy.jpg',(3600,1200)),
'castle':('art/props/prop_cotton_castle.png',(1250,1000)),
'fall':('art/props/prop_choc_fall.png',(520,700)),
'machine':('art/props/prop_candy_machine.png',(330,400)),
'run':('art/props/prop_candy_machine_run.png',(330,400)),
**{k:('art/items/item_'+n+'.png',(300,300)) for k,n in [('lollipop','lollipop'),('candycane','candycane'),('chocstar','chocstar'),('sugar','sugar'),('chocbar','chocbar'),('strawberry','strawberry')]},
'sticker':('art/ui/sticker_13.png',(300,300))}
sources=json.loads((ROOT/'art/v10-sources.json').read_text(encoding='utf-8'))
report=[]
thumbs=[]
for key,(name,size) in spec.items():
    out=ROOT/name
    if out.exists(): raise RuntimeError('Refusing overwrite: '+str(out))
    im=Image.open(sources[key]).convert('RGBA')
    if key=='bg':
        im=ImageOps.fit(im.convert('RGB'),size,method=Image.Resampling.LANCZOS)
    else:
        if im.getchannel('A').getextrema()[0]==255: raise RuntimeError('No transparency: '+key)
        # Preserve generated alpha, fit entire silhouette and align props to ground.
        box=im.getbbox()
        if box: im=im.crop(box)
        pad=0 if key in ['castle','fall','machine','run'] else 12
        fitted=ImageOps.contain(im,(size[0]-2*pad,size[1]-2*pad),Image.Resampling.LANCZOS)
        canvas=Image.new('RGBA',size)
        pos=((size[0]-fitted.width)//2,size[1]-fitted.height if key in ['castle','fall','machine','run'] else (size[1]-fitted.height)//2)
        canvas.alpha_composite(fitted,pos)
        im=canvas
    im.save(out,quality=95) if key=='bg' else im.save(out)
    report.append({'file':name,'size':im.size,'mode':im.mode,'alpha_extrema':im.getchannel('A').getextrema() if im.mode=='RGBA' else None})
    thumb=Image.new('RGB',(320,260),'#dce9ed')
    preview=im.copy(); preview.thumbnail((310,228))
    thumb.paste(preview,((320-preview.width)//2,0),preview if preview.mode=='RGBA' else None)
    ImageDraw.Draw(thumb).text((8,238),key,fill='black')
    thumbs.append(thumb)
sheet=Image.new('RGB',(1280,780),'white')
for i,t in enumerate(thumbs):sheet.paste(t,((i%4)*320,(i//4)*260))
sheet.save(ROOT/'art/ASSETS-V10-CONTACT.jpg',quality=90)
(ROOT/'art/ASSETS-V10-VALIDATION.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report))

