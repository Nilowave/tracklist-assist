import styled from 'styled-components';
import { ColorKey } from '../../../styles/theme/default';

type IconProp = {
  fill?: ColorKey;
};

export { ReactComponent as Logo } from '../../../assets/svg/logo.svg';
export { ReactComponent as LogoColor } from '../../../assets/svg/logo-color.svg';
export { ReactComponent as Spinner } from '../../../assets/svg/spinner.svg';
export { ReactComponent as GoogleIcon } from '../../../assets/svg/google-button.svg';

export const Plus = styled.div<IconProp>`
  width: 100%;
  height: 100%;
  position: relative;

  &:after,
  &:before {
    content: '';
    width: 50%;
    height: 0.2rem;
    background-color: currentColor;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:before {
    width: 0.2rem;
    height: 50%;
  }
`;

export const Delete = styled.div<IconProp>`
  width: 6rem;
  height: 6rem;
  position: relative;

  &:before {
    content: '';
    width: 50%;
    height: 0.2rem;
    background-color: currentColor;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Back = styled.div<IconProp>`
  width: 6rem;
  height: 6rem;
  position: relative;

  &:before {
    content: '';
    width: 50%;
    height: 0.2rem;
    background-color: currentColor;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:after {
    content: '';
    width: 1.3rem;
    height: 1.3rem;
    border-left: solid 2px currentColor;
    border-bottom: solid 2px currentColor;
    position: absolute;
    top: calc(50% + 0.3rem);
    left: calc(50% - 1.3rem);
    transform: rotate(45deg) translate(-50%, -50%);
  }
`;

export const Save = styled.div<IconProp>`
  width: 6rem;
  height: 6rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &:before {
    content: '';
    width: 50%;
    height: 0.2rem;
    background-color: currentColor;
  }

  &:after {
    content: '';
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    top: 35%;
    background-color: ${({ fill, theme }) => (fill ? theme.colors[fill] : 'currentColor')};
    transform: rotate(45deg);
    border-bottom: solid 2px currentColor;
    border-right: solid 2px currentColor;
  }
`;

export const Close = styled.div<IconProp>`
  width: 6rem;
  height: 6rem;
  position: relative;
  transform: rotate(45deg);

  &:after,
  &:before {
    content: '';
    width: 50%;
    height: 0.2rem;
    background-color: currentColor;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:before {
    width: 0.2rem;
    height: 50%;
  }
`;

export const Edit = styled.div<IconProp>`
  --size: 0.2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: var(--size);
  height: calc(100% - 4rem);
  position: relative;
  transform: rotate(35deg);
  margin-right: 0.5rem;
  background: currentColor;

  &:before {
    content: '';
    position: absolute;
    width: var(--size);
    height: var(--size);
    background: currentColor;
    top: calc((var(--size) + 0.2rem) * -1);
  }

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-left: calc(var(--size) / 2) solid transparent;
    border-right: calc(var(--size) / 2) solid transparent;
    border-top: calc(var(--size) + 0.1rem) solid currentColor;
    bottom: calc((var(--size) + 0.3rem) * -1);
  }
`;
