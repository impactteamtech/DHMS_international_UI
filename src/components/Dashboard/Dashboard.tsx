
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import {
  LogOut,
  User,
  ShoppingBag,
  TrendingUp,
  LayoutDashboard,
  ShoppingCart,
} from 'lucide-react';

const Dashboard = () => {
  const { email, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-black to-gray-900 text-white p-6 shadow-lg">
        <div className="mb-10 mt-32">
          <h1 className="text-3xl font-bold text-[#f3cb50] mb-1">DHMS Dashboard</h1>
          <p className="text-sm text-gray-300">
            Signed in as <span className="text-[#f3cb50]">{email}</span>
          </p>
        </div>

        <nav className="space-y-5">
          <Link to="overview" className="flex items-center space-x-2 hover:text-black hover:bg-white hover:px-4 hover:py-2 hover:rounded-md cursor-pointer transition duration-200 ease-in-out">
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </Link>
          <Link to="/shop#top" className="flex items-center space-x-2 hover:text-[#000] hover:bg-white hover:px-4 hover:py-2 hover:rounded-md cursor-pointer transition duration-200 ease-in-out">
            <ShoppingCart size={18} />
            <span>Shop Now</span>
          </Link>
          <Link to="orders" className="flex items-center space-x-2 hover:text-[#000] hover:bg-white hover:px-4 hover:py-2 hover:rounded-md cursor-pointer transition duration-200 ease-in-out">
            <ShoppingBag size={18} />
            <span>Order History</span>
          </Link>
          <Link to="trending" className="flex items-center space-x-2 hover:text-black hover:bg-white hover:px-4 hover:py-2 hover:rounded-md cursor-pointer transition duration-200 ease-in-out">
            <TrendingUp size={18} />
            <span>Trending Orders</span>
          </Link>
          <Link to="profile" className="flex items-center space-x-2 hover:text-black hover:bg-white hover:px-4 hover:py-2 hover:rounded-md cursor-pointer transition duration-200 ease-in-out">
            <User size={18} />
            <span>Account Info</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 hover:text-black hover:bg-white hover:px-4 hover:py-2 hover:rounded-md cursor-pointer transition duration-200 ease-in-out mt-2"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 mt-32 overflow-y-auto">
        {/* Welcome */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Welcome Back!</h2>
          <p className="text-sm text-gray-500">Here’s what’s happening with your account.</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-600">Total Orders</p>
            <h3 className="text-2xl font-bold text-[#f3cb50]">15</h3>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-600">Items in Cart</p>
            <h3 className="text-2xl font-bold text-[#f3cb50]">3</h3>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-600">Account Status</p>
            <h3 className="text-2xl font-bold text-green-500">Active</h3>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <table className="w-full text-left">
            <thead className="text-sm text-gray-500 border-b">
              <tr>
                <th className="py-2">Date</th>
                <th className="py-2">Activity</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              <tr className="border-b">
                <td className="py-2">June 6, 2025</td>
                <td className="py-2">Ordered 2 Body Oils</td>
                <td className="py-2 text-green-500">Completed</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">June 3, 2025</td>
                <td className="py-2">Added Designer Bag to Cart</td>
                <td className="py-2 text-yellow-500">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Nested Routes */}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
