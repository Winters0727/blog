import type { ModelSchema } from "../../../types/model.type";

const indexSchema: ModelSchema = {
  bsonType: "object",
  properties: {
    currentSeason: {
      bsonType: "string",
      description: "현재 시즌",
    },
    characterSeason: {
      bsonType: "string",
      description: "캐릭터 데이터 시즌",
    },
    cardSeason: {
      bsonType: "string",
      description: "카드 데이터 시즌",
    },
    faqSeason: {
      bsonType: "string",
      description: "FAQ 데이터 시즌",
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

export default indexSchema;
