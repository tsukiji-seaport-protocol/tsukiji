import styles from "../styles/Listings.module.css";
import { OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { useEffect, useState } from "react";
import { ListingCard } from "../components/ListingCard";
import { Button, SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";

type ListingsProps = {
  address?: string;
};

export const Listings = ({ address }: ListingsProps) => {
  const [relatedOrders, setRelatedOrders] = useState<OrderWithCounter[]>([]);

  const [listings, setListings] = useState([0, 0, 0, 0]);

  // hook to fetch related orders from API
  // currently unused in the frontend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/relatedOrders/${address}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        const data = await response.json();
        setRelatedOrders(data);
      } catch (err) {
        console.log("Error request: ", err);
      }
    };
    fetchOrders();
  }, [address]);

  return (
    <>
      <div className={styles.header}>RECOMMENDED LISTINGS</div>
      <Link href="/create">
        <Button>Create Listing</Button>
      </Link>
      <div>
        <SimpleGrid columns={[1, 2]} spacing={10} pt={4}>
          {listings.map((listing, idx) => (
            <ListingCard key={idx} />
          ))}
        </SimpleGrid>
      </div>
    </>
  );
};
