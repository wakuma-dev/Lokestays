export { registerSchema, loginSchema } from "./schema/authSchema";
export { redirectSchema, type RedirectSearch} from "./schema/redirectSchema"
export { signup, login, logout } from "./api/auth.api"
export type {
  LoginDataType,
  RegisterDataType,
} from "./schema/authSchema";

export { MyInput } from "./components/FormInput";
export { useAuthStore } from "./store/authStore"
export { default as useAuth } from "./hooks/useAuth"
export { useLogin, useSignup } from "./mutations/authMutations"
