export const errorHandler = (err, _req, res, _next) => {
  const status = res.statusCode ? res.statusCode : 500 // server error 
  res.status(status)
  console.log(err.message);
  res.json({ message: err.message, isError: true })
}; 