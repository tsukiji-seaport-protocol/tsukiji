import type { NextPage } from "next";
import styles from "@styles/Home.module.css";
import { useState } from "react";
import { NavBar } from "@components/NavBar";
import { ListingCard } from "@components/ListingCard";
import { SimpleGrid } from "@chakra-ui/react";

const Home: NextPage = () => {
  const [listings, setListings] = useState([0, 0, 0, 0]);

  return (
    <div className={styles.container}>
      <NavBar></NavBar>
      <main className={styles.main}>
        <div className={styles.header}>RECOMMENDED LISTINGS</div>
        <div>
          <SimpleGrid columns={[1, 2]} spacing={10}>
            {listings.map((listing, idx) => (
              <ListingCard key={idx} />
            ))}
          </SimpleGrid>
        </div>
      </main>
    </div>
  );
};

export default Home;
