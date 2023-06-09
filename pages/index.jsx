import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Button from "../components/Button";
import PostSmall from "../components/PostSmall";
import { prisma } from "../server/db/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home({ posts: _posts }) {
  const router = useRouter();
  const [posts, setPosts] = useState(_posts);

  useEffect(() => {
    setPosts(_posts);
  }, [_posts]);

  const postsByCategory = {};

  posts.forEach((post) => {
    if (postsByCategory[post.category]) {
      postsByCategory[post.category].push(post);
    } else {
      postsByCategory[post.category] = [post];
    }
  });

  async function handleDeletePost(id) {
    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      setPosts(posts.filter((post) => post.id !== id));
    } else {
      console.error(`Failed to delete post with ID ${id}: ${res.statusText}`);
    }
  }

  function onDelete(id) {
    handleDeletePost(id);
  }

  async function handleUpdatePost(id, title) {
    console.log(id, title);
    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (res.status === 200) {
      setPosts(
        posts.map((post) => (post.id === id ? { ...post, title } : post))
      );
    } else {
      console.error(`Failed to update post with ID ${id}: ${res.statusText}`);
    }
  }

  function onUpdate(id, title) {
    handleUpdatePost(id, title);
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ padding: "60px", backgroundColor: "white" }}>
        <div style={{ display: "flex", width: "100%" }}>
          {/* <Button onClick={() => router.push("/addPost")}>
            Post A New Movie
          </Button> */}

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {postsByCategory &&
              Object.keys(postsByCategory).map((category) => (
                <>
                  <h1>{category}</h1>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "20px",
                      alignItems: "flex-start",
                    }}
                  >
                    {postsByCategory[category].map((post) => (
                      <div style={{ width: "600px" }} key={post.id}>
                        <PostSmall
                          post={post}
                          // user={{
                          //   image:
                          // }}
                          href={`/code/${post.id}`}
                          onComment={() => console.log("comment post", post.id)}
                          onShare={() => console.log("share post", post.id)}
                          onDelete={() => onDelete(post.id)}
                          onUpdate={({ title }) => onUpdate(post.id, title)}
                        ></PostSmall>
                      </div>
                    ))}
                  </div>
                </>
              ))}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  // will always run on the server
  //newest first
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}
