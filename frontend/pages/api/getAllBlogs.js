export default async function handler(req, res) {
  console.log(`http://${process.env.flaskApi}/getAllBlogs`)
  const response = await fetch(`http://${process.env.flaskApi}/getAllBlogs`);
  const data = await response.json();
  res.status(200).json({ data });
}
