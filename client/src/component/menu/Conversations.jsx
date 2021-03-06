import { useState, useEffect, useContext, useRef } from 'react';
import { Box, makeStyles, Divider } from '@material-ui/core';
import Conversation from './Conversation';
import { getUsers } from "../../service/api";
import { AccountContext } from '../../context/AccountProvider';


const useStyles = makeStyles({
    component: {
        overflow: 'overlay',
        height: '81vh'
    },
    divider: {
        margin: '0 0 0 67px',
        backgroundColor: '#F2F2F2'
    }
})
  const Conversations=({text})=>{
       const classes = useStyles();
       const [users, setUsers] = useState([]);
       const {account,socket,setActiveUsers}= useContext(AccountContext)
      useEffect (()=>{
          const fetchData=async ()=>{
              let data = await getUsers();
            let fiteredData = data.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
            setUsers(fiteredData);
          }
          fetchData();
      },[text]);
         useEffect(() => {
        socket.current.emit('addUser', account.googleId);
         socket.current.on('getUsers',users=>{
             setActiveUsers(users);

         })
        
    })
      return(
          <Box className={classes.component}>{
              users.map(user =>(
                   user.googleId !== account.googleId && 
                  <>
                      <Conversation user ={user}/>
                  </>
                 ))}
          </Box>
      )
  }


  export default Conversations;