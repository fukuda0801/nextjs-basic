import Image from 'next/image'
import React from 'react'

const Img2 = () => {
  return (
    <div>
      <Image src="/tomato.jpg" alt='料理の画像' height={100} width={200} />
    </div>
  )
}

export default Img2
