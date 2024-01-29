import indexSchema from "../models/api/furuyoni/index.model.ts";
import CharacterSchema from "../models/api/furuyoni/character.model.ts";
import FaqSchema from "../models/api/furuyoni/faq.model.ts";
import KeywordSchema from "../models/api/furuyoni/keyword.model.ts";
import CardSchema from "../models/api/furuyoni/card.model.ts";

export default {
  name: "furuyoni",
  collections: [
    {
      name: "index",
      schema: indexSchema,
    },
    {
      name: "character",
      schema: CharacterSchema,
    },
    {
      name: "card",
      schema: CardSchema,
    },
    {
      name: "faq",
      schema: FaqSchema,
    },
    {
      name: "keyword",
      schema: KeywordSchema,
    },
  ],
};
