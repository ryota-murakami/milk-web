import React from "react";

interface TiktokEmbedProps {
  id: string;
}

export const TiktokEmbed: React.FC<TiktokEmbedProps> = ({ id }) => {
  return (
    <>
      <blockquote
        key={id}
        className="tiktok-embed"
        cite={`https://www.tiktok.com/@benawad/video/${id}`}
        data-video-id={id}
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
    </>
  );
};
