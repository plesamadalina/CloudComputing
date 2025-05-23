import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const COLLECTION_NAME = 'recipes';

export default async function handler(req, res) {
  const { database } = await connectToDatabase();
  const collection = database.collection(COLLECTION_NAME);

  if (req.method === 'GET') {
    if (req.query.id) {
      // Get single recipe by id
      try {
        const recipe = await collection.findOne({ _id: new ObjectId(req.query.id) });
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        return res.status(200).json(recipe);
      } catch (error) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
    } else {
      // Get all recipes
      const recipes = await collection.find({}).toArray();
      return res.status(200).json(recipes);
    }
  } else if (req.method === 'POST') {
    // Create recipe
    const { title, description, ingredients, imageUrl } = req.body;

    if (!title || !description || !Array.isArray(ingredients)) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newRecipe = { title, description, ingredients, imageUrl: imageUrl || null };

    const result = await collection.insertOne(newRecipe);
    return res.status(201).json({ ...newRecipe, _id: result.insertedId });
  } else if (req.method === 'PUT') {
    // Update recipe
    const { _id, title, description, ingredients, imageUrl } = req.body;

    if (!_id || !title || !description || !Array.isArray(ingredients)) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const result = await collection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: { title, description, ingredients, imageUrl: imageUrl || null } }
      );
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      return res.status(200).json({ message: 'Recipe updated' });
    } catch (error) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
  } else if (req.method === 'DELETE') {
    // Delete recipe
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: 'ID required' });

    try {
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      return res.status(200).json({ message: 'Recipe deleted' });
    } catch (error) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
