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
          {/* <a> */}
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
                  <p>
                    {post.title.substring(0, 50)}
                  </p>

                </div>
              </div>
            </div>
            <pre>
              {post.language ?
                <code className={`language-${post.language}`} dangerouslySetInnerHTML={{ __html: highlight(post.code, post.language) }} ></code>
                :
                <code>{post.code}</code>
              }
            </pre>
          {/* </a> */}
        </Link>
      </div>
      <div>
        <PostActions onComment={onComment} onLike={onLike} onShare={onShare} liked={post.liked} totalComments={post.totalComments} totalLikes={post.totalLikes} />
      </div>

    </div>
  )
}