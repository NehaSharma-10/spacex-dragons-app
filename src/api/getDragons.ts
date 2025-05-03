
export const getDragons = async () => {
    const res = await fetch('https://api.spacexdata.com/v4/dragons');
    if (!res.ok) {
      throw new Error('Failed to fetch dragons');
    }
    return res.json();
  };
  