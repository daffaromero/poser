import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

interface ProductAutocompleteProps {
  onSelect: (product: any) => void;
}

const ProductAutocomplete: React.FC<ProductAutocompleteProps> = ({ onSelect }) => {
  const products = useSelector((state: RootState) => state.product);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredProducts);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (product: any) => {
    onSelect(product);
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleChange} placeholder="Search for a product" />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((product, index) => (
            <li key={index} onClick={() => handleSelect(product)}>
              <img src={product.picture} alt={product.name} width="50" />
              <span>{product.name}</span>
              <span>Stock: {product.stock}</span>
              <span>Price: ${product.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductAutocomplete;