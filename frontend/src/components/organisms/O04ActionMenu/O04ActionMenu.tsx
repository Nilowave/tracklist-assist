import { useAtom } from 'jotai';
import { ReactElement } from 'react';
import { columnDisplayAtom, openActionsAtom } from './O04ActionMenu.atoms';
import * as S from './O04ActionMenu.styles';
import { useDeviceState } from '../../../hooks/useDeviceState';
import { LightTooltip } from '../../../styles/ui';
import { A01Icon } from '../../atoms/A01Icon/A01Icon';
import { A02Counter } from '../../atoms/A02Counter/A02Counter';
import { M02IconButton } from '../../molecules/M02IconButton/M02IconButton';
import { M03SearchInput } from '../../molecules/M03SearchInput/M03SearchInput';

interface O04ActionMenuProps {
  count?: number;
}

export const O04ActionMenu = ({ count }: O04ActionMenuProps): ReactElement => {
  const { isMobile } = useDeviceState();
  const [columnDisplay, setColumnDisplay] = useAtom(columnDisplayAtom);
  const [openActions, setOpenActions] = useAtom(openActionsAtom);

  const onSwitchColumnDisplay = () => {
    const display = columnDisplay === 'single' ? 'double' : 'single';
    setColumnDisplay(display);
  };

  return (
    <S.StyledO04ActionMenu $gap="2.2rem" $justify="center" $align="center">
      <S.Background />
      {openActions ? (
        <>
          {count && <A02Counter count={count} />}
          <S.Separator />
          <S.Nav as="nav" $gap="1.2rem">
            <M03SearchInput />
            <M02IconButton iconSize={22} size="medium" tooltipPlacement="left" icon="filter" tooltip="Settings" />
            {isMobile && (
              <M02IconButton
                size="medium"
                onClick={onSwitchColumnDisplay}
                tooltipPlacement="left"
                icon={columnDisplay === 'double' ? 'col1' : 'col2'}
                tooltip={columnDisplay === 'double' ? '1 column' : '2 columns'}
              />
            )}
          </S.Nav>
          <S.Separator />
          <LightTooltip title="Close Actions" placement="left" describeChild>
            <S.ActionMenuButton onClick={() => setOpenActions(false)}>
              <A01Icon name="close" size={12} />
            </S.ActionMenuButton>
          </LightTooltip>
        </>
      ) : (
        <>
          <LightTooltip title="Open Actions" placement="top" describeChild>
            <S.ActionMenuButton onClick={() => setOpenActions(true)}>
              <A01Icon name="dotsMenu" size={19} />
            </S.ActionMenuButton>
          </LightTooltip>
        </>
      )}
    </S.StyledO04ActionMenu>
  );
};
