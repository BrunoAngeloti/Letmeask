import { useHistory } from "react-router"

import illustration from "../assets/images/illustration.svg"
import logo from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"

import '../styles/auth.scss'

import { Button } from "../components/Button"
import { useAuth } from "../hooks/useAuth"

export function Home(){
    const history = useHistory()
    const { user, signInWithGoogle } = useAuth()

    async function handleCreateRoom(){    
        if(!user) {
           await signInWithGoogle()
        }
        
        history.push('/rooms/new')       
    }

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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="logo da google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form>
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala"
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}