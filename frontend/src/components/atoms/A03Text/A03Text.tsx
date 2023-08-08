import { ChangeEvent, forwardRef, ReactElement, ReactNode, Ref, RefObject, useEffect, useRef, useState } from 'react';
import * as S from './A03Text.styles';
import { TypeStyleKey } from '../../../styles/typeStyles';

interface A03TextProps {
  type?: TypeStyleKey;
  fit?: TextFitOption;
  isInput?: boolean;
  className?: string;
  children: ReactNode;
  placeholder?: string;
  defaultValue?: string;
  inputProps?: {
    rows?: number;
    cols?: number;
    maxLength?: number;
  };
}

export const A03Text = forwardRef<HTMLTextAreaElement, A03TextProps>(
  (
    { type = 'body', isInput, fit, placeholder, defaultValue, inputProps, className, children }: A03TextProps,
    ref: Ref<HTMLTextAreaElement>
  ): ReactElement => {
    const textRef = useRef<HTMLParagraphElement>(null);
    const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
    const [fontSize, setFontSize] = useState<number | undefined>(fit?.maxFontSize);
    const [lineHeight, setLineHeight] = useState<string>('64px');

    const getFontSize = (text: string) => {
      if (fit) {
        const diff = (fit.maxFontSize || 0) - (fit.minFontSize || 0);
        if (diff > 0 && fit?.maxLength && fit.maxFontSize) {
          const p = text.length / fit.maxLength;
          return fit.maxFontSize - Math.ceil(p * diff);
        }
      }
      return fontSize;
    };

    const onInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      const size = getFontSize(value);
      const lineHeight = parseFloat(window.getComputedStyle(event.target).lineHeight);
      const numberOfLines = Math.round(event.target.scrollHeight / lineHeight);

      if (numberOfLines > 1) {
        setLineHeight(`${size}px`);
      } else {
        setLineHeight('64px');
      }

      setFontSize(size);
    };

    const onKeyUp = (event: KeyboardEvent) => {
      event.stopPropagation();
    };
    const onKeyPress = (event: KeyboardEvent) => {
      event.stopPropagation();
      if (event.key === 'Enter' && !event.shiftKey) event.preventDefault();
    };

    useEffect(() => {
      const value = children?.valueOf().toString();
      if (value) {
        const size = getFontSize(value);
        setFontSize(size);
      }
    }, [fit, children, fontsLoaded, textRef]);

    useEffect(() => {
      const value = children?.valueOf().toString();
      if (value && isInput) {
        const size = getFontSize(value);
        setFontSize(size);
      }

      if (isInput && ref && 'current' in ref) {
        ref.current?.addEventListener('keypress', onKeyPress);
        ref.current?.addEventListener('keyup', onKeyUp);
      }
      return () => {
        if (isInput && ref && 'current' in ref) {
          ref.current?.removeEventListener('keypress', onKeyPress);
          ref.current?.removeEventListener('keyup', onKeyUp);
        }
      };
    }, [isInput, ref]);

    useEffect(() => {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }, []);

    return (
      <>
        {isInput ? (
          <S.Input
            ref={ref as RefObject<HTMLTextAreaElement>}
            $type={type}
            className={className}
            autoFocus
            defaultValue={defaultValue}
            placeholder={placeholder}
            style={fit && { fontSize: `${fontSize}px`, lineHeight }}
            {...inputProps}
            onChange={onInputChange}
          />
        ) : (
          <S.Text ref={textRef} $type={type} className={className} style={fit && { fontSize: `${fontSize}px` }}>
            {children}
          </S.Text>
        )}
      </>
    );
  }
);

A03Text.displayName = 'A03Text';
