import styles from "../styles/Listings.module.css";
import { useEffect, useState } from "react";
import { ListingCard } from "../components/ListingCard";
import { Box, SimpleGrid, Spinner } from "@chakra-ui/react";
import { OrderWithMetadata } from "types/tokenTypes";
import { NavBar } from "@components/NavBar";
import withTransition from "@components/withTransition";

type ListingsProps = {
  address?: string;
};

const Listings = ({ address }: ListingsProps) => {
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

        const filteredData: OrderWithMetadata[] = data.filter(
          (listing: OrderWithMetadata) => listing.hasOwnProperty("order")
        );

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
    <div className={styles.container}>
      <NavBar />
      <div className={styles.main}>
        <div className={styles.header}>ALL OPEN LISTINGS</div>
        {isLoading ? (
          <Box width="100%" display="flex" justifyContent="center">
            <Spinner color="white" />
          </Box>
        ) : (
          <div>
            <SimpleGrid columns={[1, 2]} spacing={10} pt={4}>
              {listings.map((listing, idx) => (
                <ListingCard key={idx} listing={listing} />
              ))}
            </SimpleGrid>
          </div>
        )}
      </div>
    </div>
  );
};

export default withTransition(Listings);
