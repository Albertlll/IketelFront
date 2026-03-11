import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
// import { useRegisterForm } from "../hooks/authHooks";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { RegisterFormData } from "@/entities/user/schemas/formSchemas";

function RegisterForm({ handleSubmit, register, onSubmit }:
  {
    handleSubmit: UseFormHandleSubmit<{
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    }, {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    }>, register: UseFormRegister<{
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    }>, onSubmit: (data: RegisterFormData) => Promise<void>
  }
) {

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="on"
      className=" flex gap-2 flex-col"
    >
      <div className=" flex gap-2 flex-col p-[10px] bg-white rounded-[20px] box-content">
        <Input
          placeholder="Имя"
          autoComplete="name"
          {...register("username")}
        />
        {/* {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )} */}
        <Input
          type="email"
          placeholder="Почта"
          autoComplete="email"
          {...register("email")}
        />
        {/* {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )} */}
        <Input
          type="password"
          placeholder="Пароль"
          autoComplete="new-password"
          {...register("password")}
        />
        {/* {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )} */}
        <Input
          type="password"
          placeholder="Повторите пароль"
          autoComplete="new-password"
          {...register("confirmPassword")}
        />
      </div>
      {/* {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
      )} */}

      <Button className=" self-center" type="submit">
        Регистрация
      </Button>
    </form>
  );
}

export default RegisterForm;
