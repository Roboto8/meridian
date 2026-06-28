"""Generate a documentary news photo for every article from its imagePrompt
(ComfyUI + Juggernaut XL, text2img) into public/img/<id>.jpg. The HeroImage
component picks these up automatically; until they exist it shows a gradient.
"""
import io, json, os, time, urllib.parse, urllib.request, uuid
from PIL import Image

COMFY = "http://127.0.0.1:8000"
CKPT = "juggernautXL_v9.safetensors"
ART = r"C:\Users\porte\meridian\src\data\articles.json"
OUT = r"C:\Users\porte\meridian\public\img"
os.makedirs(OUT, exist_ok=True)
STYLE = ", documentary news photograph, photojournalism, candid, natural lighting, realistic, sharp focus, 35mm, high detail"
NEG = ("illustration, cartoon, drawing, painting, 3d render, cgi, text, caption, watermark, logo, signature, "
       "collage, frame, border, lowres, blurry, deformed, extra limbs, oversaturated")


def run(wf):
    req = urllib.request.Request(COMFY + "/prompt", data=json.dumps({"prompt": wf}).encode(),
                                 headers={"Content-Type": "application/json"})
    pid = json.loads(urllib.request.urlopen(req).read())["prompt_id"]
    for _ in range(300):
        time.sleep(1)
        hist = json.loads(urllib.request.urlopen(COMFY + f"/history/{pid}", timeout=30).read())
        if pid in hist:
            for node in hist[pid]["outputs"].values():
                for im in node.get("images", []):
                    q = urllib.parse.urlencode({"filename": im["filename"], "subfolder": im.get("subfolder", ""),
                                                "type": im.get("type", "output")})
                    return urllib.request.urlopen(COMFY + "/view?" + q).read()
            return None
    return None


articles = json.load(open(ART, encoding="utf-8"))
print(f"generating {len(articles)} news images -> {OUT}")
for a in articles:
    dst = os.path.join(OUT, f"{a['id']}.jpg")
    if os.path.exists(dst):
        continue
    prompt = (a.get("imagePrompt") or a.get("headline") or "news") + STYLE
    wf = {
        "1": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": CKPT}},
        "2": {"class_type": "CLIPTextEncode", "inputs": {"text": prompt, "clip": ["1", 1]}},
        "3": {"class_type": "CLIPTextEncode", "inputs": {"text": NEG, "clip": ["1", 1]}},
        "5": {"class_type": "EmptyLatentImage", "inputs": {"width": 768, "height": 432, "batch_size": 1}},
        "6": {"class_type": "KSampler", "inputs": {"model": ["1", 0], "positive": ["2", 0], "negative": ["3", 0],
              "latent_image": ["5", 0], "seed": 1000 + a["id"] * 7, "steps": 26, "cfg": 6.0,
              "sampler_name": "dpmpp_2m", "scheduler": "karras", "denoise": 1.0}},
        "7": {"class_type": "VAEDecode", "inputs": {"samples": ["6", 0], "vae": ["1", 2]}},
        "8": {"class_type": "SaveImage", "inputs": {"images": ["7", 0], "filename_prefix": "meridian"}},
    }
    try:
        png = run(wf)
        if png:
            Image.open(io.BytesIO(png)).convert("RGB").save(dst, "JPEG", quality=86)
            print(f"  [{a['id']:>2}] {a['section'][:12]:<12} {a['headline'][:48]}")
        else:
            print(f"  [{a['id']:>2}] FAILED (no image)")
    except Exception as e:
        print(f"  [{a['id']:>2}] ERROR {e}")
print("NEWS_IMAGES_DONE")
