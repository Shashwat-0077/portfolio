import { FaAws } from "react-icons/fa";
import { GrGraphQl } from "react-icons/gr";
import { RiFirebaseFill } from "react-icons/ri";
import {
    SiTypescript,
    SiNextdotjs,
    SiTailwindcss,
    SiExpress,
    SiDocker,
    SiGit,
    SiMongodb,
    SiJavascript,
    SiPython,
    SiPhp,
    SiLua,
    SiHtml5,
    SiCss3,
    SiMui,
    SiReact,
    SiRedux,
    SiJquery,
    SiNodedotjs,
    SiDjango,
    SiFlask,
    SiMysql,
    SiPostgresql,
    SiSqlite,
    SiRedis,
    SiSupabase,
    SiAppwrite,
    SiVercel,
    SiLinux,
    SiUbuntu,
    SiGnubash,
    SiNeovim,
    SiGithub,
    SiNumpy,
    SiPandas,
    SiTensorflow,
    SiKeras,
    SiDrizzle,
    SiPytorch,
    SiOpencv,
    SiScikitlearn,
} from "react-icons/si";

// Shortened Categories
export const LANG = "Languages";
export const FRONTEND = "Frontend";
export const STYLING = "Styling";
export const AUTH = "Auth";
export const BACKEND = "Backend";
export const API = "APIs";
export const DB = "Databases";
export const CACHING = "Caching";
export const ORM = "ORMs";
export const DEVOPS = "DevOps";
export const CLOUD = "Cloud";
export const VERSION_CONTROL = "Version Control";
export const OS = "Operating Systems";
export const TERMINAL = "Terminal Tools";
export const EDITORS = "Editors";
export const DATA_SCIENCE = "Data Science";
export const ML_FRAMEWORKS = "ML Frameworks";
export const COMPUTER_VISION = "Computer Vision";
export const FULLSTACK = "Fullstack";
export const BAAS = "BaaS";

export const CATEGORIES = [
    LANG,
    FRONTEND,
    STYLING,
    AUTH,
    BACKEND,
    API,
    DB,
    CACHING,
    ORM,
    DEVOPS,
    CLOUD,
    VERSION_CONTROL,
    OS,
    TERMINAL,
    EDITORS,
    DATA_SCIENCE,
    ML_FRAMEWORKS,
    COMPUTER_VISION,
    FULLSTACK,
    BAAS,
] as const;

