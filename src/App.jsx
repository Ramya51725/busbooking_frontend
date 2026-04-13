import router from "./routes/router";
import { RouterProvider } from "react-router-dom";
import {AuthProvider } from "./context/AuthContext";
import { SeatProvider } from "./context/SeatContext";

function App() {
  return (
    <AuthProvider>
      <SeatProvider>
        <RouterProvider router={router} />
      </SeatProvider>
    </AuthProvider>
  );
}

export default App;