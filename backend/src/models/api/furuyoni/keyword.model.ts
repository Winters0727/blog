import type { ModelSchema } from "../../../types/model.type";

const keywordSchema: ModelSchema = {
  bsonType: "object",
  properties: {
    keyword: {
      bsonType: "string",
      description: "키워드",
    },
    description: {
      bsonType: "string",
      description: "키워드 설명",
    },
    subDescription: {
      bsonType: "array",
      description: "키워드 보충설명",
    },
    relatedKeywords: {
      bsonType: "array",
      description: "키워드와 관련된 단어들 (검색용)",
    },
  },
};

export default keywordSchema;
