import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div className="border border-gray-200 rounded-lg p-4 shadow-lg">
    <Link to={`/product/id/${product._id}`}>
      <h2 className="text-xl font-semibold mb-2">{product.product_name}</h2>
    </Link>
    <p className="text-gray-700 mb-2">Brand: {product.brand}</p>
    <p className="text-gray-700 mb-2">Category: {product.category}</p>
    <p className="text-gray-700 mb-2">Price: ${product.price.toFixed(2)}</p>
  </div>
);

export default ProductCard;
