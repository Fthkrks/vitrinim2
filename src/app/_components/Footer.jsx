import React from "react";

function Footer() {
  return (
<footer className="footer footer-center bg-base-300 text-base-content p-4 md:mt-0 mt-20">
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
  </aside>
</footer>
  );
}

export default Footer;
