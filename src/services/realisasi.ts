import api from "../utils/api";

// save realisasi pendapatan
export const saveNotaPendapatan = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/save-nota-pendapatan', params)
}
// ./ save realisasi pendapatan

// get realisasi pendapatan
export const getNotaPendapatan = async (queryParam: object, limit?: number, offset?: number): Promise<any> => {
    const params = {
        limit: limit !== undefined ? limit.toString() : null,
        offset: offset !== undefined ? offset.toString() : null,
        queryParam: JSON.stringify(queryParam),
    };
    const response = await api
        .get<any>('/realisasi/nota-pendapatan', { params })
    return response.data.return
}
// ./ get realisasi pendapatan

// approval nota pendapatan
export const approvalNotaPendapatan = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/approval-nota-pendapatan', params)
}
// approval nota pendapatan

// delete nota pendapatan
export const deleteNotaPendapatan = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/delete-nota-pendapatan', params)
}
// ./delete nota pendapatan

// set tanggal realisasi nota pendapatan
export const setTanggalRealisasiNotaPendapatan = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/set-tanggal-realisasi-nota-pendapatan', params)
}
// set tanggal realisasi nota pendapatan

// get realisasi sumber dana
export const getSumberDana = async (param?: object): Promise<any> => {
    let params: any = {};
    if (param) params = { 'queryParam': JSON.stringify(param) };
    return await api
        .get<any>('/realisasi/sumber-dana', { params })
}
// ./ get realisasi sumber dana

// get realisasi tipe kas
export const getTipeKas = async (param?: object): Promise<any> => {
    let params: any = {};
    if (param) params = { 'queryParam': JSON.stringify(param) };
    return await api
        .get<any>('/realisasi/tipe-kas', { params })
}
// ./ get realisasi tipe kas

// get cek saldo
export const getCekSaldo = async (param?: object): Promise<any> => {
    let params: any = {};
    if (param) params = { 'queryParam': JSON.stringify(param) };
    return await api
        .get<any>('/realisasi/cek-saldo', { params })
}
// ./get cek saldo

// save nota pengeluaran
export const saveNotaPengeluaran = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/save-nota-pengeluaran', params)
}
// ./save nota pengeluaran

// get realisasi pengeluaran
export const getNotaPengeluaran = async (queryParam?: object, limit?: number, offset?: number): Promise<any> => {
    // let params: any = {};
    // if (param) params = {'queryParam': JSON.stringify(param)};
    const params = {
        limit: limit !== undefined ? limit.toString() : null,
        offset: offset !== undefined ? offset.toString() : null,
        queryParam: JSON.stringify(queryParam),
    };
    return await api
        .get<any>('/realisasi/nota-pengeluaran', { params })
}
// ./ get realisasi pengeluaran

// get realisasi pengeluaran detail
export const getNotaPengeluaranDetail = async (param?: object): Promise<any> => {
    let params: any = {};
    if (param) params = { 'queryParam': JSON.stringify(param) };
    return await api
        .get<any>('/realisasi/nota-pengeluaran-detail', { params })
}
// ./ get realisasi pengeluaran detail

// delete nota pengeluaran
export const deleteNotaPengeluaran = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/delete-nota-pengeluaran', params)
}
// ./delete nota pengeluaran

// set tanggal realisasi nota pengeluaran
export const setTanggalRealisasiNotaPengeluaran = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/set-tanggal-realisasi-nota-pengeluaran', params)
}
// set tanggal realisasi nota pengeluaran

// approval nota pengeluaran
export const approvalNotaPengeluaran = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/approval-nota-pengeluaran', params)
}
// approval nota pengeluaran

// pajak terutang
export const getPajakTerutang = async (param?: object): Promise<any> => {
    let params: any = {};
    if (param) params = { 'queryParam': JSON.stringify(param) };
    return await api
        .get<any>('/realisasi/pajak-terutang', { params })
}
// ./pajak terutang

// save nota pajak
export const saveNotaPajak = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/save-nota-pajak', params)
}
// ./save nota pajak

// get realisasi pajak
export const getNotaPajak = async (queryParam?: object, limit?: number, offset?: number): Promise<any> => {
    const params = {
        limit: limit !== undefined ? limit.toString() : null,
        offset: offset !== undefined ? offset.toString() : null,
        queryParam: JSON.stringify(queryParam),
    };
    return await api
        .get<any>('/realisasi/nota-pajak', { params })
}
// ./ get realisasi pajak

// delete nota pajak
export const deleteNotaPajak = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/delete-nota-pajak', params)
}
// ./delete nota pajak

// get nota pajak detail
export const getNotaPajakDetail = async (param?: object): Promise<any> => {
    let params: any = {};
    if (param) params = { 'queryParam': JSON.stringify(param) };
    return await api
        .get<any>('/realisasi/nota-pajak-detail', { params })
}
// ./get nota pajak detail

// approval nota pajak
export const approvalNotaPajak = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/approval-nota-pajak', params)
}
// approval nota pajak

// set tanggal realisasi nota pajak
export const setTanggalRealisasiNotaPajak = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/set-tanggal-realisasi-nota-pajak', params)
}
// ./set tanggal realisasi nota pajak

