import { useEffect, useState } from "react";
import useOutputStore from "../store/useOutputStore";
import usePasswordHistoryStore from "../store/usePasswordHistoryStore";

export default function useGeneratedValue(value: string | undefined) {
  const setOutput = useOutputStore((state) => state.setOutputValue);
  const addPassword = usePasswordHistoryStore((state) => state.addPassword);
  let initialValue = "";

  if (value !== undefined) {
    initialValue = value;
  }

  const [state, setState] = useState(initialValue);

  useEffect(() => {
    if (state === "") {
      return;
    }

    setOutput(state);

    addPassword({
      password: state,
      timestamp: new Date().toLocaleTimeString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    });
  }, [state]);

  return setState;
}
