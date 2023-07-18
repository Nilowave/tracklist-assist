import { ReactElement } from 'react';
import * as S from './A01Icon.styles';
import { icons, Icon } from './icons';

interface A01IconProps {
  name: Icon;
  className?: string;
  size?: number | string | 'auto';
}

export const A01Icon = ({ name, className, size = 24 }: A01IconProps): ReactElement => {
  const SelectedIcon = icons[name];

  return (
    <S.StyledA01Icon
      className={className}
      style={{
        width: typeof size !== 'number' ? size : `${size}px`,
        height: typeof size !== 'number' ? size : `${size}px`,
      }}
    >
      <SelectedIcon style={{ width: '100%', height: '100%' }} />
    </S.StyledA01Icon>
  );
};
