import { FieldErrors } from 'react-hook-form';
import { create } from 'zustand'

interface authStore {
  error : FieldErrors<{
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
}>
  setErrors : (er : FieldErrors<{
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
}>) => void;
}
export const useAuthStore = create<authStore>((set)=>({
  error : "",

  setErrors : (er) => set({error : er})
}))
