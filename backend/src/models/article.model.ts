import type { ModelSchema } from "../types/model.type";

const articleSchema: ModelSchema = {
  bsonType: "object",
  properties: {
    title: {
      bsonType: "string",
      description: "article 제목",
    },
    context: {
      bsonType: "string",
      description: "article 내용",
    },
    category: {
      bsonType: "string",
      description: "article 카테고리",
    },
    likes: {
      bsonType: "array",
      description: "article 추천 IP 리스트 (문자열 배열)",
    },
    views: {
      bsonType: "int",
      description: "article 조회 수",
    },
    tags: {
      bsonType: "array",
      description: "article 태그 (문자열 배열)",
    },
    created_at: {
      bsonType: "date",
      description: "article 생성 날짜",
    },
    updated_at: {
      bsonType: "date",
      description: "article 수정 날짜",
    },
    is_deleted: {
      bsonType: "bool",
      description: "article 삭제 여부",
    },
  },
};

export default articleSchema;
