import { motion } from 'framer-motion';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../../assets/svg/logo.svg';
import { respondTo } from '../../../styles/helpers/respondTo';
import { MediaQuery } from '../../../styles/mediaQuery';
import { Flex } from '../../../styles/ui';
import { M01PrimaryButton } from '../../molecules/M01PrimaryButton/M01PrimaryButton';

export const StyledCardLayout = styled.section`
  padding: ${({ theme }) => theme.sitePaddings.mobile};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  padding-bottom: 8rem;

  @media ${respondTo(MediaQuery.MIN_1024)} {
    padding: ${({ theme }) => theme.sitePaddings.desktop};
  }
`;

export const Content = styled(motion.div)`
  position: relative;
  width: 100%;
  height: auto;
`;

export const Header = styled(Flex)`
  margin-bottom: 3rem;

  @media ${respondTo(MediaQuery.MIN_1024)} {
    margin-bottom: 8rem;
  }
`;

export const StyledLogo = styled(Logo)`
  width: 50vw;
  max-width: 30rem;
`;

export const Footer = styled.div`
  padding: ${({ theme }) => theme.sitePaddings.mobile} 0;
  max-width: 80%;
`;

export const FooterWrapper = styled.footer`
  text-align: center;
  color: ${({ theme }) => theme.colors.blueGray};
  font-size: 1.2rem;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 2rem;
  text-align: left;

  @media ${respondTo(MediaQuery.MIN_1024)} {
    justify-content: space-evenly;
    padding: ${({ theme }) => theme.sitePaddings.desktop};
    padding-bottom: 0;
    gap: 4rem;
  }

  a {
    transition: color 0.3s ease;

    @media (hover: hover) {
      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;

export const AddButton = styled(M01PrimaryButton)`
  position: fixed;
  bottom: ${({ theme }) => theme.sitePaddings.desktop};
  right: ${({ theme }) => theme.sitePaddings.desktop};

  @media ${respondTo(MediaQuery.MAX_1023)} {
    padding: 0;
    bottom: ${({ theme }) => theme.sitePaddings.mobile};
    right: ${({ theme }) => theme.sitePaddings.mobile};
  }
`;
