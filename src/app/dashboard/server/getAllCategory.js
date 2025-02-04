import path from "@/app/axios/path";

export async function getAllcategory() {

        const res = await path.get('category/GetAll')
        return res.data || []
    
}