import React from 'react';
import { CategoryTypes } from './Sidebar/BrandTypes';
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../ui/toggle-group"

interface Props {
  selectedCategory: string[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;
  selectedBrand: string[];
  setSelectedBrand: React.Dispatch<React.SetStateAction<string[]>>;
  selectRating: number;
  setSelectRating: React.Dispatch<React.SetStateAction<number>>;
  order: string;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  availabilityFilter: string[];
  setAvailabilityFilter: React.Dispatch<React.SetStateAction<string[]>>;
}

const ProductFilters: React.FC<Props> = ({
  selectedCategory,
  setSelectedCategory,
  // selectedBrand,
  // setSelectedBrand,
  selectRating,
  setSelectRating,
  order,
  setOrder,
  availabilityFilter,
  setAvailabilityFilter
}) => {
  return (
    <div className="flex flex-wrap gap-6 mb-10 items-center justify-center bg-[#fffaf5] p-4 rounded-xl shadow">
      {/* Categories */}
      <div className="space-y-1">
        <h4 className="text-xs font-bold text-[#d5a86b] uppercase">Category</h4>
        <div className="flex flex-wrap gap-2">
          {CategoryTypes.map((cat) => (
            <button
              key={cat}
              className={`px-3 py-1 text-sm rounded-full border ${
                selectedCategory.includes(cat)
                  ? 'bg-[#d5a86b] text-white'
                  : 'border-[#d5a86b] text-[#2f2a28]'
              }`}
              onClick={() =>
                setSelectedCategory((prev) =>
                  prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
                )
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-1">
        <h4 className="text-xs font-bold text-[#d5a86b] uppercase">Rating</h4>
        <div className="flex gap-1">
          {[5, 4, 3, 2].map((stars) => (
            <button
              key={stars}
              onClick={() => setSelectRating(selectRating === stars ? 0 : stars)}
              className={`px-2 py-1 rounded text-sm ${
                selectRating === stars ? 'bg-[#d5a86b] text-white' : 'bg-white text-yellow-600'
              }`}
            >
              {'★'.repeat(stars)}
            </button>
          ))}
        </div>
      </div>

     

      {/* Sort Order */}
      <div className="space-y-1">
        <h4 className="text-xs font-bold text-[#d5a86b] uppercase">Sort</h4>
        <ToggleGroup
          variant="outline"
          type="single"
          value={order}
          onValueChange={(val) => {
            if (val) setOrder(val);
          }}
        >
          <ToggleGroupItem value="Price: Low to High">
            <span className="px-2 inline">Low to High</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="Price: High to Low">
            <span className="px-2 inline">High to Low</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Availability */}
      <div className="space-y-1">
        <h4 className="text-xs font-bold text-[#d5a86b] uppercase">Availability</h4>
        <div className="flex flex-wrap gap-2">
          {['In Stock', 'Out of Stock', 'In Store Only'].map((status) => (
            <button
              key={status}
              className={`px-3 py-1 text-sm rounded-full border ${
                availabilityFilter.includes(status)
                  ? 'bg-[#d5a86b] text-white'
                  : 'border-[#d5a86b] text-[#2f2a28]'
              }`}
              onClick={() =>
                setAvailabilityFilter((prev) =>
                  prev.includes(status)
                    ? prev.filter((s) => s !== status)
                    : [...prev, status]
                )
              }
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
