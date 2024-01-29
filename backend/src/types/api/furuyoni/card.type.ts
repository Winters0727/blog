import type { CharacterName } from "./character.type";

type CardType = "action" | "attack" | "deployment";
type CardSubType = "reaction" | "fullpower";
type CardValue = "X" | "-" | number;

interface CardData {
  name: string;
  type: CardType;
  subType: CardSubType[];
  description: string;
}

interface BaseCard {
  fullCode: string;
  code: string;
  charName: CharacterName;
  korData: CardData;
  engData: CardData;
  jpnData: CardData;
  relatedExtraCards: string[];
  revisionCount: number;
}

export interface AttackCard extends BaseCard {
  distance: string;
  shieldDamage: CardValue;
  hpDamage: CardValue;
}
export interface ActionCard extends BaseCard {}
export interface DeployCard extends BaseCard {
  deployCount: "X" | number;
}

export type NormalCard = AttackCard | ActionCard | DeployCard;

export type SpecialCard = NormalCard & { cost: CardValue };

export type Card = NormalCard | SpecialCard;
