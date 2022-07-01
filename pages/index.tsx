import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useAccount } from "wagmi";
import { NavBar } from "@components/NavBar";
import { Listings } from "@components/Listings";
import Footer from "@components/Footer";
import { Animation } from "@components/Animation";

const Home: NextPage = () => {
  const { data: accountData } = useAccount();

  return (
    <div className={styles.container}>
      <NavBar />
      <Animation />
      <main className={styles.main}>
        <Listings address={accountData?.address} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
