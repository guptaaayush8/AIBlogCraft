import { useEffect, useState } from "react";
import styles from "../styles/frontPage.module.css";

export default function Home() {
  const [blogs, setBlogs] = useState([]); // Ensure it's always an array
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    fetch(`/api/getAllBlogs`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setBlogs(data || []); // Ensure `data.data` is always an array
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const deleteCard = async (id) => {
    console.log(`Deleting blog ${id}`);
    const response = await fetch(`/api/deleteBlog/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setBlogs(blogs.filter((blog) => blog.id !== id)); // Remove deleted blog
    } else {
      console.error("Failed to delete blog");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading blogs.</p>;

  return (
    <div>
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.Id} className={styles.card}>
            <div className={styles.cardheader}>
              <a href={`/article/${blog.Id}`} className={styles.cardtitle}>
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
                <a href={`/article/${blog.Id}`}>
                  <button className={styles.readbutton}>Read</button>
                </a>
                <button
                  className={styles.deletebutton}
                  onClick={() => deleteCard(blog.Id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
