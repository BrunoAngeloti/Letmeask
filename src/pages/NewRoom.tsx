import { Link, useHistory } from "react-router-dom"
import { FormEvent } from "react"

import illustration from "../assets/images/illustration.svg"
import logo from "../assets/images/logo.svg"

import '../styles/auth.scss'

import { Button } from "../components/Button"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react"
import { database } from "../services/firebase"

export function NewRoom(){
    const { user } = useAuth()
    const history = useHistory()
    const [newRoom, setNewRoom] = useState('')

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault()
        if(newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })

        history.push(`/admin/rooms/${firebaseRoom.key}`)
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
                    <h2>Crie uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala"
                            onChange={e => setNewRoom(e.target.value)}
                            value={newRoom}
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