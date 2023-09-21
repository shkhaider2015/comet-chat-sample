import React, { useEffect, useState } from "react";
import "./App.css";
import ChatScreen1 from "./screens";
import { CometChatUIKit } from "@cometchat/chat-uikit-react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { UIKitSettingsBuilder } from "@cometchat/uikit-shared";

//create the builder
const UIKitSettings = new UIKitSettingsBuilder()
  .setAppId("2433681a1ce4dd4a")
  .setRegion("us")
  .setAuthKey("c1181af78cba7b04f71d1ce3dc7c7dfcd274471d")
  .subscribePresenceForFriends()
  .build();

//Initialize CometChat UIKit

function App() {
  const [cometChatUser, setCometChatUser] = useState<CometChat.User>();
  const [initialize, setInitialize] = useState<boolean>(false);
  const userId = "44411bbb-0514-4c14-80d3-747ce9cc4f78";

  useEffect(() => {
    _init()
  }, []);

  useEffect(() => {
    if(initialize && userId) {
      let newUser = new CometChat.User(userId)
      newUser.setName("Shakeel Haider")
      _createCometChatUser(newUser, userId)
    }
  }, [initialize])

  const _init = () => {
    CometChatUIKit.init(UIKitSettings)
      ?.then(() => {
        console.log("Initialization completed successfully");
        // You can now call login function.
        setInitialize(true)
      })
      .catch((err) => {
        console.error("Initialization Failed : ", err);
      });
  };

  const _createCometChatUser = (user: CometChat.User, user_id: string) => {
    CometChatUIKit.createUser(user)
      ?.then((userRes: CometChat.User) => {
        console.log('### -- Create User success ', userRes);
        _loginCometChatUser(user_id);
      })
      .catch(err => {
        if (err?.code == 'ERR_UID_ALREADY_EXISTS') {
          _loginCometChatUser(user_id);
          return;
        }
        console.error('### -- Create User Failed ', err);
      });
  };
  const _loginCometChatUser = (user_id: string) => {
    CometChatUIKit.login(user_id)
      ?.then(async (user: CometChat.User) => {
        console.log("### -- Login Successful:", { user });
        setCometChatUser(user);
      })
      .catch((err) => console.error("### -- Login Failed : ", err));
  };

  console.log("User ", cometChatUser);

  return <div className="App">
    <h1>CometChat Sample App</h1>
    {cometChatUser && <ChatScreen1 />}
    </div>;
}

export default App;
