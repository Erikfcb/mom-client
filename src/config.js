export default {
  serverUrl:
    process.env.REACT_APP_NODE_ENV === "production"
      ? process.env.REACT_APP_SERVER_URL
      : "http://localhost:5000"
};
