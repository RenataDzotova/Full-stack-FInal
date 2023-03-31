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
  onDelete = () => {},
  onUpdate = (e) => {
    e.preventDefault()
    onSubmit({ code, category, title })
  },
  onComment,
  onLike,
  onShare,
  totalLikes,
  totalComments,
  liked,
  className = "",
  defaultTitle="no title",
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [title, setTitle] = useState(defaultTitle);

  const handleTitleChange = (value) => {
    setTitle(value)
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   onSubmit({ code, category, title })
  // }

  return (
    <div className={"flex items-center justify-between " + className}>
      <button
        style={{ width: "30px", height: "fit-content" }}
        onClick={onComment}
      >
        <span>{totalComments}</span>
        <CommentIcon className="h-7 w-7" aria-hidden="true" />
      </button>
      <button
        style={{ width: "30px", height: "fit-content" }}
        onClick={onLike}
      >
        <span>{totalLikes}</span>
        {!liked ? (
          <HeartIcon className="h-7 w-7" aria-hidden="true" />
        ) : (
          <HeartIconSolid className="h-7 w-7" aria-hidden="true" />
        )}
      </button>

      <button onClick={onDelete} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete"}
      </button>

      <button onClick={onUpdate}>
        Update
      </button>
      <input name="title" onChange={e => handleTitleChange(e.target.value)}/>
    </div>
  );
}