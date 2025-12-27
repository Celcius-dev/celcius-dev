import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "VetCare Clinic API",
      version: "1.0.0",
      description: "Veteriner Kliniği Yönetim Paneli API Dokümantasyonu",
      contact: {
        name: "Developer",
        email: "contact@denizozder.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Local Server",
      },
      {
        url: "https://vetcare-api.onrender.com/api",
        description: "Production Server (Render)",
      },
    ],
  },
  // YAML dosyasını rotalar için okumaya devam etsin
  apis: ["./docs/*.yaml"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
