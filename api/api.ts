// export async function fetchTerminology(systemId: number) {
//   try {
//     const response = await fetch(`https://api-endpoint-227943627758.us-central1.run.app/terminology/system_id=${systemId}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch flashcards. Status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching flashcards:", error);
//     throw error;
//   }
// }

export async function fetchTerminology(systemId: number) {
  try {
    console.log("[fetchTerminology] Requesting system:", systemId);
    const response = await fetch(`/api/terminology?systemId=${systemId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log("[fetchTerminology] Raw response:", response);

    if (!response.ok) {
      throw new Error(`Failed to fetch terminology data. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("[fetchTerminology] Parsed JSON data:", data);

    return data;
  } catch (error) {
    console.error("[fetchTerminology] ERROR:", error);
    throw error;
  }
}
