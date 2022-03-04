import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';
import { useTheme } from '../../hooks/useTheme';
import './Recipe.css';

export default function Recipe() {
  const { id } = useParams();
  const { mode } = useTheme();
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore
      .collection('recipes')
      .doc(id)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            setIsPending(false);
            setRecipe(doc.data());
          } else {
            setIsPending(false);
            setError('Could not find that recipe');
          }
        },
        (err) => {
          setError(err.message);
          setIsPending(false);
        }
      );

    return () => unsub();
  }, [id]);

  const handleClick = () => {
    // generic update to show functionality
    projectFirestore.collection('recipes').doc(id).update({
      title: 'Something different',
    });
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipe && (
        <>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to make.</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className='method'>{recipe.method}</p>
          <button onClick={handleClick}>Update me</button>
        </>
      )}
    </div>
  );
}
