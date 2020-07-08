import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

interface HeroAttribute {
  primaryAttribute: string;
  heroImgUrl: string;
}

export const Container = styled.div`
  width: 100%;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 70px;
  background: #363636;
`;

export const Header = styled.div`
  display: flex;
  max-width: 1280px;
  margin: 0 auto;
  padding: 10px;

  img {
    margin: 0 0 0 5%;
    width: 50px;
    height: 50px;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0 5%;

  li {
    padding: 0 10px;
    border-right: 2px solid #fff;

    button {
      padding: 0 20px;
      border: none;
      color: #fff;
      font-weight: bold;
      font-size: max(14px, 0.9vw);
      background: #363636;
      height: 50px;
    }
    button:hover {
      background-color: ${darken(0.05, '#363636')};
    }
  }

  li:last-of-type {
    border-right: none;
  }

  @media screen and (max-width: 700px) {
    display: none;
  }

  /* Falta fazer o o header responsivo parte dos textos */
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
    box-shadow: 3px 3px 4px 3px ${lighten(0.1, '#363636')};
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
