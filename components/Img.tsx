import Image from 'next/image'
import React from 'react'

const Img = () => {
  return (
    <>
      <Image src="/tomato.jpg" alt="トマトスープの画像" width={200} height={100} />
    </>
  )
}

export default Img
