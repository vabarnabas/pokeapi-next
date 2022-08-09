import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useEffect } from "react"
import Layout from "../components/layout"
import MainCanvas from "../components/main"
import { fetchTypes } from "../services/fetchTypes"

const Home: NextPage = () => {
  useEffect(() => {
    fetchTypes().then((data) => console.log(data))
  }, [])

  return (
    <Layout>
      <MainCanvas />
    </Layout>
  )
}

export default Home
