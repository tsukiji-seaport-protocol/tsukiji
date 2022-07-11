import { HStack, VStack, Image, Text, Box } from "@chakra-ui/react";
import styles from "@styles/SubtitleSection.module.css";
import { chakra } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import Link from "next/link";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

export const SubtitleSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.centerEllipse} />
      <VStack className={styles.content}>
        <h1 className={styles.header}>
          Enabling new primitives for NFT trading
        </h1>
        <Text className={styles.subheader}>
          Access features such as bartering or batch exchanging NFTs on the
          Tsukiji platform.
        </Text>
        <Box padding="1rem">
          <Link href={`/create`}>
            <button className={styles.createButton}>CREATE LISTING</button>
          </Link>
        </Box>
      </VStack>
    </div>
  );
};
