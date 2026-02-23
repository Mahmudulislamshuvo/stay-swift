import React from "react";

const formatTextWithLineBreaks = (text) => {
  if (!text) return null;

  return text.split("\n").map((line, index, array) => (
    <React.Fragment key={index}>
      {line}

      {index !== array.length - 1 && <br />}
    </React.Fragment>
  ));
};

const Overview = ({ overview }) => {
  return (
    <section>
      <div className="container py-8">
        <h2 className="font-bold text-xl my-4">Overview</h2>
        <p className="text-gray-600 leading-8">
          {formatTextWithLineBreaks(overview)}
        </p>
      </div>
    </section>
  );
};

export default Overview;
