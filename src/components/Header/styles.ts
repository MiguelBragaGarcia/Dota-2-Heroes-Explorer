import styled from 'styled-components';
import {darken} from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 70px;
  background: #363636;
`;

export const HeaderContent = styled.div`
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