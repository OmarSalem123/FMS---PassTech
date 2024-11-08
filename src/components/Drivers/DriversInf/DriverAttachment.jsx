import React from "react";

export default function DriverAttachment({ values = {} }) {
  const { attachments = [] } = values;
  const getUrl = (type) => {
    const lowerCaseType = type.toLowerCase(); // Normalize to lowercase
    if (lowerCaseType === "image/png") {
      return `${process.env.PUBLIC_URL}/assets/PNG.svg`;
    } else if (
      lowerCaseType === "image/jpg" ||
      lowerCaseType === "image/jpeg"
    ) {
      return `${process.env.PUBLIC_URL}/assets/JPG.svg`;
    } else if (lowerCaseType === "application/pdf") {
      return `${process.env.PUBLIC_URL}/assets/PDF.svg`;
    } else {
      return `${process.env.PUBLIC_URL}/assets/Excel.svg`;
    }
  };
  const truncateName = (name) => {
    if (name.length > 9) {
      return `${name.substring(0, 9)}...`; // Truncate if longer than 10 chars
    }
    return name;
  };
  let files = attachments.map((i, index) => {
    return (
      <div key={i.id} className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
        <div className="attachments">
          <img src={`${getUrl(i.type)}`} width={28} alt="format" />
          <div className="ms-3 text-capitalize">
            <div className="d-flex justify-content-between">
              <a href={i.url} target="blank" className="me-2" title={i.name}>
                {truncateName(i.name)}
              </a>
              <div className="w-25">
                <img src="/assets/Correct.svg" className="w-100" alt="format" />
              </div>
            </div>
            <div className="attachsize">{i.size} MB</div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <>
        <p className="fs-16 fw-700 brand-700 text-uppercase mt-3">
          attachments
        </p>
        <div className="row">{files}</div>{" "}
      </>
    </>
  );
}
