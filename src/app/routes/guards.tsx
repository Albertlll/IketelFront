import { useUserStore } from "@/entities/user/model/store";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

export const AuthGuard = ({children} : {children : ReactNode}) => {

  const { token } = useUserStore();
  const location = useLocation();

  
  return (
    <>
      {
      
      token ?
        children
      :
        <Navigate to="auth" state={{from : location}} replace/>
      }
    </>
   );
}

