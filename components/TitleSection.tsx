import { HStack, VStack, Image, Text, Box, Spacer } from "@chakra-ui/react";
import styles from "@styles/TitleSection.module.css";
import { chakra } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

export const TitleSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftEllipse} />
      <div className={styles.rightEllipse} />
      <HStack className={styles.content}>
        <VStack>
          <h1 className={styles.header}>Next-Generation NFT Exchange</h1>
          <Text className={styles.subheader}>
            Built using Opensea's Seaport Protocol
          </Text>
        </VStack>
        <VStack className={styles.animationStack}>
          <ChakraBox
            animate={{
              y: ["0%", "5%", "0%", "5%", "0%"],
              scale: [1, 1, 1, 1, 1],
              rotate: [0, 10, 0, 10, 0],
            }}
            // @ts-ignore no problem in operation, although type error appears.
            transition={{
              duration: 10,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <Image
              alt="seaport logo"
              src="/assets/seaport_colored.png"
              className={styles.seaportLogo}
            />
          </ChakraBox>
          <ChakraBox
            animate={{
              scale: [1, 1, 1, 1, 1],
              x: [-200, 200, 200, -200, -200],
              y: [0, 0, 0, 0, 0],
            }}
            // @ts-ignore no problem in operation, although type error appears.
            transition={{
              duration: 10,
              ease: [0.86, 0.2, 0.11, 1.3],
              repeat: Infinity,
              repeatType: "loop",
            }}
            position="absolute"
            right={280}
            bottom={180}
          >
            <div className={styles.offerImages}>
              <Image
                alt="bobu nft"
                src="/assets/bobu.png"
                className={`${styles.movingImage} ${styles.bobu}`}
              />
              <Image
                alt="coven nft"
                src="/assets/coven.png"
                className={`${styles.movingImage} ${styles.coven}`}
              />
            </div>
          </ChakraBox>
          <ChakraBox
            animate={{
              scale: [1, 1, 1, 1, 1],
              x: [200, -200, -200, 200, 200],
              y: [0, 0, 0, 0, 0],
            }}
            // @ts-ignore no problem in operation, although type error appears.
            transition={{
              duration: 10,
              ease: [0.86, 0.2, 0.11, 1.3],
              repeat: Infinity,
              repeatType: "loop",
            }}
            position="absolute"
            right={280}
            bottom={180}
          >
            <div className={styles.offerImages}>
              <Image
                alt="bobu nft"
                src="/assets/ape.png"
                className={`${styles.movingImage} ${styles.ape}`}
              />
              <Image
                alt="coven nft"
                src="/assets/doodle.png"
                className={`${styles.movingImage} ${styles.doodle}`}
              />
            </div>
          </ChakraBox>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 106 34"
            className={styles.svg}
          >
            <g className={styles.sparkles}>
              <path
                className={styles.sparkle1}
                d="M2.5740361 5.33344622s1.1875777-6.20179466 2.24320232 0c0 0 5.9378885 1.05562462 0 2.11124925 0 0-1.05562463 6.33374774-2.24320233 0-3.5627331-.6597654-3.29882695-1.31953078 0-2.11124925z"
              />
              <path
                className={styles.sparkle2}
                d="M33.5173993 29.97263826s1.03464615-5.40315215 1.95433162 0c0 0 5.17323078.91968547 0 1.83937095 0 0-.91968547 5.51811283-1.95433162 0-3.10393847-.57480342-2.8740171-1.14960684 0-1.83937095z"
              />
              <path
                className={styles.sparkle3}
                d="M69.03038108 1.71240809s.73779281-3.852918 1.39360864 0c0 0 3.68896404.65581583 0 1.31163166 0 0-.65581583 3.93489497-1.39360864 0-2.21337842-.4098849-2.04942447-.81976979 0-1.31163166z"
              />
              <path
                className={styles.sparkle4}
                d="M99.18160965 12.79394657s1.61168639-8.41658446 3.0442965 0c0 0 8.05843194 1.43261013 0 2.86522025 0 0-1.43261011 8.59566072-3.0442965 0-4.83505916-.89538133-4.47690663-1.79076265 0-2.86522025z"
              />
            </g>
          </svg>
        </VStack>
      </HStack>
    </div>
  );
};
