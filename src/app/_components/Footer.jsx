import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <>
      <footer className="footer bg-base-200 text-base-content p-10">
        <nav>
          <h6 className="footer-title">Kurumsal</h6>
          <Link href="/about" className="link link-hover">Hakkımızda</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Sözleşmeler</h6>
          <Link href="/deliveryandreturn" className="link link-hover">Teslimat ve İade Şartları</Link>
          <Link href="/privacy" className="link link-hover">Gizlilik Sözleşmesi</Link>
          <Link href="/distancesellingagreement" className="link link-hover">Mesafeli Satış Sözleşmesi</Link>
          {/* <a className="link link-hover">SSL Sertifikası</a> */}
        </nav>
      </footer>
      <footer className="footer flex justify-between  bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
        <aside className="grid-flow-col items-center">
          <p>
            Vitrinim.co
            <br />
            Copyright © 2024 - All right reserved
          </p>
        </aside>
        <Image src="/iyzico.png" alt="" width={500} height={500} />
      </footer>
    </>
  );
}

export default Footer;
