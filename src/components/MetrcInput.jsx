import { useState } from "react";
import "./MetrcInput.css";
import { getAuditDetails,postAuditDetails } from "../services/auditApi";

function MetrcInput() {
  const [metrcUid, setMetrcUid] = useState("");
  const [auditData, setAuditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [newQty, setNewQty] = useState("");
  const [posting, setPosting] = useState(false);

  const fields = [
    { key: "ItemName", label: "Item" },
    { key: "StrainName", label: "Strain" },
    { key: "HarvestName", label: "Harvest" },
    { key: "BinLocationCode", label: "Location" },
    { key: "Quantity", label: "Quantity" },
    { key: "U_NENQTY", label: "New Quantity", isInput: true },
  ];

  const handleSubmit = async () => {
    if (!metrcUid.trim()) {
      setAuditData(null);
      setError("Please enter a METRC UID");
      setSubmitted(true);
      return;
    }

    setLoading(true);
    setSubmitted(true);
    setError("");
    setAuditData(null);

    try {
      const data = await getAuditDetails(metrcUid.trim());

      const records = Array.isArray(data)
        ? data
        : Array.isArray(data?.value)
          ? data.value
          : [];

      if (records.length === 0) {
        setAuditData(null);
        setError("Invalid METRC UID");
      } else {
        setAuditData(records);
        setError("");
      }
    } catch (err) {
      console.error("API error:", err);
      setAuditData(null);
      setError(err.message || "Unable to fetch audit details");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
  setMetrcUid("");
  setAuditData(null);
  setNewQty("");
  setError("");
  setLoading(false);
  setPosting(false);
  setSubmitted(false);
};

const handleOk = async () => {
  if (!metrcUid.trim()) {
    setError("Please enter a METRC UID");
    setSubmitted(true);
    return;
  }

  if (
    newQty.trim() === "" ||
    !Number.isFinite(Number(newQty)) ||
    Number(newQty) < 0
  ) {
    setError("Please enter a valid new quantity");
    return;
  }

  setPosting(true);
  setError("");

  try {
    await postAuditDetails(metrcUid.trim(), newQty);

    // Keep the audit details and new quantity visible.
    // Do not clear the fields here.
  } catch (err) {
    console.error("POST error:", err);
    setError(err.message || "Failed to submit new quantity");
  } finally {
    setPosting(false);
  }
};

  return (
    <div className="metrc-lookup">
      <div className="metrc-input">
        <label htmlFor="metrcUid">Metrc UID:</label>

        <div className="metrc-input-row">
          <input
            type="text"
            id="metrcUid"
            value={metrcUid}
            onChange={(e) =>
              setMetrcUid(e.target.value.toUpperCase())
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            placeholder="Scan or enter METRC UID"
          />

          <button
            type="button"
            className="submit-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>

      {/* Audit result area */}
      <div className="audit-result">
        {loading ? (
          <p className="result-message">
            {/* Loading audit details... */}
          </p>
        ) : error && submitted ? (
          <p className="result-message">{error}</p>
        ) : auditData ? (
          <div className="audit-details">
            {auditData.map((record, index) => (
              <div
                className="audit-record"
                key={record.id ?? index}
              >
    
                {fields.map((field) => (
  <div className="audit-field" key={field.key}>
    <label>{field.label}</label>

    {field.isInput ? (
      <input
        type="number"
        min="0"
        step="any"
        className="audit-field-value"
        value={newQty}
        onChange={(e) => setNewQty(e.target.value)}
        placeholder="Enter new quantity"
      />
    ) : (
      <div className="audit-field-value">
        {record[field.key] ?? "—"}
      </div>
    )}
  </div>
))}
              </div>
              
            ))}
          </div>
        ) : null}
      </div>

      {/* Bottom buttons */}
      <footer className="bottom-buttons">
        <button
          type="button"
          className="ok-button"
          onClick={handleOk}
          disabled={posting}
        >
          {posting ? "Posting..." : "POST"}
        </button>

        <button
          type="button"
          className="clear-button"
          onClick={handleClear}
        >
          Clear
        </button>
      </footer>

      {/* Full-page loading overlay for GET */}
      {loading && (
        <div className="page-loading-overlay">
          <div className="page-loading-content">
            <div className="page-loading-spinner"></div>
            <p>Checking METRC UID... Please wait</p>
          </div>
        </div>
      )}

      {posting && (
  <div className="page-loading-overlay">
    <div className="page-loading-content">
      <div className="page-loading-spinner"></div>
      <p>Updating quantity... Please wait</p>
    </div>
  </div>
)}
    </div>
  );
}

export default MetrcInput;
