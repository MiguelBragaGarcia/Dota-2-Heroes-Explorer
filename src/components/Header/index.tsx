import React from "react";
import { Link } from "react-router-dom";

import logo from '../../assets/dota-logo.svg';

import {Container,HeaderContent,List} from './styles'


const Header: React.FC = () => (
    <Container>
        <HeaderContent>
        <Link to="/">
            <img src={logo} alt="dota" />
        </Link>

        <List>
            <li>
            <button type="button">Inicio</button>
            </li>
            <li>
            <button type="button">Comunidades</button>
            </li>
            <li>
            <button type="button">Vídeos</button>
            </li>
            <li>
            <button type="button">Pesquisar</button>
            </li>
        </List>
        </HeaderContent>
    </Container>
  
  );

export default Header;