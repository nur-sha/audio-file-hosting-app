import { Flex, Skeleton } from '@radix-ui/themes';

const Skeletons = () => {
  return (
    <Flex direction="column" gap="2">
      {Array.from({ length: 4 }, (_, index) => {
        return <Skeleton key={index} width="98%" height="25px" />;
      })}
    </Flex>
  );
};

export default Skeletons;
