import { useLocation, Outlet, Link } from "react-router-dom";

const Layout = () => {
  const loc = useLocation();
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <br />
        {
          loc.pathname.includes('/post')
            ?
            <Link to="/">back to posts</Link> : null}
        <br />
      </div>
      <Outlet />
    </>
  )
};

export default Layout;
