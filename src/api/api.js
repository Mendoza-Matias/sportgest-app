import { academies, students } from "../data/seed";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
const ENV = import.meta.env.VITE_ENV || 'dev';

export const fetchData = async (endpoint) => {
    if (ENV === 'dev') {
        if (endpoint === 'academies') {
            return academies;
        }

        const studentsMatch = endpoint.match(/^academies\/(\d+)\/students$/);
        if (studentsMatch) {
            const academyId = Number(studentsMatch[1]);
            return students.filter((student) => student.academy_id === academyId);
        }

        return [];
    } else {
        const response = await fetch(`${API_URL}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }
};