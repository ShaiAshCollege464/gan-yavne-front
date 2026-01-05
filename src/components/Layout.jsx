import React from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import '../styles/global.css';
import Button from "./Button";
import Input from "./Input";

const Layout = ({ children, title, searchValue, setSearchValue }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--border)',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {title && <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{title}</h1>}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Input
            placeholder="Search..."
            value={searchValue || ""}
            onChange={(e) => setSearchValue && setSearchValue(e.target.value)}
            style={{ marginBottom: 0, width: '300px' }}
          />
          <Button
            text="Logout"
            variant="secondary"
            onClick={handleLogout}
            style={{ width: 'auto' }}
          />
        </div>
      </header>

      <main className="main-content" style={{ flex: 1 }}>
        {children}
      </main>

      <footer style={{
        marginTop: 'auto',
        padding: '2rem 0',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.9rem'
      }}>
        <p style={{ marginBottom: '0.5rem' }}>
          The site was created by students from Ashkelon College Computer Science Year 3 2025 as part of a course on Integrated Development Environments Innovative.
        </p>
        <p>
          All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
