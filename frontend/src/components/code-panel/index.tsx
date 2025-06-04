
import { CircularProgress } from "@mui/material";
import { useTerraform } from "../../contexts/terraformContext";
import './index.scss';

export default function CodePanel() {
  const { terraformCode, isLoading} = useTerraform();
    return (
        <>
            <div className="header">
              
                <div className="title">TERRAFORM CODE</div>
                <div className="actions">
                    <button className="actionButton">
                        <span className="downloadIcon">↓</span>
                    </button>
                </div>
            </div>

            <div className="codeContent">
            {isLoading ? <div className="loading"> <CircularProgress color="inherit" size="6rem" /></div>:
                <pre className="codeBlock">
                {`${terraformCode}`}
                </pre>}
            </div>
        </>
    )
}

