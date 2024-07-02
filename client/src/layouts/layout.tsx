import Header from "../components/header/header";
import Hero from "../components/hero/hero";
import Footer from "../components/footer/footer";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <main className="container mx-auto py-10 flex-1">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
