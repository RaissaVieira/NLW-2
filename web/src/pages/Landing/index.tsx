import React from 'react'
import Logo from '../../assets/images/logo.svg'
import landing from '../../assets/images/landing.svg'
import {Link} from 'react-router-dom'

import studyIcons from '../../assets/images/icons/study.svg'
import giveClassesIcons from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcons from '../../assets/images/icons/purple-heart.svg'

import './styles.css'

function Landing() {
    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={Logo} alt="Logo Proffy"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>

                <img src={landing} alt="Plataforma de estudos" className="hero-image"/>

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcons} alt="Estudar"/>
                        Estudar
                    </Link>
                    <Link to="/give-class" className="give-classes">
                        <img src={giveClassesIcons} alt="Estudar"/>
                        Dar aulas
                    </Link>

                </div>
                
                <span className="total-connections">
                    Total de 200 conexões já realizadas. <img src={purpleHeartIcons} alt="Coração roxo"/>
                </span>
            </div>
        </div>
    )
}

export default Landing