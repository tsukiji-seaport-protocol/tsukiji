import { HStack, VStack, Text, Spacer } from "@chakra-ui/react";
import styles from "@styles/FooterSection.module.css";

export const FooterSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.centerEllipse} />
      <HStack className={styles.content}>
        <VStack className={styles.footerSubsection}>
          <h1 className={styles.header}>Made With ❤️ for Web3</h1>
          <Text className={styles.subheader}>No Rights Reserved.</Text>
          <Text className={styles.subheader} paddingTop="2rem">
            Tsukiji 2022
          </Text>
        </VStack>
        <HStack>
          <VStack className={styles.footerSubsection}>
            <h1 className={styles.header}>Docs</h1>
            <a
              href="https://github.com/tsukiji-seaport-protocol/tsukiji"
              target="
              _blank"
            >
              <Text className={styles.subheaderLink}>Github</Text>
            </a>
            <a
              href="https://docs.opensea.io/v2.0/reference/seaport-overview"
              target="
              _blank"
            >
              <Text className={styles.subheaderLink}>Seaport</Text>
            </a>
            <a
              href="https://ethglobal.com/"
              target="
              _blank"
            >
              <Text className={styles.subheaderLink}>ETHGlobal</Text>
            </a>
          </VStack>
          <Spacer style={{ width: "30px" }} />
          <VStack className={styles.footerSubsection}>
            <h1 className={styles.header}>Contact</h1>
            <a
              href="https://twitter.com/jeongminc_"
              target="
              _blank"
            >
              <Text className={styles.subheaderLink}>@jeongminc_</Text>
            </a>
            <a
              href="https://twitter.com/andrewkjmin"
              target="
              _blank"
            >
              <Text className={styles.subheaderLink}>@andrewkjmin</Text>
            </a>
            <a
              href="https://twitter.com/straightupjac"
              target="
              _blank"
            >
              <Text className={styles.subheaderLink}>@straightupjac</Text>
            </a>
          </VStack>
        </HStack>
      </HStack>
    </div>
  );
};
