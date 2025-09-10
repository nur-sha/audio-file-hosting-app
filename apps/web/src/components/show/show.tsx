import { ReactNode } from 'react';

export type ShowProps = {
  when: boolean;
  children: ReactNode;
  fallback?: ReactNode;
};

const Show = ({ children, when, fallback }: ShowProps) => {
  return when ? children : fallback;
};

export default Show;
