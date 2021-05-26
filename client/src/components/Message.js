import React from 'react'

export const Message = ({ key, messageAuthor, loggedUser, message }) => {
    return (
        <div key={key}>
           
            <div className={
                messageAuthor === "moderador" ? 
                "moderadorMessage" :
                    messageAuthor === loggedUser ? 
                    "R usernameMessage" : 
                    "L usernameMessage"
            }>
                    {messageAuthor}
            </div>
                
            <div className={
                messageAuthor === loggedUser ? 
                "RM contentMessage" : 
                "LM contentMessage"
            }>
                {message}
            </div>
        </div>
    )
}
