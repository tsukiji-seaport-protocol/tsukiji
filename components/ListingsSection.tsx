import styles from "../styles/ListingsSection.module.css";
import { useEffect, useState } from "react";
import { ListingCard } from "./ListingCard";
import { Box, Button, SimpleGrid, Spinner, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { OrderWithMetadata } from "types/tokenTypes";

type ListingsSectionProps = {
  address?: string;
};

export const ListingsSection = ({ address }: ListingsSectionProps) => {
  const [listings, setListings] = useState<OrderWithMetadata[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders", {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        const data = await response.json();

        const filteredData: OrderWithMetadata[] = data.filter((listing) =>
          listing.hasOwnProperty("order")
        );

        console.log("data: ", filteredData);
        setListings(filteredData);
        setIsLoading(false);
      } catch (err) {
        console.log("Error request: ", err);
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [address]);

  return (
    <VStack className={styles.container}>
      <div className={styles.header}>Recent Listings</div>
      {isLoading ? (
        <Box width="100%" display="flex" justifyContent="center">
          <Spinner color="white" />
        </Box>
      ) : (
        <div>
          <SimpleGrid columns={[1, 2]} spacing={10} pt={4}>
            {listings.slice(0, 2).map((listing, idx) => (
              <ListingCard key={idx} listing={listing} />
            ))}
          </SimpleGrid>
        </div>
      )}
      <Box padding="1rem">
        <Link href={`/listings`}>
          <button className={styles.viewListingButton}>
            GO TO ALL LISTINGS
          </button>
        </Link>
      </Box>
    </VStack>
  );
};