export const TECHNOLOGIES = {
    JavaScript: {
        categories: [LANG],
        title: "JavaScript",
        description: "High-level, versatile programming language.",
        longDescription:
            "A core web language, JavaScript enables interactive content. Also used for backend (Node.js) and mobile apps.",
        Icon: SiJavascript,
        defaultIconColor: "#F7DF1E",
    },
    TypeScript: {
        categories: [LANG],
        title: "TypeScript",
        description: "Type-safe JavaScript superset.",
        longDescription:
            "TypeScript adds static typing to JavaScript, improving code quality and maintainability for large apps.",
        Icon: SiTypescript,
        defaultIconColor: "#3178C6",
    },
    Python: {
        categories: [LANG],
        title: "Python",
        description: "High-level, general-purpose language.",
        longDescription:
            "Python is popular for web dev, data science, ML, and automation due to its simplicity and extensive libraries.",
        Icon: SiPython,
        defaultIconColor: "#3776AB",
    },
    Java: {
        categories: [LANG],
        title: "Java",
        description: "Object-oriented, platform-independent language.",
        longDescription:
            "Java is robust for enterprise apps, Android dev, and large systems with its 'write once, run anywhere' ability.",
        Icon: SiJquery,
        defaultIconColor: "#007396",
    },
    PHP: {
        categories: [LANG],
        title: "PHP",
        description: "Server-side scripting language.",
        longDescription:
            "PHP is designed for web development, embedded in HTML for dynamic content, database interaction, and e-commerce.",
        Icon: SiPhp,
        defaultIconColor: "#777BB4",
    },
    Lua: {
        categories: [LANG],
        title: "Lua",
        description: "Lightweight scripting language.",
        longDescription:
            "Lua is an efficient scripting language, often embedded in applications for extensibility, like in game development.",
        Icon: SiLua,
        defaultIconColor: "#ADD8E6", // Lighter shade of blue
    },
    HTML: {
        categories: [FRONTEND],
        title: "HTML",
        description: "Markup language for web pages.",
        longDescription:
            "HTML is the fundamental language for creating web pages, providing the structure and semantic content.",
        Icon: SiHtml5,
        defaultIconColor: "#E34F26",
    },
    CSS: {
        categories: [STYLING],
        title: "CSS",
        description: "Style sheet language for HTML.",
        longDescription:
            "CSS describes the presentation of HTML documents, dictating layout, colors, and fonts for visual design.",
        Icon: SiCss3,
        defaultIconColor: "#1572B6",
    },
    Tailwind: {
        categories: [STYLING],
        title: "Tailwind CSS",
        description: "Utility-first CSS framework.",
        longDescription:
            "Tailwind CSS is a customizable CSS framework for rapid UI development, using low-level utility classes directly in HTML.",
        Icon: SiTailwindcss,
        defaultIconColor: "#06B6D4",
    },
    "Material UI": {
        categories: [STYLING],
        title: "Material UI",
        description: "React UI framework with Material Design.",
        longDescription:
            "Material UI implements Google's Material Design in React, offering components for consistent and responsive web apps.",
        Icon: SiMui,
        defaultIconColor: "#007FFF",
    },
    React: {
        categories: [FRONTEND],
        title: "React",
        description: "JavaScript library for UI building.",
        longDescription:
            "React is a declarative, component-based JavaScript library for building user interfaces, focusing on efficient rendering.",
        Icon: SiReact,
        defaultIconColor: "#61DAFB",
    },
    "Next.js": {
        categories: [FULLSTACK],
        title: "Next.js",
        description: "React framework for SSR & routing.",
        longDescription:
            "Next.js is a React framework enabling server-side rendering (SSR) and static site generation (SSG), improving performance and SEO.",
        Icon: SiNextdotjs,
        defaultIconColor: "#E0E0E0", // Lighter gray for readability
    },
    Redux: {
        categories: [FRONTEND],
        title: "Redux",
        description: "State management for React apps.",
        longDescription:
            "Redux is a predictable state container for JavaScript applications, centralizing state for easier debugging.",
        Icon: SiRedux,
        defaultIconColor: "#764ABC",
    },
    jQuery: {
        categories: [FRONTEND],
        title: "jQuery",
        description: "JavaScript library for DOM manipulation.",
        longDescription:
            "jQuery simplifies HTML traversal, event handling, and Ajax interactions, accelerating frontend development workflows.",
        Icon: SiJquery,
        defaultIconColor: "#0769AD",
    },
    EJS: {
        categories: [FRONTEND, BACKEND],
        title: "EJS",
        description: "Embedded JavaScript templates.",
        longDescription:
            "EJS (Embedded JavaScript) is a templating language for generating HTML markup with JavaScript, used in Node.js.",
        Icon: SiJquery,
        defaultIconColor: "#F8F8F8", // Lighter
    },
    NextAuth: {
        categories: [AUTH],
        title: "NextAuth.js",
        description: "Authentication for Next.js.",
        longDescription:
            "NextAuth.js is a comprehensive open-source authentication solution for Next.js applications, supporting various providers.",
        Icon: SiJquery,
        defaultIconColor: "#F8F8F8", // Lighter
    },
    Clerk: {
        categories: [AUTH],
        title: "Clerk",
        description: "Authentication & user management.",
        longDescription:
            "Clerk is a complete user management platform with pre-built UI components and APIs for secure user features.",
        Icon: SiJquery,
        defaultIconColor: "#F8F8F8", // Lighter
    },
    "Node.js": {
        categories: [BACKEND],
        title: "Node.js",
        description: "JavaScript runtime for backend.",
        longDescription:
            "Node.js is a powerful JavaScript runtime built on Chrome's V8 engine, for scalable network applications.",
        Icon: SiNodedotjs,
        defaultIconColor: "#339933",
    },
    Django: {
        categories: [BACKEND],
        title: "Django",
        description: "Python web framework.",
        longDescription:
            "Django is a high-level Python web framework for rapid development and clean design, with 'batteries-included' features.",
        Icon: SiDjango,
        defaultIconColor: "#1E5E4C", // Lighter green-ish
    },
    Flask: {
        categories: [BACKEND],
        title: "Flask",
        description: "Lightweight Python web framework.",
        longDescription:
            "Flask is a flexible Python web framework, ideal for smaller applications and APIs, allowing more customization.",
        Icon: SiFlask,
        defaultIconColor: "#F8F8F8", // Lighter
    },
    REST: {
        categories: [API],
        title: "REST APIs",
        description: "API design style using HTTP.",
        longDescription:
            "REST (Representational State Transfer) is an architectural style for networked apps, leveraging HTTP for data exchange.",
        Icon: SiJquery,
        defaultIconColor: "#F8F8F8", // Lighter
    },
    GraphQL: {
        categories: [API],
        title: "GraphQL",
        description: "Query language for APIs.",
        longDescription:
            "GraphQL is a powerful query language for APIs, offering a more efficient and flexible alternative to REST.",
        Icon: GrGraphQl,
        defaultIconColor: "#E10098",
    },
    "API Design": {
        categories: [API],
        title: "API Design",
        description: "Designing consistent, scalable APIs.",
        longDescription:
            "API Design focuses on structuring software component interactions for consistency, usability, and scalability.",
        Icon: SiJquery,
        defaultIconColor: "#F8F8F8", // Lighter
    },
    SQL: {
        categories: [LANG, DB],
        title: "SQL",
        description: "Structured Query Language.",
        longDescription:
            "SQL is the standard language for managing relational databases, essential for querying, updating, and organizing data.",
        Icon: SiMysql,
        defaultIconColor: "#00758F",
    },
    SQLAlchemy: {
        categories: [ORM],
        title: "SQLAlchemy",
        description: "Python SQL ORM.",
        longDescription:
            "SQLAlchemy is a powerful SQL toolkit and ORM for Python, designed for efficient database access and management.",
        Icon: SiJquery,
        defaultIconColor: "#F8F8F8", // Lighter
    },
    Firebase: {
        categories: [BAAS, DB],
        title: "Firebase",
        description: "Google's mobile platform for app development.",
        longDescription:
            "Firebase is a comprehensive platform by Google, offering real-time databases, authentication, and hosting.",
        Icon: RiFirebaseFill,
        defaultIconColor: "#FFCA28",
    },
    Express: {
        categories: [BACKEND],
        title: "Express.js",
        description: "Minimalist web framework for Node.js.",
        longDescription:
            "Express.js is a fast, unopinionated web framework for Node.js, providing robust features for web and mobile apps.",
        Icon: SiExpress,
        defaultIconColor: "#F8F8F8", // Lighter
    },
    Drizzle: {
        categories: [ORM],
        title: "Drizzle ORM",
        description: "TypeScript ORM for SQL databases.",
        longDescription:
            "Drizzle ORM is a modern, lightweight TypeScript ORM for SQL databases, leveraging TypeScript's strong typing.",
        Icon: SiDrizzle,
        defaultIconColor: "#E0E0E0", // Lighter gray
    },

    PostgreSQL: {
        categories: [DB],
        title: "PostgreSQL",
        description: "Advanced open-source SQL database.",
        longDescription:
            "PostgreSQL is a powerful object-relational database known for reliability, features, and performance.",
        Icon: SiPostgresql,
        defaultIconColor: "#4169E1",
    },
    SQLite: {
        categories: [DB],
        title: "SQLite",
        description: "Embedded SQL database.",
        longDescription:
            "SQLite is a C-language library implementing a small, fast, self-contained SQL database engine, used in embedded systems.",
        Icon: SiSqlite,
        defaultIconColor: "#006B99", // Lighter blue
    },
    MongoDB: {
        categories: [DB],
        title: "MongoDB",
        description: "NoSQL database.",
        longDescription:
            "MongoDB is a popular NoSQL database that stores data in flexible, JSON-like documents, designed for scalability.",
        Icon: SiMongodb,
        defaultIconColor: "#47A248",
    },
    Redis: {
        categories: [CACHING],
        title: "Redis",
        description: "In-memory key-value store.",
        longDescription:
            "Redis is an open-source, in-memory data store used as a database, cache, and message broker for high-performance.",
        Icon: SiRedis,
        defaultIconColor: "#DC382D",
    },
    Turso: {
        categories: [DB, CLOUD],
        title: "Turso",
        description: "Edge-hosted distributed database.",
        longDescription:
            "Turso is an edge-hosted, distributed database powered by SQLite, engineered for low-latency data access closer to users.",
        Icon: SiJquery,
        defaultIconColor: "#F8F8F8", // Lighter
    },
    Supabase: {
        categories: [BAAS, DB],
        title: "Supabase",
        description: "PostgreSQL backend-as-a-service.",
        longDescription:
            "Supabase is an open-source Firebase alternative providing PostgreSQL with real-time subscriptions, auth, and storage.",
        Icon: SiSupabase,
        defaultIconColor: "#3FCF8E",
    },
    Appwrite: {
        categories: [BAAS, DB],
        title: "Appwrite",
        description: "Self-hosted backend server.",
        longDescription:
            "Appwrite is an open-source, self-hosted backend server with APIs and tools for building web, mobile, and Flutter apps.",
        Icon: SiAppwrite,
        defaultIconColor: "#F02E65",
    },

    AWS: {
        categories: [CLOUD],
        title: "AWS",
        description: "Amazon Web Services.",
        longDescription:
            "AWS is a comprehensive, broadly adopted cloud platform offering over 200 services globally, including computing and storage.",
        Icon: FaAws,
        defaultIconColor: "#FF9900", // AWS orange for visibility
    },
    Docker: {
        categories: [DEVOPS],
        title: "Docker",
        description: "Containerization platform.",
        longDescription:
            "Docker uses OS-level virtualization to deliver software in containers, ensuring consistency and isolation.",
        Icon: SiDocker,
        defaultIconColor: "#2496ED",
    },
    Vercel: {
        categories: [CLOUD, DEVOPS],
        title: "Vercel",
        description: "Frontend cloud platform.",
        longDescription:
            "Vercel is a leading cloud platform for frontend developers, providing seamless deployment with CI/CD and a global CDN.",
        Icon: SiVercel,
        defaultIconColor: "#E0E0E0", // Lighter gray
    },

    Linux: {
        categories: [OS],
        title: "Linux",
        description: "Open-source operating system.",
        longDescription:
            "Linux is a powerful family of open-source Unix-like operating systems, used for servers, supercomputers, and embedded systems.",
        Icon: SiLinux,
        defaultIconColor: "#FCC624",
    },
    Ubuntu: {
        categories: [OS],
        title: "Ubuntu",
        description: "Popular Linux distribution.",
        longDescription:
            "Ubuntu is a popular open-source Linux distribution known for user-friendliness, community support, and usability.",
        Icon: SiUbuntu,
        defaultIconColor: "#E95420",
    },
    Bash: {
        categories: [TERMINAL],
        title: "Bash",
        description: "Unix shell and command language.",
        longDescription:
            "Bash (Bourne Again SHell) is a widely used Unix shell and command language, essential for scripting and automation.",
        Icon: SiGnubash,
        defaultIconColor: "#4EAA25",
    },
    WezTerm: {
        categories: [TERMINAL],
        title: "WezTerm",
        description: "GPU-accelerated terminal emulator.",
        longDescription:
            "WezTerm is a high-performance, GPU-accelerated cross-platform terminal emulator built with Rust, highly customizable.",
        Icon: SiJquery,
        defaultIconColor: "#F8F8F8", // Lighter
    },
    tmux: {
        categories: [TERMINAL],
        title: "tmux",
        description: "Terminal multiplexer.",
        longDescription:
            "tmux is a robust terminal multiplexer that allows creation and management of multiple terminal sessions in one window.",
        Icon: SiJquery,
        defaultIconColor: "#F8F8F8", // Lighter
    },
    Neovim: {
        categories: [EDITORS],
        title: "Neovim",
        description: "Hyperextensible Vim-based text editor.",
        longDescription:
            "Neovim is a refactored and extended Vim version, a highly configurable text editor popular for its efficient modal editing.",
        Icon: SiNeovim,
        defaultIconColor: "#57A143",
    },
    Git: {
        categories: [VERSION_CONTROL],
        title: "Git",
        description: "Version control system.",
        longDescription:
            "Git is a distributed version control system for tracking source code changes, indispensable for collaborative projects.",
        Icon: SiGit,
        defaultIconColor: "#F05032",
    },
    GitHub: {
        categories: [VERSION_CONTROL],
        title: "GitHub",
        description: "Code hosting & collaboration.",
        longDescription:
            "GitHub is a leading web-based platform for version control and collaborative software development with Git repositories.",
        Icon: SiGithub,
        defaultIconColor: "#6A737D", // Lighter gray for black icon
    },

    NumPy: {
        categories: [DATA_SCIENCE],
        title: "NumPy",
        description: "Numerical computing with Python.",
        longDescription:
            "NumPy is the fundamental package for scientific computing with Python, providing efficient array support and math functions.",
        Icon: SiNumpy,
        defaultIconColor: "#87CEEB", // Lighter blue
    },
    Pandas: {
        categories: [DATA_SCIENCE],
        title: "Pandas",
        description: "Data analysis library.",
        longDescription:
            "Pandas is a fast, powerful, flexible, open-source data analysis library for Python, ideal for tabular and time-series data.",
        Icon: SiPandas,
        defaultIconColor: "#ADD8E6", // Lighter blue
    },
    TensorFlow: {
        categories: [ML_FRAMEWORKS],
        title: "TensorFlow",
        description: "Machine learning framework.",
        longDescription:
            "TensorFlow is an open-source ML framework by Google, extensively used for building and training deep neural networks.",
        Icon: SiTensorflow,
        defaultIconColor: "#FF6F00",
    },
    Keras: {
        categories: [ML_FRAMEWORKS],
        title: "Keras",
        description: "Neural network library.",
        longDescription:
            "Keras is a high-level neural networks API in Python, designed for fast experimentation with deep neural networks.",
        Icon: SiKeras,
        defaultIconColor: "#D00000",
    },
    "scikit-learn": {
        categories: [ML_FRAMEWORKS],
        title: "scikit-learn",
        description: "Machine learning in Python.",
        longDescription:
            "scikit-learn is a free software ML library for Python, featuring various classification, regression, and clustering algorithms.",
        Icon: SiScikitlearn,
        defaultIconColor: "#F7931E",
    },
    PyTorch: {
        categories: [ML_FRAMEWORKS],
        title: "PyTorch",
        description: "Deep learning framework.",
        longDescription:
            "PyTorch is an open-source ML framework known for flexibility and ease of use in deep learning research and development.",
        Icon: SiPytorch,
        defaultIconColor: "#EE4C2C",
    },
    OpenCV: {
        categories: [COMPUTER_VISION],
        title: "OpenCV",
        description: "Computer vision library.",
        longDescription:
            "OpenCV (Open Source Computer Vision Library) is used for image and video analysis, facial recognition, and object detection.",
        Icon: SiOpencv,
        defaultIconColor: "#5C3EE8",
    },
};
export const TECHNOLOGIES_ARRAY = Object.entries(TECHNOLOGIES).map(
    ([_, value]) => ({
        ...value,
    })
);

export type Technology = typeof TECHNOLOGIES;
