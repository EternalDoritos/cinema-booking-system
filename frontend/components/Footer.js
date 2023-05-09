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
                <Link href="/footerComponents/aboutUs">About Us</Link>
              </li>
              <li>
                {" "}
                <Link href="/footerComponents/faq"> FAQ</Link>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Connect with us</h4>
            <ul>
              <li>
                {" "}
                <Link href="/footerComponents/contactUs">Contact Us</Link>
              </li>
              <li>
                {" "}
                <Link href="/footerComponents/feedback">Feedback</Link>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Social Media</h4>
            <ul>
              <li>
                {" "}
                <Link href="https://www.instagram.com/gvmovieclub/">
                  Instagram
                </Link>
              </li>
              <li>
                {" "}
                <Link href="https://www.facebook.com/gvmovieclub">
                  Facebook
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Useful Links</h4>
            <ul>
              <li>
                {" "}
                <Link href="/footerComponents/termsOfUse">Terms of Use</Link>
              </li>
              <li>
                {" "}
                <Link href="/footerComponents/privacyPolicy">
                  Privacy Policy
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
