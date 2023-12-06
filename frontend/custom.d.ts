interface Window {
  textFit: (els: HTMLElement | NodeList | HTMLCollection | HTMLElement[], options?: TextFitOption) => void;
}

// Define the TextFitOption interface
interface TextFitOption {
  alignVert?: boolean;
  alignHoriz?: boolean;
  multiLine?: boolean;
  detectMultiLine?: boolean;
  minFontSize?: number;
  maxFontSize?: number;
  reProcess?: boolean;
  widthOnly?: boolean;
  alignVertWithFlexbox?: boolean;
  maxLength?: number;
  // Add more properties as needed
}
