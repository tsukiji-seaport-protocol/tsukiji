import { Button, HStack, VStack, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styles from "@styles/Explorer.module.css";
import { OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { abridgeAddress } from "@utils/abridgeAddress";

const OrderExplorer = () => {
  const [orders, setOrders] = useState<OrderWithCounter[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        const data = await response.json();

        setOrders(data);
      } catch (err) {
        console.log("Error request: ", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className={styles.tokenSelectionContainer}>
      <h1 className={styles.title}>TSUKIJI ORDER EXPLORER</h1>

      <VStack className={styles.itemListContainer}>
        <HStack className={styles.itemListHeader}>
          <div className={styles.listItemTitle}>Offerer</div>
          <div className={styles.listItemTitle}>Start Time</div>
          <div className={styles.listItemTitle}># of Offers</div>
          <div className={styles.listItemTitle}># of Considerations</div>
          <div className={styles.listItemTitle}>Estimated Value</div>
          <div className={styles.listItemTitle}>Payload Signature</div>
        </HStack>
        {orders.map((order, idx) => (
          <ListItem
            key={idx}
            item={order}
            isLight={idx % 2 === 0 ? false : true}
          />
        ))}
      </VStack>

      <Button className={styles.addAssetButton} variant="" onClick={() => {}}>
        DOWNLOAD CSV
      </Button>
    </div>
  );
};

type ListItemProps = {
  item: OrderWithCounter;
  isLight: boolean;
};

const ListItem = ({ item, isLight }: ListItemProps) => {
  return (
    <HStack
      className={`${styles.listItemContainer} ${isLight && styles.light}`}
    >
      {/* <VStack className={styles.listItemLabel}> */}
      <div className={styles.listItemTitle}>
        {abridgeAddress(item.parameters.offerer)}
      </div>
      <div className={styles.listItemTitle}>
        {item.parameters.startTime.toString()}
      </div>
      <div className={styles.listItemTitle}>{item.parameters.offer.length}</div>
      <div className={styles.listItemTitle}>
        {item.parameters.consideration.length}
      </div>
      <div className={styles.listItemTitle}>
        {`$${(Math.random() * 3000 + 9000).toFixed(2)}`}
      </div>
      <div className={styles.listItemTitle}>
        {abridgeAddress(item.signature)}
      </div>
    </HStack>
  );
};

export default OrderExplorer;
