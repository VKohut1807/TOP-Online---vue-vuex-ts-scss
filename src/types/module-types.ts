export type ModuleType = {
  data: any | null;
  isLoading: boolean;
  error: string[] | null;
  isSubmitting?: boolean;
  validationErrors?: object | null;
};
