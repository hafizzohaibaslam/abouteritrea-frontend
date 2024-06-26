import { useEffect, useMemo, useState } from "react";
import request from "../utils/request";
import { useToast } from "@chakra-ui/react";
import MyToast from "../utils/Toast";
import { useNavigate, useParams } from "react-router-dom";

const Article = () => {
  // hools
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const myToast = useMemo(() => new MyToast(toast), [toast]);

  // local states
  const [article, setArticle] = useState([]);
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState("");
  const [articleId, setArticleId] = useState();
  const [user, setUser] = useState();

  const fetchArticle = async (id) => {
    try {
      const { data } = await request.get(`/articles/${id}/?populate=deep,3`);
      setArticle(data.data.attributes);
      setArticleId(data.data.id);
    } catch (error) {
      console.log("error: ", error);
      myToast.error(error.response.data.error.message);
    }
  };

  const submitCommentHandler = async (e) => {
    e.preventDefault();
    try {
      await request.post(`/comments/`, {
        data: {
          content: comment,
          article: articleId,
        },
      });

      myToast.success("Comment posted successfully");
      fetchArticle(articleId);
      setComment("");
    } catch (error) {
      console.log("error: ", error);
      myToast.error(error.response.data.error.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchArticle(id);
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [id]);
  return (
    <div className="w-full sm:w-7/12 md:w-8/12 py-10 sm:pr-5 flex flex-col gap-y-5">
      <article className="article">
        <header>
          <div className="flex justify-between items-center">
            <h2 className="article__title">{article.title}</h2>

            {(user?.role === "Trusted" ||
              (user?.role === "Untrusted" &&
                article.author?.data?.id === user.id)) && (
              <button onClick={() => navigate(`/article/edit/${id}`)}>
                <img src="/icons/edit.svg" alt="" className="hover:scale-125" />
              </button>
            )}
          </div>
          <ul className="article__tags">
            <li className="article__tag">
              {article.category?.data?.attributes?.name}
            </li>
            <li className="article__tag">{article.updatedAt}</li>
            <li className="article__tag">
              by:{" "}
              <strong className="capitalize">
                {" "}
                {article.author?.data?.attributes?.username}{" "}
              </strong>
            </li>
            <li className="article__tag">
              <span className="counter">{article.comments?.data?.length}</span>{" "}
              Comments
            </li>
          </ul>
        </header>
        <div className="article__content">
          <img
            className="size-40 float-left mr-2 my-2"
            src={`http://localhost:1337${article?.image?.data?.attributes?.url}`}
            alt="placeholder"
          />
          <p className="article__description">
            {article?.content}
          </p>
        </div>
      </article>

      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-xl">Comments</h1>

        <div className="flex flex-col gap-2">
          {
            // {/* Card */}
            article?.comments?.data?.map((comment, index) => (
              <div key={index} className="border rounded-md py-2 px-4">
                <div className="flex justify-between text-gray-500">
                  <h2 className=" text-black text-md font-semibold">
                    {comment?.attributes?.author?.data?.attributes?.username}
                  </h2>

                  <p className="text-gray-500 text-xs">
                    {comment?.attributes?.updatedAt?.slice(0, 10)}
                  </p>
                </div>
                <p className=" text-sm mt-1 text-gray-600">
                  {comment?.attributes?.content}
                </p>
              </div>
            ))
          }
        </div>

        {/* Comment write Edit Div */}
        <form onSubmit={submitCommentHandler} className="flex flex-col gap-1">
          <h1 className="font-bold text-md">Write Comment</h1>
          <input
            type="text"
            value={comment}
            className="border border-black rounded outline-none p-2 text-sm"
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className=" bg-black text-white font-semibold px-4 py-1 rounded-md w-fit ml-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Article;
