import Link from "next/link";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

export default function Home() {
  const [recentRecipes, setRecentRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Încarcă ultimele 3 rețete pentru preview
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecentRecipes(data.slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const features = [
    {
      icon: "📝",
      title: "Creează Rețete",
      description: "Adaugă rețetele tale favorite cu ingrediente și instrucțiuni detaliate",
      action: "Începe să creezi",
      link: "/recipes/create",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: "📖",
      title: "Organizează Colecția",
      description: "Vezi, editează și organizează toate rețetele într-un singur loc",
      action: "Explorează rețetele",
      link: "/recipes",
      color: "from-green-500 to-green-600"
    },
    {
      icon: "🍳",
      title: "Gătește cu Ușurință",
      description: "Accesează rapid ingredientele și pașii pentru orice rețetă",
      action: "Vezi exemple",
      link: "/recipes",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Bun venit la
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Rețetar Simplu
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Locul perfect pentru a-ți organiza rețetele favorite și a descoperi noi delicii culinare. 
            Simplu, rapid și elegant.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/recipes/create">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                🍳 Creează Prima Rețetă
              </button>
            </Link>
            <Link href="/recipes">
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200">
                📚 Vezi Toate Rețetele
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white rounded-2xl shadow-sm mb-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            De ce să alegi Rețetar Simplu?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Toate instrumentele de care ai nevoie pentru a-ți gestiona rețetele într-o aplicație elegantă și ușor de folosit.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 px-4">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <Link href={feature.link}>
                  <button className={`bg-gradient-to-r ${feature.color} text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity`}>
                    {feature.action}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Recipes Section */}
      {!loading && recentRecipes.length > 0 && (
        <div className="py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Rețete Recente
            </h2>
            <p className="text-gray-600">
              Ultimele rețete adăugate în colecția ta
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentRecipes.map((recipe) => (
              <Link key={recipe._id} href={`/recipes/${recipe._id}`}>
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {recipe.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {recipe.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{recipe.ingredients?.length || 0} ingrediente</span>
                      <span className="text-blue-600 group-hover:underline">
                        Vezi rețeta →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/recipes">
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Vezi toate rețetele →
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && recentRecipes.length === 0 && (
        <div className="text-center py-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
          <div className="text-6xl mb-6">👨‍🍳</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Gata să începi aventura culinară?
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Nu ai încă nicio rețetă salvată. Începe prin a adăuga prima ta rețetă delicioasă!
          </p>
          <Link href="/recipes/create">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg">
              🚀 Adaugă Prima Rețetă
            </button>
          </Link>
        </div>
      )}

      {/* Stats Section */}
      <div className="py-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Simplu. Elegant. Eficient.
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Rețetar Simplu îți oferă toate instrumentele necesare pentru a-ți organiza 
            rețetele într-un mod modern și intuitiv.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {loading ? "..." : recentRecipes.length}+
              </div>
              <div className="text-blue-200">
                Rețete Salvate
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-blue-200">Gratuit</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">∞</div>
              <div className="text-blue-200">Posibilități</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}