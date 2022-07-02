import styles from "@styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
      {`Tsukiji`} &copy; {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
