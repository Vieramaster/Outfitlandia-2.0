// Versión mejorada con type predicate y tipos genéricos
const IsValidKeys = <K extends string>(
  arrayKeys: readonly K[], // Usar "readonly" para preservar literales
  obj: Record<string, unknown>
): obj is Record<K, unknown> => {
  // <- Type predicate clave
  return arrayKeys.every((key) => key in obj);
};

export default IsValidKeys;
