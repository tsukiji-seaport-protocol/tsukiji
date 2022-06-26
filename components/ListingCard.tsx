import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import styles from "../styles/ListingCard.module.css";
import { Image } from "@chakra-ui/react";
import { OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { abridgeAddress } from "@utils/abridgeAddress";

type ListingCardProps = {
  listing?: OrderWithCounter;
};

export const ListingCard = ({ listing }: ListingCardProps) => {
  console.log("listing: ", listing);
  return (
    <>
      <VStack className={styles.container}>
        <HStack className={styles.offerHeader}>
          <div>{`OFFER BY ${
            listing
              ? abridgeAddress(listing.parameters.offerer)
              : abridgeAddress("0x301479333CE9CA3e642443E14CC986ABcC548e2e")
          }:`}</div>
          <button className={styles.offerHeaderButton}>VIEW LISTING</button>
        </HStack>
        <HStack className={styles.offerContainer}>
          <HStack className={styles.offerImageContainer}>
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
          </HStack>
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
        <HStack className={styles.considerationHeader}>
          <div>IN EXCHANGE FOR</div>
        </HStack>
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
