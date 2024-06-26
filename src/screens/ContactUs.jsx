
const ContactUs = () => {
  return (
    <section className="contact w-full sm:w-7/12 md:w-8/12 py-10 sm:pr-5 flex flex-col gap-y-5">
      <h3 className="contact-title common-title">
        Contact, Feedback & Suggestions form
      </h3>
      <span className="contact-description common-description">
        Please, feel free to send us any feedback, suggestions, corrections or
        improvements.
      </span>

      <form
        action="#"
        method="post"
        className="w-full md:w-8/12 flex flex-col gap-y-5"
      >
        <div className="contact-form__field form__field">
          <label htmlFor="name" className="contact-form__label form__label">
            Your Name
          </label>
          <input
            type="text"
            value=""
            name="name"
            id="name"
            className="contact-form__input form__input"
            required
          />
        </div>
        <div className="contact-form__field form__field">
          <label htmlFor="subject" className="contact-form__label form__label">
            Subject
          </label>
          <input
            type="text"
            value=""
            name="subject"
            id="subject"
            className="contact-form__input form__input"
            required
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <label htmlFor="questions" className="contact-form__label w-full">
            Explain briefly any questions you may have, if you expect a reply,
            please include your email below
          </label>
          <textarea
            name="questions"
            id="questions"
            rows="4"
            className="resize-none w-full p-3 border-2 border-solid border-brightGray"
          ></textarea>
        </div>
        <div>
          <button type="submit" className="form__submit">
            Contact
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactUs;
