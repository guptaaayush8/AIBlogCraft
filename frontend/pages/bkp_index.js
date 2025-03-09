import styles from "../styles/frontPage.module.css";
import Router from "next/router";

export default function Home({ blogs }) {
  return (
    <div>
      {blogs.map((blog) => (
        <div Key={blog.id} className={styles.card} id={blog.id}>
          <div className={styles.cardheader}>
            <a href={`/article/${blog.id}`} className={styles.cardtitle}>
              <h3>{blog.Title}</h3>
            </a>
            <div>
              <p className={styles.cardsubtitle}>{blog.Author}</p>
              <p className={styles.cardsubtitle}>{blog.TimeUploaded}</p>
            </div>
          </div>
          <hr></hr>
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
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  // Call the fetch method and passing
  // the pokeAPI link
  // const response = await fetch(`http://${process.env.selfService}/api/getAllBlogs`);
  const response = await fetch(`/api/getAllBlogs`);
  const data = await response.json();
  return {
    props: { blogs: data.data },

  };
}

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
