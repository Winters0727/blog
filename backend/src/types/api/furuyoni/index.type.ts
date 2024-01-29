export type Language = "kor" | "eng" | "jpn";

export interface FAQ {
  category: string;
  question: string;
  answer: string;
}

export interface Keyword {
  keyword: string;
  description: string;
  subDescription: string[];
  relatedKeywords: string[];
}
