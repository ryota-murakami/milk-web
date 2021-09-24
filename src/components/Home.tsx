import React from "react";
import { useQuery } from "react-query";
import { AddToQueue } from "./AddToQueue";
import { Login } from "./Login";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const { data, isLoading } = useQuery<{ user: any }>(`/me`);

  if (isLoading) {
    return null;
  }

  if (!data?.user) {
    return <Login />;
  }

  return <AddToQueue />;
};
