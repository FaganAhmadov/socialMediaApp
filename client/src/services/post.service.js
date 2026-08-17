import { api } from "../api"

export const getAllActivePostsForFeed = async () => {
    const res = await api.get('/post');
    return res.data
}
export const createPostsService = async (body) => {
    const formData = new FormData();

    formData.append("description", body.describtion);
    formData.append("file", body.file);

    const res = await api.post("/post", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return res.data;
};