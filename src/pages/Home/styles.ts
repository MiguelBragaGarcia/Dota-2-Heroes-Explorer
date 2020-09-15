import styled, { css } from 'styled-components';
import {  lighten } from 'polished';

interface HeroAttribute {
  primaryAttribute: string;
  heroImgUrl: string;
}

export const Container = styled.div`
  width: 100%;
`;


export const Content = styled.div`
  max-width: 1280px;
  margin: 80px auto;

  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 33px;

  padding: 10px;
  transition: divContent 0.3s linear;

  a {
    text-decoration: none;
  }

  @media screen and (max-width: 1300px) {
    grid-template-columns: auto auto auto;
    justify-content: center;
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: auto auto;
    justify-content: center;
  }

  @media screen and (max-width: 700px) {
    grid-template-columns: auto;
    justify-content: center;
  }
`;

export const Hero = styled.div<HeroAttribute>`
  width: 290px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  background: #0f1211;
  color: #fff;
  border-radius: 4px;

  transition: transform 0.2s linear;
  transition-delay: 0s;

  h1 {
    margin-bottom: 50px;
  }

  img {

    ${(props) =>
      props.primaryAttribute === 'str' &&
      css`
        box-shadow: 0px 0px 5px 5px red;
      `}

    ${(props) =>
      props.primaryAttribute === 'agi' &&
      css`
        box-shadow: 0px 0px 5px 5px ${lighten(0.2, 'green')};
      `}

    ${(props) =>
      props.primaryAttribute === 'int' &&
      css`
        box-shadow: 0px 0px 5px 5px ${lighten(0.1, 'blue')};
      `}
    margin-bottom: 10%;
    top: 0;
    width: 170px;
    height: 100px;
    border-radius: 10px;
  }

  &:hover {
    transform: translateY(-10px);
  }

  @media screen and (max-width: 700px) {
    width: 350px;
    height: 300px;

  }
`;

export const HeroType = styled.div``;

export const PageAction = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  margin-top: -40px;
  max-width: 1280px;

  button {
    margin: 0 20px;
    border: none;
    background: transparent;
  }
`;
