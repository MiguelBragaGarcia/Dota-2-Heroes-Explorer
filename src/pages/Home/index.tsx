import React, { useState, useEffect, useCallback } from 'react';

import logo from '../../assets/dota-logo.svg';

import {
  Container,
  HeaderContainer,
  Header,
  List,
  Content,
  AttributeContainer,
  Hero,
  Attribute,
} from './styles';
import api from '../../services/api';

interface HeroData {
  id: number;
  localized_name: string;
  primary_attr: string;
  img: string;
  base_str: number;
  base_agi: number;
  base_int: number;

  str_gain: number;
  agi_gain: number;
  int_gain: number;
}

const Home: React.FC = () => {
  const [heroes, setHeroes] = useState<HeroData[]>([]);

  useEffect(() => {
    async function loadHeroes() {
      const cdnSteam = 'https://steamcdn-a.akamaihd.net';

      const response = await api.get<HeroData[]>('/heroStats');

      const formattedHeroes = response.data.map((hero) => {
        return {
          ...hero,
          img: cdnSteam.concat(hero.img),
        };
      });

      setHeroes(formattedHeroes);
    }

    loadHeroes();
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <Header>
          <img src={logo} alt="dota" />

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
        </Header>
      </HeaderContainer>

      <Content>
        {heroes.map((hero) => (
          <Hero
            key={hero.id}
            primaryAttribute={hero.primary_attr}
            heroImgUrl={hero.img}
          >
            <h1>{hero.localized_name}</h1>

            <img src={hero.img} alt={hero.localized_name} />

            <AttributeContainer>
              <Attribute type="str">
                {hero.base_str} + {hero.str_gain}
              </Attribute>

              <Attribute type="agi">
                {hero.base_agi} + {hero.agi_gain}
              </Attribute>

              <Attribute type="int">
                {hero.base_int} + {hero.int_gain}
              </Attribute>
            </AttributeContainer>
          </Hero>
        ))}
      </Content>
    </Container>
  );
};

export default Home;
