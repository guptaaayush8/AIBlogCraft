export default async function handler(req, res) {
  const response = await fetch(`http://${process.env.flaskApi}/getBlog/${req.body}`);
  const data = await response.json();
  res.status(200).json({ data });
}
