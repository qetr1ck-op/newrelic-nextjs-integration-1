function Error({ statusCode, err }) {
  return (
    <div>
      <p>
        {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
      </p>
      <pre>{err}</pre>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  if (typeof window == 'undefined') {
    const newrelic = require('newrelic');
    newrelic.noticeError(err);
  } else {
    // @ts-ignore
    window.newrelic.noticeError(err);
  }

  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, err };
};

export default Error;
