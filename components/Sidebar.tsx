import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  IconButton,
} from "@chakra-ui/react";
import styles from "@styles/NavBar.module.css";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent
        bgColor="#000000"
        borderLeft="1px solid rgba(255,255,255,.3)"
        paddingTop="3rem"
      >
        <DrawerCloseButton color="#FFFFFF" />

        <DrawerBody className={styles.drawerBody}>
          <Link href="/about">
            <Button className={styles.drawerButton}>ABOUT</Button>
          </Link>
          <Link href="/create">
            <Button className={styles.drawerButton}>CREATE</Button>
          </Link>
          <Link href="/listings">
            <Button className={styles.drawerButton}>LISTINGS</Button>
          </Link>
          <Link href="/listings">
            <Button className={styles.drawerButton}>DEMO</Button>
          </Link>
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
          <a
            href="https://github.com/tsukiji-seaport-protocol/tsukiji"
            rel="noreferrer"
            target="_blank"
          >
            <IconButton
              aria-label="github icon"
              colorScheme="dark"
              variant="ghost"
              opacity=".7"
              icon={<FaGithub />}
            />
          </a>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
