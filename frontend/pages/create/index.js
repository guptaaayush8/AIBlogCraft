import React, { useState } from "react";
import Router from "next/router";
import styles from "../../styles/create.module.css";

const CreatePost = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    Title: "",
    Author: "",
    Content: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/createBlog", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    setData(data);
    Router.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.title}>
            <input
              type="text"
              name="Title"
              value={formData.title}
              className={styles.input}
              placeholder="Title"
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.author}>
            <input
              type="text"
              name="Author"
              className={styles.input}
              value={formData.author}
              placeholder="Author"
              onChange={handleInputChange}
            />
          </div>
          
        </div>
        <div className={styles.content}>
            <textarea
              name="Content"
              className={styles.textarea}
              value={formData.content}
              placeholder="Content"
              onChange={handleInputChange}
            />
          </div>
        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
