import { Box, Button, HStack, Text, VStack, Image } from "@chakra-ui/react";
import { ArrowUpDownIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { OrderWithMetadata } from "types/tokenTypes";
import styles from "@styles/Listing.module.css";
import { abridgeAddress } from "@utils/abridgeAddress";
import { Spinner } from "@chakra-ui/react";
import { providers } from "ethers";
import { Seaport } from "@opensea/seaport-js";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { NavBar } from "@components/NavBar";

const Listing = () => {
  const { data: accountData, isError } = useAccount();

  const router = useRouter();
  const { listingId } = router.query;
  const [listing, setListing] = useState<OrderWithMetadata>({});
  const [isLoading, setIsLoading] = useState(false);
  const [fulfillmentLoading, setFulfillmentLoading] = useState(false);
  const { order, offers, considerations } = listing;
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    if (!listingId) {
      return;
    }
    const fetchListing = async () => {
      try {
        const response = await fetch(`/api/orders/${listingId}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        const data = await response.json();

        setListing(data);
        setIsLoading(false);
      } catch (err) {
        console.log("Error request: ", err);
      }
    };
    fetchListing();
  }, [listingId]);

  const ethersProvider = new providers.Web3Provider(
    window.ethereum as providers.ExternalProvider
  );

  const seaport = new Seaport(ethersProvider as any);

  const fulfillSeaportOrder = async () => {
    if (!accountData) throw Error("No address found");
    setErrorMessage("");
    setFulfillmentLoading(true);

    try {
      let transactionHash: string;

      const { executeAllActions } = await seaport.fulfillOrder({
        order: order,
        accountAddress: accountData.address,
      });

      const transaction = await executeAllActions();
      setFulfillmentLoading(false);
      transactionHash = transaction.hash;
      return transactionHash;
    } catch (err) {
      setErrorMessage(err.message);
      setFulfillmentLoading(false);
    }
    setFulfillmentLoading(false);
  };

  function getLink(token_id: string, address?: string) {
    if (!address) {
      return "https://rinkeby.etherscan.io/";
    } else if (address && !token_id) {
      return `https://rinkeby.etherscan.io/token/${address}`;
    } else
      return `https://testnets.opensea.io/assets/rinkeby/${address}/${token_id}`;
  }

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.listingContent}>
        <div className={styles.listingContainer}>
          {isLoading ? (
            <Box width="100%" display="flex" justifyContent="center">
              <Spinner color="white" />
            </Box>
          ) : (
            <VStack>
              <h1 className={styles.title}>
                OFFER TO EXCHANGE BY{" "}
                <a
                  href={`https://rinkeby.etherscan.io/address/${order?.parameters.offerer}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {abridgeAddress(order?.parameters.offerer)}
                </a>
              </h1>

              <VStack className={styles.itemBundleContainer}>
                <h1 className={styles.subtitle}>YOU WILL PROVIDE:</h1>
                <HStack className={styles.itemListContainer}>
                  {considerations?.map(
                    ({ address, image_url, name, symbol, token_id }, idx) => (
                      <a
                        key={`${address}-${idx}`}
                        href={getLink(token_id, address)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className={styles.itemContainer}>
                          <Image
                            alt={name}
                            className={styles.itemImageCard}
                            src={image_url}
                          />
                          <div className={styles.itemTextCard}>
                            {name === "Wrapped Ethereum"
                              ? "WETH"
                              : name
                              ? name
                              : `${symbol} #${token_id}`}
                          </div>
                        </div>
                      </a>
                    )
                  )}
                </HStack>
              </VStack>

              <Box paddingTop="1rem">
                <ArrowUpDownIcon color="white" />
              </Box>

              <VStack className={styles.itemBundleContainer}>
                <h1 className={styles.subtitle}>IN EXCHANGE FOR:</h1>
                <HStack className={styles.itemListContainer}>
                  {offers?.map(
                    ({ address, image_url, name, symbol, token_id }, idx) => (
                      <a
                        key={`${address}-${idx}`}
                        href={getLink(token_id, address)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div
                          key={`${address}-${idx}`}
                          className={styles.itemContainer}
                        >
                          <Image
                            alt={name}
                            className={styles.itemImageCard}
                            src={image_url}
                          />
                          <div className={styles.itemTextCard}>
                            {name === "Wrapped Ethereum"
                              ? "WETH"
                              : name
                              ? name
                              : `${symbol} #${token_id}`}
                          </div>
                        </div>
                      </a>
                    )
                  )}
                </HStack>
              </VStack>

              <VStack padding="1rem">
                <Button
                  className={styles.addAssetButton}
                  variant=""
                  onClick={fulfillSeaportOrder}
                >
                  {!fulfillmentLoading ? (
                    "FULFILL PURCHASE"
                  ) : (
                    <Spinner></Spinner>
                  )}
                </Button>
                {errorMessage && <Text color="red">{errorMessage}</Text>}
              </VStack>
            </VStack>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;
