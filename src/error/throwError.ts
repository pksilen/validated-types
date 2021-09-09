export default function throwError(error: Error | (new () => Error)): never {
  if (error instanceof Error) {
    throw error;
  }

  throw new error();
}
