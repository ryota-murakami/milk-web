import React from "react";
import { useQuery } from "react-query";

interface QueueCountProps {}

export const QueueCount: React.FC<QueueCountProps> = ({}) => {
  const { data } = useQuery<{ count: number }>(`/queue/count`);
  return <div>queue size: {data?.count}</div>;
};
