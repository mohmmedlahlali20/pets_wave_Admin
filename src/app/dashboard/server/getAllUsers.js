import path from "@/app/axios/path";

export async function GetAllUsers() {
    const res = await path.get('users/findAll')
    return res.data || []
}