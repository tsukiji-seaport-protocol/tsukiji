import { Box, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import styles from "@styles/ListingCard.module.css";
import { Image } from "@chakra-ui/react";
import { abridgeAddress } from "@utils/abridgeAddress";
import { OfferItem, OrderWithMetadata } from "types/tokenTypes";

type ListingCardProps = {
  listing: OrderWithMetadata;
};

type ItemData = {
  count: number;
  tokenIds: number[];
  name: string;
};

type OfferData = Map<string, ItemData>;

export const ListingCard = ({ listing }: ListingCardProps) => {
  const offersMap = listing.offers.reduce((map: OfferData, item: OfferItem) => {
    if (!map.has(item.address)) {
      return map.set(item.address, {
        count: 1,
        tokenIds: [Number(item.token_id)],
        name: item.collectionName,
      });
    }

    const data = map.get(item.address);
    const { count, tokenIds, name } = data!;

    return map.set(item.address, {
      count: count + 1,
      tokenIds: [...tokenIds, Number(item.token_id)],
      name,
    });
  }, new Map<string, ItemData>());

  const considerationsMap = listing.considerations.reduce(
    (map: OfferData, item: OfferItem) => {
      if (!map.has(item.address)) {
        return map.set(item.address, {
          count: 1,
          tokenIds: [Number(item.token_id)],
          name: item.collectionName,
        });
      }

      const data = map.get(item.address);
      const { count, tokenIds, name } = data!;

      return map.set(item.address, {
        count: count + 1,
        tokenIds: [...tokenIds, Number(item.token_id)],
        name,
      });
    },
    new Map<string, ItemData>()
  );

  return (
    <>
      <VStack className={styles.container}>
        <HStack className={styles.offerHeader}>
          <div>{`OFFER BY ${
            listing
              ? abridgeAddress(listing.order.parameters.offerer)
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
            {listing.offers.map(({ image_url, address, token_id }) => (
              <Image
                key={`${address}-${token_id}`}
                alt={`Image for ${name}`}
                className={styles.offerImageCard}
                src={image_url}
              />
            ))}
          </SimpleGrid>
          <VStack className={styles.offerTextContainer}>
            {Array.from(offersMap.entries()).map(
              ([address, data]: [string, ItemData]) => (
                <HStack className={styles.offerCollectionLabel} key={address}>
                  <div
                    className={styles.offerCollectionLabelText}
                  >{`${data.count} ${data.name}`}</div>
                </HStack>
              )
            )}
          </VStack>
        </HStack>
        <Box className={styles.considerationHeader}>
          <div>IN EXCHANGE FOR</div>
        </Box>
        <HStack className={styles.considerationContainer}>
          {Array.from(considerationsMap.entries()).map(
            ([address, data]: [string, ItemData]) => (
              <div className={styles.considerationItem} key={address}>
                <div
                  className={styles.considerationItemText}
                >{`${data.count} ${data.name}`}</div>
              </div>
            )
          )}
        </HStack>
      </VStack>
    </>
  );
};
