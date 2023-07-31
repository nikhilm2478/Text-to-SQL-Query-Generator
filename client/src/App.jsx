import sqlLogo from "/Users/nikhilmukherjee/Desktop/OPENAI-API-SQL/client/src/assets/sql-logo.png";
import "./App.css";
import styles from "/Users/nikhilmukherjee/Desktop/OPENAI-API-SQL/client/src/index.module.css";
import { useState } from "react";

function App() {
  const [queryDescription, setQueryDescription] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const query = await generateQuery();

    setSqlQuery(query);
  };

  const generateQuery = async () => {
    const response = await fetch("http://localhost:3005/generate", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ queryDescription: queryDescription }),
    });

    const data = await response.json();
    return data.sqlQuery.trim();
  };

  return (
    <main className={styles.main}>
      <img src={sqlLogo} alt="" className={styles.icon} />
      <h3>Generate SQL with AI</h3>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="quer-description"
          placeholder="Describe your query?"
          onChange={(event) => setQueryDescription(event.target.value)}
        />
        <input type="submit" value="Generate query" />
      </form>
      <pre>{sqlQuery}</pre>
    </main>
  );
}

export default App;
