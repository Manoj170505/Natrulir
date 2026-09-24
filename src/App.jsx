import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import FeatureShowcase from './components/FeatureShowcase';
import GalleryAndReviews from './components/GalleryAndReviews';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import CheckoutModal from './components/CheckoutModal';
import OrderTrackerModal from './components/OrderTrackerModal';
import Footer from './components/Footer';
import { fetchProducts } from './api';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('natrulir_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [trackerInitialId, setTrackerInitialId] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutSummary, setCheckoutSummary] = useState({
    subtotal: 0,
    discount: 0,
    shippingFee: 0,
    total: 0
  });

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('natrulir_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Load products from backend
  const loadProducts = async () => {
    setLoading(true);
    const data = await fetchProducts({
      category: activeCategory,
      search: searchTerm,
      sort: sortBy
    });
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, [activeCategory, searchTerm, sortBy]);

  // Cart actions
  const handleAddToCart = (product) => {
    const qty = product.quantity || 1;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Trigger checkout from Cart Drawer
  const handleProceedToCheckout = (summary) => {
    setCheckoutSummary(summary);
    setIsCheckoutOpen(true);
  };

  // Scroll to shop
  const handleScrollToShop = () => {
    const shopEl = document.getElementById('shop');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (cat) => {
    setActiveCategory(cat);
    handleScrollToShop();
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F7F5EE] text-[#1A241B] flex flex-col font-sans">
      
      {/* Navigation */}
      <Navbar
        cartCount={cartTotalItems}
        onOpenCart={() => setIsCartOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenTracker={() => {
          setTrackerInitialId('');
          setIsTrackerOpen(true);
        }}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onCategorySelect={handleSelectCategory}
      />

      {/* Main Content */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <Hero
          onShopClick={handleScrollToShop}
          onSelectCategory={handleSelectCategory}
        />

        {/* Product Catalog Grid (matching user screenshot) */}
        <ProductGrid
          products={products}
          loading={loading}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setSelectedProduct(p)}
          searchTerm={searchTerm}
        />

        {/* Bestseller & New Arrival Feature Showcase */}
        <FeatureShowcase onShopCategory={handleSelectCategory} />

        {/* Gallery & Reviews */}
        <GalleryAndReviews />

      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenTracker={() => {
          setTrackerInitialId('');
          setIsTrackerOpen(true);
        }}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Product Details & Nutrition Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        cartSummary={checkoutSummary}
        onOrderSuccess={handleClearCart}
        onOpenTrackerWithId={(orderNumber) => {
          setTrackerInitialId(orderNumber);
          setIsTrackerOpen(true);
        }}
      />

      {/* Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        initialOrderNumber={trackerInitialId}
      />

    </div>
  );
}
