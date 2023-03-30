import Link from "next/link"
import Image from "next/image"
import { useState } from 'react';

import { ChatBubbleBottomCenterTextIcon as CommentIcon, HeartIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

export default function PostActions({ onDelete, onComment, onLike, onShare, totalLikes, totalComments, liked, className = "" }) {

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(post.id);
    setIsDeleting(false);
  };


  return (
    <div className={'flex items-center justify-between ' + className}>
      <button
        style={{width:'30px', height:'fit-content'}}
        onClick={onComment}
        className="flex flex-col items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md hover:outline-none text-gray-400 hover:text-gray-300"
      >
        <span>{totalComments}</span>
        <CommentIcon className="h-7 w-7" aria-hidden="true" />
      </button>
      <button
        style={{width:'30px', height:'fit-content'}}
        onClick={onLike}
        className="flex flex-col items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md hover:outline-none text-gray-400 hover:text-gray-300"
      >
        <span>{totalLikes}</span>
        {
          !liked ? <HeartIcon className="h-7 w-7" aria-hidden="true" />
            : <HeartIconSolid className="h-7 w-7" aria-hidden="true" />
        }
      </button>
      <button
        style={{width:'30px', height:'fit-content'}}
        onClick={onShare}
        className="flex flex-col items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md hover:outline-none text-gray-400 hover:text-gray-500"
      >
        <span>&nbsp;</span>
        <ArrowUpTrayIcon className="h-7 w-7" aria-hidden="true" />
      </button>
      <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
    </div>
  )
}