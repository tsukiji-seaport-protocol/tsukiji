import { HStack, VStack, Text, Spacer } from "@chakra-ui/react";
import styles from "@styles/FooterSection.module.css";

export const FooterSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.centerEllipse} />
      <HStack className={styles.content}>
        <VStack>
          <h1 className={styles.header}>FOMO</h1>
          <Text className={styles.subheader}>Hit us up</Text>
          <Text className={styles.subheader}>Dope Vibez Only</Text>
        </VStack>
        <HStack>
          <VStack>
            <h1 className={styles.header}>Docs</h1>
            <Text className={styles.subheader}>Github</Text>
            <Text className={styles.subheader}>Opensea Seaport</Text>
            <Text className={styles.subheader}>ETHGlobal</Text>
          </VStack>
          <Spacer style={{ width: "30px" }} />
          <VStack>
            <h1 className={styles.header}>Contact</h1>
            <Text className={styles.subheader}>@jeongminc</Text>
            <Text className={styles.subheader}>@andrewkjmin</Text>
            <Text className={styles.subheader}>@straightupjac</Text>
          </VStack>
        </HStack>
      </HStack>
    </div>
  );
};
