import type { ModelSchema } from "../../../types/model.type";

const characterSchema: ModelSchema = {
  bsonType: "object",
  properties: {
    code: {
      bsonType: "string",
      description: "캐릭터 코드",
    },
    korName: {
      bsonType: "object",
      description: "캐릭터 한글 이름",
    },
    engName: {
      bsonType: "object",
      description: "캐릭터 영어 이름",
    },
    jpnName: {
      bsonType: "object",
      description: "캐릭터 일본어 이름",
    },
    season: {
      bsonType: "string",
      description: "캐릭터 등장 시즌",
    },
    mode: {
      bsonType: "array",
      description: "캐릭터 모드",
    },
    normalCards: {
      bsonType: "object",
      description: "캐릭터 통상패",
    },
    specialCards: {
      bsonType: "object",
      description: "캐릭터 비장패",
    },
    extraCards: {
      bsonType: "object",
      description: "캐릭터 추가패",
    },
    abilityKeyword: {
      bsonType: "string",
      description: "캐릭터 키워드",
    },
    abilityDescription: {
      bsonType: "string",
      description: "캐릭터 키워드 설명",
    },
    symbolWeapon: {
      bsonType: "string",
      description: "캐릭터 상징 무기",
    },
    symbolSub: {
      bsonType: "object",
      description: "캐릭터 상징 보조 키워드",
    },
  },
};

export default characterSchema;
