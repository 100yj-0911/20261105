"""Compose the small game assets from AI Horde pixel art source images.

Requires Pillow. Run from this folder with Pillow on PYTHONPATH.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageEnhance, ImageOps


ROOT = Path(__file__).resolve().parent
MALE_CLOSE = ROOT / "portrait-male-close.webp"
MALE_SOURCE = MALE_CLOSE if MALE_CLOSE.exists() else ROOT / "portrait-sample.webp"
FEMALE_SOURCE = ROOT / "portrait-female-v2.webp"
STAGE_SOURCE = ROOT / "stage-retry.webp"


def base_portrait(path: Path, crop: tuple[int, int, int, int]) -> Image.Image:
    image = Image.open(path).convert("RGB")
    return image.crop(crop).resize((64, 64), Image.Resampling.NEAREST)


def tint_hair(tile: Image.Image, gender: str, color: tuple[int, int, int]) -> Image.Image:
    result = tile.copy()
    pixels = result.load()
    for y in range(64):
        for x in range(64):
            red, green, blue = pixels[x, y]
            if gender == "female":
                hair_area = y < 33 or (y < 54 and (x < 19 or x > 45))
                is_hair = (hair_area and 6 < x < 58 and green < 125
                           and red > green * 1.25 and blue > green * 1.2)
            else:
                is_hair = y < 36 and 8 < x < 56 and max(red, green, blue) < 135 and blue > green * 0.8
            if is_hair:
                shade = max(0.45, min(1.25, (red + green + blue) / 285))
                pixels[x, y] = tuple(min(255, round(channel * shade)) for channel in color)
    return result


def make_variant(base: Image.Image, gender: str, variant: int) -> Image.Image:
    colors = [(20, 29, 55), (85, 49, 36), (191, 139, 64), (77, 99, 151),
              (130, 53, 88), (54, 116, 92), (186, 84, 63), (89, 65, 123)]
    tile = base.copy()
    if variant % 2:
        tile = ImageOps.mirror(tile)
    tile = tint_hair(tile, gender, colors[variant])
    brightness = ([0.93, 1.04, 0.98, 1.08, 0.88, 1.0, 0.95, 1.05] if gender == "male"
                  else [1.0, 1.02, 0.99, 1.03, 0.97, 1.0, 0.98, 1.01])
    tile = ImageEnhance.Brightness(tile).enhance(brightness[variant])
    draw = ImageDraw.Draw(tile)
    if gender == "male" and variant in (2, 6):
        draw.rectangle((10, 12, 53, 16), fill=colors[variant])
        draw.rectangle((17, 8, 47, 12), fill=colors[variant])
    if gender == "female" and variant in (1, 4, 7):
        draw.rectangle((11, 43, 13, 46), fill=(247, 211, 117))
        draw.rectangle((50, 43, 52, 46), fill=(247, 211, 117))
    if gender == "male" and variant in (3, 5):
        draw.rectangle((9, 54, 54, 57), fill=colors[variant])
    return tile.resize((128, 128), Image.Resampling.NEAREST)


male_crop = (64, 32, 448, 416) if MALE_CLOSE.exists() else (150, 65, 362, 277)
male = base_portrait(MALE_SOURCE, male_crop)
female = base_portrait(FEMALE_SOURCE, (82, 22, 430, 370))
atlas = Image.new("RGB", (512, 512), (43, 35, 59))
for index in range(16):
    gender = "male" if index < 8 else "female"
    source = male if index < 8 else female
    tile = make_variant(source, gender, index % 8)
    atlas.paste(tile, ((index % 4) * 128, (index // 4) * 128))
atlas.save(ROOT / "portrait-atlas.png", optimize=True)

if not (ROOT / "stage-backdrop.png").exists():
    stage = Image.open(STAGE_SOURCE).convert("RGB")
    width, height = stage.size
    target_height = round(width * 9 / 16)
    top = max(0, (height - target_height) // 2)
    stage = stage.crop((0, top, width, min(height, top + target_height)))
    stage = stage.resize((640, 360), Image.Resampling.NEAREST)
    stage.save(ROOT / "stage-backdrop.png", optimize=True)
print("Created portrait-atlas.png")
