const { user, goal } = require("../../models");

module.exports = {
  get: async (req, res) => {
    const sess = req.session;
    const { body_part } = req.body;
    if (sess.userid) {
      try {
        const result = await goal.findOne({
          where: {
            user_id: sess.userid,
          },
          attributes: [body_part],
        });
        if (result) {
          res.status(200).json(result[body_part]);
        } else {
          res.status(400).send("잘못된 접근입니다");
        }
      } catch (e) {
        console.log(e);
        res.status(500).send("목표값을 가져오는데 실패했습니다");
      }
    } else {
      res.status(404).send("세션이 없습니다");
    }
  },
  post: async (req, res) => {
    const sess = req.session;
    const { body_part, value } = req.body;
    if (sess.userid) {
      try {
        const result = await goal.update(
          {
            [body_part]: value,
          },
          {
            where: {
              user_id: sess.userid,
            },
          }
        );
        if (result) {
          res.status(200).send("목표 설정에 성공했습니다");
        } else {
          res.status(400).send("잘못된 접근입니다");
        }
      } catch (e) {
        console.log(e);
        res.status(500).send("목표 설정에 실패했습니다");
      }
    } else {
      res.status(404).send("세션이 없습니다");
    }
  },
  put: async (req, res) => {
    const sess = req.session;
    const { body_part, value } = req.body;
    if (sess.userid) {
      try {
        const result = await goal.update(
          {
            [body_part]: value,
          },
          {
            where: {
              user_id: sess.userid,
            },
          }
        );
        if (result) {
          res.status(200).send("목표 설정에 성공했습니다");
        } else {
          res.status(400).send("잘못된 접근입니다");
        }
      } catch (e) {
        console.log(e);
        res.status(500).send("목표 설정에 실패했습니다");
      }
    } else {
      res.status(404).send("세션이 없습니다");
    }
  },
  delete: async (req, res) => {
    const sess = req.session;
    const { body_part } = req.body;
    if (sess.userid) {
      try {
        const result = await goal.update(
          {
            [body_part]: null,
          },
          {
            where: {
              user_id: sess.userid,
            },
          }
        );
        if (result) {
          res.status(200).send("목표 삭제에 성공했습니다");
        } else {
          res.status(400).send("잘못된 접근입니다");
        }
      } catch (e) {
        console.log(e);
        res.status(500).send("목표 삭제에 실패했습니다");
      }
    } else {
      res.status(404).send("세션이 없습니다");
    }
  },
};
