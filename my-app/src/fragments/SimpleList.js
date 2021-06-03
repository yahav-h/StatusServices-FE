import { useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import LinkIcon from '@material-ui/icons/Link';
import RadioGroup from '@material-ui/core/RadioGroup';
import Paper from '@material-ui/core/Paper';
import axios from "axios";



function CardComponent (props) {
    const id = props.data.taskId;
    const url = props.data.serviceName;
    const status = props.data.serviceStatus;
    const color = status === 'Up' ? 'green' : status === 'Down' ? 'red' : 'yellow';
    
    async function onClickRemoveCardComponent (event) {
        console.log(event.target.value);
        const elementLink = document.querySelector("[target='_remove']");
        const deleteCard = async (id, domain) => {
            return await axios({
                method: 'delete',
                url: `http://localhost:53459/api/v1/domains?identifier=${id}:${domain}`,
                headers: {"Access-Control-Allow-Origin": "*"}
            });
        }
        await deleteCard(id, url);
        elementLink.parentElement.parentElement.remove();
    }

    useEffect(async () => {
        if (id === undefined || id === null || id === "" || url === undefined || url === null || url === "") {
            console.error("id : " + id ,  "url : " + url);
        } else {
            console.log("id : " + id ,  "url : " + url);
        }
    });

    return (
        <div>
            <Card style={{minHeight: '10.5em', maxHeight: '10.5em', minWidth: '15em', maxWidth: '15em', border: '2px solid', margin: '1em'}} id={id}>
                <Card.Body style={{marginBottom: '10px;'}}>
                    <Card.Title title="Service Name"><h3><b>{url.replace(/https:\/\/|http:\/\//g, '')}</b></h3></Card.Title>
                    {
                        status === 'Up' ?
                        <Card.Subtitle title="Status" style={{backgroundColor: color, color: 'white', padding: '1rem'}}><b>Running</b></Card.Subtitle>
                        :
                        status === 'Down' ? 
                        <Card.Subtitle title="Status" style={{backgroundColor: color, color: 'white', padding: '1rem'}}><b>Down</b></Card.Subtitle>
                        : 
                        <Card.Subtitle title="Status" style={{backgroundColor: color, color: 'black', padding: '1rem'}}><b>Pending</b></Card.Subtitle>
                    }
                    <br/>
                    <Card.Link 
                        href={url}
                        style={{ margin: '1em',  marginRight: '2em'}}
                        target="_redirect"
                        title={"URL : " + url}
                    >
                        <LinkIcon fontSize="large" />
                    </Card.Link>
                    {" "}
                    <Card.Link 
                        style={{ margin: '1em', marginLeft: '2em' }}
                        onClick={onClickRemoveCardComponent}
                        target="_remove"
                        title={"Remove : " + id}
                    >
                        <DeleteForeverSharpIcon fontSize="large" />
                    </Card.Link>
                </Card.Body>
            </Card> 
        </div>
    );
}

const SimpleList = (props) => {  
    const list = props.list;
    return (
        <div style={{margin: '1em', padding: '3rem'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={0}>
                    {list.map((idx) => (
                        <Grid key={idx} item>
                        <Paper style={{height: '140', width: '100'}}/>
                        </Grid>
                    ))}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <Grid container>
                            <Grid item>
                            <br/>
                            <FormLabel><b>Services</b></FormLabel>
                            <RadioGroup
                                name="spacing"
                                aria-label="spacing"
                                value={"0"}
                                style={{marginLeft: '2em'}}
                                row
                            >
                                {
                                list.map((obj, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={obj.taskId}
                                    control={
                                        <CardComponent data={obj}/>
                                    }/>
                                ))}
                            </RadioGroup>
                            <br/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}


export default SimpleList;