import { Routes, Route } from 'react-router-dom';
import Navbar          from './components/layout/Navbar';
import ProtectedRoute  from './components/layout/ProtectedRoute';

import HomePage         from './pages/HomePage';
import RecipesPage      from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import CreateRecipePage from './pages/CreateRecipePage';
import EditRecipePage   from './pages/EditRecipePage';
import FavoritesPage    from './pages/FavoritesPage';
import ProfilePage      from './pages/ProfilePage';
import LoginPage        from './pages/LoginPage';
import RegisterPage     from './pages/RegisterPage';
import NotFoundPage     from './pages/NotFoundPage';

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/"            element={<HomePage />} />
        <Route path="/recipes"     element={<RecipesPage />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        <Route path="/users/:id"   element={<ProfilePage />} />
        <Route path="/login"       element={<LoginPage />} />
        <Route path="/register"    element={<RegisterPage />} />

        {/* Protected routes — redirect to /login if not authenticated */}
        <Route element={<ProtectedRoute />}>
          <Route path="/recipes/new"      element={<CreateRecipePage />} />
          <Route path="/recipes/:id/edit" element={<EditRecipePage />} />
          <Route path="/favorites"        element={<FavoritesPage />} />
          <Route path="/profile"          element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
