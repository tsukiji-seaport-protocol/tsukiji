import { Link, Image, useDisclosure } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "@styles/NavBar.module.css";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Sidebar } from "./Sidebar";

export const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className={styles.navbar}>
      <Link href="/" className={styles.homeButton}>
        <Image alt="logo" src="/assets/logo.svg" />
      </Link>

      <div className={styles.navbarRightSection}>
        <ConnectButton />
        <HamburgerIcon
          onClick={onOpen}
          className={styles.hamburgerButton}
          w={7}
          h={7}
        />
      </div>
      <Sidebar isOpen={isOpen} onClose={onClose} />
    </div>
  );
};
