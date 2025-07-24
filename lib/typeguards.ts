export function hasMessage(err: unknown): err is { message: string } {
    return (
        typeof err === "object" &&
        err !== null &&
        "message" in err &&
        typeof (err as any).message === "string"
    );
}
