import type { Request, Response } from "express";
import { WithoutId } from "mongodb";

import { getCollection } from "../../../../database.ts";

import type { Language } from "../../../types/api/furuyoni/index.type.ts";
import type {
  Character,
  CharacterMode,
} from "../../../types/api/furuyoni/character.type.ts";

const DEFAULT_LANG = "kor";
const DEFAULT_MODE = "O";

const getCharacterList = async (req: Request, res: Response) => {
  try {
    const lang = req.query.lang as Language | undefined;
    const mode = req.query.mode as CharacterMode | undefined;

    const characterCollection = getCollection("furuyoni", "character");

    const langProjectionCondition = `$${
      (lang && lang.toLowerCase()) || DEFAULT_LANG
    }Data.name.${(mode && mode.toUpperCase()) || DEFAULT_MODE}`;

    const characters: string[] = (
      await characterCollection
        .find()
        .project({
          _id: 0,
          name: langProjectionCondition,
        })
        .toArray()
    )
      .map((character) => character.name)
      .filter((name) => name);

    return res.status(200).json({
      result: "success",
      characters,
      length: characters.length,
    });
  } catch (err: any) {
    return res.status(500).json({
      result: "fail",
      error: "Internal Server Error",
    });
  }
};

const getCharacter = async (req: Request, res: Response) => {
  try {
    const { parameter } = req.params;
    const lang = req.query.lang as Language | undefined;

    const characterCollection = getCollection("furuyoni", "character");

    const character: WithoutId<Character> | null =
      await characterCollection.findOne<Character>(
        {
          $or: [
            {
              code: {
                $eq: parameter.toUpperCase(),
              },
            },
            {
              "engData.name.O": {
                $eq: parameter.toLowerCase(),
              },
            },
          ],
        },
        {
          projection: {
            _id: 0,
            data: `$${(lang && lang.toLowerCase()) || DEFAULT_LANG}Data`,
            code: 1,
            season: 1,
            dataSeason: 1,
            mode: 1,
            normalCards: 1,
            specialCards: 1,
            extraCards: 1,
          },
        }
      );

    if (character) {
      return res.status(200).json({
        result: "success",
        character,
      });
    }

    return res.status(404).json({
      result: "fail",
      error: "Not found",
    });
  } catch (err: any) {
    return res.status(500).json({
      result: "fail",
      error: "Internal Server Error",
    });
  }
};

export { getCharacterList, getCharacter };
