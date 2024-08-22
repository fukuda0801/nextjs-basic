import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Img from "../../components/Img";
import Img2 from "../../components/Img2";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div>
          <ul>
            <li>
              <Img />
              <Img2 />
            </li>
            <li>
              <Link href="/my-company/about">会社概要</Link>
              {/* <p className={Lato700.className}>あいうえお</p> */}
            </li>
            <li>
              <Link href="/my-company/contact">お問い合わせ</Link>
              <p>かきくけこ</p>
            </li>
            <li>
              <Link href="/my-company/products">商品紹介</Link>
            </li>
          </ul>

          <ol>
            <li>
              <Link href="/my-company2/about">会社概要</Link>
            </li>
            <li>
              <Link href="/my-company2/contact">お問い合わせ</Link>
            </li>
            <li>
              <Link href="/my-company2/products">商品紹介</Link>
            </li>
          </ol>
        </div>
      </main>
    </>
  );
}
