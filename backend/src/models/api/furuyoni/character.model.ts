import type { ModelSchema } from "../../../types/model.type";

const characterSchema: ModelSchema = {
  bsonType: "object",
  properties: {
    code: {
      bsonType: "string",
      description: "캐릭터 코드",
    },
    korData: {
      bsonType: "object",
      description: "캐릭터 한글 데이터",
    },
    engData: {
      bsonType: "object",
      description: "캐릭터 영어 데이터",
    },
    jpnData: {
      bsonType: "object",
      description: "캐릭터 일어 데이터",
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
    createdAt: {
      bsonType: "date",
      description: "데이터 생성 날짜",
    },
    updatedAt: {
      bsonType: "date",
      description: "데이터 수정 날짜",
    },
  },
};

export default characterSchema;
