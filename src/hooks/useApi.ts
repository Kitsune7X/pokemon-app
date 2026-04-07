import { useQuery } from "@tanstack/react-query";

export default function useApi() {
  return useQuery({
    queryKey: ["pokemon"],
    queryFn: async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=20",
      );

      return await response.json();
    },
  });
}
