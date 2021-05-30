import React from 'react'
import BreadCrumb from "../../components/BreadCrumb";
import Button from "../../components/Button"


function index() {
    const item = ["Evaluasi Diri Madrasah"]
    return (
        <div>
            <BreadCrumb data={item} title="Evaluasi Diri Madrasah" />
            <div className="px-6">
                <div className="pt-4 pb-100 px-8 bg-white dark:bg-gray-900 shadow-sm rounded-sm my-3">
                    <div >
                        <h5 className="text-gray-600  text-xl font-semibold text-center">Assalamualaikum Warahmatullahi Wabarakatuh</h5>
                        <p className="mt-5 text-gray-600 text-sm">
                            Tim Penjaminan Mutu (TPM) Madrasah Yang Terhormat.
                        </p>
                        <p className="mt-2 text-gray-600 text-sm">
                            Evaluasi Diri Madrasah (EDM) ini adalah suatu proses penilaian mutu penyelenggaraan pendidikan berdasarkan indikator-indikator kunci yang mengacu pada Standar Nasional Pendidikan (SNP). Salah satu manfaat penting dari EDM agar madrasah mengetahui kekuatan, kelemahan dan tantangan yang dimilikinya madrasah dalam rangka untuk memperbaiki mutu pendidikan madrasah itu sendiri. Oleh karena itu, dalam pengisian instrumen EDM ini agar TPM melakukan dengan penuh kesadaran, jujur dan objektif berdasarkan fakta.       
                        </p>
                        <p className="mt-2 text-gray-600 text-sm">Semangat kebersamaan seluruh warga madrasah untuk mau mengevaluasi diri demi kemajuan bersama adalah kunci dari keberhasilan EDM ini. Melalui EDM, insya Alloh madrasah akan semakin maju.
                        </p>
                    </div>
                    <div className=" flex justify-center item-center mt-4">
                       <p className="text-teal-600 text-sm ">Dokumen Pedoman Edm</p>
                       <a href="/" className="text-sm mx-2 text-center text-red-500">Download</a>
                    </div>
                    <div className=" flex justify-center item-center mt-4">
                       <p className="text-teal-600 text-sm ">User Manual Edm</p>
                       <a href="/" className="text-sm mx-2 text-center text-red-500">Download</a>
                    </div>
                    <div className=" flex justify-center item-center mt-4 mb-9">
                        <Button label="isi instrumen pdf" onClick={()=>{}}/>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default index
