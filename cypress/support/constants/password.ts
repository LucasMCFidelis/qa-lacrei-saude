export const PASSWORD_CRITERIA = {
  MIN_LENGTH: /8 caracteres ou mais/i,
  UPPERCASE: /1 Letra maiúscula ou mais/i,
  LOWERCASE: /1 Letra minúscula ou mais/i,
  NUMBER: /1 Número ou mais/i,
  SPECIAL_CHAR: /1 Caractere especial ou mais/i,
} as const;

export type PasswordCriteriaKey = keyof typeof PASSWORD_CRITERIA;

export const PASSWORD_VISIBILITY = {
  active: /Visibilidade Ativa/i,
  inactive: /Visibilidade Desativada/i,
} as const;
