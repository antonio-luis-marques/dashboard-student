import { CourseCategory } from "@/types/CourseCategories";

export type Course = {
  id: string;
  title: string;
  category: CourseCategory;
  cover: string;
  instructor: string;
  status: "em andamento" | "concluído" | "não iniciado";
  progresso: number; // percentual de 0 a 100
};

export type CourseVideo = {
  id: string;
  title: string;
  order?: number;
};
