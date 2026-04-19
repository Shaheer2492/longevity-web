"use client";

import { ReactNode, CSSProperties } from "react";
import { useReveal } from "@/hooks/useReveal";

type Props = {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  stagger?: boolean;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
};

export default function Reveal({
  children,
  as = "div",
  stagger = false,
  delay = 0,
  className = "",
  style,
  id,
}: Props) {
  const [ref, seen] = useReveal<HTMLElement>();
  const Tag = as as keyof React.JSX.IntrinsicElements;
  const cls = `reveal${seen ? " in" : ""}${stagger ? " stagger" : ""}${
    className ? " " + className : ""
  }`;

  const finalStyle: CSSProperties = {
    ...style,
    transitionDelay: delay ? `${delay}ms` : undefined,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp: any = Tag;
  return (
    <Comp ref={ref} id={id} className={cls} style={finalStyle}>
      {children}
    </Comp>
  );
}
