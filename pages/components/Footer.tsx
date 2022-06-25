import { IconButton } from "@chakra-ui/react";
import styles from "@styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
      {`Tsujiki`} &copy; {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;