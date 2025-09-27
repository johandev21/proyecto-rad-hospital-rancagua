import React from "react";

import { ReactNode } from "react";

type DecorativePatternsProps = {
  children?: ReactNode;
};

export default function DecorativePatterns({
  children,
}: DecorativePatternsProps) {
  return (
    <div className="min-h-screen w-full relative">
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: `
        radial-gradient(
          circle at 80% 20%,
          rgba(93, 121, 19, 0.2) 0%,
          rgba(93, 121, 19, 0.09) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )
      `,
        }}
      />
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: `
        radial-gradient(
          circle at 20% 80%,
          rgba(74, 119, 117, 0.2) 0%,
          rgba(74, 119, 117, 0.09) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )
      `,
        }}
        />
        {children}
    </div>
  );
}
