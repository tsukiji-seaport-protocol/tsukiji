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
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Button>Hi</Button>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
