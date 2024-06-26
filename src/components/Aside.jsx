import { Link } from "react-router-dom";

const Aside = () => {
  return (
    <aside className="sidebar w-full sm:w-5/12 md:w-4/12 lg:w-3/12 py-10 border-t sm:pl-5 sm:border-l sm:border-t-0 border-solid border-brightGray">
      <div className="w-full border-b-2 border-solid border-brightGray pb-2">
        <img
          className="w-full h-full object-cover xs:h-52"
          src="https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg"
          alt="describe image"
        />
      </div>
      <div className="w-full border-b-2 border-solid border-brightGray py-2 text-sm">
        <b>Hello there!</b>
        <p>
          If we are looking for people to help us publish more articles, so, if
          you are interested, please feel free
          <Link to="/member" className="underline">
            <strong>to publish an article</strong>
          </Link>
          anytime.
        </p>
      </div>
      <div className="py-2 text-sm">
        <p>
          For any question you might have, head over to
          <Link to="/contact" className="underline">
            <strong>contact us</strong>
          </Link>
          page
        </p>
      </div>
    </aside>
  );
};

export default Aside;
