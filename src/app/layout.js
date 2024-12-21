import { Poppins } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/context/ToastContext";
import { RecordContextProvider } from "@/context/recordContext";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700", "800"],
  variable: "--font-poppins",
});
export const metadata = {
  title: "DLIMS",
  description: "Driving License Information Managment Software",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <div className="modelContainer"></div>
        <ToastProvider>
          <RecordContextProvider>{children}</RecordContextProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
