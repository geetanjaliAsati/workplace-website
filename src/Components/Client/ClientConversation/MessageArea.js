import React, { useEffect } from "react";
import { Grid, TextField, Button } from "@mui/material";
function MessageArea({
  onSendMessage,
  selectedConversation,
  fetchAllOneToOneMessages,
  allMessages,
}) {
  const [messagetext, setMessage] = React.useState("");
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const clientId = loggedInUser.uid;
  useEffect(() => {
    if (selectedConversation) {
      fetchAllOneToOneMessages();
    }
  }, [selectedConversation]);

  return (
    <div>
      {selectedConversation && allMessages ? (
        <div>
          <div>
            {allMessages.map((message) => {
              return (
                <div
                  style={{
                    borderRadius: " 0px 16px 16px 16px",
                    width: "fit-content",
                    padding: "10px",
                    margin: "5px 10px",
                    marginLeft: message.sender_id === clientId ? "auto" : "10px",
                    background: message.sender_id === clientId ? "#7f31d2d6":"#EAEAEA",
                    color: message.sender_id === clientId && "white",
                  }}
                  key={message.message_id}
                >
                  {message.message}
                </div>
              );
            })}
          </div>
          <form onSubmit={(e) => {e.preventDefault();onSendMessage(messagetext)}}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <TextField
                onChange={(e) => setMessage(e.target.value)}
                value={messagetext}
                fullWidth
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                type="submit"
              >
                Send
              </Button>
            </Grid>
          </Grid>
          </form>
        </div>
      ) : (
        <div>select a conversation</div>
      )}
    </div>
  );
}

export default MessageArea;
