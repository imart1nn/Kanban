import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import "./Login.css";


function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();


    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }


    try {
      // o pedido: POST /login com o e-mail e a senha em JSON
      const resposta = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();
      if (resposta.ok) {
        // 200: a API conferiu e deixou entrar
        setErro("");
        localStorage.setItem("logado", "true");
        navigate("/home");

      } else if (resposta.status === 401) {
        // 401: a mensagem de erro vem da API
        setErro(dados.detail);
      } else {
        setErro("Algo deu errado. Tente de novo.");
      }
    } catch {
      // a API esta desligada ou o CORS bloqueou
      setErro("Não foi possível falar com o servidor.");
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>


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

        <button type="submit">Entrar</button>
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Não tem uma conta? <Link to="/cadastro" className="troca">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}


export default Login;
