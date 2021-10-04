import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../utils/config";

export const authMiddleware = async (req, res, next) => {
  //   console.log(req.headers, req.header);
  const token = req.headers.authorization.split(" ")[1];

  try {
    const valueBool = await jwt.verify(token, ACCESS_TOKEN_KEY);

    console.log(valueBool);
    console.log("reached the end of block");
    next();
  } catch (err) {
    if (err.name == "TokenExpiredError") {
      try {
        console.log("Block 2");
        const refToken = req.header("x-auth-refToken");
        console.log("Block 2 ", refToken);
        const newVal = await jwt.verify(refToken, REFRESH_TOKEN_KEY);
        console.log("verified refreash token");
        next();
      } catch (err) {
        res.status(400).json({ err: err });
      }
    } else {
      res.staus(400).json(err);
    }
  }
};
