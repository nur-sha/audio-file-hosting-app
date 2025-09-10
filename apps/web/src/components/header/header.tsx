import { Box, Button, Flex, Link, Text } from '@radix-ui/themes';
import { MENU } from './menu';
import useUser from '../../hooks/useUser';
import { Show } from '../show';

const Header = () => {
  const { user, isLoggedIn } = useUser();
  const { role } = user?.user || {};
  const userMenu = MENU[role as 'USER' | 'ADMIN'] || MENU.USER;

  return (
    <Flex
      p="4"
      align="center"
      justify="between"
      style={{ background: 'rgb(0 0 0 / 28%)' }}
    >
      <Flex gap="2">
        {userMenu.map((item) => {
          return (
            <Button variant="outline" highContrast>
              <Link href={item.to}> {item.label}</Link>
            </Button>
          );
        })}
      </Flex>

      <Box>
        <Show when={isLoggedIn}>
          <Text weight="bold" size="3">
            {user?.user.displayName}
          </Text>
        </Show>
      </Box>
    </Flex>
  );
};
export default Header;
