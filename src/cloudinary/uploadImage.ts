import api from "@/api/axios_client/api";

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post("/upload/image", formData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default uploadImage;
