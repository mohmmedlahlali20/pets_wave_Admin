import path from "@/app/axios/path";

export async function getAllPets(){
    try {
        const res = await path.get("pets/findAllForAdmin");
        return res.data.pets || [];
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        return [];
      }
}