using api.Models;
using MySqlConnector;

namespace api.Handlers
{
    public class UserMessageHandler
    {
        public async Task<List<UserMessage>> GetAllUserMessages(string cs)
        {
            List<UserMessage> myUserMessages = [];

            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();

            using var command = new MySqlCommand("SELECT * FROM user_messages", connection);
            using var reader = await command.ExecuteReaderAsync();

            while(await reader.ReadAsync())
            {
                int userid = reader.GetInt32(0);
                string username = reader.GetString(1);
                string useremail = reader.GetString(2);
                string usermessage = reader.GetString(3);

                myUserMessages.Add(new UserMessage(){
                    UserId = userid,
                    UserName = username,
                    UserEmail = useremail,
                    UserText = usermessage
                });
            }

            return myUserMessages;
        }

        public async Task AddNewUserMessage(string cs, UserMessage userMessage)
        {
            using var connection = new MySqlConnection(cs);

            await connection.OpenAsync();
            using var command = new MySqlCommand("", connection);

            string? username = userMessage.UserName;
            string? useremail = userMessage.UserEmail;
            string? usermessage = userMessage.UserText;  

            command.CommandText = @$"INSERT INTO user_messages(user_name, user_email, user_message) VALUES(@username, @useremail, @usermessage);";
            command.Parameters.AddWithValue("@username", username);
            command.Parameters.AddWithValue("@useremail", useremail);
            command.Parameters.AddWithValue("@usermessage", usermessage);

            command.Prepare();
            command.ExecuteNonQuery();
        }
    }
}