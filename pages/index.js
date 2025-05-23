import { useEffect, useState } from 'react';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchRecipes() {
      const res = await fetch('/api/recipes');
      const data = await res.json();
      setRecipes(data);
      setLoading(false);
    }
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rețete culinare</h1>

      <input
        type="text"
        placeholder="Caută după titlu..."
        className="mb-6 p-2 border rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredRecipes.length === 0 ? (
        <p>Nu există rețete care să corespundă.</p>
      ) : (
        <ul>
          {filteredRecipes.map((recipe) => (
            <li key={recipe._id} className="mb-4 border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{recipe.title}</h2>
              <p>{recipe.description}</p>
              <p><strong>Ingrediente:</strong> {recipe.ingredients.join(', ')}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
