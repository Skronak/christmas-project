export function exportToCSV(data, filename = "export.csv") {
    if (!data || data.length === 0) {
        alert("Aucune donnée à exporter");
        return;
    }

    const headers = Object.keys(data[0]);

    const csvContent = [
        headers.join(","),
        ...data.map(row =>
            headers.map(h => JSON.stringify(row[h] ?? "")).join(",")
        ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
}
