import { Card } from "@/components/ui/card";

const projects = [
  {
    title: "Банковская система",
    description: "Автоматизация процессов, интеграция с BPMN, SQL-скрипты.",
    link: "#",
  },
  {
    title: "Аналитика данных",
    description: "Дашборды, отчёты, визуализация данных.",
    link: "#",
  },
  // Добавьте свои проекты
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 bg-gray-50 dark:bg-neutral-900">
      <h2 className="text-3xl font-bold mb-8 text-center">Проекты</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card key={project.title} className="p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">{project.description}</p>
            <a href={project.link} className="text-blue-600 hover:underline">Подробнее</a>
          </Card>
        ))}
      </div>
    </section>
  );
}