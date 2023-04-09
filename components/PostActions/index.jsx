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
    <div className={"flex items-center justify-between " + className}
    style={{minWidth:'250px', width:'fit-content', display:'flex', justifyContent:'space-between', marginTop:'20px'}}>

      <button
        disabled={isDeleting}
        onClick={(e) => {
          setIsDeleting(true);
          onDelete();
        }}
        style={{width:'100px', height:'30px', backgroundColor:'black', color:'white', borderRadius:'5px', border:'none'}}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
      <button
        onClick={(e) => {
          setShowInput(true);
          onUpdate({ title });
        }}
        style={{width:'100px', height:'30px', backgroundColor:'#7c7c7c', color:'white', borderRadius:'5px', border:'none'}}
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
      <button
          style={{ width: "40px", height: "30px", display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'white', borderRadius:'7px', border:'gray 1px solid', padding:'3px 5px 3px 5px' }}
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
      </button>
    </div>
  );
}
