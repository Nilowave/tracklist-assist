import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { typeStyles } from '../../../styles/typeStyles';
import { respondTo } from '../../../styles/helpers/respondTo';
import { MediaQuery } from '../../../styles/mediaQuery';

export const Fade = styled.div`
  position: fixed;
  width: 100%;
  height: 10rem;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 2;

  @media ${respondTo(MediaQuery.MAX_1023)} {
    background: linear-gradient(
      ${({ theme }) => theme.colors.foreground} 50%,
      ${({ theme }) => theme.hexToRgba(theme.colors.foreground, 0)}
    );
  }
`;

export const PageWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.foreground};
  color: ${({ theme }) => theme.colors.outerSpace};
  height: 100%;
`;

export const PageContent = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  height: 46.5rem;
  padding: 0 ${({ theme }) => theme.sitePaddings.mobile};
  padding-bottom: 10rem;

  &:nth-child(2) {
    height: auto;
  }
`;

export const TitleWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  flex-direction: column-reverse;
  padding: 3rem 0;
  border-bottom: solid 1px ${({ theme }) => theme.colors.platinum};
  position: sticky;
  position: -webkit-sticky;
  top: 0;

  @media ${respondTo(MediaQuery.MIN_1024)} {
    align-items: center;
    flex-direction: row;
  }
`;

export const Title = styled.h1`
  ${typeStyles.title};
`;

export const BackLink = styled(NavLink)`
  width: fit-content;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  transition: color 0.3s ease-out;

  & > * {
    flex-shrink: 0;
  }

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 12rem 0 5rem;

  @media ${respondTo(MediaQuery.MIN_1024)} {
    margin: 12rem 0 10rem;
  }
`;

export const PageFooter = styled.footer`
  /* position: fixed; */
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  padding: 4rem 3rem;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);

  @media ${respondTo(MediaQuery.MIN_1024)} {
    padding: 6.5rem 10rem;
  }
`;

export const FooterContent = styled.div`
  max-width: 116rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  @media ${respondTo(MediaQuery.MAX_1023)} {
    flex-direction: column;
  }
`;

export const FooterMenu = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;
  a:hover {
    text-decoration: underline;
  }
`;
