export default function (hex: string, alpha: number, luminanceAdjustment: number): string {
  // Remove the hash symbol if it's present
  hex = hex.replace(/^#/, '');

  // Parse the hex color values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Calculate the luminance-adjusted lightness
  const luminanceAdjusted = Math.max(0, Math.min(1, luminanceAdjustment)); // Ensure adjustment is within [0, 1]
  const initialLightness = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
  const adjustedLightness = initialLightness + luminanceAdjusted * (luminanceAdjustment > 0 ? 1 - initialLightness : initialLightness);

  // Calculate the hue, saturation, and alpha
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;

  if (max !== min) {
    if (max === r) {
      h = ((g - b) / (max - min)) * 60;
    } else if (max === g) {
      h = (2 + (b - r) / (max - min)) * 60;
    } else {
      h = (4 + (r - g) / (max - min)) * 60;
    }
  }
  if (h < 0) {
    h += 360;
  }

  const l = adjustedLightness;

  let s = 0;
  if (max !== min) {
    if (l <= 0.5) {
      s = (max - min) / (max + min);
    } else {
      s = (max - min) / (2 - max - min);
    }
  }

  const a = Math.min(1, Math.max(0, alpha));

  // Format the result as HSLA string
  return `hsla(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${a})`;
}