// save nota pindah buku
export const saveNotaPindahBuku = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/save-nota-pindah-buku', params)
}
// ./save nota pindah buku

// get realisasi pindah buku
export const getNotaPindahBuku = async (queryParam?: object, limit?: number, offset?: number): Promise<any> => {
    const params = {
        limit: limit !== undefined ? limit.toString() : null,
        offset: offset !== undefined ? offset.toString() : null,
        queryParam: JSON.stringify(queryParam),
    };
    return await api
        .get<any>('/realisasi/nota-pindah-buku', { params })
}
// ./ get realisasi pindah buku

// approval nota pindah buku
export const approvalNotaPindahBuku = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/approval-nota-pindah-buku', params)
}
// approval nota pindah buku

// set tanggal realisasi nota pindah buku
export const setTanggalRealisasiNotaPindahBuku = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/set-tanggal-realisasi-nota-pindah-buku', params)
}
// ./set tanggal realisasi nota pindah buku

// delete nota pindah buku
export const deleteNotaPindahBuku = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/delete-nota-pindah-buku', params)
}
// ./delete nota pindah buku

// save realisasi output kegiatan
export const saveOutputKegiatan = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/save-output-kegiatan', params)
}
// ./ save realisasi output kegiatan

// get realisasi output kegiatan
export const getOutputKegiatan = async (queryParam: object, limit?: number, offset?: number): Promise<any> => {
    const params = {
        limit: limit !== undefined ? limit.toString() : null,
        offset: offset !== undefined ? offset.toString() : null,
        queryParam: JSON.stringify(queryParam),
    };
    return await api
        .get<any>('/realisasi/output-kegiatan', { params })
}
// ./ get realisasi output kegiatan

// get rekap output kegiatan by sumber dana
export const getRekapOutputKegiatanBySumberDana = async (queryParam: object, limit?: number, offset?: number): Promise<any> => {
    const params = {
        limit: limit !== undefined ? limit.toString() : null,
        offset: offset !== undefined ? offset.toString() : null,
        queryParam: JSON.stringify(queryParam),
    };
    return await api
        .get<any>('/realisasi/rekap-output-kegiatan-by-sumber-dana', { params })
}
// ./ get rekap output kegiatan by sumber dana

// capaian output kegiatan
export const getCapaianOutputKegiatan = async (queryParam: object, limit?: number, offset?: number): Promise<any> => {
    const params = {
        limit: limit !== undefined ? limit.toString() : null,
        offset: offset !== undefined ? offset.toString() : null,
        queryParam: JSON.stringify(queryParam),
    };
    return await api
        .get<any>('/realisasi/capaian-output-kegiatan', { params })
}
// ./capaian output kegiatan

// get rencana output kegiatan
export const getRencanaOutputKegiatan = async (queryParam: object, limit?: number, offset?: number): Promise<any> => {
    const params = {
        limit: limit !== undefined ? limit.toString() : null,
        offset: offset !== undefined ? offset.toString() : null,
        queryParam: JSON.stringify(queryParam),
    };
    return await api
        .get<any>('/realisasi/rencana-output-kegiatan', { params })
}
// ./get rencana output kegiatan

// get realisasi output tahap kegiatan
export const getOutputTahapKegiatan = async (param?: object): Promise<any> => {
    let params: any = {};
    if (param) params = { 'queryParam': JSON.stringify(param) };
    return await api
        .get<any>('/realisasi/output-tahap-kegiatan', { params })
}
// ./ get realisasi output tahap kegiatan

// delete output kegiatan
export const deleteOutputKegiatan = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/delete-output-kegiatan', params)
}
// ./delete output kegiatan

// approval output kegiatan
export const approvalOutputKegiatan = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/approval-output-kegiatan', params)
}
// approval output kegiatan

// save pengembalian dana
export const saveNotaPengembalianDana = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/save-nota-pengembalian-dana', params)
}
// ./save pengembalian dana

// get nota pengembalian dana
export const getNotaPengembalianDana = async (queryParam?: object, limit?: number, offset?: number): Promise<any> => {
    const params = {
        limit: limit !== undefined ? limit.toString() : null,
        offset: offset !== undefined ? offset.toString() : null,
        queryParam: JSON.stringify(queryParam),
    };
    return await api
        .get<any>('/realisasi/nota-pengembalian-dana', { params })
}
// ./get nota pengembalian dana

// delete nota pengembalian dana
export const deleteNotaPengembalianDana = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/delete-nota-pengembalian-dana', params)
}
// ./delete nota pengembalian dana

// approval nota pengembalian dana
export const approvalNotaPengembalianDana = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/approval-nota-pengembalian-dana', params)
}
// approval nota pengembalian dana

// set tanggal realisasi nota pengembalian dana
export const setTanggalRealisasiNotaPengembalianDana = async (param: object): Promise<any> => {
    let params: any = {};
    Object.keys(param).forEach((item) => {
        params[`${item}`] = item
    });
    return await api
        .post<any>('/realisasi/set-tanggal-realisasi-nota-pengembalian-dana', params)
}
