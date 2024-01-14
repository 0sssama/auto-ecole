export type InfoTypes = string | number | boolean | Date;

export type DossierInfoProps<InfoT extends InfoTypes> = {
  labelId: string; // id of label in messages (next-intl)
  translatePrefix: string; // depends on type of info (Instructor, Student, etc.)

  value: InfoT;
  setValue?: (newValue: InfoT) => void;
  editing?: boolean;
};

export type InfoDataProps<InfoT extends InfoTypes> = {
  labelId: string; // id of label in messages (next-intl)
  editing?: boolean;

  value: InfoT;
  setValue?: (newValue: InfoT) => void;
};
