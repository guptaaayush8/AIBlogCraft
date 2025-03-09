import styles from "../../styles/article.module.css";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function BlogPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [blog, setBlog] = useState(null);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`/api/getBlog`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setBlog(data.data[0]);
        setText(data.data[0]?.Content || "");
      })
      .catch((error) => console.error("Error fetching blog:", error));
  }, [id]);

  const handleEditClick = async () => {
    if (editing) {
      await doneEdit(blog.Id, text);
    }
    setEditing(!editing);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const deleteCard = async (id) => {
    console.log(`Deleting blog ${id}`);
    const response = await fetch("/api/deleteBlog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      Router.push("/");
    } else {
      console.error("Failed to delete blog");
    }
  };

  const doneEdit = async (id, content) => {
    console.log(`Updating blog ${id}`);
    const response = await fetch("/api/updateBlog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Id: id, Content: content }),
    });

    if (!response.ok) {
      console.error("Failed to update blog");
    }
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <article className={styles.article}>
      <div className={styles.articleInfo}>
        <h1 className={styles.articleTitle}>{blog.Title}</h1>
        <span className={styles.articleAuthor}>{blog.Author}</span>
        <span className={styles.articleDate}>{blog.TimeUploaded}</span>
      </div>
      <div className={styles.articleContent}>
        {editing ? (
          <textarea
            className={styles.articleTextArea}
            value={text}
            onChange={handleTextChange}
          />
        ) : (
          <div>{text}</div>
        )}
      </div>
      <button className={styles.articleEdit} onClick={handleEditClick}>
        {editing ? "Done" : "Edit"}
      </button>
      <button
        className={styles.articleDelete}
        onClick={() => deleteCard(blog.Id)}
      >
        Delete
      </button>
    </article>
  );
}
