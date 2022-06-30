import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  IconButton,
  Link,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "@styles/NavBar.module.css";
import { HamburgerIcon } from "@chakra-ui/icons";

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
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          bgColor="#000000"
          borderLeft="1px solid rgba(255,255,255,.3)"
          paddingTop="3rem"
        >
          <DrawerCloseButton color="#FFFFFF" />

          <DrawerBody className={styles.drawerBody}>
            <Button className={styles.drawerButton}>EXPLORE</Button>
            <Button className={styles.drawerButton}>CREATE</Button>
            <Button className={styles.drawerButton}>RANKINGS</Button>
            <Button className={styles.drawerButton}>HOW IT WORKS</Button>
            <Button className={styles.drawerButton}>BLOG</Button>
          </DrawerBody>

          <DrawerFooter className={styles.drawerFooter}>
            <div className={styles.drawerFooterLabel}>Made With ❤️ By</div>
            <Button className={styles.drawerFooterButton}>
              <a
                href="https://twitter.com/jeongminc_"
                target="
              _blank"
              >
                @jeongminc_
              </a>
            </Button>
            <Button className={styles.drawerFooterButton}>
              <a
                href="https://twitter.com/straightupjac"
                target="
              _blank"
              >
                @straightupjac
              </a>
            </Button>
            <Button className={styles.drawerFooterButton}>
              <a
                href="https://twitter.com/andrewkjmin"
                target="
              _blank"
              >
                @andrewkjmin
              </a>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
