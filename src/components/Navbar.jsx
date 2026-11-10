import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import { fetchData } from "../api/api";
import "./Navbar.css";

function NavigationIcon({ name }) {
    const paths = {
        academies: (
            <>
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M8 8h8M8 12h8M8 16h4" />
            </>
        ),
        students: (
            <>
                <circle cx="9" cy="8" r="3" />
                <path d="M3 20v-1a6 6 0 0 1 12 0v1M16 5.2a3 3 0 0 1 0 5.6M18 14a5 5 0 0 1 3 4.6v1" />
            </>
        ),
        collapse: <path d="m15 18-6-6 6-6" />,
        expand: <path d="m9 18 6-6-6-6" />,
        academy: (
            <>
                <path d="M3 10h18L12 4 3 10Z" />
                <path d="M5 10v9m5-9v9m4-9v9m5-9v9M3 21h18" />
            </>
        ),
    };

    return (
        <svg
            aria-hidden="true"
            className="navbar__icon"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
        >
            {paths[name]}
        </svg>
    );
}

function Navbar() {
    const [academies, setAcademies] = useState([]);
    const [hasAcademiesError, setHasAcademiesError] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isAcademyMenuOpen, setIsAcademyMenuOpen] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const isAcademyDetail = Boolean(id);
    const selectedAcademy = academies.find((academy) => academy.id === Number(id));

    useEffect(() => {
        if (!isAcademyDetail) return;
        fetchData("academies").then(setAcademies).catch((error) => {
            console.error("Error loading academies for navigation:", error);
            setHasAcademiesError(true);
        });
    }, [isAcademyDetail]);

    function selectAcademy(academyId) {
        setIsAcademyMenuOpen(false);
        navigate(`/academies/${academyId}`);
    }

    return (
        <aside
            className={`navbar${isCollapsed ? " navbar--collapsed" : ""}`}
            aria-label="Navegación principal"
        >
            <div className="navbar__top">
                <div className="navbar__brand" aria-label="SportGest, academias">
                    <span className="navbar__brand-mark" aria-hidden="true">S</span>
                    <span className="navbar__brand-name">SportGest</span>
                </div>

                <button
                    className="navbar__collapse"
                    type="button"
                    onClick={() => setIsCollapsed((collapsed) => !collapsed)}
                    aria-label={isCollapsed ? "Expandir navegación" : "Contraer navegación"}
                    aria-expanded={!isCollapsed}
                    title={isCollapsed ? "Expandir navegación" : "Contraer navegación"}
                >
                    <NavigationIcon name={isCollapsed ? "expand" : "collapse"} />
                </button>
            </div>

            {isAcademyDetail && (
                <div className="navbar__academy">
                    <div className="navbar__academy-heading">
                        <span className="navbar__academy-icon">
                            <NavigationIcon name="academy" />
                        </span>
                        <span className="navbar__academy-name">
                            {hasAcademiesError
                                ? "No se pudo cargar la academia"
                                : selectedAcademy?.name ?? "Selecciona una academia"}
                        </span>
                    </div>

                    <button
                        className="navbar__switcher-trigger"
                        type="button"
                        onClick={() => setIsAcademyMenuOpen((open) => !open)}
                        aria-expanded={isAcademyMenuOpen}
                        aria-label="Cambiar de academia"
                        title="Cambiar de academia"
                        disabled={academies.length === 0 || hasAcademiesError}
                    >
                        <span className="navbar__switcher-label">Cambiar academia</span>
                        <span aria-hidden="true">⌄</span>
                    </button>
                    {isAcademyMenuOpen && (
                        <div className="navbar__academy-menu" role="group" aria-label="Elegir academia">
                            {academies.map((academy) => (
                                <button
                                    className="navbar__academy-option"
                                    key={academy.id}
                                    type="button"
                                    aria-current={academy.id === Number(id) ? "page" : undefined}
                                    onClick={() => selectAcademy(academy.id)}
                                >
                                    {academy.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <p className="navbar__section-label">Menú</p>
            <nav className="navbar__links" aria-label="Secciones">
                <NavLink
                    className={({ isActive }) =>
                        `navbar__link${isActive ? " navbar__link--active" : ""}`
                    }
                    to="/"
                    end
                    title="Academias"
                >
                    <NavigationIcon name="academies" />
                    <span>Academias</span>
                </NavLink>
                {isAcademyDetail && (
                    <NavLink
                        className={({ isActive }) =>
                            `navbar__link${isActive ? " navbar__link--active" : ""}`
                        }
                        to={`/academies/${id}`}
                        end
                        title="Estudiantes"
                    >
                        <NavigationIcon name="students" />
                        <span>Estudiantes</span>
                    </NavLink>
                )}
            </nav>
        </aside>
    );
}

export default Navbar;
