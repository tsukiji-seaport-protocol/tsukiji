import styles from "../styles/Listings.module.css";
import { OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { useEffect, useState } from "react";
import { ListingCard } from "../components/ListingCard";
import { Button, SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";
import { OrderWithMetadata } from "types/tokenTypes";
import { parseEther } from "ethers/lib/utils";

type ListingsProps = {
  address?: string;
};

export const Listings = ({ address }: ListingsProps) => {
  const [listings, setListings] = useState<OrderWithMetadata[]>([]);

  useEffect(() => {
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
      } catch (err) {
        console.log("Error request: ", err);
      }
    };
    fetchOrders();
  }, [address]);

  return (
    <>
      <div className={styles.header}>RECOMMENDED LISTINGS</div>
      {/* <Link href="/create">
        <Button>Create Listing</Button>
      </Link> */}
      <div>
        <SimpleGrid columns={[1, 2]} spacing={10} pt={4}>
          {listings.map((listing, idx) => (
            <ListingCard key={idx} listing={listing} />
          ))}
        </SimpleGrid>
      </div>
    </>
  );
};
