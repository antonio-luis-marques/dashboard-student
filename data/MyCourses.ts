import { Course } from "../models/mycourse";

export const courses: Course[] = [
  {
    id: "course-nextjs-001",
    title: "Next.js do Zero ao Avançado",
    category: "Frontend",
    cover: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1746333702/nextjs.png',
    instructor: "Ana Martins",
    status: "em andamento",
    progresso: 45,
  },
  {
    id: "course-nodejs-001",
    title: "Node.js Essencial para Back-End",
    category: "Backend",
    cover: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1746333868/nodes.png',
    instructor: "Carlos Ferreira",
    status: "não iniciado",
    progresso: 0,
  },
  {
    id: 'course-java-001',
    title: 'Java',
    category: 'Backend',
    cover: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1746333180/java.webp',
    instructor: 'Carlos Silva',
    status: 'concluído',
    progresso: 100,
  },
  {
    id: 'course-pyton-001',
    title: 'Pyton',
    category: 'Backend',
    cover: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1746334236/python.jpg',
    instructor: 'Carlos Silva',
    status: 'concluído',
    progresso: 100,
  },
];
