import React from "react";
import "@/style/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <div className='main'>{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
