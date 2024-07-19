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
import EditListing from "./pages/edit-listing";
import Search from "./pages/search";
import Detail from "./pages/detail";
import Booking from "./pages/booking";
import Home from "./pages/home";
import MyBookings from "./pages/my-bookings";
function App() {
  const isLoggedIn = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/detail/:listingId"
          element={
            <Layout>
              <Detail />
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
              path="/my-bookings"
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route
              path="/listing/:listingId/booking"
              element={
                <Layout>
                  <Booking />
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
        {isLoggedIn && (
          <>
            <Route
              path="/edit-listing/:listingId"
              element={
                <Layout>
                  <EditListing />
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
