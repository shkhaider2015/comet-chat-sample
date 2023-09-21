import React from "react";
import "./styles.less";
import {
  MessageListConfiguration,
  MessagesConfiguration,
  ConversationsConfiguration,
  CometChatConversationsWithMessages,
  CometChatUsersWithMessages,
  UsersConfiguration,
} from "@cometchat/chat-uikit-react";

import { CometChat } from "@cometchat/chat-sdk-javascript";
const userId = "44411bbb-0514-4c14-80d3-747ce9cc4f78";
const ChatScreen1 = () => {
  const messageListConfiguration = new MessageListConfiguration({
    messagesRequestBuilder: new CometChat.MessagesRequestBuilder()
      .setUID(userId)
      .setLimit(10),
  });
  const messagesConfiguration = new MessagesConfiguration({
    messageListConfiguration,
  });

  const conversationsConfiguration = new ConversationsConfiguration({
    conversationsRequestBuilder:
      new CometChat.ConversationsRequestBuilder().setLimit(10),
  });
  const usersConfiguration = new UsersConfiguration({
    usersRequestBuilder: new CometChat.UsersRequestBuilder().setLimit(10)
  });
  // const groupsConfiguration = new GroupsConfiguration({
  //   groupsRequestBuilder: new CometChat.GroupsRequestBuilder().setLimit(10)
  // });

  return (
    <div style={{ minHeight: "70vh" }}>
      <CometChatConversationsWithMessages
        messagesConfiguration={messagesConfiguration}
        conversationsConfiguration={conversationsConfiguration}
      />
      {/* <CometChatUsersWithMessages
        messagesConfiguration={messagesConfiguration}
        usersConfiguration={usersConfiguration}
      /> */}
      {/* <CometChatGroupsWithMessages
        messagesConfiguration={messagesConfiguration}
        groupsConfiguration={groupsConfiguration}
      /> */}
    </div>
  );
};

export default ChatScreen1;
