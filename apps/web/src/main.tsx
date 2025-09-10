import { StrictMode } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router';
import { createRoot } from 'react-dom/client';
import DefaultLayout from './layouts/default';
import Login from './pages/login/login';
import ProtectedRoutes from './layouts/protected-routes';
import Profile from './pages/profile/profile';
import '@radix-ui/themes/styles.css';
import Register from './pages/register/register';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Library, Upload } from './pages/library';
import AdminRoutes from './layouts/admin-routes';
import { ManageUsers } from './pages/manage-users';
import { Theme } from '@radix-ui/themes';

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Login />} />
        <Route index path="/register" element={<Register />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/upload" element={<Upload />} />
        </Route>

        <Route element={<AdminRoutes />}>
          <Route path="/users" element={<ManageUsers />} />
        </Route>
      </Route>
    </>
  )
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Theme
        appearance="dark"
        accentColor="crimson"
        panelBackground="translucent"
        // hasBackground={false}
        style={{
          background: 'rgba(0,0,0,0.6)',
        }}
      >
        <RouterProvider router={router} />
      </Theme>
    </QueryClientProvider>
  </StrictMode>
);
