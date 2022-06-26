import { IconButton } from "@chakra-ui/react";
import styles from "@styles/Footer.module.css";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
      {`Tsukiji`} &copy; {new Date().getFullYear()}
      <Link href="https://github.com/tsukiji-seaport-protocol/tsukiji" passHref rel="noreferrer" target="_blank" >
        <IconButton
          aria-label="github icon"
          colorScheme="dark"
          variant="ghost"
          icon={<FaGithub />}
        />
      </Link>
    </footer>
  );
};

export default Footer;
