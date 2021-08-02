import { useEffect, useState } from "react";
import ImageIcon from "@material-ui/icons/Image";
import { uploadPostImage } from "../services/post-service";

export default function PostForm(props) {
  const [message, setMessage] = useState("");

  const [fileName, setFileName] = useState("");

  const [imgFromCloud, setImgFromCloud] = useState({
    data: { secure_url: "" },
  });

  const [formState, setFormState] = useState({
    text: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (props.post) {
      setFormState(props.post);
      setImgFromCloud({ data: { secure_url: props.post.imageUrl } });
    }
  }, [props.posts]);

  function handleChange(e) {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleImageFile(e) {
    const file = e.target.files[0];
    setFileName(file.name);
    if (file) {
      let imageData;
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "ljxjnqss");
      imageData = await uploadPostImage(data);
      setImgFromCloud(imageData);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { text } = formState;
    
    if (!text) {
      setMessage("Enter all fields");
    } else {
      props.handleAdd({ ...formState, imageUrl: imgFromCloud.data.secure_url });
      setFormState({
        text: "",
        imageUrl: "",
      });
      setImgFromCloud({ data: { secure_url: "" } });
      setFileName("");
    }
  }
  return (
    <div className="card-action">
      <form>
          {message && (<p style={{color: 'red'}}>{message}</p>)}
        <input
          type="text"
          name="text"
          placeholder="What's happening?"
          value={formState.text}
          onChange={handleChange}
        />
        {/* ************ Add image here */}
        <div className="file-field input-field">
          <div className="btn pink darken-2">
            <span style={{ fontSize: 24 }}>
              <ImageIcon />
            </span>
            <input type="file" name="imageUrl" onChange={handleImageFile} />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              value={
                fileName
                  ? fileName
                  : props.post
                  ? imgFromCloud.data.secure_url
                  : ""
              }
              onChange={() => {}}
            />
          </div>
        </div>
        <button
          type="submit"
          style={{ marginLeft: "88%" }}
          className="btn white-text pink darken-2"
          onClick={handleSubmit}
        >
          post
        </button>
      </form>
    </div>
  );
}
