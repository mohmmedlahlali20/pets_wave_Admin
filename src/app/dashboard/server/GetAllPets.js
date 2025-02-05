import path from "@/app/axios/path";

export async function getAllPets(){
 
        const res = await path.get("pets/findAllForAdmin");
        return res.data.pets || [];
   
   
}