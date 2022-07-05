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
          Enabling the new primitives of NFT exchange
        </h1>
        <Text className={styles.subheader}>
          Access the Seaport Protocol ‘s dope shit through Tsukiji’s user
          interface
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
