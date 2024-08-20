import Image from "next/image";
import React from "react";

const Img = () => {
  return (
    <div>
      <Image src="/dish.jpg" alt="料理" width={200} height={100} />
    </div>
  );
};

export default Img;
