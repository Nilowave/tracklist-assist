import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import textFit, { TextFitOption } from 'textFit';
import * as S from './A03Text.styles';
import { TypeStyleKey } from '../../../styles/typeStyles';

interface A03TextProps {
  type?: TypeStyleKey;
  fit?: TextFitOption;
  className?: string;
  children: ReactNode;
}

export const A03Text = ({ type = 'body', fit, className, children }: A03TextProps): ReactElement => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (textRef.current && fit && fontsLoaded) {
      textFit(textRef.current, fit);
    }
  }, [fit, children, fontsLoaded, textRef]);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontsLoaded(true);
    });
  }, []);

  return (
    <S.Text ref={textRef} type={type} className={className}>
      {children}
    </S.Text>
  );
};

A03Text.displayName = 'A03Text';
