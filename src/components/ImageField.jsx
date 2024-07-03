import { useEffect, useMemo, useState } from "react";
import request from "../utils/request";
import { useToast } from "@chakra-ui/react";
import MyToast from "../utils/Toast";

const ImageField = ({ image, changeHandler, editAllowed }) => {
  const toast = useToast();
  const myToast = useMemo(() => new MyToast(toast), [toast]);

  // state
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [img, setImg] = useState();

  //   change handler function
  const handleImageChange = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    setImg(file);
    setFlag(true);
  };

  const handleAttachmentSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("files", img);
      const { data } = await request.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data) {
        myToast.success("image uploaded successfully");
        setImagePreview(data[0].url);
        changeHandler({ target: { name: "image", value: data[0].id } });
      }
    } catch (error) {
      console.log(error);
      myToast.error(error.response.data.error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (flag) {
      handleAttachmentSubmit();
      setFlag(false);
    }
  }, [img]);

  return (
    <div className="flex justify-left items-start flex-col w-full">
      <label htmlFor="image-upload" className="cursor-pointer flex w-full">
        <div className="ml-auto w-[320px] h-[320px] flex justify-center items-center border-2 border-[#E5E5E5] rounded-[12px] overflow-hidden">
          {imagePreview ? (
            <img
              src={"http://localhost:1337" + imagePreview}
              alt="Vehicle"
              className="w-full h-full bg-cover"
            />
          ) : loading ? (
            "..."
          ) : (
            <img
              src={
                image
                  ? "http://localhost:1337" + image
                  : "/icons/placeholder.svg"
              }
              alt="placeholder"
              className="bg-cover"
            />
          )}
        </div>
        <input
          id="image-upload"
          name="image"
          type="file"
          onChange={handleImageChange}
          className="hidden"
          readOnly={!editAllowed}
          disabled={!editAllowed}
        />
      </label>
    </div>
  );
};

export default ImageField;
