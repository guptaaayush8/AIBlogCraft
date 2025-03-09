'use client'
import { useEffect, useState } from "react";
import styles from "../styles/frontPage.module.css";
import Router from "next/router";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`/api/getAllBlogs`)
      .then((response) => response.json())
      .then((data) => setBlogs(data.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const deleteCard = async (id) => {
    console.log(`Deleting blog ${id}`);
    const response = await fetch(`/api/deleteBlog`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setBlogs(blogs.filter((blog) => blog.id !== id)); // Remove deleted blog from state
    } else {
      console.error("Failed to delete blog");
    }
  };

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} className={styles.card}>
          <div className={styles.cardheader}>
            <a href={`/article/${blog.id}`} className={styles.cardtitle}>
              <h3>{blog.Title}</h3>
            </a>
            <div>
              <p className={styles.cardsubtitle}>{blog.Author}</p>
              <p className={styles.cardsubtitle}>{blog.TimeUploaded}</p>
            </div>
          </div>
          <hr />
          <div className={styles.cardbody}>
            <p className={styles.cardtext}>{blog.ShortContent}</p>
            <div className={styles.buttonGroup}>
              <a href={`/article/${blog.id}`}>
                <button className={styles.readbutton}>Read</button>
              </a>
              <button
                className={styles.deletebutton}
                onClick={() => deleteCard(blog.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
