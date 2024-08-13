import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner'; // Import the spinner component

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/products/id/${id}`)
      .then(response => {
        setProduct(response.data.product);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setError('Failed to load product data.');
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="relative border border-gray-200 rounded-lg p-4 shadow-lg">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-80 z-10">
          <LoadingSpinner />
        </div>
      )}
      {error && !loading && (
        <p className="text-red-500 text-center mt-4">{error}</p>
      )}
      {product && (
        <div className={`transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <h2 className="text-xl font-semibold mb-2">{product.product_name}</h2>
          <p className="text-gray-700 mb-2">Brand: {product.brand}</p>
          <p className="text-gray-700 mb-2">Category: {product.category}</p>
          <p className="text-gray-700 mb-2">Price: ${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-2">Quantity Available: {product.quantity_available}</p>
          <p className="text-gray-700 mb-2">Shipping Cost: ${product.shipping_cost.toFixed(2)}</p>
          <p className="text-gray-700 mb-2">Arrival Date: {new Date(product.arrival_date).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
