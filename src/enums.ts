enum ERROR_TYPES {
  NOT_FOUND = "NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
}

const ERROR_MESSAGES: Record<ERROR_TYPES, string> = {
  [ERROR_TYPES.NOT_FOUND]: "Recurso no encontrado.",
  [ERROR_TYPES.UNAUTHORIZED]: "Acceso no autorizado.",
  [ERROR_TYPES.FORBIDDEN]: "Acceso prohibido.",
};

const handleError = (type: string) => {
  const errorMessage = ERROR_MESSAGES[type as ERROR_TYPES];
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log("Error desconocido.");
  }
};
