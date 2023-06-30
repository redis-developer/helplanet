# helplanet
This application allows people to notify when an event occurs (An animal needs help, A place is full of garbage, Pollution, Dangerous place, Crime). People from their phones can create a notification on their current location (coordinates). This notification remains in place for a time, and people who pass a certain radius of the point will receive the notification. The notification will also reach a platform that allows the subscription of help groups. Which may be informed of the situation.


<img src="https://raw.githubusercontent.com/byronrosas/helplanet/main/logo.png" width="100%" height="auto">

## Architecture

![Alt text](https://raw.githubusercontent.com/byronrosas/helplanet/main/architecture.png)

## Mobile Application (Reporters)
<div style="display:flex;">
<a style="margin-left:5px;  margin-right:5px;" href="https://raw.githubusercontent.com/byronrosas/helplanet/main/loginMobile.png"><img src="https://raw.githubusercontent.com/byronrosas/helplanet/main/loginMobile.png"  height="auto"></a>
<a style="margin-left:5px;  margin-right:5px;" href="https://raw.githubusercontent.com/byronrosas/helplanet/main/menu.png"><img src="https://raw.githubusercontent.com/byronrosas/helplanet/main/menu.png"  height="auto"></a>
<a style="margin-left:5px;  margin-right:5px;" href="https://raw.githubusercontent.com/byronrosas/helplanet/main/addNew.png"><img src="https://raw.githubusercontent.com/byronrosas/helplanet/main/addNew.png" height="auto"></a>

<a style="margin-left:5px;  margin-right:5px;" href="https://raw.githubusercontent.com/byronrosas/helplanet/main/mobileMap.png"><img src="https://raw.githubusercontent.com/byronrosas/helplanet/main/mobileMap.png"  height="auto"></a>


</div>
## Web Aplication (Organization and Administrators)
<div style="display:flex;">
    <a style="margin-left:5px; margin-right:5px;" href="https://raw.githubusercontent.com/byronrosas/helplanet/main/organizationDashboard.png"><img src="https://raw.githubusercontent.com/byronrosas/helplanet/main/organizationDashboard.png"  height="auto"></a>
</div>
<div style="display:flex;">
    <a style="margin-left:5px; width:50%; margin-right:5px;" href="https://raw.githubusercontent.com/byronrosas/helplanet/main/administratorDashboard.png"><img src="https://raw.githubusercontent.com/byronrosas/helplanet/main/administratorDashboard.png"  height="auto"></a>
    <a style="margin-left:5px; width:50%; margin-right:5px;" href="https://raw.githubusercontent.com/byronrosas/helplanet/main/realTimeNotification.png"><img src="https://raw.githubusercontent.com/byronrosas/helplanet/main/realTimeNotification.png"   height="auto"></a>

</div>




## Technical Stacks
- Frontend - _Angular_, _SocketIOClient_, _Ionic_, _Angular Material_, _Bootstrap_, _Leaflet_
- Backend - _Node.js(Javascript)_, _SocketIO_, _Redis(Cache, Streams, Redis Search)_

## How it works?

This project works with multiple services, they are the following:
- **Session Service:** Central authentication for all services, it has other controllers for user management
    - Login Controller
    - Register Controller
    - SetRole Controller (For change role)
    - Logout Controller
    - Get Users Controller (Get all users)
- **Report Service**  It works directly with the mobile application, manages notifications, sends them through redis stream and gets nearby notifications through coordinates.
    - Add Notification
    - Cancel Notification (Remove notification on redis hash)
    - List Near Notifications (Get notifications with pagination on a radius)
    - List Notifications (Get user created notifications )
- **Organization Service** It works directly with the web application, gets the notifications and allows the organizations to place them as attended or cancel them. (Returns notifications with coordinates to be displayed on a map)
    - Attend notification (update on hash notifications)
    - Cancel notification (update on hash notifications)
    - List Notifications Saved (get all notifications with pagination on hash)
- **Notification Service** Listen if a new element has been added to the stream, if this event occurs, perform two actions, the first send a notification to the clients through socket io, and the second temporarily save the element in a hash (Notification)
    - Save Notification (Add notifications on hash)
    - Send New Report (Emit real time notification)

Each of the services uses instances of the repository classes, which contain the redis commands
- **Redis utils**
    - Remove index for users:
    ```
    FT.DROPINDEX usersIdx
    ```
    - Remove index for notifications:
    ```
    FT.DROPINDEX notificationsIdx

    ```
    - Add secondary index for users:
    ```
    FT.CREATE usersIdx ON HASH PREFIX 1 hpa:users: SCHEMA username TEXT password TEXT email TAG status NUMERIC role NUMERIC
    ```

    - Add secondary index for notifications:
    ```
    FT.CREATE notificationsIdx ON HASH PREFIX 1 hpa:notifications: SCHEMA geo GEO userId TAG userOrg TAG
    ```

    -For token utils (SET):
    ```
    SET hpa:session:byron@hotmail.com "xyaszTOKENsdsjlvj" EX 24*60*60
    ```

    -For token utils (DEL):
    ```
    DEL hpa:session:byron@hotmail.com
    ```

    -For token utils (GET):
    ```
    GET hpa:session:byron@hotmail.com
    ```

- **Notification Repository**
    - Save new notification: Add data on hash
    ```
    HSET "hpa:notifications:1621188142413-0" userId "byron@reporter.com" level "0" text "trash" situation "garbage" geo "-78.62285039999999,-1.2543408"
    ```
       and
    ```
    EXPIRE "hpa:notifications:1621188142413-0" 172800
    ```

    - Attend Cancel:
    ```
    HDEL "hpa:notifications:1621188142413-0" userOrg dateAttention
    ```

    - Attend Notification:
    ```
    HSET "hpa:notifications:1621188142413-0" userId "byron@reporter.com" level "0" text "trash" situation "garbage" geo "-78.62285039999999,-1.2543408" serOrg x@hotmail.com dateAttention new Date()
    ```

    - Remove Notification:
    ```
    DEL "hpa:notifications:1621188142413-0"
    ```

    - Get All (Notifications with pagination):
    ```
    FT.SEARCH notificationsIdx * LIMIT 0 10
    ```

    - Get All By User(Notifications):
    ```
    FT.SEARCH notificationsIdx @userId:{email/@hotmail/.com} LIMIT 0 10
    ```

    - Add Stream (Notification data):
    ```
    XADD hpa:report MAXLEN 30 * userId "user@x.com" level "0" situation "garbage" lat "-7.54545" lon "-0.4545" text "trash"
    ```

    - List Streams:
    ```
    XRANGE hpa:report 1621188142413 1621188142413
    ```

    - Get One Stream:
    ```
    XRANGE hpa:report 1621188142413-0 + COUNT 1
    ```

    - Get One (Notification):
    ```
    HGETALL "hpa:notifications:1621188142413-0"
    ```

    - Get Near (Notifications):
    ```
    FT.SEARCH notificationsIdx @geo:[ "-0.4545" "-7.54545"  15 m]
    ```

- **User Repository**
    - Save User:
    ```
    HSET hpa:users:byron@hotmail.com username "byronman" password "encryptpassword" email "byron@hotmail.com" role "0"
    ```

    - Get By Email (Users):
    ```
    FT.SEARCH usersIdx @email:{email@x.com}
    ```

    - Get By Id (Users):
    ```
    HGETALL hpa:users:byron@hotmail.com
    ```

    - Update By Email:
    ```
    HSET hpa:users:byron@hotmail.com username "byronman" password "encryptpassword" email "byron@hotmail.com" role "0"
    ```

    - Get By Email (Users):
    ```
    FT.SEARCH usersIdx @email:{email@x.com}
    ```

    - Get All Users (Users with pagination):
    ```
    FT.SEARCH  * LIMIT 0 10
    ```

- **Socket Service**
    - Send new report (send data through io socket )
- **Index (Notification Service)**
    - Listen reports (Real time):
    ```
    XREAD COUNT 1 BLOCK 5000 STREAMS hpa:report $
    ```



Middleware is also used for each of the routes:
- isAuth (Verify that the user has a valid token and is authorized to access all services )
- isUserReport (Verify that the user has the role of reporter )
- isUserOrganization Verify that the user has the role of organization)
- isAdmin Verify that the user has the role of Administrator )


