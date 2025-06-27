export const selectedIcon = (time: number, code: number) => {
  const timeOfDay = time === 0 ? "weatherDayIcons" : "weathernightIcons";

  const lala = () => {
    if (code === 0) return "Despejado";
    if ([1, 2, 3].includes(code)) return "Parcialmente nublado";
    if ([45, 48].includes(code)) return "Neblina";
    if (code >= 51 && code <= 67) return "Llovizna";
    if (code >= 71 && code <= 77) return "Nieve ligera";
    if (code >= 80 && code <= 82) return "Lluvia moderada";
    if (code >= 95 && code <= 99) return "Tormenta eléctrica";
    return "desconocido"
  };
  
  return {icon: }
};
