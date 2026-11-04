import Image from "next/image";
import "./Avatar.css";
import { AvatarProps } from "@/types/types";

export default function Avatar({ bubbleMessage }: AvatarProps) {
  return (
    <div className="avatar-wrapper">
      <Image src="/images/head.svg" width={70} height={88} unoptimized alt="Srishti’s hand-drawn avatar" className="avatar-image" />
      <div className="thought-bubble">
        <svg className="cloud-shape" viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden="true">
          <path d="M55 133 C12 136 4 101 28 82 C6 51 40 23 76 34 C89 3 135 2 159 23 C184 0 232 2 249 25 C281 7 323 18 328 42 C370 31 403 61 382 89 C411 118 375 148 340 134 C317 157 275 154 252 139 C221 160 179 159 155 140 C124 158 79 155 55 133 Z" />
        </svg>
        <span>{bubbleMessage}</span>
        <i className="thought-dot thought-dot-large" aria-hidden="true" />
        <i className="thought-dot thought-dot-small" aria-hidden="true" />
      </div>
    </div>
  );
}
