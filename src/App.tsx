
import React, { useMemo, useState } from "react";
import "./style.css";

const assets = [
  { name: "Bitcoin", symbol: "BTC", icon: "₿", color: "#F7931A", network: "Bitcoin" },
  { name: "Ethereum", symbol: "ETH", icon: "Ξ", color: "#8295F5", network: "Ethereum" },
  { name: "Toncoin", symbol: "TON", icon: "◆", color: "#249BD7", network: "TON" },
  { name: "Tether", symbol: "USDT", icon: "₮", color: "#26A17B", network: "Ethereum" },
  { name: "BNB", symbol: "BNB", icon: "◆", color: "#F3BA2F", network: "BNB Chain" }
];

type Asset = typeof assets[number];

export default function App() {
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState<Asset | null>(null);
  const [search, setSearch] = useState("");
  const [hidden, setHidden] = useState(false);
  const [dark, setDark] = useState(true);
  const [language, setLanguage] = useState("Русский");
  const [toast, setToast] = useState("");

  const filtered = useMemo(
    () => assets.filter(a =>
      `${a.name} ${a.symbol}`.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2500);
  }

  const navigation = [
    { id: "home", icon: "⌂", label: "Главная" },
    { id: "assets", icon: "◈", label: "Активы" },
    { id: "history", icon: "↻", label: "История" },
    { id: "settings", icon: "⚙", label: "Настройки" }
  ];

  function openPage(id: string) {
    setSelected(null);
    setPage(id);
  }

  return (
    <main className={`app ${dark ? "dark" : "light"}`}>
      <header className="topbar">
        <button className="brand" onClick={() => openPage("home")}>
          <span className="brand-logo">Z</span>
          <span>ZAK <b>WALLET</b></span>
        </button>
        <div className="top-right">
          <span className="demo-label">EDUCATION MODE</span>
          <button className="profile" onClick={() => openPage("settings")}>Z</button>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <div className="side-caption">РАБОЧЕЕ ПРОСТРАНСТВО</div>
          {navigation.map(item => (
            <button
              key={item.id}
              className={`nav-item ${page === item.id && !selected ? "active" : ""}`}
              onClick={() => openPage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
          <div className="sidebar-bottom">
            <span className="security-dot" />
            <div><b>Учебный режим</b><small>Реальные операции отключены</small></div>
          </div>
        </aside>

        <section className="content">
          {selected ? (
            <div className="page-view">
              <button className="back-button" onClick={() => setSelected(null)}>← Назад к активам</button>
              <div className="detail-card">
                <div className="coin-icon large" style={{ background: selected.color }}>{selected.icon}</div>
                <p className="eyebrow">ЦИФРОВОЙ АКТИВ</p>
                <h1>{selected.name}</h1>
                <p className="muted">{selected.symbol} · {selected.network}</p>
                <div className="detail-balance">— — — <span>{selected.symbol}</span></div>
                <p className="muted">Баланс не подключён</p>
                <div className="notice">Это учебная карточка актива. Реальные кошельки и транзакции не подключены.</div>
              </div>
            </div>
          ) : null}

          {!selected && page === "home" && (
            <>
              <div className="welcome">
                <div>
                  <p className="eyebrow">ВАШЕ ЦИФРОВОЕ ПРОСТРАНСТВО</p>
                  <h1>Добро пожаловать.</h1>
                  <p className="muted">Ваш портфель в одном месте.</p>
                </div>
                <span className="status-chip">● Система активна</span>
              </div>

              <div className="balance-card">
                <div className="balance-top">
                  <span>Общий баланс</span>
                  <button className="eye" onClick={() => setHidden(!hidden)}>
                    {hidden ? "Показать ◉" : "Скрыть ◎"}
                  </button>
                </div>
                <div className="balance-number">{hidden ? "••••••" : "— — —"} <span>USD</span></div>
                <p className="balance-note">Учебный интерфейс · реальные средства не подключены</p>
                <div className="balance-bottom">
                  <span>Мультивалютный обзор</span>
                  <b>ZAK WALLET</b>
                </div>
              </div>

              <div className="section-heading">
                <div><p className="eyebrow">ПОРТФЕЛЬ</p><h2>Ваши активы</h2></div>
                <button className="text-button" onClick={() => openPage("assets")}>Все активы →</button>
              </div>
              <div className="asset-list">
                {assets.slice(0, 4).map(coin => (
                  <button className="asset-row" key={coin.symbol} onClick={() => setSelected(coin)}>
                    <span className="coin-icon" style={{ background: coin.color }}>{coin.icon}</span>
                    <span className="coin-name"><b>{coin.name}</b><small>{coin.symbol}</small></span>
                    <span className="coin-network">{coin.network}</span>
                    <b className="coin-amount">—</b><span className="arrow">›</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {!selected && page === "assets" && (
            <div className="page-view">
              <p className="eyebrow">ВАШ ПОРТФЕЛЬ</p>
              <h1>Активы</h1>
              <p className="muted">Выберите актив, чтобы открыть его карточку.</p>
              <input className="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по названию или тикеру..." />
              <div className="asset-list">
                {filtered.map(coin => (
                  <button className="asset-row" key={coin.symbol} onClick={() => setSelected(coin)}>
                    <span className="coin-icon" style={{ background: coin.color }}>{coin.icon}</span>
                    <span className="coin-name"><b>{coin.name}</b><small>{coin.symbol}</small></span>
                    <span className="coin-network">{coin.network}</span>
                    <b className="coin-amount">—</b><span className="arrow">›</span>
                  </button>
                ))}
                {filtered.length === 0 && <p className="empty">Ничего не найдено.</p>}
              </div>
            </div>
          )}

          {!selected && page === "history" && (
            <div className="page-view">
              <p className="eyebrow">АКТИВНОСТЬ</p>
              <h1>История</h1>
              <div className="empty-card">
                <div className="empty-icon">↻</div>
                <h3>Пока нет операций</h3>
                <p>Здесь будут отображаться события учебного интерфейса. Реальные транзакции не выполняются.</p>
              </div>
            </div>
          )}

          {!selected && page === "settings" && (
            <div className="page-view">
              <p className="eyebrow">ПЕРСОНАЛИЗАЦИЯ</p>
              <h1>Настройки</h1>
              <div className="settings-list">
                <div className="setting-row">
                  <div><b>Тёмная тема</b><small>Оформление приложения</small></div>
                  <button className={`toggle ${dark ? "on" : ""}`} onClick={() => setDark(!dark)}>{dark ? "Вкл." : "Выкл."}</button>
                </div>
                <div className="setting-row">
                  <div><b>Язык интерфейса</b><small>Язык приложения</small></div>
                  <select value={language} onChange={e => setLanguage(e.target.value)}>
                    <option>Русский</option><option>English</option>
                  </select>
                </div>
                <div className="setting-row">
                  <div><b>Конфиденциальность</b><small>Секретные ключи не хранятся</small></div>
                  <span className="gold-text">Защищено</span>
                </div>
                <div className="setting-row">
                  <div><b>Версия приложения</b><small>ZAK Wallet</small></div>
                  <span className="muted">1.0.0</span>
                </div>
              </div>
              <button className="outline-button" onClick={() => notify("Настройки интерфейса сохранены")}>Сохранить настройки</button>
            </div>
          )}

          <footer className="footer">ZAK WALLET <span>·</span> Учебный интерфейс</footer>
        </section>
      </div>

      <nav className="mobile-nav">
        {navigation.map(item => (
          <button key={item.id} className={page === item.id && !selected ? "active" : ""} onClick={() => openPage(item.id)}>
            <span>{item.icon}</span><small>{item.label}</small>
          </button>
        ))}
      </nav>

      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}
