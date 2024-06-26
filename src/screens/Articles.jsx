import { useEffect, useMemo, useState } from "react";
import request from "../utils/request";
import { useToast } from "@chakra-ui/react";
import MyToast from "../utils/Toast";
import { Link } from "react-router-dom";

const Articles = () => {
  const toast = useToast();
  const myToast = useMemo(() => new MyToast(toast), [toast]);
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const { data } = await request.get("/articles/?populate=*");
      setArticles(data.data);
    } catch (error) {
      console.log("error: ", error);
      myToast.error(error.response.data.error.message)
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <div className="w-full sm:w-7/12 md:w-8/12 py-10 sm:pr-5 flex flex-col gap-y-5">
      {articles?.map((article, index) => (
        <article className="article" key={index}>
          <header>
            <Link to={`/article/${article.id}`} className="article__title">{article.attributes.title}</Link>
            <ul className="article__tags" key={index}>
              <li className="article__tag">
                {article.attributes?.category?.data?.attributes.name}
              </li>
              <li className="article__tag">
                {article.attributes?.author.data.attributes.username} - author
              </li>
            </ul>
          </header>
          <div className="article__content">
            <p className="article__description max-h-16 overflow-hidden">{article.attributes?.content}</p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Articles;
