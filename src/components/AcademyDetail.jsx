import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchData } from "../api/api";
import Navbar from "./Navbar";
import "./AcademyDetail.css";

// Administrar una academia especifica.

function AcademyDetail() {

    const [students, setStudents] = useState([]);
    const [loadedAcademyId, setLoadedAcademyId] = useState(null);
    const [loadError, setLoadError] = useState(false);

    const { id } = useParams();

    // Determina si los estudiantes de la academia actual están siendo cargados.
    const isLoading = loadedAcademyId !== id;

    useEffect(() => {
        let isCurrentRequest = true;

        fetchData(`academies/${id}/students`).then((data) => {
            if (isCurrentRequest) {
                setStudents(data);
                setLoadedAcademyId(id);
                setLoadError(false);
            }
        }).catch((error) => {
            console.error("Error loading students:", error);
            if (isCurrentRequest) {
                setLoadedAcademyId(id);
                setLoadError(true);
            }
        });

        return () => {
            isCurrentRequest = false;
        };
    }, [id]);

    return (
        <div className="academy-detail-layout">
            <Navbar />
            <section className="academy-management" aria-label="Estudiantes de la academia">
                <div className="academy-management__table-wrapper">
                    {isLoading ? (
                        <p className="academy-management__no-students" role="status">
                            Cargando estudiantes...
                        </p>
                    ) : loadError ? (
                        <p className="academy-management__no-students" role="alert">
                            No se pudieron cargar los estudiantes.
                        </p>
                    ) : students.length === 0 ? (
                        <div className="academy-management__no-students">
                            <p>No hay estudiantes registrados en esta academia.</p>
                        </div>
                    ) : (
                        <table className="academy-management__table">
                            <caption className="academy-management__caption">
                                Estudiantes de la academia
                            </caption>
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Activo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.id}>
                                        <td>{student.id}</td>
                                        <td>{`${student.name} ${student.last_name}`}</td>
                                        <td>{student.active ? "Sí" : "No"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </div>
    );
}

export default AcademyDetail;