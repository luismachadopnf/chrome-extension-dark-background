import "./App.css";

function App() {
  const DEFAULT_COLOR = "transparent";
  const DARK_COLOR = "lightslategrey";

  async function onClick() {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [DEFAULT_COLOR, DARK_COLOR],
      func: (defaultColor, darkColor) => {
        const currentColor = document.body.style.backgroundColor;

        document.body.style.backgroundColor =
          currentColor === darkColor ? defaultColor : darkColor;
      },
    });
  }

  return (
    <>
      <h1>Dark background</h1>
      <div className="card">
        <button onClick={() => onClick()}>change color</button>
      </div>
    </>
  );
}

export default App;
