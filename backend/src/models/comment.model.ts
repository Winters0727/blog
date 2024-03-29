import type { ModelSchema } from "../types/model.type";

const commentSchema: ModelSchema = {
  bsonType: "object",
  properties: {
    article_id: {
      bsonType: "objectId",
      description: "comment 게시글 아이디",
    },
    address: {
      bsonType: "string",
      description: "comment 작성 IP 주소",
    },
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
    sub_comments: {
      bsonType: "array",
      description: "comment 대댓글",
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
