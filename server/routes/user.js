const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtKey = require("../config/jwt");
const bcrypt = require("bcrypt");
const rounds = 10; //암호 자릿수
//커넥션 설정
const pool = require("../config/pool"); //pool을 가져온다.
router.post("/login", async (req, res) => {
    //로그인
    const sql = "SELECT user_no,user_password FROM user WHERE user_id = ?";
    const { id, password } = req.body;
  
    try {
      const [result] = await pool.query(sql, [id]);
  
      if (result.length > 0) {
        //비밀번호 복호화
        bcrypt.compare(password, result[0].user_password, function (err, match) {
          if (match) {
            // 토큰생성
            const token = jwt.sign(
              {
                userNo: result[0].user_no, //db의 유저넘버
              },
              jwtKey.secret,
              {
                expiresIn: "5h", //지속시간
              }
            );
            // 쿠키저장
            res.cookie("user",token);
            res.json({ success: true, result: token });
          } else {
            res.json({
              success: false,
              message: "비밀번호가 일치하지 않습니다.",
            });
          }
        });
      } else {
        res.json({ success: false, message: "아이디가 일치하지 않습니다." });
      }
    } catch (err) {
      throw err;
    }
  });
  
  router.get("/logout", (req, res) => {
    if (req.cookies.user) {
      //로그아웃하려는 쿠키가 있을때
      res.clearCookie("user");
      res.json({ success: true, message: "로그아웃 성공" });
    } else {
      res.json({ success: false, message: "로그아웃 에러" });
    }
  });
  
  router.post("/signup", async (req, res) => {
    //회원가입
    const sqlId = "SELECT user_id FROM user WHERE user_id = ?";
    const sqlCreate = "INSERT INTO user values (null,?,?)";
      
    const { id, password } = req.body;
    try {
      const dbId = await pool.query(sqlId, [id]);
      if (dbId[0].length > 0) {
        return res.json({ success: false, message: "중복된 아이디 입니다." });
      }
      //비밀번호 암호화
      bcrypt.hash(password, rounds, async function (err, hash) {
        const result = await pool.query(sqlCreate, [id, hash]);
        return res.json({ success: true, result: result });
      });
    } catch (err) {
      throw err;
    }
  });
  
  module.exports = router;