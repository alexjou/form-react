import { Link } from "react-router-dom";
import React from "react";

export default function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <h1>Página não encontrada</h1>
      <Link
        to="/"
      >
        Voltar
      </Link>
    </div>
  );
}
