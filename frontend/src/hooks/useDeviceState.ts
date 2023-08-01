import { debounce } from 'lodash-es';
import { useEffect, useState } from 'react';

import { DeviceState } from '../data/enum/deviceState';

export const useDeviceState = (): Record<'deviceState' | 'isPortrait' | 'isMobile', boolean | number> => {
  const getWindowSize = () => {
    let deviceState = -1;

    if (window.innerWidth <= 479) {
      deviceState = DeviceState.MAX_479;
    } else if (window.innerWidth >= 480 && window.innerWidth < 768) {
      deviceState = DeviceState.MIN_480;
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      deviceState = DeviceState.MIN_768;
    } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
      deviceState = DeviceState.MIN_1024;
    } else if (window.innerWidth >= 1280 && window.innerWidth < 1440) {
      deviceState = DeviceState.MIN_1280;
    } else if (window.innerWidth >= 1440 && window.innerWidth < 1920) {
      deviceState = DeviceState.MIN_1440;
    } else if (window.innerWidth >= 1920) {
      deviceState = DeviceState.MIN_1920;
    }

    const isMobile = deviceState < 3;
    const isPortrait = window.innerWidth < window.innerHeight && isMobile;

    return {
      deviceState,
      isPortrait,
      isMobile,
    };
  };

  const [deviceState, setDeviceState] = useState(getWindowSize);

  useEffect(() => {
    const resizeHandler = debounce(() => {
      setDeviceState(getWindowSize());
    }, 100);

    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return deviceState;
};
