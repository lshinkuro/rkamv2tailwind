import React, { useEffect } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";

const PDFviewer = (props) => {
  const [url, setUrl] = React.useState<string>("");
  const files = props.element;

  useEffect(() => {
    if (files.length !== 0) {
      files.length > 0 && setUrl(URL.createObjectURL(files[0]));
    }
    console.log(files);
  }, [files]);

  return (
    <div className="m-5 p-5 bg-white shadow-md rounded">
      <div className="mt-4" style={{ height: "400px" }}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          {url ? (
            <div
              style={{
                border: "1px solid rgba(0, 0, 0, 0.3)",
                height: "100%",
              }}
            >
              <Viewer fileUrl={url} />
            </div>
          ) : (
            <div
              style={{
                alignItems: "center",
                border: "2px dashed rgba(0, 0, 0, .3)",
                display: "flex",
                fontSize: "2rem",
                height: "100%",
                justifyContent: "center",
                width: "100%",
              }}
            >
              Preview area
            </div>
          )}
        </Worker>
      </div>
    </div>
  );
};

export default PDFviewer;
