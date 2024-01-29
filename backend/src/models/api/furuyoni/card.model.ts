import type { ModelSchema } from "../../../types/model.type";

const CardSchema: ModelSchema = {
  bsonType: "object",
  properties: {
    fullCode: {
      bsonType: "string",
      description: "카드 전체 코드",
    },
    code: {
      bsonType: "string",
      description: "카드 코드",
    },
    charName: {
      bsonType: "string",
      description: "카드 캐릭터 이름(영어)",
    },
    korData: {
      bsonType: "object",
      description: "카드 한글 데이터",
    },
    engData: {
      bsonType: "object",
      description: "카드 영어 데이터",
    },
    jpnData: {
      bsonType: "object",
      description: "카드 일어 데이터",
    },
    relatedExtraCards: {
      bsonType: "array",
      description: "카드 관련 추가 카드 배열",
    },
    revisionCount: {
      bsonType: "int",
      description: "카드 수정 횟수",
    },
    distance: {
      bsonType: "string",
      description: "공격패 적정거리",
    },
    shieldDamage: {
      bsonType: "string",
      description: "공격패 오라 데미지",
    },
    hpDamage: {
      bsonType: "string",
      description: "공격패 라이프 데미지",
    },
    deployCount: {
      bsonType: "string",
      description: "부여패 봉납 수",
    },
    cost: {
      bsonType: "string",
      description: "비장패 비용",
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

export default CardSchema;
