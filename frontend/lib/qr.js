import QRCode from "qrcode";

export async function generateQrSvg(text) {
  return QRCode.toString(text, {
    type: "svg",
    margin: 0,
    color: { dark: "#0a1828", light: "#00000000" },
  });
}
