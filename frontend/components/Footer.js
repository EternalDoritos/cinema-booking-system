import styles from "../styles//Footer.module.css";
import Image from "next/image";

// function Footer() {
//   return (
//     <footer className={styles.footer}>
//       <div className={styles.container}>
//         <div className={styles.logo}>
//           <Image src="/logo.png" alt="Cinema Logo" width={200} height={110} />
//           <h3>GoldenRizz Copyright 2023</h3>
//         </div>
//         <div className={styles.menu}>
//           <ul>
//             <li>Home</li>
//             <li>Movies</li>
//             <li>About Us</li>
//             <li>Contact Us</li>
//           </ul>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <h4>About GoldenRizz</h4>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Corporate Sales</li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Connect with us</h4>
            <ul>
              <li>Contact Us</li>
              <li>Feedback</li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>GoldenRizz Movie Extras</h4>
            <ul>
              <li>Gift Vouchers</li>
              <li>Promotions</li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Useful Links</h4>
            <ul>
              <li>Terms of Use</li>
              <li>Privacy Policy</li>
              <li>Sitemap</li>
            </ul>
          </div>
        </div>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="GV Logo" width={200} height={110} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
