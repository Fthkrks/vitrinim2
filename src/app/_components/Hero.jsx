import React from "react";
import { BASE_URL } from "../../config";
import Link from "next/link";

console.log(BASE_URL);


function Hero() {
  return (
    <div className="hero md:h-screen md:my-0 my-10">
      <div className="hero-content flex-col  lg:flex-row-reverse">
      <div className="mockup-phone border-primary h-[640px]">
        <div className="camera"></div>
        <div className="display h-full">
          <iframe
            title="profile"
            src={`${BASE_URL}/fatihK`}
            width={"100%"}
            height={"100%"}
            className="rounded-3xl"
          />
        </div>
      </div>
        <div className="md:w-[700px]">
          <h1 className="text-5xl font-bold">
            Projeleriniz GitHub'da kalmasın.
          </h1>
          <p className="py-6 ">
            Projelerinizi hayata geçirin, sadece repolarda değil, kullanıcıların
            önünde olun. Uygulamalarınızı ve fikirlerinizi paylaşarak
            potansiyelinizi gösterin! Tıpkı bu proje gibi.
          </p>
          <Link href="/admin" className="btn btn-primary text-white">Başlayalım</Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
