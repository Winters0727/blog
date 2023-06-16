const articleSchema = {
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
    comments: {
      bsonType: ["objectId"],
      description: "article 댓글",
    },
    likes: {
      bsonType: "int",
      description: "article 추천 수",
    },
    tags: {
      bsonType: ["string"],
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
