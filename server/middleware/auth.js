const jwt = require("jsonwebtoken");
const jwtKey = require("../config/jwt");
const pool = require("../config/pool"); //pool을 가져온다.

const auth = (req, res, next) => {
  const sql = `SELECT user_no,user_id FROM user WHERE user_no = ?`;
  //클라이언트측에서 쿠키를 가져온다.
  const token = req.cookies.user;
  if (!token) {
    return res.json({ success: null , message: "로그인이 필요합니다." });
  } else {
    //쿠키 복호화한후 그 유저가 있는지 db에서 찾고 찾으면 넘겨준다.
    jwt.verify(token, jwtKey.secret, async function (err, decoded) {
      try {
        const [result] = await pool.query(sql, [decoded.userNo]);
        req.user = result[0]; //req에 넣어서 다음 미들웨어에게 전달
        req.token = token;
        next();
      } catch {
        //쿠키가 일치하지 않거나 만료되었을때
        res.clearCookie("user");
        return res.json({ success: false , message: "세션 만료" });
      }
    });
  }
};

module.exports = auth;