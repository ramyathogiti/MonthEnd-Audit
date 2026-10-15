const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getAuditDetails(metrcUid) {
  const uid = metrcUid.trim();

  const url = `${BASE_URL}?$filter=${encodeURIComponent(
    `METRCUID eq '${uid.replace(/'/g, "''")}'`
  )}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Authorization": "Basic eyJVc2VyTmFtZSI6IlNoaXZhcmFqIiwiQ29tcGFueURCIjoiREVWIn06U2hpdmFyYWpAR0g5Yg==",
    },
  });

  if (!response.ok) {
    throw new Error(`GET failed: ${response.status}`);
  }

  return await response.json();
}




export async function postAuditDetails(metrcUid,quantity) {
const POST_API_URL = import.meta.env.VITE_POST_API_URL;
  const payload = {
     U_METRCUID: metrcUid,
    U_NENQTY: Number(quantity),
  };

  const response = await fetch(POST_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic eyJVc2VyTmFtZSI6IlNoaXZhcmFqIiwiQ29tcGFueURCIjoiREVWIn06U2hpdmFyYWpAR0g5Yg==",
     
    },
    body: JSON.stringify(payload),
  });
  
const responseText = await response.text();
  console.log("POST status:", response.status);
  console.log("POST response:", responseText);
  if (!response.ok) {
    throw new Error(responseText || `POST failed: ${response.status}`);
  }
  return responseText;
}
