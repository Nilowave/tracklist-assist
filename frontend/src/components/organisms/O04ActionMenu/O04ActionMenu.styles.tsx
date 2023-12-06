import styled from 'styled-components';
import { respondTo } from '../../../styles/helpers/respondTo';
import { MediaQuery } from '../../../styles/mediaQuery';
import { Flex } from '../../../styles/ui';

export const StyledO04ActionMenu = styled(Flex)`
  position: fixed;
  bottom: 1.5rem;
  width: calc(100% - 3rem);
  height: 6rem;
  right: ${({ theme }) => theme.sitePaddings.mobile};
  padding: 1.5rem 2.2rem;
  flex-direction: row;
  justify-content: flex-start;
  border-radius: 3rem;
  background-color: ${({ theme }) => theme.hexToRgba(theme.colors.background, 0.5)};
  backdrop-filter: blur(10px);

  @media ${respondTo(MediaQuery.MIN_1024)} {
    width: 6rem;
    height: auto;
    top: 50%;
    bottom: auto;
    right: 1.8rem;
    padding: 2.2rem 1.5rem;
    flex-direction: column;
    transform: translateY(-50%);
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
  width: 2px;
  height: 1.5rem;
  opacity: 0.1;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 3px;

  @media ${respondTo(MediaQuery.MIN_1024)} {
    width: 1.5rem;
    height: 2px;
  }
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

export const Nav = styled(Flex)`
  flex-direction: row;
  gap: 1.5rem;

  @media ${respondTo(MediaQuery.MIN_1024)} {
    flex-direction: column;
  }
`;
