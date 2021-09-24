import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { QueueCount } from "./QueueCount";

interface AddToQueueProps {}

export const AddToQueue: React.FC<AddToQueueProps> = ({}) => {
  const { data, isLoading, refetch } =
    useQuery<Array<{ id: string }>>(`/posts?limit=1`);
  const { mutateAsync } = useMutation((body: string) => {
    return fetch("/create/history", {
      method: "POST",
      body,
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
        <blockquote
          className="tiktok-embed"
          cite={`https://www.tiktok.com/@flawhiteboywasted/video/${vid.id}`}
          data-video-id={vid.id}
          style={{ maxWidth: 605, minWidth: 325 }}
        >
          {" "}
          <section>
            {" "}
            <a
              target="_blank"
              title="@benawad"
              href="https://www.tiktok.com/@benawad"
              rel="noreferrer"
            >
              @benawad
            </a>{" "}
            <p></p>{" "}
            <a
              target="_blank"
              title="♬ original sound - Nunya"
              href="https://www.tiktok.com/music/original-sound-6994482289267428101"
              rel="noreferrer"
            >
              ♬ original sound - Nunya
            </a>{" "}
          </section>{" "}
        </blockquote>{" "}
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
                setTitle("");
                refetch();
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
              refetch();
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
