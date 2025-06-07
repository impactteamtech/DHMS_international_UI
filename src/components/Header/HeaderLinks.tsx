import { Link } from 'react-router-dom';
import OffsetLink from '@/components/Handler/OffsetLink';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { useAuth } from '../Context/AuthContext';

export default function NavigationMenuBeauty() {
  const { isAuthenticated } = useAuth(); // You can use this to conditionally show/hide links

  return (
    <NavigationMenu>
      <NavigationMenuList className="text-white text-md">

        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <OffsetLink
              to="/home#top"
              className="hover:bg-[#f3cb50] rounded-full px-3 py-1 transition"
            >
              Home
            </OffsetLink>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Categories Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="rounded-full bg-black text-md">
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-black text-white">
            <ul className="grid gap-2 p-2 w-48">
              {[
                { to: '/categories/handbags', label: 'Handbags' },
                { to: '/categories/kente shirts', label: 'Shirts' },
                { to: '/categories/kaftan', label: 'Dresses' },
                { to: '/categories/body oil', label: 'Body Oil' },
              ].map((item) => (
                <li
                  key={item.to}
                  className="rounded-full px-3 py-1 hover:bg-[#f3cb50] transition"
                >
                  <NavigationMenuLink asChild>
                    <Link to={item.to}>{item.label}</Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Shop */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <OffsetLink
              to="/shop#top"
              className="rounded-full px-3 py-1 hover:bg-[#f3cb50] transition"
            >
              Shop
            </OffsetLink>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Contact */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <OffsetLink
              to="/contact#top"
              className="rounded-full px-3 py-1 hover:bg-[#f3cb50] transition"
            >
              Contact
            </OffsetLink>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Optional: Show profile or logout if authenticated */}
        
        {isAuthenticated && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <OffsetLink
                to="/dashboard#top"
                className="rounded-full px-3 py-1 hover:bg-[#f3cb50] transition"
              >
                Dashboard
              </OffsetLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
        
      </NavigationMenuList>
    </NavigationMenu>
  );
}
