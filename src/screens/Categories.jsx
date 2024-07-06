
import request from "../utils/request";
import { useToast } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import MyToast from "../utils/Toast";
import { Link } from "react-router-dom";

const Categories = () => {
  const toast = useToast();
  const myToast = useMemo(() => new MyToast(toast), [toast]);

  const [categories, setCategories] = useState([]);

  const fetchArticlesByCategories = async () => {
    try {
      const { data } = await request.get("/categories?populate=*");
      console.log("data: ", data);
      setCategories(data.data);
    } catch (error) {
      myToast.error(error.response.data.error.message);
    }
  };

  useEffect(() => {
    fetchArticlesByCategories();
  }, []);

  return (
    <section className="categories-container w-full sm:w-7/12 md:w-8/12 py-10 sm:pr-5 flex flex-col gap-y-5">
      <h3 className="categories-title common-title">
        List of Articles by Categories
      </h3>
      <span className="categories-description common-description text-sm">
        List of Articles by Categories These are some of our articles that are
        complete.
      </span>

      <div className="grid grid-cols-4 gap-y-2">
        {categories?.map((category, index) => (
          <div key={index} className="border">
            <h2 className="font-bold bg-gray-100 p-2">{category.attributes.name}</h2>
            <ul className="category-list">
              {category.attributes.articles.data.map((article, index) => (
                <li key={index}>
                  <Link to={`/article/${article.id}`} className="category-link">
                    {article.attributes.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
