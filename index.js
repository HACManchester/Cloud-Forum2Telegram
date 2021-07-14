/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

exports.newDiscourseTopic = (req, res) => {
  const topic = req.body.topic;

  if (topic) {
    const title = topic.title;

    res.status(200).send(topic);
  } else {
    res.status(400);
  }
};
