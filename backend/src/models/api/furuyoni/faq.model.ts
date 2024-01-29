import type { ModelSchema } from "../../../types/model.type";

const faqSchema: ModelSchema = {
  bsonType: "object",
  properties: {
    category: {
      bsonType: "string",
      description: "FAQ 카테고리",
    },
    question: {
      bsonType: "string",
      description: "FAQ 질문",
    },
    answer: {
      bsonType: "string",
      description: "FAQ 답변",
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

export default faqSchema;
