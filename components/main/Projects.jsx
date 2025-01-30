// components/Projects.js
const projects = [
    { name: "پروژه ۱", description: "یک اپلیکیشن وب با React و Tailwind CSS", link: "#" },
    { name: "پروژه ۲", description: "سایت فروشگاهی با Next.js", link: "#" },
    { name: "پروژه ۳", description: "سایت نمونه‌کار با طراحی مدرن", link: "#" },
  ];
  
  const Projects = () => (
    <section className="relative w-full  py-16 px-10">
      <h3  className="text-3xl font-extrabold text-center mb-8 text-white bg-white/20 backdrop-blur-md py-3 px-6 rounded-lg shadow-md border border-white/30">پروژه‌ها</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {projects.map((project) => (
          <div key={project.name} className="bg-white p-6 shadow-md rounded-lg">
            <h4 className="text-xl font-semibold mb-2">{project.name}</h4>
            <p className="text-gray-700 mb-4">{project.description}</p>
            <a href={project.link} className="text-blue-500 hover:underline">
              مشاهده پروژه
            </a>
          </div>
        ))}
      </div>
    </section>
  );
  
  export default Projects;
  