## Hot to run it locally?
### Prerequisites
- Node.js: (_v14.16.1_)
- npm: (_v7.11.2_)
- Docker: (_v20.10.2_)
- Redis: (_v6.0.1_)

### Local Installation (Ubuntu 21.04)
Exec redis (https://github.com/RedisLabsModules/redismod)
```
sudo docker run -p 6379:6379 --name myredis  redislabs/redismod

sudo docker start myredis

```

Clone this project or download as zip

```
git clone https://github.com/byronrosas/helplanet.git
```
Install dependencies (for server, helplanet mobile app and helplanet-support)

```
cd helplanet
cd server
npm install

cd ..
cd help-planet
npm install
npm install -g @ionic/cli
npm install @ionic-native/core@4 --save


cd ..
cd helplanet-support
npm install
npm install -g @angular/cli
```
(Open three terminals)
- First start server (start services) with this commands:
    - PORT => 3006 (dataserver notification-service)
    - PORT => 3001 (dataserver session-service)
    - PORT => 3002 (dataserver organization-service)
    - POST => 3003 (dataserver report-service)

```
cd ..
cd server
npm run build
npm run dev
```

- Second start ionic app (http://localhost:8100)
```
cd help-planet
ionic serve
```

- Third start web angular app (http://localhost:4200)
```
cd helplanet-support
ng serve
```
