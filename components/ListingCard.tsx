import {
  Box,
  Container,
  HStack,
  Link,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import styles from "@styles/ListingCard.module.css";
import { Image } from "@chakra-ui/react";
import { abridgeAddress } from "@utils/abridgeAddress";
import { OfferItem, OrderWithMetadata } from "types/tokenTypes";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { formatEther } from "ethers/lib/utils";

type ListingCardProps = {
  listing: OrderWithMetadata;
};

type ItemData = {
  count: number;
  tokenIds: number[];
  symbol: string;
};

type OfferData = Map<string, ItemData>;

export const ListingCard = ({ listing }: ListingCardProps) => {
  const offersMap = listing.offers.reduce((map: OfferData, item: OfferItem) => {
    if (!map.has(item.address)) {
      if (item.type !== ItemType.ERC721) {
        return map.set(item.address ?? "ethereum", {
          count: Number(formatEther(item.inputItem.amount)),
          tokenIds: [Number(item.token_id)],
          symbol: item.symbol,
        });
      } else {
        return map.set(item.address, {
          count: 1,
          tokenIds: [Number(item.token_id)],
          symbol: item.symbol,
        });
      }
    }

    const data = map.get(item.address);
    const { count, tokenIds, symbol } = data!;

    return map.set(item.address, {
      count: count + 1,
      tokenIds: [...tokenIds, Number(item.token_id)],
      symbol,
    });
  }, new Map<string, ItemData>());

  const considerationsMap = listing.considerations.reduce(
    (map: OfferData, item: OfferItem) => {
      if (!map.has(item.address)) {
        if (item.type !== ItemType.ERC721) {
          return map.set(item.address ?? "ethereum", {
            count: Number(formatEther(item.inputItem.amount)),
            tokenIds: [Number(item.token_id)],
            symbol: item.symbol,
          });
        } else {
          return map.set(item.address, {
            count: 1,
            tokenIds: [Number(item.token_id)],
            symbol: item.symbol,
          });
        }
      }

      const data = map.get(item.address);
      const { count, tokenIds, symbol } = data!;

      return map.set(item.address, {
        count: count + 1,
        tokenIds: [...tokenIds, Number(item.token_id)],
        symbol,
      });
    },
    new Map<string, ItemData>()
  );

  return (
    <>
      <VStack className={styles.container}>
        <HStack className={styles.offerHeader}>
          <div>
            OFFER BY{" "}
            <a
              href={`https://rinkeby.etherscan.io/address/${listing.order.parameters.offerer}`}
              target="_blank"
              rel="noreferrer"
            >
              {abridgeAddress(listing.order.parameters.offerer)}
            </a>
          </div>
          <Link href={`/listings/${listing.id}`}>
            <button className={styles.offerHeaderButton}>VIEW LISTING</button>
          </Link>
        </HStack>
        <HStack className={styles.offerContainer}>
          <HStack gap={2} className={styles.offerImageContainer}>
            {listing.offers.map(({ name, image_url, address, token_id }) => (
              <Image
                key={`${address}-${token_id}`}
                alt={`Image for ${name}`}
                className={styles.offerImageCard}
                src={image_url}
              />
            ))}
          </HStack>
          <VStack className={styles.offerTextContainer}>
            {Array.from(offersMap.entries()).map(
              ([address, data]: [string, ItemData]) => (
                <HStack
                  className={styles.offerCollectionLabel}
                  key={address ?? "ethereum"}
                >
                  <div
                    className={styles.offerCollectionLabelText}
                  >{`${data.count} ${data.symbol}`}</div>
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
              <div
                className={styles.considerationItem}
                key={address ?? "ethereum"}
              >
                <div
                  className={styles.considerationItemText}
                >{`${data.count} ${data.symbol}`}</div>
              </div>
            )
          )}
        </HStack>
      </VStack>
    </>
  );
};
