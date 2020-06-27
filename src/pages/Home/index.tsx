import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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
  PageAction,
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
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [prevPage, setPrevPage] = useState(true);
  const [heroesInPage, setHeroesInPage] = useState<HeroData[]>([]);
  const [totalHeroes, setTotalHeroes] = useState(0);

  const itensPerPage = 8;

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

      const resultHeroes = formattedHeroes.filter((hero, index, arr) => {
        return index <= itensPerPage - 1;
      });

      setTotalHeroes(formattedHeroes.length);
      setHeroesInPage(resultHeroes);
      setHeroes(formattedHeroes);
    }

    loadHeroes();
  }, []);

  useEffect(() => {
    const nextPageEnabled = page < totalHeroes / itensPerPage;
    const prevPageEnabled = page > 1;

    const resultHeroes = heroes.filter((hero, index) => {
      return (
        index >= (page - 1) * itensPerPage && index <= page * itensPerPage - 1
      );
    });

    setHeroesInPage(resultHeroes);

    setPrevPage(prevPageEnabled);
    setNextPage(nextPageEnabled);
  }, [page, heroes, totalHeroes]);

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
        {heroesInPage.map((hero) => (
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

      <PageAction>
        <button
          type="button"
          disabled={!prevPage}
          onClick={() => setPage(page - 1)}
        >
          <FiChevronLeft size={30} color={!prevPage ? '#cfcfcf' : '#363636'} />
        </button>
        <span>{page}</span>
        <button
          type="button"
          disabled={!nextPage}
          onClick={() => setPage(page + 1)}
        >
          <FiChevronRight size={30} color={!nextPage ? '#cfcfcf' : '#363636'} />
        </button>
      </PageAction>
    </Container>
  );
};

export default Home;
