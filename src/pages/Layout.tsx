import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <div style={{ margin: 'auto' }}
            ><Link to="/">Home</Link>
            </div>
          </li>

        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
