export const removeDuplicate = function (arr: any, attr: any, value: any): any {
  var i = arr.length;
  while (i--) {
    if (
      arr[i] &&
      arr[i].hasOwnProperty(attr) &&
      arguments.length > 2 &&
      arr[i][attr] === value
    ) {
      arr.splice(i, 1);
    }
  }
  return arr;
};

export const getBulan = (bulan: number): string => {
  const daftarBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  if (bulan > 0 && bulan <= 12) return daftarBulan[bulan];
  else return "-";
};

export const uuidv4 = () => {
  return ([1e7].toString() + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    (c: any) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
  );
};

export const usulanKegiatanStatus = (
  sts: number
): {
  text: string;
  color: "success" | "danger" | "warning" | "neutral" | "primary";
} => {
  if (sts === 0) return { text: "Menunggu", color: "warning" };
  if (sts === 1) return { text: "Disetujui", color: "success" };
  if (sts === 9) return { text: "Ditolak", color: "danger" };
  return { text: "Menunggu", color: "warning" };
};
export const formatRupiah = (money: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(money);
};


export const isObject = (obj: any) => {
  return obj != null && obj.constructor.name === "Object";
};
