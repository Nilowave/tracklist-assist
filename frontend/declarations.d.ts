import { BeforeInstallPromptEvent } from '../../hooks/usePWAInstaller';

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
