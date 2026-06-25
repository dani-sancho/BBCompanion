type Rule = {
  matches(days: number): boolean;
  format(days: number): string;
};

export const expirationDateRules: readonly Rule[] = [
  {
    matches: (days) => days < 0,
    format: () => 'Expired',
  },
  {
    matches: (days) => days === 0,
    format: () => 'Expires today',
  },
  {
    matches: (days) => days === 1,
    format: () => 'Expires in 1 day',
  },
  {
    matches: (days) => days < 30,
    format: (days) => `Expires in ${days} days`,
  },
  {
    matches: (days) => days < 365,
    format: (days) => `Expires in ${Math.floor(days / 30)} months`,
  },
  {
    matches: () => true,
    format: (days) => `Expires in ${Math.floor(days / 365)} years`,
  },
];
