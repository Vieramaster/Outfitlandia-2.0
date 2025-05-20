export type ValidationResult<T> =
  | { valid: true; value: T }
  | { valid: false; issues: ValidationIssue[]; raw: unknown };

export type ValidationIssue = {
  index: number;
  field: string | "root" | "object";
  message: string;
};

export type ArraySChemaType = {
  field: string;
  validate: (value: unknown) => boolean;
};
