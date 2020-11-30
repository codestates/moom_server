const { user } = require("../../models");

module.exports = {
  post: (req, res) => {
    const { email, password } = req.body;
    var sess = req.session;
    user
      .findOne({
        where: {
          email: email,
        },
      })
      .then((result) => {
        if (result === null) {
          res.status(404).send("존재하지 않는 사용자 입니다");
        } else if (result.password !== password) {
          res.status(400).send("비밀번호가 일치하지 않습니다");
        }
        sess.userid = result.id;
        res.status(200).send("로그인 성공");
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("로그인에 실패했습니다");
      });
  },
};