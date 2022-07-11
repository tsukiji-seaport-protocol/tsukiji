import styles from "@styles/About.module.css";
import { Text, VStack } from "@chakra-ui/react";
import { NavBar } from "@components/NavBar";
import withTransition from "@components/withTransition";

const About = () => {
  return (
    <VStack className={styles.container}>
      <NavBar />
      <div className={styles.leftEllipse} />
      <div className={styles.rightEllipse} />
      <VStack className={styles.content}>
        <VStack className={styles.contentSection}>
          <h1 className={styles.header}>
            Why the name <span className={styles.italic}>Tsukiji</span>
          </h1>
          <Text className={styles.subheader}>
            Inspired by the concept of a &quot;seaport&quot;, we asked ourselves
            what an experience exchanging goods would look like at a real-life
            seaside port. The vision that excited us most was that of a bustling
            local fish market, where we imagined locals bartering for goods and
            shouting bids on freshly caught fish. We wanted to build a platform
            that reflected the energy of such a place, but with exchanging NFTs.
            So as an homage to what was once the world&apos;s largest fish
            market - the Tsukiji Fish Market in Tokyo, Japan - we named our
            project <span className={styles.italic}>Tsukiji</span>.
          </Text>
        </VStack>
        <VStack className={styles.contentSection}>
          <h1 className={styles.header}>How it works</h1>
          <Text className={styles.subheader}>
            Based on the Seaport Protocol, we enable users to create orders that
            comprise of offers and considerations, where offers are what the
            user is willing to trade in exchange for considerations, which are
            what the user wants in return. All users are able to view open
            orders and fulfill them if they can provide the other side of the
            trade. These offers or considerations can be a combination of
            various token types - ERC20, ERC721, ERC1155. <br></br>
            <br></br>
            <Text className={styles.subheader}>
              *Tsukiji currently only supports the basic order type and
              fulfillment feature from the Seaport Protocol, which excludes
              partial order fills, ERC1155 tokens, and third-party order
              matching.
            </Text>
          </Text>
        </VStack>
        <VStack className={styles.contentSection}>
          <h1 className={styles.header}>Applications</h1>
          <Text className={styles.subheader}>
            Some interesting applications of an order aggregator like Tsukiji
            could be in web3 gaming. Gaming is an industry where the trading of
            in-game assets has always been a core feature of. For web3 games
            where in-game assets are representable as NFTs, one could imagine
            the utility of having an aggregated order book of listings that
            indicate the supply and demand of assets that users can fulfill for
            themselves or match on behalf of others. If the game creates its own
            matching algorithm and instantiates a fee for each exchange, this
            could quickly become a revenue-generating feature for the game that
            also allows for interoperability across games within the same
            network. Tsukiji as an order aggregator and Seaport as a trading
            settlement layer could be a powerful combination to incorporate into
            such games.
          </Text>
        </VStack>
        <VStack className={styles.contentSection}>
          <h1 className={styles.header}>Origin Story</h1>
          <Text className={styles.subheader}>
            This application was built as an entry to the ETH NY 2022 Hackathon.
            Although we only had three days to hack on the project from scratch,
            it was a tremendous learning experience that we highly recommend for
            other builders in the web3 space. We were lucky enough to have this
            project chosen as finalists for the hackathon and would love to see
            this project continue moving forward with the help of the community.
            If you are interested in contributing to this project or helping
            shape its direction, please reach out to us:)
          </Text>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default withTransition(About);
