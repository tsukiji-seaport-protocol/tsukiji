import styles from "../styles/Listings.module.css";
import { OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { useEffect, useState } from "react";
import { ListingCard } from "../components/ListingCard";
import { Button, SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";
import { OrderWithMetadata } from "types/tokenTypes";

type ListingsProps = {
  address?: string;
};

const dummyListing = {
  signature:
    "0x697185edf8caf03ee31c636a3f64c92ef5c1eb2cd280d791abd3e013d14d046221f0ac47fde1138105913046cc3b6ce14041736ce9b00e81030d4eb31b325dc3",
  parameters: {
    consideration: [
      {
        itemType: 2,
        recipient: "0x17e547d79C04D01E49fEa275Cf32ba06554f9dF7",
        token: "0x7470Ea065E50e3862cd9b8fB7C77712165da80e5",
        startAmount: "1",
        identifierOrCriteria: "5",
        endAmount: "1",
      },
    ],
    conduitKey:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    offer: [
      {
        itemType: 2,
        token: "0x7470Ea065E50e3862cd9b8fB7C77712165da80e5",
        identifierOrCriteria: "6",
        startAmount: "1",
        endAmount: "1",
      },
    ],
    startTime: "1656213109",
    totalOriginalConsiderationItems: 1,
    offerer: "0x17e547d79C04D01E49fEa275Cf32ba06554f9dF7",
    orderType: 0,
    endTime:
      "115792089237316195423570985008687907853269984665640564039457584007913129639935",
    zone: "0x0000000000000000000000000000000000000000",
    counter: 0,
    salt: "0xa4969fa90bcbe4027232fc358e49866c",
    zoneHash:
      "0x3000000000000000000000000000000000000000000000000000000000000000",
  },
};

const dummyListings: OrderWithCounter[] = [dummyListing];

export const Listings = ({ address }: ListingsProps) => {
  const [relatedOrders, setRelatedOrders] = useState<OrderWithCounter[]>([]);

  const [listings, setListings] = useState<OrderWithMetadata[]>([]);

  // hook to fetch related orders from API
  // currently unused in the frontend
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await fetch(`/api/relatedOrders/${address}`, {
  //         method: "GET",
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //       });
  //       const data = await response.json();
  //       setRelatedOrders(data);
  //     } catch (err) {
  //       console.log("Error request: ", err);
  //     }
  //   };
  //   fetchOrders();
  // }, [address]);

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
      <Link href="/create">
        <Button>Create Listing</Button>
      </Link>
      <div>
        <SimpleGrid columns={[1, 2]} spacing={10} pt={4}>
          {/* {dummyListings.map((listing, idx) => (
            <ListingCard key={idx} listing={listing} />
          ))} */}
          {listings.map((listing, idx) => (
            <ListingCard key={idx} listing={listing} />
          ))}
        </SimpleGrid>
      </div>
    </>
  );
};
