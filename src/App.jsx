import { Route, Routes } from "react-router-dom";
import Aside from "./components/Aside";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Article from "./screens/Article";
import Timeline from "./screens/Timeline";
import Categories from "./screens/Categories";
import Login from "./screens/Login";
import BecomeMember from "./screens/BecomeMember";
import ContactUs from "./screens/ContactUs";
import Articles from "./screens/Articles";
import ArticleDetails from "./screens/ArticleDetails";
import TimelineDetails from "./screens/TimelineDetails";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  return (
    <div className="wrapper flex flex-col w-full min-h-screen">
      <Header />
      <main className="main-section common flex flex-col sm:flex-row justify-between flex-grow">
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />

          {/* Application Routes */}
          <Route path="/" element={<Articles />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/member" element={<BecomeMember />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/timeline" element={<Timeline />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/article/new" element={<ArticleDetails />} />
            <Route path="/article/edit/:id" element={<ArticleDetails />} />
            <Route path="/timeline/new" element={<TimelineDetails />} />
            <Route path="/timeline/edit/:id" element={<TimelineDetails />} />
          </Route>


        </Routes>
        <Aside />
      </main>

      <Footer />
    </div>
  );
}

export default App;
