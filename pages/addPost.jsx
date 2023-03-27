import Head from 'next/head'

import NewPostForm from '../components/NewPostForm'
import axios from 'axios'

import { useRouter } from 'next/router'
import { useState } from 'react'


export default function Profile({ user }) {
  const router = useRouter()


  const handleSubmit = async ({ category, code, title }) => {
    try {
      const { data } = await axios.post('/api/posts', {
        category,
        code,
        title
      })
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  if (typeof TextEncoder !== "undefined") {
    console.log("TextEncoder is supported");
  } else {
    console.log("TextEncoder is not supported");
  }

  return (
    <>
      <Head>
        <title>Create a Snippet</title>
      </Head>
      <div>
        <h1>Create a Snippet</h1>

        <div>
          <NewPostForm onSubmit={handleSubmit} />
        </div>

      </div>
    </>
  )
}