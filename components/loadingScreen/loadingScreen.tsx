import React from "react";
import loadingGif from "@/public/loadingImg.gif";
import Image from "next/image";
import style from "./loadingScreen.module.scss";

const LoadingScreen = () => {
  return (
    <div className={style.main}>
      <div className={style.loadImg}>
        <Image src={loadingGif} alt="Loading" width={400} height={500} />
      </div>
    </div>
  );
};

export default LoadingScreen;
