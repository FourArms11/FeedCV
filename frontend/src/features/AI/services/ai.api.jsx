import axios from "axios";

export async function generateReport({ resume, selfDescription, jobDescription }) {
  const formData = new FormData();
  formData.append("resume", resume);
  formData.append("selfDescription", selfDescription);
  formData.append("jobDescription", jobDescription);

  const response = await axios.post("http://localhost:3000/api/ai/generate-report", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  return response.data;
}
