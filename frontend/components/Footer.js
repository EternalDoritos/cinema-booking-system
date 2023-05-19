import styles from "../styles//Footer.module.css";
import Link from "next/link";
import Image from "next/image";
import aboutUs from "../pages/footerComponents/aboutUs";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <h4>About GoldenRizz</h4>
            <ul>
              <li>
                {" "}
                <Link href="/footerComponents/aboutUs">
                  <a className="text-amber-300">About Us</a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/footerComponents/faq">
                  <a className="text-amber-300">FAQ</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Connect with us</h4>
            <ul>
              <li>
                {" "}
                <Link href="/footerComponents/contactUs">
                  <a className="text-amber-300">Contact Us</a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/footerComponents/feedback">
                  <a className="text-amber-300">Feedback</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Social Media</h4>
            <ul>
              <li>
                {" "}
                <Link href="https://www.instagram.com/gvmovieclub/">
                  <a className="text-amber-300">Instagram</a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="https://www.facebook.com/gvmovieclub">
                  <a className="text-amber-300">Facebook</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Useful Links</h4>
            <ul>
              <li>
                {" "}
                <Link href="/footerComponents/termsOfUse">
                  <a className="text-amber-300">Terms of Use</a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/footerComponents/privacyPolicy">
                  <a className="text-amber-300">Privacy Policy</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.logo}>
          <Image
            src="/logo.png"
            alt="GoldenRizz Logo"
            width={200}
            height={110}
          />
          <p className="text-gray-400 text-sm">
            © 2023 GoldenRizz Site. All rights reserved.
          </p>{" "}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
