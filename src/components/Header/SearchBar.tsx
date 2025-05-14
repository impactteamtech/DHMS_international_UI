import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const SearchBar: React.FC = () => {
  return (
    <div className="relative w-full  justify-between  max-w-2xl">
      <Input
        type="search"
        placeholder="Search"
        className="pl-10  bg-white text-center rounded-full "
      />
      <Search className="  absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    </div>
  )
}

export default SearchBar