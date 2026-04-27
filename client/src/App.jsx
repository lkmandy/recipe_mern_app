// Root component. Defines the client-side route tree and renders the persistent Navbar and Footer around all pages.
import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Navbar          from './components/layout/Navbar';
import Footer          from './components/layout/Footer';
import ProtectedRoute  from './components/layout/ProtectedRoute';

import HomePage         from './pages/HomePage';
import RecipesPage      from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import CreateRecipePage from './pages/CreateRecipePage';
import EditRecipePage   from './pages/EditRecipePage';
import FavoritesPage    from './pages/FavoritesPage';
import ProfilePage      from './pages/ProfilePage';
import LoginPage        from './pages/LoginPage';
import GroceryPage from './pages/GroceryPage';
import RegisterPage     from './pages/RegisterPage';
import NotFoundPage     from './pages/NotFoundPage';

export default function App() {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Navbar />

      <Box flex={1}>
        <Routes>
          {/* Public routes — accessible without logging in */}
          <Route path="/"            element={<HomePage />} />
          <Route path="/recipes"     element={<RecipesPage />} />
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />
          <Route path="/users/:id"   element={<ProfilePage />} />
          <Route path="/login"       element={<LoginPage />} />
          <Route path="/register"    element={<RegisterPage />} />

          {/* Protected routes — ProtectedRoute redirects to /login if the user is not authenticated */}
          <Route element={<ProtectedRoute />}>
            <Route path="/recipes/new"      element={<CreateRecipePage />} />
            <Route path="/recipes/:id/edit" element={<EditRecipePage />} />
            <Route path="/favorites"        element={<FavoritesPage />} />
            <Route path="/profile"          element={<ProfilePage />} />
            <Route path='/grocery'          element={<GroceryPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>

      <Footer />
    </Box>
  );
}
