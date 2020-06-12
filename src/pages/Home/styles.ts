import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

interface HeroAttribute {
  primaryAttribute: string;
  heroImgUrl: string;
}

interface AttributeInfo {
  type: string;
}

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  width: 100%;
  height: 70px;
  background: #363636;
  display: flex;
  align-items: center;

  img {
    margin: 0 5%;
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
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1280px;

  margin: 80px auto;
  border-radius: 8px;

  display: grid;
  grid-template-columns: auto auto auto auto;

  padding: 10px;
  transition: divContent 0.3s linear;

  > div:hover {
    box-shadow: 3px 3px 4px 3px ${lighten(0.1, '#363636')};
    transform: translateY(-10px);
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

  margin: 15px;
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
`;

export const AttributeContainer = styled.div`
  display: flex;
`;

export const Attribute = styled.p<AttributeInfo>`

  font-weight: 400;
  padding: 3px 5px;
  font-size: 15px;



    ${(props) =>
      props.type === 'str' &&
      css`
        color: red;

        &::before {
          content: '';
          height: 15px;
          width: 15px;
          background-color: red;
          border-radius: 50%;
          display: inline-block;
          margin-right: 5px;
        }
      `}
    ${(props) =>
      props.type === 'agi' &&
      css`
        color: green;

        &::before {
          content: '';
          height: 15px;
          width: 15px;
          background-color: green;
          border-radius: 50%;
          display: inline-block;
          margin-right: 5px;
        }
      `}
    ${(props) =>
      props.type === 'int' &&
      css`
        color: blue;

        &::before {
          content: '';
          height: 15px;
          width: 15px;
          background-color: blue;
          border-radius: 50%;
          display: inline-block;
          margin-right: 5px;
        }
      `};
`;
