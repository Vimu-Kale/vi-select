import { Box, Switch } from "@material-ui/core";
import { useState } from "react";
import "./App.css";
import PopupAsyncSelectContainer from "./PopupAsyncSelectContainer/PopupAsyncSelectContainer";
import PopupSelectContainer from "./PopupSelectContainer/PopupSelectContainer";

function App() {
  const [app, setApp] = useState(false);

  return (
    <Box className="App">
      <Box>
        PopupSelect
        <Switch
          checked={app}
          onChange={(e) => setApp(e.target.checked)}
          name="selecttoggle"
        />
        PopupAsyncSelect
      </Box>
      <Box className="mt-150">
        {!app ? <PopupSelectContainer /> : <PopupAsyncSelectContainer />}
      </Box>
    </Box>
  );
}

export default App;
