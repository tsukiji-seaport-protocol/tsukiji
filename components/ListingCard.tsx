import { Box, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import styles from "@styles/ListingCard.module.css";
import { Image } from "@chakra-ui/react";
import { OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { abridgeAddress } from "@utils/abridgeAddress";
import { useMemo } from "react";

type ListingCardProps = {
  listing?: OrderWithCounter;
  isAlice?: boolean;
};

const images = [
  "/assets/bobu1.png",
  "/assets/2.png",
  "/assets/bobu2.jpg",
  "/assets/1.png",
  "/assets/bobu3.jpg",
  "/assets/3.png",
  "/assets/4.png",
  "/assets/5.png",
  "/assets/dodo.png",
  "/assets/dood.png",
  "/assets/dd.png",
  "/assets/6.png",
  "/assets/ii.jpg",
  "/assets/moon.png",
  "/assets/7.png",
  "/assets/clon.png",
  "/assets/8.png",
  "/assets/11.png",
];

const exchanges = [
  { text: "20 ETH", img: "/assets/ethereum-eth.svg" },
  { text: "1 BAYC", img: "/assets/bayc.png" },
  { text: "1 BAYC", img: "/assets/bayc.png" },
  { text: "1 BAYC", img: "/assets/bayc.png" },
  { text: "12 ETH", img: "/assets/ethereum-eth.svg" },
  { text: "2 MAYC", img: "/assets/mayc.jpg" },
  { text: "2 MAYC", img: "/assets/mayc.jpg" },
  { text: "1 CLON", img: "/assets/clonx.png" },
  { text: "2 BAYC", img: "/assets/bayc.png" },
];

export const ListingCard = ({ listing, isAlice }: ListingCardProps) => {
  if (isAlice) return <AliceOrder listing={listing} />;

  const exc = useMemo(
    () =>
      [
        exchanges[Math.floor(Math.random() * exchanges.length)],
        exchanges[Math.floor(Math.random() * exchanges.length)],
        exchanges[Math.floor(Math.random() * exchanges.length)],
      ].slice(0, 3),
    []
  );

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
          <SimpleGrid
            columns={[1, 2, 3]}
            gap={2}
            className={styles.offerImageContainer}
          >
            <Image
              alt="shaddap"
              className={styles.offerImageCard}
              src={images[Math.floor(Math.random() * images.length)]}
            />
            <Image
              alt="shaddap"
              className={styles.offerImageCard}
              src={images[Math.floor(Math.random() * images.length)]}
            />
            <Image
              alt="shaddap"
              className={styles.offerImageCard}
              src={images[Math.floor(Math.random() * images.length)]}
            />
          </SimpleGrid>
          <VStack className={styles.offerTextContainer}>
            <VStack className={styles.offerCollectionLabel2}>
              {exc.map((e) => (
                // <div key={e.text} className={styles.considerationItem}>
                //   <Image
                //     alt="shaddap"
                //     className={styles.considerationItemImg}
                //     src={e.img}
                //   />
                //   <div className={styles.considerationItemText}>{e.text}</div>
                // </div>
                <HStack key={e.text} className={styles.offerCollectionLabel}>
                  <Image
                    alt="shaddap"
                    className={styles.offerCollectionLabelImg}
                    src={e.img}
                  />
                  <div className={styles.offerCollectionLabelText}>
                    {e.text}
                  </div>
                </HStack>
              ))}
            </VStack>
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
              src={"/assets/azuki.png"}
            />
            <div className={styles.considerationItemText}>3 AZUKI</div>
          </div>
        </HStack>
        {/* <div className={styles.considerationItem}>
            <Image
              alt="shaddap"
              className={styles.considerationItemImg}
              src={"/assets/ethereum-eth.svg"}
            />
            <div className={styles.considerationItemText}>1 BAYC</div>
          </div> */}
      </VStack>
    </>
  );
};

const AliceOrder = ({ listing }: ListingCardProps) => {
  return (
    <>
      <VStack className={styles.container}>
        <HStack className={styles.offerHeader}>
          <div>{`OFFER BY ${
            listing
              ? abridgeAddress(listing.parameters.offerer)
              : abridgeAddress("0x301479333CE9CA3e642443E14CC986ABcC548e2e")
          }:`}</div>
          <a href="/CE9CA3e642443E1">
            <button className={styles.offerHeaderButton}>VIEW LISTING</button>
          </a>
        </HStack>
        <HStack className={styles.offerContainer}>
          <SimpleGrid
            columns={[1, 1, 8]}
            gap={2}
            className={styles.offerImageContainerAlice}
          >
            <Image
              alt="shaddap"
              className={styles.offerImageCardAlice}
              src={"/assets/1st.png"}
            />
            <Image
              alt="shaddap"
              className={styles.offerImageCardAlice}
              src={"/assets/2nd.png"}
            />
            <Image
              alt="shaddap"
              className={styles.offerImageCardAlice}
              src={"/assets/3rd.png"}
            />
            <Image
              alt="shaddap"
              className={styles.offerImageCardAlice}
              src={"/assets/4th.png"}
            />
            <Image
              alt="shaddap"
              className={styles.offerImageCardAlice}
              src={"/assets/5th.png"}
            />
            <Image
              alt="shaddap"
              className={styles.offerImageCardAlice}
              src={"/assets/6th.png"}
            />
            <Image
              alt="shaddap"
              className={styles.offerImageCardAlice}
              src={"/assets/7th.png"}
            />
          </SimpleGrid>
          <VStack className={styles.offerTextContainerAlice}>
            <HStack className={styles.offerCollectionLabel}>
              <Image
                alt="shaddap"
                className={styles.offerCollectionLabelImg}
                src={"/assets/mayc.jpg"}
              />
              <div className={styles.offerCollectionLabelText}>5 MAYC</div>
            </HStack>
            <HStack className={styles.offerCollectionLabel}>
              <Image
                alt="shaddap"
                className={styles.offerCollectionLabelImg}
                src={"/assets/bayc.png"}
              />
              <div className={styles.offerCollectionLabelText}>2 BAYC</div>
            </HStack>
            <HStack className={styles.offerCollectionLabel}>
              <Image
                alt="shaddap"
                className={styles.offerCollectionLabelImg}
                src={"/assets/ethereum-eth.svg"}
              />
              <div className={styles.offerCollectionLabelText}>20 ETH</div>
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
              src={"/assets/alien.png"}
            />
            <div className={styles.considerationItemText}>1 PUNK</div>
          </div>
        </HStack>
      </VStack>
    </>
  );
};
