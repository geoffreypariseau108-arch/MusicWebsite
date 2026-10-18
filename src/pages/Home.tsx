import { Play, Music2, ShoppingBag, Headphones } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/67E412A7-0D8D-4D68-B088-4395F50F8604.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/40 to-blue-800/40"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6 inline-block">
            <Music2 className="w-20 h-20 text-cyan-400 animate-pulse" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            GEOFFREY PARISEAU
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 font-light">
            Electronic Fusion Artist · Producer · Sonic Architect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('shop')}
              className="group px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Shop Music</span>
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 text-white border border-slate-600 rounded-full font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Discover More</span>
            </button>
          </div>

          <div className="mt-12 flex justify-center space-x-6">
            <a
              href="https://x.com/GeoffPariseau"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600 rounded-full transition-all transform hover:scale-110"
              aria-label="X (Twitter)"
            >
              <svg className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61551675695493"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600 rounded-full transition-all transform hover:scale-110"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/geoffreypariseau/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600 rounded-full transition-all transform hover:scale-110"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@geoffrey_pariseau"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600 rounded-full transition-all transform hover:scale-110"
              aria-label="TikTok"
            >
              <svg className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-slate-400 rounded-full"></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Latest Release
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="/421DAA5C-6406-40D3-B7C3-339AD96DB24E_1_102_o copy.jpeg"
                  alt="Get Good"
                  className="w-full h-full object-cover shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">Reimagine</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                Geoff's latest album is an AI-driven Reimagining of his past music, fusing orchestral grandeur, dubstep energy, EDM vibes, and it shines with powerful vocals. Streamable everywhere now!
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2"
                >
                  <Headphones className="w-5 h-5" />
                  <span>Get It Now</span>
                </button>
                <span className="text-cyan-400 font-bold text-xl">$9.00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Experience the Journey
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-cyan-600 transition-colors">
              <div className="inline-block p-4 bg-cyan-600/20 rounded-full">
                <Music2 className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Original Sound</h3>
              <p className="text-slate-400">
                Unique blend of electronic production with soulful melodies and heartfelt lyrics
              </p>
            </div>
            <div className="text-center space-y-4 p-6 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-cyan-600 transition-colors">
              <div className="inline-block p-4 bg-cyan-600/20 rounded-full">
                <Headphones className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">High Quality</h3>
              <p className="text-slate-400">
                All tracks available in high-fidelity formats for the best listening experience
              </p>
            </div>
            <div className="text-center space-y-4 p-6 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-cyan-600 transition-colors">
              <div className="inline-block p-4 bg-cyan-600/20 rounded-full">
                <ShoppingBag className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Instant Access</h3>
              <p className="text-slate-400">
                Immediate digital downloads after purchase
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
