import { useState, useEffect } from "react";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  const API_URL = "http://localhost:3000/tarefas";

  // Buscar tarefas do backend ao carregar a página
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTarefas(data))
      .catch((err) => console.error("Erro ao buscar tarefas:", err));
  }, []);

  // Adicionar tarefa no backend
  const adicionarTarefa = () => {
    if (novaTarefa.trim() === "") return;

    const tarefa = { titulo: novaTarefa, concluida: false };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tarefa),
    })
      .then((res) => res.json())
      .then((data) => {
        setTarefas([...tarefas, data]);
        setNovaTarefa("");
      })
      .catch((err) => console.error("Erro ao adicionar tarefa:", err));
  };

  // Deletar tarefa no backend
  const deletarTarefa = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setTarefas(tarefas.filter((t) => t.id !== id)))
      .catch((err) => console.error("Erro ao deletar tarefa:", err));
  };

  // Marcar/desmarcar tarefa como concluída
  const alternarConcluida = (tarefa) => {
    fetch(`${API_URL}/${tarefa.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...tarefa, concluida: !tarefa.concluida }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTarefas(
          tarefas.map((t) => (t.id === data.id ? data : t))
        );
      })
      .catch((err) => console.error("Erro ao atualizar tarefa:", err));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Lista de Tarefas</h1>

      <input
        type="text"
        placeholder="Digite uma tarefa"
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
        style={{ padding: "10px", width: "200px" }}
      />

      <button
        style={{ padding: "10px", marginLeft: "10px" }}
        onClick={adicionarTarefa}
      >
        Adicionar
      </button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {tarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "250px",
              margin: "0 auto",
              backgroundColor: "#f0cab5ff",
              color: "#333",
              marginBottom: "5px",
              borderRadius: "5px",
              textDecoration: tarefa.concluida ? "line-through" : "none",
              opacity: tarefa.concluida ? 0.6 : 1,
              cursor: "pointer",
            }}
            onClick={() => alternarConcluida(tarefa)}
          >
            {tarefa.titulo}
            <button
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "5px",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                deletarTarefa(tarefa.id);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
