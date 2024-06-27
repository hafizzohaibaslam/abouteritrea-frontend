import { useEffect, useMemo, useState } from "react";
import request from "../utils/request";
import { useToast } from "@chakra-ui/react";
import MyToast from "../utils/Toast";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

const Articles = ({ searchTerm }) => {
  const toast = useToast();
  const myToast = useMemo(() => new MyToast(toast), [toast]);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

  // Pagination
  const [count, setCount] = useState(1);
  const [selectedValue, setSelectedValue] = useState();
  const [totalCount, setTotalCount] = useState();
  const [pages, setPages] = useState(1);

  const fetchArticles = async () => {
    try {
      const { data } = await request.get("/articles/?populate=*");
      setArticles(data.data);
      setFilteredArticles(data.data);
      setCount(data?.meta?.pagination?.page);
      setTotalCount(data?.meta?.pagination?.total);
      setPages(data?.meta?.pagination?.pageCount);
    } catch (error) {
      console.log("error: ", error);
      myToast.error(error.response.data.error.message);
    }
  };

  useEffect(() => {
    const filteredArticles = articles.filter((article) =>
      article.attributes.title.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setFilteredArticles(filteredArticles);
  }, [searchTerm]);


  useEffect(() => {
    fetchArticles();
  }, [count, selectedValue]);

  return (
    <div className="w-full sm:w-7/12 md:w-8/12 py-10 sm:pr-5 flex flex-col gap-y-5">
      {filteredArticles?.map((article, index) => (
        <article className="article" key={index}>
          <header>
            <Link to={`/article/${article.id}`} className="article__title">
              {article.attributes.title}
            </Link>
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
            <p className="article__description max-h-16 overflow-hidden">
              {article.attributes?.content}
            </p>
          </div>
        </article>
      ))}

      <Pagination
        count={count}
        setCount={setCount}
        selectedValue={selectedValue}
        totalCount={totalCount}
        pages={pages}
      />
    </div>
  );
};

export default Articles;
