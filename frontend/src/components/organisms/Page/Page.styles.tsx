import styled from 'styled-components';
import { typeStyles } from '../../../styles/typeStyles';

export const PageWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.foreground};
  color: ${({ theme }) => theme.colors.outerSpace};
`;

export const PageContent = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding-bottom: 10rem;
  height: 46.5rem;

  &:nth-child(2) {
    height: auto;
  }
`;

export const Title = styled.h1`
  ${typeStyles.title};
  padding: 3rem 0;
  border-bottom: solid 1px ${({ theme }) => theme.colors.platinum};
  position: sticky;
  top: 0;
  position: -webkit-sticky;
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 12rem 0 10rem;
`;

export const PageFooter = styled.footer`
  /* position: fixed; */
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  padding: 6.5rem 10rem;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
`;

export const FooterContent = styled.div`
  max-width: 116rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

export const FooterMenu = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;
  a:hover {
    text-decoration: underline;
  }
`;
