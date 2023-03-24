import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="max-w-7xl">
      <Header />
      {children}
    </div>
  );
};
export default Layout;
