import Link from "next/link";
import Image from "next/image";

import PostActions from "../PostActions";

import { useState } from "react";

export default function PostSmall({
  onLike = () => {},
  onComment = () => {},
  onShare = () => {},
  onDelete = () => {},
  onUpdate = () => {},
  className = "",
  href,
  post,
  user,
}) {
  return (
    <div style={{backgroundColor:'white', margin:'30px', padding:'50px', borderRadius:'10px', minHeight: "400px"}}>
      <div>
        <Link href={href}>
          <div>
            <div>
              {user?.image && (
                <Image src={user.image} width={50} height={50} alt="" />
              )}
            </div>
            <div>
              <div>
                <p>{user?.name}</p>
              </div>
              <div>
                <p style={{ fontWeight: "bold", fontSize: "30px" }}>
                  {post.title.substring(0, 50)}
                </p>
              </div>
            </div>
          </div>

          <div>{post.code}</div>
        </Link>
      </div>
      <div>
        <PostActions
          onComment={onComment}
          onDelete={onDelete}
          onLike={onLike}
          onShare={onShare}
          onUpdate={onUpdate}
          liked={post.liked}
          totalComments={post.totalComments}
          totalLikes={post.totalLikes}
        />
      </div>
    </div>
  );
}