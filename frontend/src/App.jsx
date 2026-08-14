import{ useEffect, useState} from "react"

import Header from "./components/Header";
import FormProduto from "./components/FormProduto";
import ListaProdutos from "./components/ListaProdutos";

export default function App(    ){
	const [produtos, setProdutos] = useState([]);
	const [mensagem, setMensagem] = useState("");

	async function carregarProdutos(){
		try{
			const responsta = await fetch("/api/produtos");
			const dados = await resposta.json();
			setProdutos(dados);
		} catch (erro){
			setMensagem("nao foi possivel carregar os produtos.", erro);
		}
	}
 useEffect(() => {carregarProduto();},[]);

 async function cadastrarProduto(produto){
	setMensagem("")

	try{
		const resposta = await fetch("/api/produtos", {
			method: "POST",
			header: {
				"content-type":"aplication/json"
			},
			body: JSON.stringify(produto)
		});
		if (!resposta.ok) {
			const erro = await resposta.json();
			setMensagem(erro.mensagem);
			return;
		}
		const novoProduto = await resposta.json();
		//atualiza o estado sem precisar recarregar a pagina.
		setProdutos((produtosAtuais) => [... produtosAtuais, novoProduto]);

		setMensagem("Produto cadastrado com sucesso.");
	}catch (erro){
		setMensagem("Não foi possivel cadastrar o produto.", erro);

	}
}
	return (
		<>
		<Header />
		<main className="container">
		<FormProduto aoCadastrar={cadastrarProduto} />
		{mensagem && <p className="mensagem">{mensagem}</p>}
		<ListaProdutos produtos={{produtos}}/>
		</main>
		</>
	)
 }