import Head from 'next/head'

import NewPostForm from '../components/NewPostForm'
import axios from 'axios'

import { useRouter } from 'next/router'
import { useState } from 'react'


export default function Profile({ user }) {
  const router = useRouter()


  const handleSubmit = ({ category, code, title }) => {
    try {
      axios.post('/api/posts', {
        category,
        code,
        title
      }).then((res) => {
      router.push('/')
    })
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
        <title>Post A Movie Review</title>
      </Head>

        <main style={{padding:'60px', display:'flex', justifyContent:'center', backgroundColor:'white'}}>
        <div style={{width:'700px', height:'600px', display:'flex', justifyContent:'center', flexDirection:'column'}}>
          <h1>Post A Movie Review</h1>
          <div>
            <NewPostForm onSubmit={handleSubmit} />
          </div>
        </div>
        </main>
    </>
  )
}