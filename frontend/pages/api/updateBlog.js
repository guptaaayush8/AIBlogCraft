export default async function handler(req, res) {
  // const response = await fetch(`http://${process.env.flaskApi}/updateBlog`,
    const response = await fetch(`/updateBlog`,
  {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: req.body
  });
  const data = await response.json();
  res.status(200).json({ data });
}
