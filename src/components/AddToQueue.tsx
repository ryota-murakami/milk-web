import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { apiBaseUrl } from "../constants";
import { QueueCount } from "./QueueCount";
import { TiktokEmbed } from "./TiktokEmbed";

interface AddToQueueProps {}

export const AddToQueue: React.FC<AddToQueueProps> = ({}) => {
  const { data, isLoading } = useQuery<Array<{ id: string }>>(`/posts?limit=1`);
  const { mutateAsync } = useMutation((body: string) => {
    return fetch(`${apiBaseUrl}/create/history`, {
      method: "POST",
      body,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
  });
  const [title, setTitle] = useState("");

  if (isLoading) {
    return <div>loading...</div>;
  }

  const vid = data![0];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <TiktokEmbed id={vid.id} key={vid.id} />
        <div style={{ textAlign: "center" }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          />
          <div style={{ marginTop: 20 }}>
            <button
              onClick={async () => {
                await mutateAsync(
                  JSON.stringify({
                    tiktok_post_id: vid.id,
                    youtube_title: title,
                    youtube_privacy: "public",
                    state: "active",
                  })
                );
                // setTitle("");
                // refetch();
                window.location.reload();
              }}
            >
              submit
            </button>
          </div>
          <div
            onClick={async () => {
              await mutateAsync(
                JSON.stringify({
                  tiktok_post_id: vid.id,
                  state: "skipped",
                })
              );
              window.location.reload();
            }}
            style={{ marginTop: 20 }}
          >
            <button>skip</button>
          </div>
          <div style={{ marginTop: 20 }}>
            <QueueCount />
          </div>
        </div>
      </div>
    </>
  );
};
