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
              <div className="aspect-square bg-gradient-to-br from-orange-900/30 to-purple-900/30 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src="/EF18E1FB-7FFC-419E-ACAF-9770969D6246_1_105_c copy copy.jpeg"
                  alt="Get Good"
                  className="w-full h-full object-cover shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">Get Good</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                Geoff's latest song has an AI-driven flair, fusing orchestral grandeur, dubstep energy, EDM vibes, and it shines with powerful female vocals. Streamable everywhere now!
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2"
                >
                  <Headphones className="w-5 h-5" />
                  <span>Get It Now</span>
                </button>
                <span className="text-cyan-400 font-bold text-xl">$.99</span>
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
