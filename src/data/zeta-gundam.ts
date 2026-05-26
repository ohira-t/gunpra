export interface Part {
  runner: string;
  number: number;
  quantity?: number;
}

export interface Step {
  step: number;
  name: string;
  nameEn: string;
  parts: Part[];
}

export interface KitData {
  id: string;
  name: string;
  grade: string;
  scale: string;
  productNumber: string;
  runners: string[];
  steps: Step[];
}

export const zetaGundam: KitData = {
  id: "hg-zeta-gundam",
  name: "ゼータガンダム",
  grade: "HG",
  scale: "1/144",
  productNumber: "2374531",
  runners: ["A", "B1", "B2", "C1", "C2", "D", "E1", "E2", "PC", "SB-13"],
  steps: [
    {
      step: 1,
      name: "ボディ",
      nameEn: "BODY",
      parts: [
        { runner: "E1", number: 7 },
        { runner: "E1", number: 5 },
        { runner: "E1", number: 6 },
        { runner: "PC", number: 1 },
        { runner: "B1", number: 10 },
        { runner: "E1", number: 10 },
        { runner: "E1", number: 9 },
        { runner: "E2", number: 5 },
        { runner: "B2", number: 6 },
        { runner: "C1", number: 9 },
        { runner: "E1", number: 8 },
        { runner: "B1", number: 6 },
        { runner: "E1", number: 4 },
      ],
    },
    {
      step: 2,
      name: "頭",
      nameEn: "HEAD",
      parts: [
        { runner: "A", number: 5 },
        { runner: "C1", number: 5 },
        { runner: "A", number: 4 },
        { runner: "C1", number: 4 },
        { runner: "C1", number: 6 },
        { runner: "A", number: 6 },
        { runner: "E2", number: 3 },
        { runner: "E1", number: 1 },
      ],
    },
    {
      step: 3,
      name: "腕部（共通）",
      nameEn: "ARMS",
      parts: [
        { runner: "E2", number: 6, quantity: 2 },
        { runner: "E1", number: 3, quantity: 2 },
        { runner: "B1", number: 1, quantity: 2 },
        { runner: "B2", number: 2, quantity: 2 },
        { runner: "A", number: 8, quantity: 2 },
        { runner: "C2", number: 3, quantity: 2 },
        { runner: "C1", number: 1, quantity: 2 },
        { runner: "E1", number: 2, quantity: 2 },
        { runner: "C2", number: 5, quantity: 2 },
        { runner: "C2", number: 4, quantity: 2 },
      ],
    },
    {
      step: 4,
      name: "右腕",
      nameEn: "RIGHT ARM",
      parts: [
        { runner: "B1", number: 7 },
        { runner: "E2", number: 4 },
        { runner: "B1", number: 5 },
      ],
    },
    {
      step: 5,
      name: "左腕",
      nameEn: "LEFT ARM",
      parts: [
        { runner: "B1", number: 8 },
        { runner: "E2", number: 4 },
        { runner: "B1", number: 5 },
      ],
    },
    {
      step: 7,
      name: "足",
      nameEn: "FEET",
      parts: [
        { runner: "E2", number: 2, quantity: 2 },
        { runner: "E1", number: 9, quantity: 2 },
        { runner: "PC", number: 7 },
        { runner: "B1", number: 9, quantity: 2 },
        { runner: "B2", number: 5, quantity: 2 },
        { runner: "B2", number: 3, quantity: 2 },
        { runner: "A", number: 7, quantity: 2 },
      ],
    },
    {
      step: 8,
      name: "右脚",
      nameEn: "RIGHT LEG",
      parts: [
        { runner: "E1", number: 6 },
        { runner: "E1", number: 5 },
        { runner: "E1", number: 1 },
        { runner: "B1", number: 5 },
        { runner: "B1", number: 4 },
        { runner: "PC", number: 6 },
        { runner: "D", number: 9 },
        { runner: "E1", number: 5 },
        { runner: "C1", number: 8 },
        { runner: "A", number: 6 },
        { runner: "E1", number: 5 },
        { runner: "A", number: 1 },
        { runner: "B1", number: 3 },
        { runner: "C1", number: 1 },
        { runner: "B1", number: 9 },
      ],
    },
    {
      step: 9,
      name: "左脚",
      nameEn: "LEFT LEG",
      parts: [
        { runner: "E2", number: 5 },
        { runner: "E2", number: 4 },
        { runner: "E2", number: 1 },
        { runner: "B2", number: 4 },
        { runner: "B2", number: 5 },
        { runner: "PC", number: 6 },
        { runner: "D", number: 9 },
        { runner: "E2", number: 5 },
        { runner: "C1", number: 5 },
        { runner: "E2", number: 2 },
        { runner: "B2", number: 1 },
        { runner: "A", number: 9 },
        { runner: "B2", number: 6 },
      ],
    },
    {
      step: 10,
      name: "腰",
      nameEn: "WAIST",
      parts: [
        { runner: "B1", number: 6 },
        { runner: "B1", number: 9 },
        { runner: "E1", number: 6 },
        { runner: "E2", number: 5 },
        { runner: "PC", number: 4 },
        { runner: "C1", number: 6 },
        { runner: "B1", number: 5 },
        { runner: "B1", number: 4 },
        { runner: "B1", number: 2, quantity: 2 },
        { runner: "B2", number: 4 },
        { runner: "E1", number: 6 },
      ],
    },
    {
      step: 11,
      name: "全体組立",
      nameEn: "FULL ASSEMBLY",
      parts: [
        { runner: "D", number: 1 },
      ],
    },
    {
      step: 12,
      name: "シールド・付属品",
      nameEn: "SHIELD",
      parts: [
        { runner: "A", number: 3 },
        { runner: "D", number: 6 },
        { runner: "E1", number: 6 },
        { runner: "D", number: 5 },
        { runner: "D", number: 4 },
        { runner: "D", number: 9 },
        { runner: "E2", number: 6 },
        { runner: "D", number: 5 },
        { runner: "D", number: 6 },
        { runner: "D", number: 7 },
      ],
    },
    {
      step: 13,
      name: "武器",
      nameEn: "WEAPONS",
      parts: [
        { runner: "D", number: 6 },
        { runner: "D", number: 9 },
        { runner: "E1", number: 9 },
        { runner: "D", number: 8 },
        { runner: "E1", number: 9 },
        { runner: "C1", number: 6 },
        { runner: "C1", number: 8 },
        { runner: "C1", number: 7 },
        { runner: "E1", number: 8 },
        { runner: "E1", number: 7 },
        { runner: "E2", number: 3 },
        { runner: "C1", number: 5 },
        { runner: "C2", number: 5 },
        { runner: "SB-13", number: 1 },
        { runner: "E1", number: 6 },
        { runner: "E2", number: 5 },
        { runner: "A", number: 1 },
        { runner: "D", number: 6 },
        { runner: "E1", number: 5 },
        { runner: "C1", number: 6 },
        { runner: "C2", number: 1 },
      ],
    },
  ],
};
