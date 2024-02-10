
import Nav from '../Nav';
import Footer from '../Footer';
const Layout = ({ children }) => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      <Nav />
      <main>{ children }</main>
      <Footer />
    </div>
  )
}

export default Layout;