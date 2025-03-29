const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export async function fetchThemes() {
    const res = await fetch(`${API_URL}/themes`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch themes");
    return res.json();
}

export async function createTheme(themeData) {
    const res = await fetch(`${API_URL}/themes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(themeData),
    });
    if (!res.ok) throw new Error("Failed to create theme");
    return res.json();
}
