import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "./assets/icon.png";
import "./Home.css";

function Home() {
    const navigate = useNavigate();

    // Estado para guardar o texto da nova tarefa
    const [novaTarefa, setNovaTarefa] = useState("");

    // Estado principal com as tarefas organizadas em colunas
    const [tarefas, setTarefas] = useState([
        { id: 1, texto: "Criar layout do Kanban", coluna: "a-fazer" },
        { id: 2, texto: "Ajustar estilos CSS", coluna: "em-andamento" },
        { id: 3, texto: "Configurar login", coluna: "concluido" }
    ]);

    function sair() {
        localStorage.removeItem("logado");
        navigate("/");
    }

    // Função para adicionar uma nova tarefa na coluna "A Fazer"
    function adicionarTarefa(e) {
        e.preventDefault();
        if (!novaTarefa.trim()) return;

        const nova = {
            id: Date.now(),
            texto: novaTarefa,
            coluna: "a-fazer"
        };

        setTarefas([...tarefas, nova]);
        setNovaTarefa("");
    }

    // Função para mover a tarefa para outra coluna
    function moverTarefa(id, novaColuna) {
        setTarefas(
            tarefas.map(tarefa =>
                tarefa.id === id ? { ...tarefa, coluna: novaColuna } : tarefa
            )
        );
    }

    // Função para excluir uma tarefa
    function deletarTarefa(id) {
        setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
    }

    return (
        <div className="layout-container">
            {/* BARRA SUPERIOR */}
            <header className="navbar">
                <div className="navbar-logo">
                    <img src={logoImg} alt="My Kanban Logo" className="logo-img" />
                    <span>My Kanban</span>
                </div>
                <nav className="navbar-menu">
                    <button className="btn-sair" onClick={sair}>
                        Sair
                    </button>
                </nav>
            </header>

            <main className="kanban-container">
                <form className="kanban-form" onSubmit={adicionarTarefa}>
                    <input
                        type="text"
                        placeholder="Digite uma nova tarefa..."
                        value={novaTarefa}
                        onChange={(e) => setNovaTarefa(e.target.value)}
                    />
                    <button type="submit">Adicionar Tarefa</button>
                </form>

                {/* QUADRO DE COLUNAS */}
                <div className="kanban-board">
                    {/* COLUNA 1: A FAZER */}
                    <div className="kanban-column">
                        <h3>A Fazer</h3>
                        <div className="kanban-cards">
                            {tarefas
                                .filter(t => t.coluna === "a-fazer")
                                .map(tarefa => (
                                    <div key={tarefa.id} className="kanban-card">
                                        <p>{tarefa.texto}</p>
                                        <div className="card-actions">
                                            <button onClick={() => moverTarefa(tarefa.id, "em-andamento")}>
                                                &rarr;
                                            </button>
                                            <button className="btn-delete" onClick={() => deletarTarefa(tarefa.id)}>
                                                &times;
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* COLUNA 2: EM ANDAMENTO */}
                    <div className="kanban-column">
                        <h3>Em Andamento</h3>
                        <div className="kanban-cards">
                            {tarefas
                                .filter(t => t.coluna === "em-andamento")
                                .map(tarefa => (
                                    <div key={tarefa.id} className="kanban-card">
                                        <p>{tarefa.texto}</p>
                                        <div className="card-actions">
                                            <button onClick={() => moverTarefa(tarefa.id, "a-fazer")}>
                                                &larr;
                                            </button>
                                            <button onClick={() => moverTarefa(tarefa.id, "concluido")}>
                                                &rarr;
                                            </button>
                                            <button className="btn-delete" onClick={() => deletarTarefa(tarefa.id)}>
                                                &times;
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* COLUNA 3: CONCLUÍDO */}
                    <div className="kanban-column">
                        <h3>Concluído</h3>
                        <div className="kanban-cards">
                            {tarefas
                                .filter(t => t.coluna === "concluido")
                                .map(tarefa => (
                                    <div key={tarefa.id} className="kanban-card">
                                        <p>{tarefa.texto}</p>
                                        <div className="card-actions">
                                            <button onClick={() => moverTarefa(tarefa.id, "em-andamento")}>
                                                &larr;
                                            </button>
                                            <button className="btn-delete" onClick={() => deletarTarefa(tarefa.id)}>
                                                &times;
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;