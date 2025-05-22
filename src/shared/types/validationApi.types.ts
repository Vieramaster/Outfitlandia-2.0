
export type ValidationResult<T> =
  | { valid: true; value: T }
  | { valid: false; issues: ValidationIssue[]; raw: unknown };

export type ValidationIssue = {
  index: number[];
  field: string;
  message: string;
};

export type ArraySChemaType = {
  field: string;
  validate: (value: unknown) => boolean;
};

export type DataResultType<T> = {
  loading: boolean;
  error: Error | null;
  validatedData: T | undefined;
};
