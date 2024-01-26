type CharacterMode = "O" | "A1" | "A2" | "AA1";

type CharacterName = {
  [mode in CharacterMode]: string;
};

type CharacterCards = {
  [mode in CharacterMode]: string[];
};

export interface Character {
  code: string;
  korName: CharacterName;
  engName: CharacterName;
  jpnName: CharacterName;
  season: string;
  mode: CharacterMode[];
  normalCards: CharacterCards;
  specialCards: CharacterCards;
  extraCards: CharacterCards;
  abilityKeyword: string;
  abilityDescription: string;
  symbolWeapon: string;
  symbolSub: {
    [mode in CharacterMode]: string;
  };
}
