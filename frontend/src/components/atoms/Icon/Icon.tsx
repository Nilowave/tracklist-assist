import styled from 'styled-components';

export const Plus = styled.div`
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

export const Delete = styled.div`
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

export const Close = styled.div`
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

export const Edit = styled.div`
  --size: 0.4rem;

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
