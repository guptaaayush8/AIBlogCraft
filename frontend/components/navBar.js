import Link from "next/link";
import styles from "../styles/navBar.module.css";
const Navbar = () => {
  return (
    <>
      <nav className={styles.navBar}>
        <h1 className={styles.title}>
          <Link href="/">AI Articles</Link>
        </h1>
        <ul className={styles.ul}>
          <li key="create" className={styles.li}>
            <Link className="createPage" href="/create">
              <p>Create Article</p>
            </Link>
          </li>
          <li key="health" className={styles.li}>
            <Link className="aboutPage" href="/api/healthCheck">
              <p>Health</p>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
