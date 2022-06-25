import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { InputItem } from "types/tokenTypes";

interface ListItemProps {
  item: InputItem;
}

const ListItem = ({ item }: ListItemProps) => {
  return (
    <Flex gap={4} alignContent="space-between" width="100%" textAlign="start">
      <HStack gap={4}>
        <Box textAlign="start">
          <VStack>
            <span>{item.name}</span>
            <span>{`Token ID: ${item.token_id}`}</span>
          </VStack>
        </Box>
        <Image
          alt="nft placeholder"
          src={item.image_url}
          width={50}
          height={50}
        />
      </HStack>
      <p>10</p>
    </Flex>
  );
};

interface SummarizedListProps {
  items: InputItem[];
}
export const SummarizedList = ({ items }: SummarizedListProps) => {
  return (
    <>
      <VStack maxHeight={"300px"} overflow="scroll" width="100%">
        {items.map((item) => (
          <ListItem key={`${item.address}-${item.token_id}`} item={item} />
        ))}
      </VStack>
    </>
  );
};
