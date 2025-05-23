import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";

const RecipeDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        const res = await fetch(`/api/recipes?id=${id}`);
        if (!res.ok) {
          setRecipe(null);
        } else {
          const data = await res.json();
          setRecipe(data);
        }
      } catch (error) {
        console.error(error);
        setRecipe(null);
      }
      setLoading(false);
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    setDeleteLoading(true);
    
    try {
      const res = await fetch(`/api/recipes?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push("/recipes");
      } else {
        alert("Eroare la ștergerea rețetei");
      }
    } catch (error) {
      alert("Eroare de conexiune");
    } finally {
      setDeleteLoading(false);
    }
  };

  const DeleteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Confirmare ștergere
        </h3>
        <p className="text-gray-600 mb-6">
          Ești sigur că vrei să ștergi rețeta <strong>"{recipe?.title}"</strong>? 
          Această acțiune nu poate fi anulată.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            disabled={deleteLoading}
          >
            Anulează
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            disabled={deleteLoading}
          >
            {deleteLoading ? "Se șterge..." : "Șterge"}
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-6"></div>
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!recipe) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-semibold text-gray-700 mb-2">
              Rețeta nu a fost găsită
            </h1>
            <p className="text-gray-500 mb-6">
              Se pare că această rețetă nu există sau a fost ștearsă.
            </p>
            <Link href="/recipes">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Vezi toate rețetele
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Acasă</Link>
            <span>/</span>
            <Link href="/recipes" className="hover:text-blue-600">Rețete</Link>
            <span>/</span>
            <span className="text-gray-700">{recipe.title}</span>
          </div>
        </nav>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header cu butoane */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-4xl font-bold text-gray-800">{recipe.title}</h1>
              <div className="flex gap-3">
                <Link href={`/recipes/edit/${recipe._id}`}>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-medium flex items-center gap-2">
                    <span>✏️</span>
                    Editează
                  </button>
                </Link>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center gap-2"
                >
                  <span>🗑️</span>
                  Șterge
                </button>
              </div>
            </div>

            {/* Data creării */}
            {recipe.createdAt && (
              <p className="text-sm text-gray-500">
                Creată pe {new Date(recipe.createdAt).toLocaleDateString('ro-RO')}
              </p>
            )}
          </div>

          <div className="p-8">
            {/* Descrierea */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Descriere și instrucțiuni</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {recipe.description}
                </p>
              </div>
            </div>

            {/* Ingredientele */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Ingrediente ({recipe.ingredients?.length || 0})
              </h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <ul className="grid gap-2 md:grid-cols-2">
                  {recipe.ingredients?.map((ingredient, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="text-blue-600 mr-3">•</span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Imaginea (dacă există) */}
            {recipe.image && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Imagine</h2>
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="rounded-lg shadow-lg max-w-full h-auto"
                />
              </div>
            )}
          </div>

          {/* Footer cu acțiuni */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Link href="/recipes">
                <button className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors font-medium">
                  ← Înapoi la rețete
                </button>
              </Link>
              
              <div className="flex gap-3">
                <Link href={`/recipes/edit/${recipe._id}`}>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Editează rețeta
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {showDeleteModal && <DeleteModal />}
      </div>
    </Layout>
  );
};

export default RecipeDetails;