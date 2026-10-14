import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import "./Login.css"; // reaproveitando os mesmos estilos do Login

function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [erro, setErro] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!nome || !email || !senha) {
            setErro("Preencha todos os campos.");
            return;
        }

        try {
            // POST /usuarios enviando { nome, email, senha }
            const resposta = await fetch("http://127.0.0.1:8000/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, senha }),
            });

            const dados = await resposta.json();

            if (resposta.status === 201 || resposta.ok) {
                // 201 Created: usuário cadastrado com sucesso
                setErro("");
                navigate("/"); // Redireciona para o Login (ou /login)
            } else if (resposta.status === 409) {
                // 409 Conflict: e-mail já cadastrado
                setErro(dados.detail || "E-mail já cadastrado.");
            } else {
                setErro("Algo deu errado. Tente de novo.");
            }
        } catch {
            setErro("Não foi possível falar com o servidor.");
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Cadastro</h2>

                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="password-wrapper">
                    <input
                        type={mostrarSenha ? "text" : "password"}
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setMostrarSenha((prev) => !prev)}
                        aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                    >
                        {mostrarSenha ? (
                            <EyeOff size={20} color="white" />
                        ) : (
                            <Eye size={20} color="white" />
                        )}
                    </button>
                </div>

                {erro && <p className="erro">{erro}</p>}

                <button type="submit">Cadastrar</button>

                <p style={{ marginTop: "1rem", textAlign: "center" }}>
                    Já tem uma conta? <Link to="/">Faça login</Link>
                </p>
            </form>
        </div>
    );
}

export default Cadastro;
