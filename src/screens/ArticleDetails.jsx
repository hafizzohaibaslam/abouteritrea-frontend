import { useToast } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyToast from "../utils/Toast";
import request from "../utils/request";
import ImageField from "../components/ImageField";

const ArticleDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();
  const myToast = useMemo(() => new MyToast(toast), [toast]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [categories, setCategories] = useState();
  const [article, setArticle] = useState([]);
  const [image, setImage] = useState(null);
  const [credentials, setCredentials] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });

  const fetchArticle = async (id) => {
    try {
      const { data } = await request.get(`/articles/${id}/?populate=deep,3`);
      setImage(data?.data?.attributes?.image?.data?.attributes?.url);
      setCredentials({
        title: data?.data?.attributes?.title,
        content: data?.data?.attributes?.content,
        category: data?.data?.attributes?.category?.data?.id,
        image: data?.data?.attributes?.image?.data?.id,
      });
    } catch (error) {
      console.log("error: ", error);
      myToast.error(error.response.data.error.message);
    }
  };

  const submitEditHandler = async (e) => {
    e.preventDefault();
    const { title, content, category, image } = credentials;
    if (!title || !content || !category || !image) {
      myToast.warning("Fields cannot be empty");
      return;
    }
    try {
      const { data } = await request.put(`/articles/${id}/?populate=*`, {
        data: {
          ...credentials,
          category: parseInt(credentials.category),
        },
      });
      myToast.success("Article Edited Successfully!");
      setTimeout(() => {
        navigate(`/article/${id}`);
      }, 2000);
    } catch (error) {
      console.log("error: ", error);
      myToast.error(error.response.data.error.message);
    }
  };

  const submitNewHandler = async (e) => {
    e.preventDefault();
    const { title, content, category, image } = credentials;
    if (!title || !content || !category || !image) {
      myToast.warning("Fields cannot be empty");
      return;
    }
    try {
      const { data } = await request.post(`/articles`, {
        data: {
          ...credentials,
          category: parseInt(credentials.category),
        },
      });
      setIsEditMode(false);
    } catch (error) {
      console.log("error: ", error);
      myToast.error(error.response.data.error.message);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const { data } = await request.get("/categories");
      const categories = data?.data?.map((category) => {
        return {
          id: category.id,
          name: category.attributes.name,
        };
      });
      setCategories(categories);
    } catch (error) {
      console.log("error: ", error);
      myToast.error(error.response.data.error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value);

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchArticle(id);
    }
    fetchAllCategories();
  }, [id]);

  useEffect(() => {
    console.log(credentials);
  }, [credentials]);

  return (
    <div className="w-full sm:w-7/12 md:w-8/12 py-10 sm:pr-5 flex flex-col gap-y-5">
      <article className="article w-full">
        <h1 className="mb-10 text-2xl font-bold">
          {isEditMode ? "Edit Article" : "Add New Article"}
        </h1>
        <form
          onSubmit={isEditMode ? submitEditHandler : submitNewHandler}
          className="flex flex-col gap-5"
        >
          <div className="flex">
            <label className="text-lg font-semibold w-40">Title:</label>
            <input
              type="text"
              name="title"
              value={credentials.title}
              onChange={handleChange}
              className="border rounded-md p-1 px-2 w-full outline-none"
            />
          </div>
          <div className="flex items-start">
            <label className="text-lg font-semibold w-40">Content:</label>
            <textarea
              name="content"
              value={credentials.content}
              onChange={handleChange}
              className="border rounded-md py-1 px-2 w-full outline-none"
            />
          </div>
          <div className="flex justify-between">
            <label className="text-lg font-semibold w-40">Category:</label>
            <select
              name="category"
              value={credentials.category}
              onChange={handleChange}
              className="border rounded-md w-full py-1 px-2 cursor-pointer outline-none"
            >
              <option value="">Select a category</option>
              {categories?.map((category, index) => (
                <option key={index} value={parseInt(category.id)}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex">
            <label className="text-lg font-semibold w-40">Image:</label>
            <ImageField
              image={image}
              changeHandler={handleChange}
              editAllowed={true}
            />
          </div>
          <button
            type="submit"
            className=" bg-black text-white font-semibold px-4 py-1 rounded-md w-fit ml-auto"
          >
            {isEditMode ? "Update Article" : "Add Article"}
          </button>
        </form>
      </article>
    </div>
  );
};

export default ArticleDetails;
