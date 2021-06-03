import {useState, useEffect} from "react";
import {TextField, Button} from "@material-ui/core";
import FiberNewSharpIcon from '@material-ui/icons/FiberNewSharp';
import SimpleList from "./fragments/SimpleList";
import {v4 as uuidv4} from "uuid";
import axios from "axios";


function AppView () {
  const [domains, setDomains] = useState([]);
  const [state, setState] = useState({updated: false})

  useEffect(() => {
    async function fetchData () {
      return await axios({
        method: 'get',
        url: 'http://localhost:53459/api/v1/domains',
        headers: {"Access-Control-Allow-Origin": "*"}
      });
    }
    let response = null || undefined;
    setTimeout(async () => {
      response = await fetchData();
      setDomains(response.data.domains);
    }, 10000);
  });

  async function onClickAddEnvironmentCard () {
    let uid = null || undefined || "";
    const serviceDomainText = document.getElementById("service-domain").value;
    if (serviceDomainText === "" || undefined || null) {
      alert("Please add a Domain!");
      setState({updated: false});
    }
    else {
        uid = uuidv4();
        console.log(uid);
        domains.push({taskId: uid, serviceName: serviceDomainText});
    }
    document.getElementById("service-domain").value = null;
    setState({updated: true});
    
    await axios({
        method: 'post',
        url: `http://localhost:53459/api/v1/ping?identifier=${uid}:${serviceDomainText}`,
        headers: {"Access-Control-Allow-Origin": "*"}
    })
    .then(resp => console.log(resp))
    .catch(e => console.error(e));
  }

  return (
      <div className="App">
      <div>
        <center>
          <pre>Add new Service for Monitoring</pre>
          <TextField required label="Required" variant="outlined" 
            type="text" id="service-domain" size="40" placeholder="https://mydomain.com" 
          /> 
          {" "}
          <Button id="add-btn" onClick={onClickAddEnvironmentCard} 
            style={{height: '3.5rem', border: '1px solid #c9c9c9'}}>
            <FiberNewSharpIcon fontSize="large" />
          </Button>
        </center>
        <br/>
        <br/>
        <center>
        <div style={{maxWidth:false, maxHeight:false, width: 1080, height: 620, background: "#abcdef"}}>
          <div style={{margin: '2em'}}>
              {domains.length !== 0  ? <SimpleList list={domains} state={state}/> : <p>No Monitored Services!</p> }
          </div>
        </div>
        </center>
      </div>
    </div>
  );
}


function App() {
  return (
    <>
        <AppView />
    </>
  );
}


export default App;
