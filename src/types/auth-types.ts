import {ExtendedUserType} from "@/types/user-types";

export type AuthTypes = {
  isSubmitting: boolean;
  currentUser: ExtendedUserType | null;
  validationErrors: object | null;
  isLoggedIn: boolean | null;
};
