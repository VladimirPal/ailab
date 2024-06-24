function logReq({ logger }) {
  return function (req, res, next) {
    function onResDone(err) {
      this.removeListener('finish', onResDone);
      this.removeListener('error', onResDone);
      logger.http({ req, res, err });
    }

    res.on('finish', onResDone);
    res.on('error', onResDone);
    next();
  };
}

export default logReq;
