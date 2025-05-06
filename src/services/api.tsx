import { Dragon } from "../utils/types";

export const fetchDragons = async (): Promise<Dragon[]> => {
  const response = await fetch("https://api.spacexdata.com/v4/dragons");
  if (!response.ok) {
    throw new Error("Failed to fetch dragons details");
  }
  return response.json();
};

export const fetchDragonById = async (id: string): Promise<Dragon> => {
  const res = await fetch(`https://api.spacexdata.com/v4/dragons/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch dragon by id");
  }
  return res.json();
};