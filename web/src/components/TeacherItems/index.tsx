import React from 'react'
import whatsappIcons from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars2.githubusercontent.com/u/49870366?s=460&u=ef5aae78d9bfe95193459f5f5f44d23402fb7129&v=4" alt="Raissa Vieira"/>
                <div>
                    <strong>Raissa Vieira</strong>
                    <span>Matemática</span>

                </div>
            </header>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio dignissimos repellendus praesentium quidem. <br/>Dolore reprehenderit, eos aperiam cupiditate voluptatum, nesciunt perspiciatis non fugit nostrum quia repellendus sint commodi vitae molestias?</p>

            <footer>
                <p>
                    Preço/Hora
                    <strong>R$ 80,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcons} alt="whatsapp"/>
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem