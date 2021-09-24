import React from "react";
import { apiBaseUrl } from "../constants";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  return (
    <a href={`${apiBaseUrl}/auth/google?id=1`}>
      <button>login to youtube</button>
    </a>
  );
};
