import CharacterSchema from "../models/api/furuyoni/character.ts";

export default {
  name: "furuyoni",
  collections: [
    {
      name: "character",
      schema: CharacterSchema,
    },
  ],
};
