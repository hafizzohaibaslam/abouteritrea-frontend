import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  useToast,
} from "@chakra-ui/react";
import MyToast from "../utils/Toast";
import request from "../utils/request";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Timeline = () => {
  const toast = useToast();
  const myToast = useMemo(() => new MyToast(toast), [toast]);
  const navigate = useNavigate();
  const [timelines, setTimelines] = useState([]);
  const [user, setUser] = useState();

  const fetchTimeLines = async () => {
    try {
      const { data } = await request.get("/timelines/?populate=*");
      setTimelines(data.data);
    } catch (error) {
      console.log("error: ", error);
      myToast.error(error.response.data.error.message);
    }
  };

  useEffect(() => {
    fetchTimeLines();
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <section className="timeline-container w-full sm:w-7/12 md:w-8/12 py-10 sm:pr-5 flex flex-col gap-y-5">
      <div className="flex gap-2">
        <h3 className="timeline-title common-title text-lg font-bold w-full">
          Eritrean Timeline of Historical Events.
        </h3>
        {user?.role === "Trusted" && (
          <button
            onClick={() => navigate("/timeline/new")}
            className="bg-black text-white font-semibold px-4 py-1 rounded-md min-w-fit ml-auto h-fit"
          >
            Add Timeline
          </button>
        )}
      </div>
      <span className="timeline-description common-description">
        This section of abouteritrea is dedicated to listing the major
        historical events that happend in Eritrea from the pre-recorded history,
        upto contemporary events. Click on each topic to expand it, you may also
        discuss/comment by following instruction of the details
      </span>

      <div className="timeline grid grid-cols-1 gap-y-5">
        <section className="timeline-event border-none">
          {timelines?.map((timeline) => (
            <>
              <h3 className="timeline-event-title text-center border-none w-full flex gap-2 justify-between">
                <span>{timeline?.attributes?.title}</span>

                {(user?.role === "Trusted" ||
                  (user?.role === "Untrusted" &&
                    timeline?.attributes?.author?.data?.id === user.id)) && (
                  <button
                    onClick={() => navigate(`/timeline/edit/${timeline?.id}`)}
                  >
                    <img
                      src="/icons/edit.svg"
                      alt=""
                      className="hover:scale-125"
                    />
                  </button>
                )}
              </h3>
              <div className="timeline-event-desciption">
                <div className="timeline-event-list w-full">
                  <Accordion>
                    {timeline.attributes.events?.map((event, index) => (
                      <AccordionItem key={index}>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              <span className=" font-bold w-[50px] inline-block">
                                {event.date}{" "}
                              </span>
                              |<span className="pl-4">{event.name}</span>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <p className="w-full">{event.description}</p>
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </>
          ))}
        </section>
      </div>
    </section>
  );
};

export default Timeline;
