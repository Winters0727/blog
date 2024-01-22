import type { ModelSchema } from "../types/model.type";

const AdminSchema: ModelSchema = {
  bsonType: "object",
  properties: {
    id: {
      bsonType: "string",
      description: "admin 아이디",
    },
    password: {
      bsonType: "string",
      description: "admin 비밀번호",
    },
  },
};

export default AdminSchema;
