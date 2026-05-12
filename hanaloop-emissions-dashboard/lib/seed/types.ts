export type Country = {
  code: string;
  name: string;
};

export type EmissionSource =
  | "gasoline"
  | "diesel"
  | "lpg"
  | "electricity"
  | "natural_gas"
  | "coal";

export type GhgEmission = {
  yearMonth: string;
  source: EmissionSource;
  emissions: number;
};

export type Company = {
  id: string;
  name: string;
  country: string;
  emissions: GhgEmission[];
};

export type Post = {
  id: string;
  title: string;
  resourceUid: string;
  dateTime: string;
  content: string;
};