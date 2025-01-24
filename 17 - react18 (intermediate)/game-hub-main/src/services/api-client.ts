import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "47f072c6ac8343c3bcbaf394fea76b9d",
  },
});
