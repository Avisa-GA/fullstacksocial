import { signInWithGoogle } from "../services/firebase";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

export default function GoogleButton(props) {
  const history = useHistory();

  async function handleClick() {
    await signInWithGoogle();
    history.push("/");
  }

  return (
    <Button onClick={handleClick}>
      Login With <span>G</span>
      <span>O</span>
      <span>O</span>
      <span>G</span>
      <span>L</span>
      <span>E</span>
    </Button>
  );
}