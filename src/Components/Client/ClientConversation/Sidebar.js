import React, { useEffect } from "react";

function Sidebar({
  getAllConversation,
  allConversations,
  setSelectedConversation,
}) {
  useEffect(() => {
    const unsubscribe = getAllConversation();
    return unsubscribe;
  }, []);
  return (
    <div>
      {allConversations && allConversations.length === 0 ? (
        <div>no conversations</div>
      ) : allConversations && allConversations.length > 0 ? (
        <div>
          {allConversations.map((conversation) => {
            return (
              <div
                onClick={() => setSelectedConversation(conversation)}
                style={{ border: "1px solid", padding: "10px" }}
              >
                <div>{conversation.candidate_name || "name"}</div>
                <div>{conversation.last_message}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default Sidebar;
