import { useEffect, useRef, useState } from 'react';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface UsePWAInstallerReturnProps {
  handleInstallClick: () => void;
  deferrer: BeforeInstallPromptEvent | null;
  appDidInstall: boolean;
}

export const usePWAInstaller = (): UsePWAInstallerReturnProps => {
  const [appDidInstall, setAppDidInstall] = useState<boolean>(false);
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);

  const handleBeforeInstall = (event: BeforeInstallPromptEvent) => {
    event.preventDefault();

    deferredPrompt.current = event;
  };

  const handleInstallClick = () => {
    deferredPrompt.current?.prompt();
    deferredPrompt.current = null;
  };

  const handleAppInstall = () => {
    setAppDidInstall(true);
  };

  // const getPWADisplayMode = () => {
  //   const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  //   if (document.referrer.startsWith('android-app://')) {
  //     return 'twa';
  //   } else if (navigator.standalone || isStandalone) {
  //     return 'standalone';
  //   }
  //   return 'browser';
  // };

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  return {
    handleInstallClick,
    deferrer: deferredPrompt.current,
    appDidInstall,
  };
};
