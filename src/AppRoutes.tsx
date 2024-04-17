import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { LandingPage } from './LandingPage';
import { AuthenticatedApp } from './AuthenticatedApp';
import { ManageStore } from './stores/ManageStore';
import { StoreList } from './stores/StoreList';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="stores" element={<AuthenticatedApp />}>
          <Route path="manage" element={<ManageStore />} />
          <Route path="manage/:id" element={<ManageStore />} />
          <Route path="" element={<StoreList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}