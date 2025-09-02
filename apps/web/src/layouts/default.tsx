import { Flex, Link, Theme } from '@radix-ui/themes';
import { Outlet } from 'react-router';

const DefaultLayout = () => {
  return (
    <Theme accentColor="plum">
      <Outlet />
    </Theme>
  );
};

export default DefaultLayout;
