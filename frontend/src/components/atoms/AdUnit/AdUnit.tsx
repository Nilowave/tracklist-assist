import { ReactElement } from 'react';
import * as S from './AdUnit.styles';
import { AdFormat } from './AdUnit.types';

interface AdUnitProps {
  slot: number;
  format?: AdFormat;
}

export const AdUnit = ({ slot, format = 'leaderboard' }: AdUnitProps): ReactElement => {
  return (
    <S.Wrapper>
      <S.Caption $type="label">Advertisement</S.Caption>
      <S.AdUnit format={format}>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7626005763463692"
          crossOrigin="anonymous"
        ></script>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-7626005763463692"
          data-ad-slot={slot}
          data-adtest="on"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </S.AdUnit>
    </S.Wrapper>
  );
};
