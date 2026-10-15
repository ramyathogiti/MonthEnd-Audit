import "./App.css";
import MetrcInput from "./components/MetrcInput";

function App() {
return ( 
<div className="audit-page"> <header className="audit-header"> <h1>Month End Audit</h1> <MetrcInput /> </header>

  {/* <main className="audit-content">
    <div className="audit-result">
      <div className="invalid-state">
        <div className="tag-icon">◇</div>
        <h2>Invalid METRC UID</h2>
      </div>
    </div>
  </main> */}

  <footer className="audit-footer">
    <button className="ok-button">OK</button>
    <button className="clear-button">Clear</button>
  </footer>
</div>

);
}

export default App;

