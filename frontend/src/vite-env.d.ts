/// <reference types="vite/client" />

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

import { BeforeInstallPromptEvent } from '../../hooks/usePWAInstaller';

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

declare module 'textFit' {
  interface TextFitSettings {
    alignVert?: boolean;
    alignHoriz?: boolean;
    multiLine?: boolean;
    detectMultiLine?: boolean;
    minFontSize?: number;
    maxFontSize?: number;
    reProcess?: boolean;
    widthOnly?: boolean;
    alignVertWithFlexbox?: boolean;
  }

  function textFit(els: HTMLElement | NodeList | HTMLCollection | HTMLElement[], options?: TextFitSettings): void;

  export = textFit;
}
