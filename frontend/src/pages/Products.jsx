import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const CategorySidebar = ({ categories, onSelectCategory, selectedCategory }) => (
  <div className="bg-gray-100 p-4 border-r border-gray-300">
    <h2 className="text-xl font-semibold mb-4">Categories</h2>
    <ul>
      {categories.map((category) => (
        <li key={category} className="mb-2">
          <button
            className={`w-full text-left px-4 py-2 rounded ${selectedCategory === category ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-100'}`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('electronics'); // Default category
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCategories = async () => {
    try{
        const resp= await axios.get('/api/products/getCategories');
        setCategories(resp.data.categorylist);
    }catch(error){
        console.error('Error Fetchinf Categories:',error)
    }
  };

  const fetchProducts = async (page, category) => {
    try {
      const response = await axios.get(`/api/products/category/${category}?page=${page}&limit=20`);
      const { products, totalPages } = response.data;
      if (Array.isArray(products)) {
        setProducts(products);
        setTotalPages(totalPages);
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(()=>{
    fetchCategories();
  },[]);
  useEffect(() => {
    fetchProducts(currentPage, selectedCategory);
  }, [currentPage, selectedCategory]);


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); 
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex">
      <CategorySidebar 
        categories={categories} 
        onSelectCategory={handleCategoryChange} 
        selectedCategory={selectedCategory}
      />
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          {Array.isArray(products) && products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.product_id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500">No products available.</p>
          )}
        </div>
        <div className="flex justify-center space-x-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="flex items-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
