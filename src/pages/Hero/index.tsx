import React, { useState, useEffect, useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import api from '../../services/api';

import {
  Container,
  HeroContainer,
  HeroHeader,
  HeroFunction,
  AttributeContainer,
  Attribute,
  HeroInfoContainer,
  HeroTextInfo,
} from './styles';

interface HeroParams {
  id: string;
}

interface HeroData {
  id: number;
  localized_name: string;
  primary_attr: string;
  img: string;
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

const Hero: React.FC = () => {
  const [selectedHero, setSelectedHero] = useState<HeroData>();
  const manaPerIntelligence = 12;
  const healthPerIntelligence = 20;
  const agilityPerArmor = 6;
  const { params } = useRouteMatch<HeroParams>();

  const heroId = Number(params.id);
  useEffect(() => {
    async function loadHeroesData() {
      const cdnSteam = 'https://steamcdn-a.akamaihd.net';

      const response = await api.get<HeroData[]>('/heroStats');
      const formattedHeroes = response.data.map((hero) => {
        return {
          ...hero,
          img: cdnSteam.concat(hero.img),
        };
      });

      const filteredHero = formattedHeroes.find((hero) => hero.id === heroId);

      setSelectedHero(filteredHero);
    }

    loadHeroesData();
  }, [heroId]);

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
      return selectedHero.base_attack_min + selectedHero.base_agi;
    }
  }, [selectedHero]);

  const CalculatedMaxAttack = useMemo(() => {
    if (selectedHero) {
      return selectedHero.base_attack_max + selectedHero.base_agi;
    }
  }, [selectedHero]);

  return (
    <Container>
      {selectedHero && (
        <HeroContainer>
          <img src={selectedHero.img} alt={selectedHero.localized_name} />
          <HeroInfoContainer>
            <HeroHeader>
              <strong>{selectedHero.localized_name}</strong>

              <p>{selectedHero.attack_type}</p>
            </HeroHeader>
            <HeroFunction>
              {selectedHero.roles.map((role) => (
                <p>{role}</p>
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
    </Container>
  );
};

export default Hero;
