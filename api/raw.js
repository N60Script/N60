export default function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    res.status(400).send("-- no script");
    return;
  }

  res.setHeader("Content-Type", "text/plain");
  res.send(decodeURIComponent(code));
}
