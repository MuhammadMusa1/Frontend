"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Moon,
  Sun,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Code,
  Database,
  BarChart3,
  Brain,
  Globe,
  Heart,
} from "lucide-react"
import { useTheme } from "next-themes"

export default function Portfolio() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const skills = [
    { name: "Бизнес-анализ", level: 90, icon: BarChart3 },
    { name: "Системный анализ", level: 85, icon: Code },
    { name: "SQL", level: 88, icon: Database },
    { name: "Frontend (Vue.js)", level: 75, icon: Code },
    { name: "Data Science", level: 70, icon: Brain },
  ]

  const languages = [
    { name: "Русский", level: "Родной" },
    { name: "Персидский", level: "C2" },
    { name: "Английский", level: "B2" },
    { name: "Немецкий", level: "A1" },
  ]

  const projects = [
    {
      title: "Банковские системы",
      description: "Анализ и оптимизация банковских процессов в Банке Эсхата",
      tags: ["Бизнес-анализ", "BPMN", "SQL"],
    },
    {
      title: "Аналитические дашборды",
      description: "Создание интерактивных дашбордов для анализа данных",
      tags: ["Vue.js", "Data Visualization", "SQL"],
    },
    {
      title: "BPMN диаграммы",
      description: "Моделирование бизнес-процессов для банковских операций",
      tags: ["BPMN", "Процессы", "Документация"],
    },
    {
      title: "SQL-скрипты",
      description: "Автоматизация отчетности и анализа данных",
      tags: ["SQL", "Автоматизация", "Отчеты"],
    },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-serif text-xl font-bold">ММ</div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              Обо мне
            </a>
            <a href="#skills" className="text-sm font-medium hover:text-primary transition-colors">
              Навыки
            </a>
            <a href="#experience" className="text-sm font-medium hover:text-primary transition-colors">
              Опыт
            </a>
            <a href="#projects" className="text-sm font-medium hover:text-primary transition-colors">
              Проекты
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Контакты
            </a>
          </nav>
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-4xl font-serif font-bold text-primary-foreground">ММ</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Мухаммаджон Мусоев</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6">Бизнес/Системный Аналитик</p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Специалист с 6-летним опытом работы в банковской сфере, стремящийся к карьерному росту в области data
              science и аналитики данных
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Казань, готов к релокации
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                30 лет
              </div>
            </div>
          </div>
          <Button size="lg" className="mr-4">
            <Mail className="mr-2 h-4 w-4" />
            Связаться со мной
          </Button>
          <Button variant="outline" size="lg">
            Скачать резюме
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-muted/50">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Обо мне</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Образование
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">Казанский (Приволжский) федеральный университет</p>
                <p className="text-muted-foreground">Прикладная информатика</p>
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Дополнительное обучение:</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Full Stack разработка</Badge>
                    <Badge variant="secondary">Frontend</Badge>
                    <Badge variant="secondary">Тестирование</Badge>
                    <Badge variant="secondary">Английский язык</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Языки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {languages.map((lang) => (
                    <div key={lang.name} className="flex justify-between items-center">
                      <span className="font-medium">{lang.name}</span>
                      <Badge variant="outline">{lang.level}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Интересы и хобби
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Преподавание программирования и робототехники, ведение YouTube канала о путешествиях и
                  программировании. Увлекаюсь изучением новых технологий в области data science и машинного обучения.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Навыки</h2>
          <div className="grid gap-6">
            {skills.map((skill) => {
              const Icon = skill.icon
              return (
                <Card key={skill.name}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-primary" />
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-muted/50">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Опыт работы</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
            <Card className="ml-16 relative">
              <div className="absolute -left-12 top-6 w-6 h-6 bg-primary rounded-full border-4 border-background"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Банк Эсхата
                </CardTitle>
                <CardDescription>Бизнес/Системный аналитик • 3 года</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Анализ и оптимизация банковских бизнес-процессов</li>
                  <li>• Создание BPMN диаграмм и технической документации</li>
                  <li>• Разработка SQL-скриптов для автоматизации отчетности</li>
                  <li>• Frontend-разработка внутренних инструментов</li>
                  <li>• Тестирование банковских систем</li>
                  <li>• Системное администрирование</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Проекты</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-muted/50">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold mb-8">Контакты</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Готов к новым вызовам в области data science и аналитики данных
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Button>
            <Button variant="outline" size="lg" className="gap-2 bg-transparent">
              <Github className="h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" size="lg" className="gap-2 bg-transparent">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="container max-w-4xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 Мухаммаджон Мусоев. Все права защищены.</p>
        </div>
      </footer>
    </div>
  )
}
