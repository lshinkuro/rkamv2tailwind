import React, { useState } from 'react'
import PDFviewer from '../../components/PDFviewer';

const PDFtest = () => {
    const [PDFelemet, setPDFelemet] = useState<any>([])
    const pdfHandler = (e: any) => {
        setPDFelemet(e.target.files);
    }
    return (
        <div className="mt-5">
            <input type="file" accept=".pdf" onChange={pdfHandler} />
            <PDFviewer element={PDFelemet} />
        </div>
    )
}

export default PDFtest
