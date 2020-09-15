import React, { useState, useEffect, useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';


import Header from '../../components/Header'
import api from '../../services/api';

import {
  Container,
  
  ContentContainer,
  HeroContainer,
  HeroHeader,
  HeroFunction,
  AttributeContainer,
  Attribute,
  HeroInfoContainer,
  HeroTextInfo,
  LastMatchsWithTheHero,
  Match,
  PageAction,
} from './styles';


interface HeroParams {
  id: string;
}

interface HeroData {
  id: number;
  localized_name: string;
  primary_attr: string;
  img: string;
  icon: string;
  base_str: number;
  base_agi: number;
  base_int: number;
  base_armor: number;
  attack_type: string;
  roles: string[];
  move_speed: number;

  base_health: number;
  base_mana: number;

  base_attack_min: number;
  base_attack_max: number;

  str_gain: number;
  agi_gain: number;
  int_gain: number;
}

interface ProMatches {
  match_id: number;
  match_link: string;
  league_name: string;
  radiant: boolean;
  kills: number;
  deaths: number;
  assists: number;
}

const Hero: React.FC = () => {
  const [totalProMatches, setTotalProMatches] = useState(0);
  const [matchesInPage, setMatchesInPage] = useState<ProMatches[]>();
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [prevPage, setPrevPage] = useState(true);

  const [selectedHero, setSelectedHero] = useState<HeroData>();
  const [matches, setMatches] = useState<ProMatches[] | undefined>();

  const manaPerIntelligence = 12;
  const healthPerIntelligence = 20;
  const agilityPerArmor = 6;

  const matchesPerPage = 5;

  const { params } = useRouteMatch<HeroParams>();

  const heroId = Number(params.id);

  useEffect(() => {
    async function loadHeroesData() {
      const cdnSteam = 'https://steamcdn-a.akamaihd.net';

      // Steam CDN don't provide this 2 icons
      const snapFireHeroID = 128;
      const voidSpiritHeroID = 126;

      const response = await api.get<HeroData[]>('/heroStats');

      const filteredHero = response.data.find((hero) => hero.id === heroId);

      let formattedHero = {} as HeroData;

      if (filteredHero) {
        if (filteredHero.id === snapFireHeroID) {
          formattedHero = {
            ...filteredHero,
            img: cdnSteam.concat(filteredHero.img),
            icon:
              'https://gamepedia.cursecdn.com/dota2_gamepedia/e/e1/Snapfire_minimap_icon.png?version=53f2eb37eee5789a02c0a23bc90e5267',
          };
        }

        if (filteredHero.id === voidSpiritHeroID) {
          formattedHero = {
            ...filteredHero,
            img: cdnSteam.concat(filteredHero.img),
            icon:
              'https://gamepedia.cursecdn.com/dota2_gamepedia/0/02/Void_Spirit_minimap_icon.png?version=aa96b743899de63ca9997ab58dffa01d',
          };
        }

        formattedHero = {
          ...filteredHero,
          img: cdnSteam.concat(filteredHero.img),
          icon: cdnSteam.concat(filteredHero.icon),
        };
      }

      setSelectedHero(formattedHero);
    }

    loadHeroesData();
  }, [heroId]);

  useEffect(() => {
    async function loadProMatches() {
      const response = await api.get<ProMatches[]>(`/heroes/${heroId}/matches`);

      const formattedProMatches = response.data.map((match) => {
        return {
          ...match,
          match_link: `https://www.opendota.com/matches/${match.match_id}`,
        };
      });

      setTotalProMatches(formattedProMatches.length);

      setMatches(formattedProMatches);
    }

    loadProMatches();
  }, [heroId]);

  useEffect(() => {
    if (matches) {
      const nextPageEnabled = page < totalProMatches / matchesPerPage;
      const prevPageEnabled = page > 1;

      const proMatchesResult = matches.filter((match, index) => {
        return (
          index >= (page - 1) * matchesPerPage &&
          index <= page * matchesPerPage - 1
        );
      });

      setMatchesInPage(proMatchesResult);

      setPrevPage(prevPageEnabled);
      setNextPage(nextPageEnabled);
    }
  }, [matches, page, totalProMatches]);

  const CalculatedMana = useMemo(() => {
    if (selectedHero) {
      return (
        selectedHero.base_mana + selectedHero.base_int * manaPerIntelligence
      );
    }
  }, [selectedHero]);

  const CalculatedHealth = useMemo(() => {
    if (selectedHero) {
      return (
        selectedHero.base_health + selectedHero.base_str * healthPerIntelligence
      );
    }
  }, [selectedHero]);

  const CalculatedArmor = useMemo(() => {
    if (selectedHero) {
      const armor =
        selectedHero.base_armor + selectedHero.base_agi / agilityPerArmor;

      return armor.toFixed(2);
    }
  }, [selectedHero]);

  const CalculatedMinAttack = useMemo(() => {
    if (selectedHero) {
      if (selectedHero.primary_attr === 'str') {
        return selectedHero.base_attack_min + selectedHero.base_str;
      }
      if (selectedHero.primary_attr === 'agi') {
        return selectedHero.base_attack_min + selectedHero.base_agi;
      }

      return selectedHero.base_attack_min + selectedHero.base_int;
    }
  }, [selectedHero]);

  const CalculatedMaxAttack = useMemo(() => {
    if (selectedHero) {
      if (selectedHero.primary_attr === 'str') {
        return selectedHero.base_attack_max + selectedHero.base_str;
      }
      if (selectedHero.primary_attr === 'agi') {
        return selectedHero.base_attack_max + selectedHero.base_agi;
      }

      return selectedHero.base_attack_max + selectedHero.base_int;
    }
  }, [selectedHero]);

  return (
    <Container>
      <Header></Header>

      <ContentContainer>
        {selectedHero && (
          <HeroContainer key={selectedHero.id}>
            <img src={selectedHero.img} alt={selectedHero.localized_name} />
            <HeroInfoContainer>
              <HeroHeader>
                <strong>{selectedHero.localized_name}</strong>

                <p>{selectedHero.attack_type}</p>
              </HeroHeader>
              <HeroFunction>
                {selectedHero.roles.map((role) => (
                  <p key={role}>{role}</p>
                ))}
              </HeroFunction>

              <AttributeContainer>
                <Attribute type="str">
                  {selectedHero.base_str} + {selectedHero.str_gain}
                </Attribute>

                <Attribute type="agi">
                  {selectedHero.base_agi} + {selectedHero.agi_gain}
                </Attribute>

                <Attribute type="int">
                  {selectedHero.base_int} + {selectedHero.int_gain}
                </Attribute>
              </AttributeContainer>

              <HeroTextInfo>
                <p>Vida</p>
                <p>{CalculatedHealth}</p>
              </HeroTextInfo>
              <HeroTextInfo>
                <p>Mana</p>
                <p>{CalculatedMana}</p>
              </HeroTextInfo>
              <HeroTextInfo>
                <p>Velocidade de movimento </p>
                <p>{selectedHero.move_speed}</p>
              </HeroTextInfo>
              <HeroTextInfo>
                <p>Ataque</p>{' '}
                <p>
                  {CalculatedMinAttack} ~ {CalculatedMaxAttack}
                </p>
              </HeroTextInfo>

              <HeroTextInfo>
                <p>Armadura</p> <p>{CalculatedArmor}</p>
              </HeroTextInfo>
            </HeroInfoContainer>
          </HeroContainer>
        )}
        <LastMatchsWithTheHero>
          <p>Últimas partidas profissionais com este herói</p>

          {matchesInPage &&
            matchesInPage.map((match) => (
              <a href={match.match_link} key={match.match_id}>
                <Match>
                  <img
                    src={selectedHero?.icon}
                    alt={selectedHero?.localized_name}
                  />
                  <strong>{match.league_name}</strong>

                  <strong>
                    {match.kills}/{match.deaths}/{match.assists}
                  </strong>
                </Match>
              </a>
            ))}

          <PageAction>
            <button
              type="button"
              disabled={!prevPage}
              onClick={() => setPage(page - 1)}
            >
              <FiChevronLeft
                size={30}
                color={!prevPage ? '#363636' : '#cfcfcf'}
              />
            </button>
            <span>{page}</span>
            <button
              type="button"
              disabled={!nextPage}
              onClick={() => setPage(page + 1)}
            >
              <FiChevronRight
                size={30}
                color={!nextPage ? '#363636' : '#cfcfcf'}
              />
            </button>
          </PageAction>
        </LastMatchsWithTheHero>
      </ContentContainer>
    </Container>
  );
};

export default Hero;
