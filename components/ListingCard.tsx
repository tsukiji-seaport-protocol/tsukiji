import { Box, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import styles from "@styles/ListingCard.module.css";
import { Image } from "@chakra-ui/react";

export const ListingCard = () => {
  return (
    <>
      <VStack className={styles.container}>
        <HStack className={styles.offerHeader}>
          <div>OFFER BY 0x17...df:</div>
          <button className={styles.offerHeaderButton}>VIEW LISTING</button>
        </HStack>
        <HStack className={styles.offerContainer}>
          <SimpleGrid columns={[1, 2, 3]} gap={2} className={styles.offerImageContainer}>
            <Image
              alt="shaddap"
              className={styles.offerImageCard}
              src={"/assets/bobu1.png"}
            />
            <Image
              alt="shaddap"
              className={styles.offerImageCard}
              src={"/assets/bobu2.jpg"}
            />
            <Image
              alt="shaddap"
              className={styles.offerImageCard}
              src={"/assets/bobu3.jpg"}
            />
          </SimpleGrid>
          <VStack className={styles.offerTextContainer}>
            <HStack className={styles.offerCollectionLabel}>
              <Image
                alt="shaddap"
                className={styles.offerCollectionLabelImg}
                src={"/assets/azuki.png"}
              />
              <div className={styles.offerCollectionLabelText}>3 AZUKI</div>
            </HStack>
          </VStack>
        </HStack>
        <Box className={styles.considerationHeader}>
          <div>IN EXCHANGE FOR</div>
        </Box>
        <HStack className={styles.considerationContainer}>
          <div className={styles.considerationItem}>
            <Image
              alt="shaddap"
              className={styles.considerationItemImg}
              src={"/assets/ethereum-eth.svg"}
            />
            <div className={styles.considerationItemText}>20 ETH</div>
          </div>
          <div className={styles.considerationItem}>
            <Image
              alt="shaddap"
              className={styles.considerationItemImg}
              src={"/assets/ethereum-eth.svg"}
            />
            <div className={styles.considerationItemText}>1 BAYC</div>
          </div>
        </HStack>
      </VStack>
    </>
  );
};
