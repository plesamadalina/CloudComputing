import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;
  
  try {
    const { database } = await connectToDatabase();
    const collection = database.collection("recipes");

    if (method === "GET") {
      if (id) {
        const recipe = await collection.findOne({ _id: new ObjectId(id) });
        if (!recipe) {
          return res.status(404).json({ message: "Rețeta nu a fost găsită" });
        }
        return res.status(200).json(recipe);
      } else {
        const recipes = await collection.find({}).toArray();
        return res.status(200).json(recipes);
      }
    }

    if (method === "POST") {
      const { title, description, ingredients } = req.body;
      
      // Validare date
      if (!title || !description || !ingredients) {
        return res.status(400).json({ 
          message: "Toate câmpurile sunt obligatorii" 
        });
      }

      const newRecipe = {
        title,
        description,
        ingredients,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await collection.insertOne(newRecipe);
      
      return res.status(201).json({
        message: "Rețeta a fost creată cu succes",
        recipeId: result.insertedId
      });
    }

    if (method === "PUT") {
      if (!id) {
        return res.status(400).json({ message: "ID-ul rețetei este necesar" });
      }

      const { title, description, ingredients } = req.body;
      
      const updateData = {
        ...(title && { title }),
        ...(description && { description }),
        ...(ingredients && { ingredients }),
        updatedAt: new Date()
      };

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Rețeta nu a fost găsită" });
      }

      return res.status(200).json({ message: "Rețeta a fost actualizată" });
    }

    if (method === "DELETE") {
      if (!id) {
        return res.status(400).json({ message: "ID-ul rețetei este necesar" });
      }

      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Rețeta nu a fost găsită" });
      }

      return res.status(200).json({ message: "Rețeta a fost ștearsă" });
    }

    return res.status(405).json({ message: "Metodă HTTP neacceptată" });

  } catch (error) {
    console.error("Eroare API:", error);
    return res.status(500).json({ 
      message: "Eroare internă de server",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}