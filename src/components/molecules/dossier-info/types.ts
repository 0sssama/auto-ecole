export type InfoTypes = string | number | boolean | Date;

export type DossierInfoProps<InfoT extends InfoTypes> = {
  labelId: string; // id of label in messages (next-intl)
  value: InfoT;
  setValue?: (newValue: InfoT) => void;
  editing?: boolean;
};
