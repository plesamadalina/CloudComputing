import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

const RecipeDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6">
        {loading ? (
          <p className="text-center mt-10">Se încarcă...</p>
        ) : !recipe ? (
          <p className="text-center mt-10">Rețeta nu a fost găsită.</p>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
            <p className="mb-6">{recipe.description}</p>

            <h2 className="text-2xl font-semibold mb-3">Ingrediente:</h2>
            <ul className="list-disc list-inside mb-6">
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>

            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="rounded-lg shadow-lg max-w-full"
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default RecipeDetails;
