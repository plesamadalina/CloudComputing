import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

export default function CreateRecipe() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Curățăm eroarea când utilizatorul scrie
    if (error) setError("");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          ingredients: formData.ingredients.split(",").map((i) => i.trim()).filter(i => i !== ""),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/recipes");
      } else {
        setError(data.message || "Eroare la crearea rețetei");
      }
    } catch (err) {
      setError("Eroare de conexiune. Verifică conexiunea la internet.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Creează o rețetă nouă
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Titlu rețetă <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="De ex: Papanași cu smântână"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descriere și instrucțiuni <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Descrie rețeta și pașii de preparare..."
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
              />
            </div>

            <div>
              <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
                Ingrediente <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="ingredients"
                name="ingredients"
                placeholder="Separă ingredientele cu virgulă: ou, lapte, făină, zahăr"
                value={formData.ingredients}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <p className="text-sm text-gray-500 mt-1">
                Exemplu: ou, lapte, făină, zahăr, sare
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                disabled={loading}
              >
                Anulează
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Se salvează..." : "Salvează rețeta"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}