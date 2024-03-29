import { useHistory } from "react-router"

import illustration from "../assets/images/illustration.svg"
import logo from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"

import '../styles/auth.scss'

import { Button } from "../components/Button"
import { useAuth } from "../hooks/useAuth"
import { FormEvent, useState } from "react"
import { database } from "../services/firebase"

export function Home(){
    const history = useHistory()
    const { user, signInWithGoogle } = useAuth()
    const [roomCode, setRoomCode] = useState('')

    async function handleCreateRoom(){    
        if(!user) {
           await signInWithGoogle()
        }
        
        history.push('/rooms/new')       
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()

        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if(!roomRef.exists()){
            alert("Room does not exists.")
            return;
        }

        if(roomRef.val().endedAt){
            alert('Room already closed')
            return
        }

        if(roomRef.val().authorId === user?.id){
            history.push(`admin/rooms/${roomCode}`)
        }else{
            history.push(`rooms/${roomCode}`)
        }

    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustration} alt="imagem de ilustração" />
                <strong>Toda pergunta tem uma resposta.</strong>
                <p>Aprenda e compartilhe conhecimento com outras pessoas.</p>
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
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala"
                            onChange={ e=> setRoomCode(e.target.value) }
                            value={roomCode}
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