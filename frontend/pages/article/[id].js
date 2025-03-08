import styles from "../../styles/article.module.css";
import Router from "next/router";
import { useState } from "react";

export default function Home({ blog }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(blog.Content);

  const handleEditClick = () => {
    if (editing) {
      doneEdit(blog.Id, text);
    }
    setEditing(!editing);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };
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

export async function getServerSideProps({ params }) {
  const response = await fetch(`/api/getBlog`, {
    method: "POST",
    body: params.id,
  });
  const data = await response.json();
  const blog = await data.data[0];
  return {
    props: { blog },
  };
}

// export async function getStaticPaths() {
//   // const paths = allBlogs.map((article) => ({
//   //   params: { id: article.id.toString() },
//   // }));
//   // console.log(paths);
//   return { paths: [{ params: { id: "1" } }], fallback: false };
// }

const deleteCard = async (id) => {
  console.log(`this is delete for ${id}`);
  const response = await fetch(`/api/deleteBlog`, {
    method: "POST",
    body: id
  });
  const data = await response.json();
  console.log(data);
  Router.push("/");
};

const doneEdit = async (id, content) => {
  console.log(`this is update for ${id}`);
  const response = await fetch("/api/updateBlog", {
    method: "POST",
    body: JSON.stringify({
      Id: id,
      Content: content,
    }),
  });
  const data = await response.json();
  console.log(data);
};
