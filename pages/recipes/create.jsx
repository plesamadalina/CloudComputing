import { useState } from "react";
import { useRouter } from "next/router";

const CreateRecipe = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construim obiectul pentru API
    const newRecipe = {
      title: form.title,
      description: form.description,
      ingredients: form.ingredients.split(",").map((i) => i.trim()),
      image: form.image || null,
    };

    const res = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Eroare la adăugare rețetă");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Adaugă o rețetă nouă</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="title"
          type="text"
          placeholder="Titlu"
          value={form.title}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Descriere"
          value={form.description}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          name="ingredients"
          type="text"
          placeholder="Ingrediente (separate prin virgulă)"
          value={form.ingredients}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          name="image"
          type="text"
          placeholder="URL imagine (opțional)"
          value={form.image}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Adaugă rețetă
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
