import Link from "next/link"
import Image from "next/image"

import PostActions from "../PostActions"

import formatTimeAgo from "../../utils/formatTimeAgo"
import highlight from "../../utils/highlight"

export default function PostSmall({ onLike, onComment, onShare, href, post, user, className = "" }) {

  return (
    <div>

      <div>
        <Link
          href={href}
        >
            <div>
              <div>
                {user?.image &&
                  <Image
                    src={user.image}
                    width={50}
                    height={50}
                    alt=""
                  />
                }
              </div>
              <div>
                <div>
                  <p>
                    {user?.name}
                  </p>
                </div>
                <div>
                  <p style={{fontWeight:'bold', fontSize:'30px'}}>
                    {post.title.substring(0, 50)}
                  </p>

                </div>
              </div>
            </div>

                <div>{post.code}</div>

        </Link>
      </div>
      <div>
        <PostActions onComment={onComment} onLike={onLike} onShare={onShare} liked={post.liked} totalComments={post.totalComments} totalLikes={post.totalLikes} />
      </div>

    </div>
  )
}