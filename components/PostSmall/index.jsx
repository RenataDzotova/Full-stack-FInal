import Link from "next/link";
import Image from "next/image";

import PostActions from "../PostActions";

import { useState } from "react";

export default function PostSmall({
    onComment = () => { },
    onShare = () => { },
    onDelete = () => { },
    onUpdate = () => { },
    className = "",
    href,
    post,
    user,
}) {
    const [totalLikes, setTotalLikes] = useState(0);

    fetch(`/api/likes/${post.id}`)
        .then(res => res.json())
        .then(arr => setTotalLikes(arr.length));

    async function handleLikePost() {
        try {
            const res = await fetch(`/api/likes/${post.id}`, {
                method: "POST",
            });
            switch (res.status) {
                case 201:
                    return setTotalLikes(count => count + 1);
                case 202:
                    return setTotalLikes(count => count - 1);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div style={{ backgroundColor: 'white', margin: '30px', padding: '50px', borderRadius: '10px', minHeight: "400px", border: '1px gray solid' }}>
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
                    onLike={() => handleLikePost(post.id)}
                    onShare={onShare}
                    onUpdate={onUpdate}
                    liked={post.liked}
                    totalComments={post.totalComments}
                    totalLikes={totalLikes}
                />
            </div>
        </div>
    );
}