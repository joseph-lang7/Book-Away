import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/layout";
import Register from "./pages/register";
import SignIn from "./pages/sign-in";
import AddListing from "./pages/add-listing";
import { useAppContext } from "./contexts/app-context";
import MyListings from "./pages/my-listings";

function App() {
  const isLoggedIn = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        {isLoggedIn && (
          <>
            <Route
              path="/add-listing"
              element={
                <Layout>
                  <AddListing />
                </Layout>
              }
            />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route
              path="/my-listings"
              element={
                <Layout>
                  <MyListings />
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
