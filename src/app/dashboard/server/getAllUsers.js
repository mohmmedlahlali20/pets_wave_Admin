import path from "@/app/axios/path";

export async function GetAllUsers(){
    try {
        const res = await path.get('users/findAll')
        console.log('====================================');
        console.log(res.data);
        console.log('====================================');
        return res.data || []
    } catch (err) {
        console.error('catching errror');
        return []
    }

}