
import { Link } from 'react-router-dom'

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'

export default function NavigationMenuBeauty() {
  return (
    <NavigationMenu>
      <NavigationMenuList className='text-white text-md'>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/" className='hover:bg-[#f3cb50] rounded-full px-3 py-1'>
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className='rounded-full bg-black text-md'>
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent className='bg-black text-white'>
            <ul className="grid gap-2 p-2 w-48">
              <li className=' rounded-full px-3 py-1'>
                <NavigationMenuLink asChild>
                  <Link to="/categories/hair">Hair</Link>
                </NavigationMenuLink>
              </li>
              <li className=' rounded-full px-3 py-1'>
                <NavigationMenuLink asChild>
                  <Link to="/categories/skin">Skin</Link>
                </NavigationMenuLink>
              </li>
              <li className=' rounded-full px-3 py-1'>
                <NavigationMenuLink asChild>
                  <Link to="/categories/makeup">Makeup</Link>
                </NavigationMenuLink>
              </li>
              <li className=' rounded-full px-3 py-1'>
                <NavigationMenuLink asChild>
                  <Link to="/categories/accessories">Accessories</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/shop" className=' rounded-full px-3 py-1'>
              Shop
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/contact" className=' rounded-full px-3 py-1'>
              Contact
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
