import path from "@/app/axios/path";

export async function getAllcategory() {
    try {
        const res = await path.get('category/GetAll')
        return res.data || []
    } catch (err) {
        console.log('err get category', err)
        return []
    }
}