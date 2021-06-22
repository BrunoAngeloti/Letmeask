import { Link } from "react-router-dom"

import illustration from "../assets/images/illustration.svg"
import logo from "../assets/images/logo.svg"

import '../styles/auth.scss'

import { Button } from "../components/Button"
import { useAuth } from "../hooks/useAuth"

export function NewRoom(){
    const { user } = useAuth()

    return(
        <div id="page-auth">
            <aside>
                <img src={illustration} alt="imagem de ilustração" />
                <strong>Toda pergunta tem uma resposta.</strong>
                <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
            </aside>
            <main>
                <div>
                    <img src={logo} alt="Letmeask" />
                    <h2>Crie uma nova sala</h2>
                    <form>
                        <input 
                            type="text" 
                            placeholder="Nome da sala"
                        />
                        <Button type="submit">
                           Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}