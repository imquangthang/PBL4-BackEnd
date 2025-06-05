import dotenv from "dotenv";
dotenv.config();

const configCORS = (app) => {
  const allowedOrigins = [process.env.REACT_URL, process.env.WEB_URL];

  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin); // ✔ Chỉ cho phép origin đang gọi
    }

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");

    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });
};

export default configCORS;
