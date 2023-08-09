import styled from 'styled-components';
import { respondTo } from '../../../styles/helpers/respondTo';
import { MediaQuery } from '../../../styles/mediaQuery';
import { Flex } from '../../../styles/ui';

export const StyledO04ActionMenu = styled(Flex)`
  position: fixed;
  padding: 1.5rem;
  min-width: 6rem;
  border-radius: 3rem;
  background-color: ${({ theme }) => theme.hexToRgba(theme.colors.background, 0.1)};
  top: 50%;
  right: 1.8rem;
  transform: translateY(-50%);
  backdrop-filter: blur(10px);

  @media ${respondTo(MediaQuery.MAX_1023)} {
    bottom: ${({ theme }) => `calc(${theme.sitePaddings.mobile} + 8rem)`};
    right: ${({ theme }) => theme.sitePaddings.mobile};
  }
`;

export const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  right: 0;
  border-radius: 3rem;
  border-bottom: 1px solid #fff;
  border-left: 1px solid #fff;
  opacity: 0.1;
  pointer-events: none;
  background: radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0.37) 100%);
  box-shadow:
    10px 4px 10px 0px rgba(0, 0, 0, 0.5),
    5px 5px 10px 0px rgba(0, 0, 0, 0.6) inset;
`;

export const Separator = styled.div`
  width: 1.5rem;
  height: 2px;
  opacity: 0.1;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 3px;
`;

export const ActionMenuButton = styled.button`
  width: 3.2rem;
  height: 3.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem;
  color: white;
  border-radius: 5rem;

  @media (hover: hover) {
    &:hover {
      background-color: ${({ theme }) => theme.hexToRgba(theme.colors.white, 0.1)};
    }
  }
`;
