import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="navbar my-5 ">
      <div className="navbar-start">
        <div className="flex items-center gap-2 cursor-pointer">
          <Image src="/vitrinim3.png" width={50} height={50} />
          Vitrinim
        </div>
      </div>
      <div className="navbar-center hidden lg:flex gap-x-20">
        <Link href="/#pricing" className="hover:underline">Fiyatlandırma</Link>
        <Link href="/sign-up" className="hover:underline"> Kayıt ol</Link>
      </div>
      <div className="navbar-end">
        <Link href="/sign-in" className="btn btn-primary text-white">Giriş Yap</Link>
      </div>
    </div>
  );
}

export default Navbar;
