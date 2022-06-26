import { IconButton } from "@chakra-ui/react";
import styles from "@styles/Footer.module.css";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
      {`Tsukiji`} &copy; {new Date().getFullYear()}
      <IconButton
        aria-label="github icon"
        colorScheme="gray"
        variant="ghost"
        icon={<FaGithub />}
      />
    </footer>
  );
};

export default Footer;
