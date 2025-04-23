import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"


// https://vite.dev/config/
export default defineConfig({
    plugins: [react(),
    tailwindcss(),
    ],
    define: {
        "process.env": {
          VITE_PORT: "3000", 
          VITE_FIREBASE_API: JSON.stringify(process.env.VITE_FIREBASE_API || "")
        },
      },
})
