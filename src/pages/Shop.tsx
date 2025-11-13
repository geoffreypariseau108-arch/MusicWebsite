import { useState, useEffect } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { supabase, Product } from '../lib/supabase';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
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
                          className="hover:opacity-80 transition-opacity"
                          aria-label="Listen on Amazon Music"
                        >
                          <img src="/Amazon logo 2.webp" alt="Amazon Music" className="w-8 h-8 rounded-full" />
                        </a>
                      </div>
                    </>
                  ) : product.name.toLowerCase().includes('get good') ? (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-cyan-400">
                          ${product.price.toFixed(2)}
                        </span>
                        <a
                          href="https://geoffreypariseau.bandcamp.com/track/get-good"
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
                          href="https://open.spotify.com/album/1lwDa9ZDxGMUS947iDwIX2?si=LkC47buWRQq0dsqJaasmpw"
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
                          href="https://www.youtube.com/watch?v=x0eYcbd4Bfo&list=OLAK5uy_n2KfYmO5kXoHJ6pbBfOrSVC8Ue94FOpFM"
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
                          href="https://music.amazon.com/albums/B0FX3DRV41?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_X4rzPvdDVGTwsn11jTZ3w0SzW"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-80 transition-opacity"
                          aria-label="Listen on Amazon Music"
                        >
                          <img src="/Amazon logo 2.webp" alt="Amazon Music" className="w-8 h-8 rounded-full" />
                        </a>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-cyan-400">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
