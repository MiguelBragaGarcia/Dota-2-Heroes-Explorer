import styled, { css } from 'styled-components';
import { lighten } from 'polished';

interface AttributeInfo {
  type: string;
}

export const Container = styled.div``;



export const ContentContainer = styled.div`
  max-width: 1280px;
  margin: 80px auto;
  padding: 10px;
`;

export const HeroContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px;
  background: #0f1211;
  color: #fff;

  strong {
    font-size: 26px;
  }

  img {
    border-radius: 5px;
    margin-left: 5%;
    margin-top: 40px;
    width: 350px;
    height: 170px;
  }
`;

export const HeroHeader = styled.div`
  display: inline-flex;
  align-items: baseline;
  margin-bottom: 10px;

  p {
    margin-left: 15px;
    font-weight: bold;
  }
`;

export const HeroFunction = styled.div`
  display: flex;
  p {
    font-weight: bold;
    font-size: 14px;
    & + p {
      margin: 0 0 0 40px;
    }
  }
`;

export const AttributeContainer = styled.div`
  display: flex;
  margin: 10px 20px 0;
`;

export const Attribute = styled.p<AttributeInfo>`
  display: flex;
  font-weight: 400;
  padding: 3px 5px;
  font-size: 15px;

  &+p {
    margin-left: 20px;
  }

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

export const HeroInfoContainer = styled.div`
  margin: 0 30px;
  width: 100%;
  border: 1px solid #0f1211;
`;

export const HeroTextInfo = styled.div`
  display: flex;
  width: 45%;
  justify-content: space-between;

  font-size: 14px;
  font-weight: bold;
  margin: 10px 0;
`;

export const LastMatchsWithTheHero = styled.div`
  background: #0f1211;

  a {
    text-decoration: none;
    color: #0f1211;
  }

  > p {
    font-weight: bold;
    padding: 5px 20px;
    color: #fff;
  }
`;

export const Match = styled.div`
  display: flex;
  flex: 1;
  margin: 20px 20px;
  padding: 5px 10px;
  justify-content: space-between;
  align-items: center;
  background: ${lighten(0.1, "#333")};
`;

export const PageAction = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  max-width: 1280px;

  span {
    color: #fff;
    font-weight: bold;
  }

  button {
    margin: 0 20px;
    border: none;
    background: transparent;
  }
`;
