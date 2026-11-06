
import React, { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div style={{
      minHeight: "100vh",
      background: "#090909",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
      padding: "24px",
      boxSizing: "border-box"
    }}>
      <h1 style={{ color: "#d6b36a" }}>ZAK Wallet</h1>
      <p style={{ color: "#888" }}>Educational wallet interface</p>

      <h2 style={{ marginTop: "50px" }}>
        {page === "home" ? "Главная" : page === "assets" ? "Активы" : "Настройки"}
      </h2>

      <div style={{
        marginTop: "25px",
        padding: "24px",
        background: "#171717",
        borderRadius: "18px"
      }}>
        <p style={{ color: "#999" }}>Баланс</p>
        <h1>— — —</h1>
        <p style={{ color: "#888" }}>Учебный интерфейс · без реальных средств</p>
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "25px" }}>
        {["home", "assets", "settings"].map(item => (
          <button
            key={item}
            onClick={() => setPage(item)}
            style={{
              flex: 1,
              padding: "14px 5px",
              borderRadius: "12px",
              border: "1px solid #444",
              background: page === item ? "#d6b36a" : "#171717",
              color: page === item ? "#090909" : "#fff"
            }}
          >
            {item === "home" ? "Главная" : item === "assets" ? "Активы" : "Настройки"}
          </button>
        ))}
      </div>
    </div>
  );
}
