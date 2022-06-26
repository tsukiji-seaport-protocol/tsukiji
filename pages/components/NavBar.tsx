import { IconButton, Link, Image } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "@styles/NavBar.module.css";

export const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <Link href="/" className={styles.homeButton}>
        <Image alt="logo" src="/assets/logo.svg" />
      </Link>

      <div className={styles.connectButton}>
        <ConnectButton />
      </div>
    </div>
  );
};
