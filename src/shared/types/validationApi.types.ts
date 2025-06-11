export type ValidationResult<T> =
  | { valid: true; value: T }
  | { valid: false; issues: ValidationIssue[]; raw: unknown };

export type ValidationIssue = {
  index: number[];
  field: string;
  message: string;
};

export type DataResultType<T> = {
  loading: boolean;
  error: Error | null;
  validatedData: T | undefined;
};

export type ArraySchemaType = {
  field: string;
  validate: (v: unknown) => v is any;
};
