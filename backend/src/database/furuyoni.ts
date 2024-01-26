import CharacterSchema from "../models/api/furuyoni/character.model.ts";

export default {
  name: "furuyoni",
  collections: [
    {
      name: "character",
      schema: CharacterSchema,
    },
  ],
};
