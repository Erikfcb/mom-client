console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
console.log("process.env.SERVER_URL: ", process.env.SERVER_URL);
export default {
  serverUrl:
    process.env.NODE_ENV === "production"
      ? process.env.SERVER_URL
      : "http://localhost:5000"
};
