## Realtime Web Chat App

A real-time chat application whose style is heavily inspired by WhatsApp. Built using the MERN Stack (`MongoDB`, `Express.js`, `React`, `Node.js`) with `Cloudinary` for file storage and `Socket.IO` for instant messaging.

###Live Demo -> currently server not running

Current version running at: [https://letstalksapp.netlify.app](https://letstalksapp.netlify.app)


### ✨ Features
- signing up & signing in
- setting up your profile info when signing in for the first time
- updating your profile info
- adding new friends to chat with by sending them friend requests
- approving or rejecting the received friend requests
- creating group messages
- real-time chatting with your friends in direct messages and groups
- sending images and other files in chats
- filtering your chats for displaying `all chats`, `DMs` or `groups`
- searching for a specific chat in direct messages and groups or a request in friend requests
- viewing the `contact information`, `groups in common` and `files shared between you` in your friends' profile
- viewing the `creation date`, `members` and `files shared` of the groups you are in

  
> [!NOTE]
> It may take up to a minute for the site to be brought up while the loading indicator is displayed, since free instances in Netlify will spin down with inactivity which can delay requests by 50 seconds or more.


### ⚙ Setup

- ### create a `.env` file in the `server` folder

```
PORT=3001
JWT_KEY="YOUR_JWT_KEY"
ORIGIN="http://localhost:3000"
DATABASE_URL="YOUR_DATABASE_URL"
PEPPER_STRING="YOUR_PEPPER_STRING"
```

- ### create a `.env` file in the `client` folder

```
VITE_SERVER_URL="http://localhost:3001"
VITE_CLOUDINARY_CLOUD_NAME='cloud-name'
VITE_CLOUDINARY_UPLOAD_PRESET='upload-preest'

```

### 🏃‍♂️ Running in local development mode

- `server`

```zsh/bash
cd server
npm install
npm run dev
```

- `client`

```zsh/bash
cd client
npm install
npm run dev
```

open http://localhost:3000 with your browser to see the result.

 ### 📷 Screenshots 
 `Profile created after SignUp`
<img width="1440" height="900" alt="Screenshot 2026-01-11 at 00 15 37" src="https://github.com/user-attachments/assets/4bc9ccbb-ac3c-4f0a-b0f5-3cc138e3e14a" />

`Add new Friend or send friend request`
<img width="1440" height="900" alt="Screenshot 2026-01-11 at 00 16 05" src="https://github.com/user-attachments/assets/8af0f2ca-66d5-406a-a769-7236ce5fcd3a" />

`Friend request recieved`
<img width="1440" height="900" alt="Screenshot 2026-01-11 at 00 16 45" src="https://github.com/user-attachments/assets/e25ca728-1e77-45a5-ae9d-626fc2fb6798" />

`Contact list to send messages`
<img width="1440" height="900" alt="Screenshot 2026-01-11 at 00 17 10" src="https://github.com/user-attachments/assets/f70e5c4b-a082-47aa-889a-4568afbec450" />

`LetsTalks`
<img width="1440" height="900" alt="Screenshot 2026-01-11 at 00 17 31" src="https://github.com/user-attachments/assets/91a59320-a208-40cc-a592-489bb0019b24" />

`Share media`
<img width="1440" height="900" alt="Screenshot 2026-01-11 at 00 18 19" src="https://github.com/user-attachments/assets/ce2276b0-cb42-4f41-b7fe-5e589057218e" />
