<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>RAW</title>
</head>
<body>
<script>
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  document.body.innerText = code
    ? decodeURIComponent(code)
    : "-- لا يوجد سكربت";
</script>
</body>
</html>
