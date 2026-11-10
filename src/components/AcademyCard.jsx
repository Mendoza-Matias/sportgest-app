import { Link } from 'react-router';
import './AcademyCard.css'

function AcademyCard({ academy }) {
    const phone = academy.cellphone.replace(/\s/g, '')

    return (
        <article className="academy-card">
            <h2 className="academy-card__title">{academy.name}</h2>

            <address className="academy-card__contact">
                <span>{academy.address}</span>
                <a href={`tel:${phone}`}>{academy.cellphone}</a>
            </address>

            <Link className="academy-card__link" to={`/academies/${academy.id}`}>Ir a la academia</Link>
        </article>
    )
}

export default AcademyCard;