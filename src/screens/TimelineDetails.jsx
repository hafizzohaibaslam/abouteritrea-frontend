import { useToast } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyToast from "../utils/Toast";
import request from "../utils/request";

const TimelineDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();
  const myToast = useMemo(() => new MyToast(toast), [toast]);
  const [user, setUser] = useState();

  const [editEvent, setEditEvent] = useState(null);
  const [addEvent, setAddEvent] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [timeline, setTimeline] = useState();
  const [credentials, setCredentials] = useState({
    title: "",
    events: [],
  });

  const fetchTimeline = async (id) => {
    try {
      const { data } = await request.get(`/timelines/${id}/?populate=*`);
      setCredentials({
        title: data?.data?.attributes?.title,
        events: data?.data?.attributes?.events,
      });
      setTimeline(data?.data?.attributes);
    } catch (error) {
      console.log("error: ", error);
      myToast.error(error.response.data.error.message);
    }
  };

  const submitEditHandler = async (e) => {
    e.preventDefault();
    const { title, events } = credentials;
    console.log(credentials);

    if (!title || !events) {
      myToast.warning("Fields cannot be empty");
      return;
    }
    const filteredEvents = credentials.events.map(({ id, ...rest }) => rest);
    try {
      const { data } = await request.put(`/timelines/${id}`, {
        data: {
          title: credentials.title,
          events: filteredEvents,
        },
      });
      myToast.success("Timeline Edited Successfully!");
      setTimeout(() => {
        navigate(`/timeline`);
      }, 2000);
    } catch (error) {
      console.log("error: ", error);
      myToast.error(error.response.data.error.message);
    }
  };

  const submitNewHandler = async (e) => {
    e.preventDefault();
    const { title, events } = credentials;
    if (!title || !events) {
      myToast.warning("Fields cannot be empty");
      return;
    }
    const filteredEvents = credentials.events.map(({ id, ...rest }) => rest);
    try {
      const { data } = await request.post(`/timelines`, {
        data: {
          title: credentials.title,
          events: filteredEvents,
        },
      });
      myToast.success("Timeline created Successfully!");
      setTimeout(() => {
        navigate(`/timeline`);
      }, 2000);
    } catch (error) {
      console.log("error: ", error);
      myToast.error(error.response.data.error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleChangeForEvent = (e) => {
    const { name, value } = e.target;

    if (editEvent) {
      setEditEvent((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (addEvent) {
      setAddEvent((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleEditClick = (eventId) => {
    const eventToEdit = credentials.events.find(
      (event) => event.id === eventId
    );
    if (eventToEdit) {
      setEditEvent(eventToEdit);
    }
  };

  const handleSave = () => {
    if (editEvent) {
      const { name, date, description } = editEvent;
      if (!name || !date || !description) {
        myToast.warning("Fields cannot be empty");
        return;
      }
      setCredentials((prevState) => ({
        ...prevState,
        events: prevState.events.map((event) =>
          event.id === editEvent.id ? editEvent : event
        ),
      }));
    } else if (addEvent) {
      const { name, date, description } = addEvent;
      if (!name || !date || !description) {
        myToast.warning("Fields cannot be empty");
        return;
      }
      setCredentials((prevState) => ({
        ...prevState,
        events: [...prevState.events, addEvent],
      }));
    }
    setEditEvent(null); // clear the edit state after saving
    setAddEvent(null); // clear the edit state after saving
  };

  useEffect(() => {
    if (id) {
      fetchTimeline(id);
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [id]);

  useEffect(() => {
    const filteredEvents = credentials.events.map(({ id, ...rest }) => rest);
    console.log(filteredEvents);

    // console.log(credentials);
  }, [credentials]);

  return (
    <div className="w-full sm:w-7/12 md:w-8/12 py-10 sm:pr-5 flex flex-col gap-y-5">
      <article className="article w-full">
        <h1 className="mb-10 text-2xl font-bold">
          {id ? "Update Timeline" : "Add New Timeline"}
        </h1>
        <form
          onSubmit={id ? submitEditHandler : submitNewHandler}
          className="flex flex-col gap-5"
        >
          <div className="flex">
            <label className="text-lg font-semibold w-40">Category:</label>
            <input
              type="text"
              name="title"
              value={credentials.title}
              onChange={handleChange}
              className="border rounded-md p-1 px-2 w-full outline-none"
            />
          </div>

          <div className="flex gap-2">
            <h3 className="timeline-event-title block text-center border-none w-full">
              Events
            </h3>
            <button
              type="button"
              onClick={() =>
                setAddEvent({
                  id: credentials.events.length,
                  name: "",
                  date: "",
                  description: "",
                })
              }
              className=" bg-black text-white font-semibold px-4 py-1 rounded-md min-w-fit"
            >
              Add Event
            </button>
          </div>

          {/* Add Event Logic Goes Here */}
          {addEvent && (
            <div className="flex flex-col gap-2">
              <div className="flex items-start">
                <label className="text-lg font-semibold w-40">Title:</label>
                <input
                  type="text"
                  name="name"
                  value={addEvent.name}
                  onChange={(e) => handleChangeForEvent(e)}
                  className="border rounded-md p-1 px-2 w-full outline-none"
                />
              </div>
              <div className="flex items-start">
                <label className="text-lg font-semibold w-40">Date:</label>
                <input
                  type="text"
                  name="date"
                  value={addEvent.date}
                  onChange={handleChangeForEvent}
                  className="border rounded-md p-1 px-2 w-full outline-none"
                />
              </div>
              <div className="flex items-start">
                <label className="text-lg font-semibold w-40">Content:</label>
                <textarea
                  type="text"
                  name="description"
                  value={addEvent.description}
                  onChange={handleChangeForEvent}
                  className="border rounded-md p-1 px-2 w-full outline-none"
                />
              </div>

              <div className="flex gap-2 ml-auto ">
                <button
                  type="button"
                  onClick={() => setAddEvent(null)}
                  className=" bg-black text-white font-semibold px-4 py-1 rounded-md w-fit"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSave()}
                  className=" bg-black text-white font-semibold px-4 py-1 rounded-md w-fit"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {credentials?.events?.map((event, index) => (
            <div
              key={index}
              className={`flex flex-col gap-2 p-4 ${
                event.id === editEvent?.id && "border border-black rounded-md"
              }`}
            >
              {(user?.role === "Trusted" ||
                (user?.role === "Untrusted" &&
                  timeline.author?.data?.id === user.id)) && (
                <button
                  type="button"
                  onClick={() => handleEditClick(event.id)}
                  className={`ml-auto ${
                    editEvent?.id === event.id && "hidden"
                  }`}
                >
                  <img
                    src="/icons/edit.svg"
                    alt=""
                    className="hover:scale-125"
                  />
                </button>
              )}
              <div className="flex items-start">
                <label className="text-lg font-semibold w-40">Title:</label>
                <input
                  type="text"
                  name="name"
                  value={
                    event.id === editEvent?.id ? editEvent.name : event.name
                  }
                  onChange={(e) => handleChangeForEvent(e)}
                  className="border rounded-md p-1 px-2 w-full outline-none"
                  disabled={editEvent?.id !== event.id}
                />
              </div>
              <div className="flex items-start">
                <label className="text-lg font-semibold w-40">Date:</label>
                <input
                  type="text"
                  name="date"
                  value={
                    event.id === editEvent?.id ? editEvent.date : event.date
                  }
                  onChange={handleChangeForEvent}
                  className="border rounded-md p-1 px-2 w-full outline-none"
                  disabled={editEvent?.id !== event.id}
                />
              </div>
              <div className="flex items-start">
                <label className="text-lg font-semibold w-40">Content:</label>
                <textarea
                  type="text"
                  name="description"
                  value={
                    event.id === editEvent?.id
                      ? editEvent.description
                      : event.description
                  }
                  onChange={handleChangeForEvent}
                  className="border rounded-md p-1 px-2 w-full outline-none"
                  disabled={editEvent?.id !== event.id}
                />
              </div>
              {editEvent?.id === event.id && (
                <div className="flex gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setEditEvent(null)}
                    className=" bg-black text-white font-semibold px-4 py-1 rounded-md w-fit"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSave()}
                    className=" bg-black text-white font-semibold px-4 py-1 rounded-md w-fit"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          ))}

          <button
            type="submit"
            className=" bg-black text-white font-semibold px-4 py-1 rounded-md w-fit ml-auto mt-10"
          >
            {id ? "Update Timeline" : "Create Timeline"}
          </button>
        </form>
      </article>
    </div>
  );
};

export default TimelineDetails;
