const commentSchema = {
  bsonType: "object",
  properties: {
    name: {
      bsonType: "string",
      description: "comment 작성자 이름",
    },
    password: {
      bsonType: "string",
      description: "comment 삭제 비밀번호",
    },
    context: {
      bsonType: "string",
      description: "comment 내용",
    },
    likes: {
      bsonType: "int",
      description: "comment 추천 수",
    },
    created_at: {
      bsonType: "date",
      description: "comment 생성 날짜",
    },
    is_deleted: {
      bsonType: "bool",
      description: "comment 삭제 여부",
    },
  },
};

export default commentSchema;
