import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

export default function RecipesList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await fetch("/api/recipes");
      if (res.ok) {
        const data = await res.json();
        setRecipes(data);
      }
    } catch (error) {
      console.error("Eroare la încărcarea rețetelor:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (recipeId) => {
    setDeleteLoading(recipeId);
    
    try {
      const res = await fetch(`/api/recipes?id=${recipeId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
        setShowDeleteModal(null);
      } else {
        alert("Eroare la ștergerea rețetei");
      }
    } catch (error) {
      alert("Eroare de conexiune");
    } finally {
      setDeleteLoading(null);
    }
  };

  const DeleteModal = ({ recipe }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Confirmare ștergere
        </h3>
        <p className="text-gray-600 mb-6">
          Ești sigur că vrei să ștergi rețeta <strong>"{recipe.title}"</strong>? 
          Această acțiune nu poate fi anulată.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setShowDeleteModal(null)}
            className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            disabled={deleteLoading === recipe._id}
          >
            Anulează
          </button>
          <button
            onClick={() => handleDelete(recipe._id)}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            disabled={deleteLoading === recipe._id}
          >
            {deleteLoading === recipe._id ? "Se șterge..." : "Șterge"}
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Toate rețetele</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 rounded flex-1"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Toate rețetele</h1>
          <p className="text-gray-600">Descoperă și gestionează rețetele tale favorite</p>
        </div>

        {recipes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Nu există rețete încă
            </h2>
            <p className="text-gray-500 mb-6">
              Începe prin a crea prima ta rețetă delicioasă!
            </p>
            <Link href="/recipes/create">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Creează prima rețetă
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <Link href={`/recipes/${recipe._id}`}>
                  <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-800 cursor-pointer mb-3">
                    {recipe.title}
                  </h2>
                </Link>
                
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {recipe.description}
                </p>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Ingrediente:
                  </p>
                  <p className="text-sm text-gray-500">
                    {recipe.ingredients?.slice(0, 3).join(", ")}
                    {recipe.ingredients?.length > 3 && "..."}
                  </p>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <Link href={`/recipes/${recipe._id}`} className="flex-1">
                    <button className="w-full bg-blue-50 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                      Vezi
                    </button>
                  </Link>
                  <Link href={`/recipes/edit/${recipe._id}`}>
                    <button className="bg-yellow-50 text-yellow-600 py-2 px-3 rounded-lg hover:bg-yellow-100 transition-colors text-sm font-medium">
                      Editează
                    </button>
                  </Link>
                  <button
                    onClick={() => setShowDeleteModal(recipe)}
                    className="bg-red-50 text-red-600 py-2 px-3 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                  >
                    Șterge
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showDeleteModal && <DeleteModal recipe={showDeleteModal} />}
      </div>
    </Layout>
  );
}