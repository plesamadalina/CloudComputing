import Link from "next/link";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

export default function RecipesList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-6">Toate rețetele</h1>

        {recipes.length === 0 ? (
          <p>Nu există rețete.</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe._id} className="mb-8 border-b pb-4">
              <Link href={`/recipes/${recipe._id}`} className="text-2xl font-semibold text-blue-600 hover:underline">
                {recipe.title}
              </Link>
              <p className="mt-1 text-gray-700">{recipe.description}</p>
              <p className="mt-1 font-semibold">
                Ingrediente: {recipe.ingredients?.join(", ")}
              </p>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
