# **TCP CHAT**
---
This module allows you to host a local TCP chat server, where multiple users can connect. 
---

Starting up server:

```
  node index.js
```

Connecting to the server:
```
  telnet localhost 3000 //Localmachine
  telnet <hostname>.localhost 3000 //Remote
```

Once Connected in the chatroom
``` /nick ``` - Assigns you username
``` /nick <name> ie /nicu Nicu```
``` /dm <name> <message> ie: /dm Nicu supp brah?``` - Direct messages a specific user
``` /troll <number> <message> ie /troll 15 hey bro!!!``` - Repeats a message a specific amount of times
``` /quit ``` - Leave the chatroom
