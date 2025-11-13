import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, X, Download, ExternalLink } from 'lucide-react';
import { supabase, Product, CartItem } from '../lib/supabase';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'single' | 'album' | 'merchandise'>('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter(
    (product) => filter === 'all' || product.product_type === filter
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Shop</h1>
          <p className="text-slate-300 text-lg">
            Support independent music and get instant access to high-quality tracks
          </p>
        </div>

        <div className="flex justify-center mb-12 space-x-4 flex-wrap gap-2">
          {(['all', 'single', 'album', 'merchandise'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === type
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700 hover:border-cyan-600 transition-all hover:transform hover:scale-105"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-contain bg-slate-900"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-slate-900/90 text-cyan-400 text-xs font-semibold rounded-full border border-cyan-600">
                      {product.product_type}
                    </span>
                  </div>
                  {product.stock_quantity === -1 && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-cyan-600/90 text-white text-xs font-semibold rounded-full flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>Digital</span>
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  {product.name.toLowerCase().includes('reimagine') ? (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-cyan-400">
                          ${product.price.toFixed(2)}
                        </span>
                        <a
                          href="https://geoffreypariseau.bandcamp.com/album/reimagine"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Buy on Bandcamp</span>
                        </a>
                      </div>
                      <div className="flex items-center justify-center space-x-4 pt-4 border-t border-slate-700">
                        <a
                          href="https://open.spotify.com/album/0TSe1kbWUS0TsKktpFfmfr?si=kInBbiA5RI2yVUPHGsV7aQ"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-500 hover:text-green-400 transition-colors"
                          aria-label="Listen on Spotify"
                        >
                          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                          </svg>
                        </a>
                        <a
                          href="https://youtube.com/playlist?list=OLAK5uy_nZXMSlDYxcmV4yIeUlZkGxLho1kQlYlek&si=9JCaxH84PEL6iveM"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-500 hover:text-red-400 transition-colors"
                          aria-label="Listen on YouTube"
                        >
                          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </a>
                        <a
                          href="https://www.amazon.com/dp/B0G1M58256/ref=sr_1_2?crid=GYLHJWLWARYA&dib=eyJ2IjoiMSJ9.duRB7JsZE_clORAasZ7HU_5BivkgtZukI7PLcLtUwqCE1ghUS6P5BM6Sz71BtIYuCDCB77iJE6bIzJO9uhU0VSH3FXfO4Lc_BtHMFN6Wb6fEPK4SX7Qm8Y8GxH_uilQK-DCTtPRS_43cuAEBH_GoOnFRepDcFXBRwp4zb0ORZGWEI_sHPo0rnC9NprkVmQiWDQjGYvNHp-yiH5ordBBO3g-H_wxAv6_C3US_XTKtzes.xFMGjvD0BpuRxRrvardTynQeFTgKCE67lbQyuzPOgHs&dib_tag=se&keywords=geoffrey+pariseau&qid=1763064509&s=dmusic&sprefix=%2Cdigital-music%2C118&sr=1-2"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-500 hover:text-orange-400 transition-colors"
                          aria-label="Listen on Amazon Music"
                        >
                          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.164-.61.348-.977.541-.5.255-.796.39-.89.41a15.89 15.89 0 0 1-5.4.972c-3.17 0-6.203-.644-9.105-1.933-.25-.104-.505-.225-.765-.355l-.945-.49c-.15-.09-.224-.18-.224-.28 0-.078.054-.14.15-.186zm8.47-4.24c.75-.015 1.478.066 2.19.24.72.18 1.29.495 1.71.945.42.45.63 1.08.63 1.89 0 .744-.18 1.35-.54 1.815-.36.45-.945.78-1.77 1.005-.6.15-1.29.225-2.07.225h-.06c-.75 0-1.38-.09-1.89-.27-.51-.18-.93-.51-1.26-.99-.33-.48-.495-1.08-.495-1.8 0-.735.18-1.335.54-1.785.36-.465.93-.795 1.71-1.005.6-.15 1.275-.225 2.025-.225.015 0 .03-.015.045-.015.015 0 .03-.015.045-.015zm6.75-9.9c-.27.015-.495.09-.66.255-.18.165-.345.45-.51.855-.54 1.29-1.065 2.625-1.59 4.005-.525 1.38-1.035 2.745-1.53 4.11-.12.345-.285.735-.495 1.17-.21.435-.525.78-.945 1.035-.42.255-.87.39-1.38.39l-.03-.045c-.63-.045-1.2-.21-1.71-.495-.51-.285-.93-.72-1.245-1.305-.315-.585-.48-1.29-.48-2.13 0-.27.015-.54.045-.825.03-.285.075-.525.105-.705.045-.24.09-.435.135-.585.045-.15.12-.255.255-.315a.49.49 0 0 1 .315-.015c.12.045.195.15.195.33-.015.18-.045.405-.09.69-.045.285-.075.585-.075.915 0 .6.09 1.125.27 1.575.18.45.435.81.78 1.065.345.255.72.405 1.14.45.27.03.51-.03.735-.195.225-.165.435-.42.63-.765.195-.345.405-.795.63-1.35.45-1.125.915-2.325 1.41-3.6.495-1.29 1.005-2.55 1.53-3.78.105-.24.225-.495.345-.78.12-.285.285-.54.495-.765.21-.225.495-.36.855-.39a.48.48 0 0 1 .405.135c.105.09.12.225.045.405z"/>
                          </svg>
                        </a>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-cyan-400">
                        ${product.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-8 right-8 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full p-4 shadow-2xl transition-all transform hover:scale-110 z-40"
        >
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        {cartOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center space-x-4 bg-slate-900/50 p-4 rounded-lg"
                      >
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{item.product.name}</h3>
                          <p className="text-cyan-400 font-bold">
                            ${item.product.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="p-1 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-white font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="p-1 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-700">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-white">Total:</span>
                    <span className="text-2xl font-bold text-cyan-400">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <button className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold text-lg transition-colors">
                    Proceed to Checkout
                  </button>
                  <p className="text-slate-400 text-xs text-center mt-3">
                    Secure payment powered by Stripe
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
