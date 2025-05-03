// src/pages/DragonPage.tsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import DragonCard from '../components/DragonCard';

interface Dragon {
  id: string;
  name: string;
  type: string;
  description: string;
  flickr_images: string[];
  // ... add more fields if needed
}

const fetchDragons = async () => {
  const { data } = await axios.get<Dragon[]>('https://api.spacexdata.com/v4/dragons');
  return data;
};

const DragonPage = () => {
  const { data, isLoading, error } = useQuery(['dragons'], fetchDragons);

  if (isLoading) return <p>Loading dragons...</p>;
  if (error) return <p>Failed to load dragons.</p>;

  return (
    <div>
      <h1>Dragon Spacecrafts</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {data?.map((dragon) => (
          <DragonCard key={dragon.id} dragon={dragon} />
        ))}
      </div>
    </div>
  );
};

export default DragonPage;
