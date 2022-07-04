import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useAccount } from "wagmi";
import { NavBar } from "@components/NavBar";
import { TitleSection } from "@components/TitleSection";
import { SubtitleSection } from "@components/SubtitleSection";
import { ListingsSection } from "@components/ListingsSection";
import { FooterSection } from "@components/FooterSection";

const Home: NextPage = () => {
  const { data: accountData } = useAccount();

  return (
    <div className={styles.container}>
      <NavBar />
      <main className={styles.main}>
        <TitleSection></TitleSection>
        <SubtitleSection></SubtitleSection>
        <ListingsSection address={accountData?.address} />
        <FooterSection />
      </main>
    </div>
  );
};

export default Home;
