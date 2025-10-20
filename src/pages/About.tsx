import { Mail, Music, Sparkles, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About Geoffrey Pariseau
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-600 to-blue-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 rounded-lg blur-xl"></div>
            <img
              src="https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Geoffrey Pariseau"
              className="relative rounded-lg shadow-2xl w-full"
            />
          </div>
          <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
            <p>
              Inspired by artists such as Avicii, Skrillex, and Owl City, the Geoff began recording original music using digital audio workstations in 2012, while having maintained basic proficiency on piano and guitar since childhood.
            </p>
            <p>
              He released his debut album, Rise & Shine, featuring songs composed during their initial learning phase, which accounts for their straightforward style. Although composed between 2012 and 2015, the album was not officially released until 2021. Following a five-year hiatus, he issued the EP North Star in March 2024, serving as a reintroduction to music production and an opportunity to reacquaint himself with relevant tools. The five-track EP 309 was released in summer 2024, includes the first four tracks from an earlier 2016 project, with the title track newly composed that year.
            </p>
            <p>
              He maintains an active presence on social media via his Facebook page, X, and Instagram, all under the handle @GeoffreyPariseau.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Musical Journey
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 p-8 rounded-lg border border-slate-700 hover:border-cyan-600 transition-colors">
              <div className="inline-block p-3 bg-cyan-600/20 rounded-lg mb-4">
                <Sparkles className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">2019 - Beginnings</h3>
              <p className="text-slate-400">
                Started producing music in my bedroom studio, experimenting with electronic sounds and
                finding my unique voice. Released first demos online to overwhelming support.
              </p>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-lg border border-slate-700 hover:border-cyan-600 transition-colors">
              <div className="inline-block p-3 bg-cyan-600/20 rounded-lg mb-4">
                <Music className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">2021 - Breakthrough</h3>
              <p className="text-slate-400">
                Released debut EP "Wavelengths" which gained recognition in electronic music circles.
                Performed at local venues and built a dedicated fanbase.
              </p>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-lg border border-slate-700 hover:border-cyan-600 transition-colors">
              <div className="inline-block p-3 bg-cyan-600/20 rounded-lg mb-4">
                <Heart className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">2024 - Present</h3>
              <p className="text-slate-400">
                Released full-length album "Electric Soul" featuring collaborations with talented artists.
                Currently working on new material and planning my first full tour.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <img
              src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Performance"
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 w-full h-64 object-cover"
            />
            <img
              src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Studio Session"
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 w-full h-64 object-cover"
            />
            <img
              src="https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Live Performance"
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 w-full h-64 object-cover"
            />
            <img
              src="https://images.pexels.com/photos/1708912/pexels-photo-1708912.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Recording"
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 w-full h-64 object-cover"
            />
            <img
              src="https://images.pexels.com/photos/1481309/pexels-photo-1481309.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Studio Equipment"
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 w-full h-64 object-cover"
            />
            <img
              src="https://images.pexels.com/photos/1464036/pexels-photo-1464036.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Behind the Scenes"
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 w-full h-64 object-cover"
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-2xl p-12 border border-cyan-600/30">
          <div className="text-center max-w-3xl mx-auto">
            <Mail className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Let's Connect
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              I love hearing from fans and fellow music creators. Whether you want to collaborate,
              share your thoughts on a track, or just say hello, feel free to reach out.
            </p>
            <a
              href="mailto:hello@geoffpariseau.com"
              className="inline-block px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-semibold transition-all transform hover:scale-105"
            >
              hello@geoffpariseau.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
