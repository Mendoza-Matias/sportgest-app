import { useEffect, useState } from 'react';
import AcademyCard from './AcademyCard'
import Navbar from './Navbar'
import './AcademyHome.css'
import { fetchData } from '../api/api';

function AcademyHome() {

    const [academies, setAcademies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [loadAttempt, setLoadAttempt] = useState(0);

    useEffect(() => {
        let isCurrentRequest = true;

        fetchData('academies').then((data) => {
            if (isCurrentRequest) setAcademies(data);
        }).catch((error) => {
            console.error('Error loading academies:', error);
            if (isCurrentRequest) setLoadError(true);
        }).finally(() => {
            if (isCurrentRequest) setIsLoading(false);
        });

        return () => {
            isCurrentRequest = false;
        };
    }, [loadAttempt]);

    function retryLoading() {
        setIsLoading(true);
        setLoadError(false);
        setLoadAttempt((attempt) => attempt + 1);
    }

    return (
        <div className="academy-home-layout">
            <Navbar />
            <main className="academy-home">
                <header className="academy-home__header">
                    <h1 id="academies-title">Tus academias</h1>
                    {!isLoading && academies.length > 0 && (
                        <p className="academy-home__subtitle">
                            {academies.length} {academies.length === 1 ? 'academia registrada' : 'academias registradas'}
                        </p>
                    )}
                </header>

                {isLoading ? (
                    <p className="academy-home__message" role="status">Cargando academias...</p>
                ) : loadError ? (
                    <div className="academy-home__message" role="alert">
                        <p>No se pudieron cargar las academias.</p>
                        <button className="academy-home__retry" type="button" onClick={retryLoading}>
                            Reintentar
                        </button>
                    </div>
                ) : academies.length === 0 ? (
                    <p className="academy-home__message">
                        Todavía no hay academias para mostrar.
                    </p>
                ) : (
                    <div className="academy-grid">
                        {academies.map((academy) => (
                            <AcademyCard key={academy.id} academy={academy} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}

export default AcademyHome;