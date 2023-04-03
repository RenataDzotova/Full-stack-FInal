import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import {
  ChatBubbleBottomCenterTextIcon as CommentIcon,
  HeartIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

export default function PostActions({
  onComment = () => {},
  onDelete = () => {},
  onLike = () => {},
  onShare = () => {},
  onUpdate = () => {},
  className = "",
  defaultTitle = "",
  liked,
  totalComments,
  totalLikes,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [title, setTitle] = useState(defaultTitle);
  const [showInput, setShowInput] = useState(false);

  return (
    <div className={"flex items-center justify-between " + className}>
      <button
        style={{ width: "30px", height: "fit-content" }}
        onClick={(e) => {
          onComment();
        }}
      >
        {/* <span>{totalComments}</span> */}
        <CommentIcon className="h-7 w-7" aria-hidden="true" />
      </button>
      {/* <button
        style={{ width: "30px", height: "fit-content" }}
        onClick={(e) => {
          onLike();
        }}
      >
        <span>{totalLikes}</span>
        {!liked ? (
          <HeartIcon className="h-7 w-7" aria-hidden="true" />
        ) : (
          <HeartIconSolid className="h-7 w-7" aria-hidden="true" />
        )}
      </button> */}
      <button
        disabled={isDeleting}
        onClick={(e) => {
          setIsDeleting(true);
          onDelete();
        }}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
      <button
        onClick={(e) => {
          setShowInput(true);
          onUpdate({ title });
        }}
      >
        Update
      </button>
      {showInput && 
      <input
        name="title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      }
    </div>
  );
}
